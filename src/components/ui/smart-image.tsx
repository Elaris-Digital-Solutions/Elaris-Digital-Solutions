import React, { forwardRef, useEffect } from "react";

export type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Mark the image as critical so it preloads eagerly */
  priority?: boolean;
  /** Explicitly control preload behavior even if not priority */
  preload?: boolean;
};

export const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(
  (
    {
      priority = false,
      preload,
      loading,
      decoding = "async",
      fetchPriority,
      src,
      ...rest
    },
    ref,
  ) => {
    const shouldPreload = (preload ?? priority) && typeof src === "string";

    useEffect(() => {
      if (!shouldPreload) return;
      if (typeof document === "undefined" || typeof src !== "string") return;

      const attrValue = `smartimage-${src}`;
      if (!document.querySelector(`link[data-smartimage="${attrValue}"]`)) {
        try {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = src;
          link.setAttribute("data-smartimage", attrValue);
          document.head.appendChild(link);
        } catch (error) {
          // Fail silently if the browser blocks dynamic preload injection
        }
      }

      if (typeof Image !== "undefined") {
        try {
          const img = new Image();
          img.decoding = "async";
          img.src = src;
        } catch (error) {
          // Ignore warming errors
        }
      }
    }, [shouldPreload, src]);

    const resolvedLoading: React.ImgHTMLAttributes<HTMLImageElement>["loading"] =
      loading ?? (priority ? "eager" : "lazy");

    const resolvedFetchPriority: React.ImgHTMLAttributes<HTMLImageElement>["fetchPriority"] =
      // Keep behavior: priority => high, otherwise low; allow explicit undefined
      fetchPriority ?? (priority ? "high" : "low");

    return (
      <img
        ref={ref}
        src={src}
        loading={resolvedLoading}
        decoding={decoding}
        // camelCase: en minúsculas React 18 lo trata como propiedad DOM
        // desconocida, avisa por consola y descarta el atributo — con lo que
        // las imágenes marcadas `priority` no recibían prioridad real.
        {...(resolvedFetchPriority ? { fetchPriority: resolvedFetchPriority } : {})}
        {...rest}
      />
    );
  },
);

SmartImage.displayName = "SmartImage";

export default SmartImage;
