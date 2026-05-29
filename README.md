# Camperoloco | Spanish Street Food en Berlín 🚚🌴

¡Bienvenido a la presencia digital oficial de **Camperoloco**! Este proyecto es una webapp moderna, visual e interactiva construida para dar a conocer el concepto del campero malagueño en Berlín, gestionar ubicaciones semanales del food truck y captar reservas para eventos privados y catering.

## 🥖 ¿Qué es Camperoloco?

Camperoloco no vende solo comida: vende una experiencia andaluza diferente en el corazón de Berlín. El **campero malagueño** es el rey indiscutible del street food de Málaga: un mollete redondo y plano, tostado al grill de forma que queda crujiente por fuera, tierno por dentro, y relleno de ingredientes deliciosos que se funden a la plancha.

---

## 🎨 Identidad Visual y Branding

El diseño de la aplicación adopta una estética **oscura y premium de alto contraste**, inspirada en la vida nocturna de Berlín y la calidez del sol malagueño:
- **Base del diseño:** Fondos negros puros (`#09090A`) y gris carbón (`#121214`) que hacen resaltar la comida.
- **Detalles y Acentos:** Gradientes vibrantes del Naranja Coral (`#FF5C2B`) al Amarillo Oro (`#FFC107`), extraídos directamente del logotipo.
- **Tipografía:** 
  - `Outfit` para títulos urbanos y audaces.
  - `Plus Jakarta Sans` para textos limpios y legibles.
  - `Caveat` para detalles manuscritos y rústicos.
- **Patria:** Bandera de Andalucía (SVG puro) integrada sutilmente en el header, el footer, el hero badge y la sección de historia para consolidar el origen del concepto.

---

## 🌟 Características Principales

1. **Cabecera Glassmorphism:** Menú de navegación flotante con efecto translúcido y *scroll-spy* dinámico que resalta la sección activa. Se adapta a móviles mediante un menú lateral colapsable.
2. **Calendario Semanal Inteligente ("Sigue al Truck"):** Selector interactivo de días de la semana con enlaces directos a Google Maps.
   - *Lógica Live:* El sistema calcula automáticamente la hora del usuario y muestra un badge verde parpadeante de **"Abierto ahora"** si coincide con el horario del food truck, o **"Cerrado"** en caso contrario.
3. **Carta / Menú Interactivo:** Grid responsivo con filtros de categorías (Todos, Clásicos, Especiales, Tapas y Bebidas). Al pulsar sobre un plato, se abre un **Modal de Ingredientes** animado que muestra de forma gráfica qué lleva (con iconos personalizados) e información sobre alérgenos.
4. **Formulario de Reservas en 3 Pasos (Catering):** Flujo interactivo con validación de datos en tiempo real:
   - **Paso 1:** Datos de contacto.
   - **Paso 2:** Detalles del evento (tipo de evento, fecha, rango de comensales dinámico de 30 a 500+ e invitados).
   - **Paso 3:** Comentarios adicionales.
   - Al completarse con éxito, muestra una pantalla de confirmación con el resumen de la cotización para enviar al administrador.
5. **Carrusel de Reseñas:** Slider interactivo con controles de flechas y dots indicadores que muestra testimonios verídicos de amantes de los camperos en español, inglés y alemán.

---

## 🛠️ Stack Tecnológico

La aplicación se ha desarrollado utilizando tecnologías web nativas para garantizar un rendimiento instantáneo (Lighthouse 100/100) y cero dependencias pesadas:
- **HTML5:** Marcado semántico y optimización SEO básica (meta descriptores y jerarquía de títulos).
- **CSS3 (Vanilla):** Sistema de diseño responsivo basado en CSS Grid y Flexbox, variables de colores, y animaciones de entrada y hover sutiles.
- **JavaScript (ES6+):** Lógica nativa de manipulación del DOM, eventos de paso, cálculos de tiempo del calendario y transiciones del carrusel.

---

## 📂 Estructura del Proyecto

```bash
camperoloco/
│
├── index.html       # Estructura e interfaz SPA de la aplicación
├── styles.css       # Hoja de estilos responsiva, animaciones y diseño oscuro
├── app.js           # Lógica interactiva del cliente, calendario y formulario
├── .gitignore       # Archivos omitidos en Git
├── README.md        # Documentación general del proyecto (este archivo)
│
└── assets/          # Recursos estáticos del sitio
    ├── logo.png             # Logotipo oficial de Camperoloco
    ├── truck_hero.png       # Imagen de ambiente del food truck en Berlín
    ├── campero_classic.png  # Fotografía del campero clásico malagueño
    └── campero_chicken.png  # Fotografía del campero especial de pollo
```

---

## 💻 Cómo Ejecutar Localmente

Dado que el proyecto utiliza Javascript nativo que realiza llamadas funcionales de imágenes y simulaciones locales, es recomendable correrlo utilizando un servidor local ligero para evitar restricciones del protocolo `file://` del navegador:

### Opción 1: Usando Node.js (Recomendado)
Dado que tienes Node.js instalado, puedes ejecutar en la carpeta del proyecto:
```bash
npx.cmd http-server -p 8000
```
Luego abre [http://localhost:8000](http://localhost:8000) en tu navegador.

### Opción 2: Usando Python
Si prefieres usar Python, ejecuta:
```bash
python -m http.server 8000
```
Y accede a [http://localhost:8000](http://localhost:8000).
