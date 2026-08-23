# Manifiesto de imágenes

Especificaciones del doc 04 sección 9. Las imágenes de producto las genera Roberto por IA.
Mientras tanto se programa con placeholders del tamaño exacto.

## Flujo

1. El original (PNG o JPG, al tamaño de la columna "Dimensiones") va en `public/img/_source/<carpeta>/<nombre>.jpg`
2. Correr `npm run images`
3. Se generan `<nombre>-640.webp`, `<nombre>-1280.webp` y `<nombre>-1920.webp` en `public/img/<carpeta>/`
4. `_source/` no se publica. Solo se sirven los WebP

## Inventario

### Marca

| Archivo | Estado | Dimensiones | Notas |
|---|---|---|---|
| `_source/logo-parh.jpg` | **Entregado** | 418x186 | Logo real: PARH APS SRL, Broker de Seguros. Conviene pedir el SVG o un PNG con fondo transparente a mayor resolución |

### Productos, personas (aspecto 4:3, 1200x900)

| Archivo | Estado | Contenido |
|---|---|---|
| `productos/seguro-automotor` | Pendiente | Auto en calle de barrio argentino |
| `productos/seguro-motovehiculo` | Pendiente | Moto urbana |
| `productos/seguro-hogar` | Pendiente | Casa de barrio del conurbano |
| `productos/seguro-vida` | Pendiente | Familia, tono cálido, sin dramatismo |
| `productos/seguro-retiro` | Pendiente | Pareja mayor, luz natural |
| `productos/accidentes-personales` | Pendiente | Persona trabajando, oficio |
| `productos/asistencia-al-viajero` | Pendiente | Valija y pasaporte, tono de viaje |
| `productos/seguro-de-celular` | Pendiente | Celular con la pantalla protegida |

### Productos, empresas (aspecto 4:3, 1200x900)

| Archivo | Estado | Contenido |
|---|---|---|
| `productos/responsabilidad-civil` | Pendiente | Obra o profesional en actividad |
| `productos/integral-comercio` | Pendiente | Local comercial de barrio |
| `productos/seguro-tecnico` | Pendiente | Maquinaria o equipo electrónico |
| `productos/art` | Pendiente | Personal con equipo de protección en su puesto |
| `productos/caucion` | Pendiente | Documento de garantía o firma de contrato |

### Hero (16:9, 1920x1080)

| Archivo | Estado | Contenido |
|---|---|---|
| `hero-home` | Pendiente | Escena cálida y realista. Familia o comerciante argentino |

### Oficinas (16:10, 1600x1000). Fotos reales, no IA

| Archivo | Estado |
|---|---|
| `oficinas/moron` | Pendiente |
| `oficinas/marcos-paz` | Pendiente |
| `oficinas/mercedes` | Pendiente |
| `oficinas/lujan` | Pendiente |

### Equipo (16:10, 1600x1000). Foto real

| Archivo | Estado | Notas |
|---|---|---|
| `equipo` | Pendiente | Es el activo de confianza más importante del sitio |

### Compañías

Logos de Federación Patronal, San Cristóbal, ATM, Cardinal Assistance, Banco del Sol y SeguroCell.
SVG o PNG de 400 px de ancho, en `companias/`.

**Pendiente de gestión:** hay que pedir autorización de uso de marca a cada compañía antes de publicar.

### Open Graph (1.91:1, 1200x630)

| Archivo | Estado |
|---|---|
| `og/default` | Pendiente |
| `og/seguros` | Pendiente |
| `og/empresas` | Pendiente |
| `og/oficinas` | Pendiente |

## Reglas para las imágenes generadas por IA

- Fotorrealistas. Nunca ilustración vectorial ni 3D
- Luz natural, tonos que convivan con el azul de la paleta
- Contexto argentino reconocible: calles, casas, autos y comercios de acá
- Sin texto dentro de la imagen
- Sin manos ni caras en primer plano si el generador no las resuelve bien
- Cada una necesita su `alt` descriptivo escrito a mano, nunca autogenerado
