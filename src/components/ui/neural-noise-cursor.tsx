"use client";

import { useEffect, useRef } from "react";

// Module-level constants — defined once, never recreated on re-render
const VERT = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = 0.5 * (a_position + 1.0);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2  u_pointer_position;
  uniform float u_scroll_progress;
  uniform float u_pointer_strength;
  uniform float u_time_scale;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.0);
    vec2 res = vec2(0.0);
    float scale = 8.0;

    for (int j = 0; j < 10; j++) {
      uv = rotate(uv, 1.0);
      sine_acc = rotate(sine_acc, 1.0);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (0.5 + 0.5 * cos(layer)) / scale;
      scale *= 1.2;
    }
    return res.x + res.y;
  }

  void main() {
    vec2 uv = 0.5 * vUv;
    uv.x *= u_ratio;

    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0.0, 1.0);
    p = 0.5 * pow(1.0 - p, 2.0) * u_pointer_strength;

    float t = 0.001 * u_time * u_time_scale;

    float noise = neuro_shape(uv, t, p);
    noise = 1.2 * pow(noise, 3.0);
    noise += pow(noise, 10.0);
    noise = max(0.0, noise - 0.5);
    noise *= (1.0 - length(vUv - 0.5));

    // Rampa de la marca (cian -> azul -> violeta, muestreada del isotipo).
    // El scroll recorre la rampa, así que el fondo respira los mismos tonos
    // que el logo en lugar de un azul genérico.
    vec3 brandCyan   = vec3(0.000, 0.753, 0.984);
    vec3 brandBlue   = vec3(0.031, 0.322, 0.992);
    vec3 brandViolet = vec3(0.459, 0.173, 0.984);

    // La rampa se recorre en el ESPACIO, no solo en el tiempo: así los tres
    // tonos del logo conviven en pantalla en vez de teñir todo de un color.
    // La diagonal imita la lectura del isotipo de izquierda a derecha.
    // vUv.y crece hacia arriba en GL: la diagonal va de abajo-izquierda
    // (cian) a arriba-derecha (violeta), que es por donde corre el remolino.
    float diag = vUv.x * 0.8 + vUv.y * 0.2;
    // Se reescala [0.08, 0.92] -> [0, 1]: sin esto los extremos cian y violeta
    // caen fuera del lienzo y todo el fondo tira a azul/violeta plano.
    float ramp = clamp((diag - 0.08) / 0.84 + 0.06 * sin(u_scroll_progress), 0.0, 1.0);

    // Sin normalize(): iguala la luminancia de los tres tonos y apaga el cian,
    // que es justo el extremo que da vida sobre el lavanda del fondo.
    vec3 base =
      ramp < 0.5
        ? mix(brandCyan, brandBlue, ramp * 2.0)
        : mix(brandBlue, brandViolet, (ramp - 0.5) * 2.0);

    // El alfa ya es el propio noise; multiplicar el color por noise otra vez
    // lo atenuaba al cuadrado y dejaba la rampa lavada. Se conserva algo de
    // caida para que el trazo no quede plano.
    vec3 color = base * mix(0.72, 1.0, noise);
    gl_FragColor = vec4(color, noise);
  }
`;

type NeuralNoiseProps = {
  /** Canvas opacity (0..1) */
  opacity?: number;
  /** Pointer attraction strength (0..2) */
  pointerStrength?: number;
  /** Time scale multiplier (0.25..4) */
  timeScale?: number;
  /** Class to override wrapper layout */
  className?: string;
  /** When set, bypasses dynamic scroll progress and uses this fixed value instead. */
  fixedScrollProgress?: number;
};

function NeuralNoise({
  opacity = 0.95,
  pointerStrength = 1,
  timeScale = 1,
  className = "relative min-h-[300vh] bg-[#151912] overflow-x-hidden",
  fixedScrollProgress,
}: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;

    // 1. Skip WebGL entirely for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    const gl = (
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | null;

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    // --- Shader compilation ---
    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(VERT, gl.VERTEX_SHADER);
    const fs = compile(FRAG, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // --- Quad buffer ---
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // --- Uniforms ---
    const getU = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      u_time:             getU("u_time"),
      u_ratio:            getU("u_ratio"),
      u_pointer_position: getU("u_pointer_position"),
      u_scroll_progress:  getU("u_scroll_progress"),
      u_pointer_strength: getU("u_pointer_strength"),
      u_time_scale:       getU("u_time_scale"),
    };

    gl.uniform1f(uniforms.u_pointer_strength, pointerStrength);
    gl.uniform1f(uniforms.u_time_scale, timeScale);

    // --- Resize: cap DPR at 1 on mobile to halve GPU pixel count ---
    let lastW = 0;
    let lastH = 0;

    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // En móvil, mostrar/ocultar la barra de direcciones al hacer scroll
      // dispara `resize` con un alto distinto. Reasignar el búfer del canvas en
      // cada uno de esos eventos entrecorta la animación, así que los cambios
      // de solo alto por debajo de 120px se ignoran: el shader no se nota.
      if (vw === lastW && Math.abs(vh - lastH) < 120) return;
      lastW = vw;
      lastH = vh;

      const isMobile = vw < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
      const w = Math.floor(vw * dpr);
      const h = Math.floor(vh * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width  = `${vw}px`;
      canvas.style.height = `${vh}px`;
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uniforms.u_ratio, w / h);
    };

    // --- Pointer & scroll ---
    const updatePointer = (x: number, y: number) => {
      pointer.current.tx = x;
      pointer.current.ty = y;
    };
    const onPointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove   = (e: TouchEvent)   => {
      if (e.targetTouches?.[0]) updatePointer(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    };
    const onClick  = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onScroll = () => { scrollProgress.current = window.pageYOffset / (2 * window.innerHeight); };

    window.addEventListener("resize",      resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove",   onTouchMove, { passive: true });
    window.addEventListener("click",       onClick);

    if (fixedScrollProgress !== undefined) {
      scrollProgress.current = fixedScrollProgress;
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    resize();

    // --- RAF loop using accumulated elapsed time ---
    // Using elapsed ms (not wall-clock) means pausing and resuming
    // the loop produces no visual jump in the animation.
    let elapsedMs  = 0;
    let lastFrameTs = 0;

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);

      elapsedMs  += lastFrameTs > 0 ? now - lastFrameTs : 0;
      lastFrameTs = now;

      const p = pointer.current;
      p.x += (p.tx - p.x) * 0.2;
      p.y += (p.ty - p.y) * 0.2;

      gl.uniform1f(uniforms.u_time, elapsedMs);
      gl.uniform2f(
        uniforms.u_pointer_position,
        p.x / window.innerWidth,
        1 - p.y / window.innerHeight,
      );
      gl.uniform1f(uniforms.u_scroll_progress, scrollProgress.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // --- IntersectionObserver: pause RAF when canvas is off-screen ---
    // Only one of Hero/Contact renders at a time, cutting GPU work in half
    // whenever the user is scrolled to see only one section.
    const startLoop = () => {
      if (rafRef.current) return;
      lastFrameTs    = 0; // reset delta so elapsed doesn't jump on resume
      rafRef.current = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastFrameTs    = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { threshold: 0 },
    );
    observer.observe(canvas);
    startLoop(); // start immediately; IO will stop it if canvas is off-screen

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize",      resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove",   onTouchMove);
      window.removeEventListener("click",       onClick);
      if (fixedScrollProgress === undefined) {
        window.removeEventListener("scroll", onScroll);
      }
      gl.deleteBuffer(vbo);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointerStrength, timeScale]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
      style={{ opacity }}
    />
  );
}

export { NeuralNoise };
