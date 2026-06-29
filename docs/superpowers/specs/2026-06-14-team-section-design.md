# Sección Equipo — Diseño

**Fecha:** 2026-06-14
**Branch:** feat/migrate-nextjs

---

## Objetivo

Añadir una sección "Equipo" a la landing de Elaris que muestre a los 3 integrantes con foto, cargo, descripción de una línea y enlace a LinkedIn. La sección se ubica justo antes de Contacto para maximizar la confianza en el momento de decisión del visitante.

---

## Decisiones de diseño

| Decisión | Elección | Razón |
|---|---|---|
| Estilo visual | Minimalista claro (fondo blanco, borde #e2e8f0) | Coherente con secciones claras del sitio |
| Foto | Circular, 88px, borde `#2F64FF` | Identidad visual sin foto cuadrada genérica |
| Fallback | Iniciales en círculo azul | Evita imágenes rotas en producción |
| Posición en página | Antes de `<Contact />` | Caras visibles en el momento de decisión = mayor conversión |
| Copy | Sin jerga técnica, sin mencionar estudios | Público objetivo: dueños de negocio LATAM |

---

## Miembros del equipo

```json
[
  {
    "name": "Carlos Alejandro Colfer Mendoza",
    "role": "Gerente General",
    "description": "Lidera la arquitectura de cada proyecto y asegura que la solución se entregue bien construida y en los plazos pactados.",
    "photo": "/assets/team/CarlosColfer.jpg",
    "initials": "CA",
    "linkedin": "https://www.linkedin.com/in/carlos-alejandro-colfer-mendoza-a59a08355/"
  },
  {
    "name": "Sergio Herrera",
    "role": "Gerente Administrativo",
    "description": "Gestiona la relación con cada cliente de inicio a fin: entiende el negocio, alinea expectativas y mantiene el proyecto en movimiento.",
    "photo": "/assets/team/SergioHerrera.jpg",
    "initials": "SH",
    "linkedin": "https://www.linkedin.com/in/sergio-herrera-jave/"
  },
  {
    "name": "Fabrizio Bussalleu",
    "role": "Gerente de Tecnología",
    "description": "Transforma los requerimientos del negocio en productos digitales funcionales, con obsesión por los detalles y la experiencia del usuario.",
    "photo": "/assets/team/FabrizioBussalleu.jpg",
    "initials": "FB",
    "linkedin": "https://www.linkedin.com/in/fabrizio-bussalleu/"
  }
]
```

---

## Arquitectura

### Archivos a crear
- `src/components/Team.tsx` — componente de la sección completa

### Archivos a modificar
- `src/views/HomeView.tsx` — añadir `<Team />` entre `<LeadMagnet />` y `<Contact />`
- `src/locales/es.json` — añadir bloque `team` con heading, description y members

### Estructura del componente

```
<section id="equipo" py-20 sm:py-32>
  <container>
    <motion heading>
      badge "Nuestro Equipo"
      h2 "Las personas detrás de Elaris"
      p subtítulo
    </motion>
    <grid 1-col mobile / 3-col desktop>
      {members.map(member =>
        <motion.div card stagger>
          <img circular con fallback initials>
          <h3 name>
          <p role>
          <p description>
          <a linkedin button>
        </motion.div>
      )}
    </grid>
  </container>
</section>
```

### Animaciones (Framer Motion)
- Heading: `opacity 0→1, y 24→0`, `duration 0.6`, `viewport once`
- Cards: stagger de `0.1s` por card, mismo patrón que `SocialProof.tsx`

### i18n
Bloque `team` en `es.json`:
```json
{
  "team": {
    "badge": "Nuestro Equipo",
    "headingNormal": "Las personas detrás de ",
    "headingAccent": "Elaris",
    "description": "Comprometidos con resultados concretos para tu negocio.",
    "linkedinLabel": "Ver LinkedIn",
    "members": [ ... ]
  }
}
```

---

## Navbar

No se añade "Equipo" al navbar — la sección es parte del flujo de conversión, no un destino de navegación independiente.

---

## Fuera de alcance

- Página de perfil individual por miembro
- Animación hover en foto (escala/overlay)
- Versión en inglés (i18n EN no está activa en el sitio)
