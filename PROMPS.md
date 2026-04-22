# Prompts - Opak MNG Website

Colección de prompts utilizados para crear el sitio web de Opak MNG.

---

## 1. Estructura Inicial del Proyecto

```
Genera una arquitectura de carpetas y archivos sencilla para el sitio web de Opak MNG.

Estructura propuesta:

/opak-mng-site
    /public
        index.html        # Inicio
        about.html        # Acerca de
        artist.html       # Artista Principal
        services.html     # Servicios
        blog.html         # Blog
        contact.html      # Contacto
        login.html        # Acceso
        /assets
            /images       # Imágenes del sitio
            /css          # Estilos
            /js           # Scripts
    README.md             # Documentación del proyecto

Requisitos:
- Cada página debe incluir su H1, meta title y CTA.
- Los estilos se organizan en /assets/css.
- Los scripts básicos (validación, navegación) van en /assets/js.
- Imágenes y multimedia en /assets/images.
```

---

## 2. Archivos CSS y JS

```
genera el archivo assets y sus composentes
```

---

## 3. Archivos JSON de Datos

```
Genera los archivos JSON iniciales para el sitio web de Opak MNG con ejemplos reales.

Estructura:

/data
    timeline.json
    testimonials.json
    blog-posts.json

Contenido sugerido:

timeline.json
[
  {
    "year": 2018,
    "event": "Primeras presentaciones en escenarios locales de Buenos Aires"
  },
  {
    "year": 2020,
    "event": "Lanzamiento del primer EP 'Versos de Barrio'"
  },
  {
    "year": 2022,
    "event": "Colaboración con artistas emergentes de la escena rap latinoamericana"
  },
  {
    "year": 2024,
    "event": "Gira nacional con más de 20 conciertos"
  }
]

testimonials.json
[
  {
    "name": "María G.",
    "text": "Opak MNG transmite una energía única en cada show, su autenticidad conecta con el público."
  },
  {
    "name": "DJ Rulo",
    "text": "Trabajar con Opak MNG fue una experiencia increíble, su profesionalismo y talento son indiscutibles."
  },
  {
    "name": "Carlos P.",
    "text": "Sus letras reflejan la realidad de muchos jóvenes, es un referente del rap actual."
  }
]

blog-posts.json
[
  {
    "title": "El camino de Opak MNG en el rap argentino",
    "date": "2025-03-10",
    "excerpt": "Desde sus inicios en la escena underground hasta convertirse en un nombre reconocido...",
    "url": "/blog/camino-opak-mng"
  },
  {
    "title": "Cómo la cultura urbana inspira sus letras",
    "date": "2025-06-22",
    "excerpt": "Opak MNG comparte cómo las calles y la vida cotidiana moldean su estilo y mensaje...",
    "url": "/blog/cultura-urbana-letras"
  },
  {
    "title": "Gira nacional 2024: un éxito rotundo",
    "date": "2024-12-05",
    "excerpt": "Más de 20 ciudades vibraron con la música de Opak MNG en su última gira...",
    "url": "/blog/gira-nacional-2024"
  }
]

Requisitos:
- Los archivos deben estar en formato JSON válido.
- timeline.json refleja hitos de carrera.
- testimonials.json incluye opiniones de fans y colaboradores.
- blog-posts.json contiene artículos con título, fecha, resumen y URL.
```

---

## 4. Guía de Estilo CSS

```
Moficica los estilos de las paginas para que respeten esa guia de estilo :

/* 1. IMPORTACIÓN DE FUENTES */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* 2. VARIABLES DE DISEÑO (Design Tokens) */
:root {
    /* Paleta de Colores */
    --bg-main: #000000;
    --bg-surface: #1A1A1A;
    --accent: #007BFF;
    --accent-hover: #0056b3;
    
    /* Colores de Texto */
    --text-primary: #FFFFFF;
    --text-secondary: #B0B0B0;
    
    /* Elementos UI */
    --border-color: #333333;
    --border-radius-card: 16px;
    --border-radius-pill: 50px;
    
    /* Espaciado */
    --section-padding: 100px;
    --container-padding: 24px;
}

/* 3. RESET & BASE */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-main);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

/* 4. TIPOGRAFÍA REUTILIZABLE */
h1, .h1 { font-size: 3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; }
h2, .h2 { font-size: 2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem; }
h3, .h3 { font-size: 1.25rem; font-weight: 600; color: var(--text-primary); }
h4, .h4 { font-size: 1.5rem; font-weight: 600; color: var(--text-primary); }

p, .body-text { font-size: 1rem; font-weight: 400; color: var(--text-secondary); }
.micro-text { font-size: 0.75rem; font-weight: 400; color: var(--text-secondary); }

/* 5. COMPONENTES: BOTONES */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: var(--border-radius-pill);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border: none;
}

.btn-primary {
    background-color: var(--accent);
    color: #FFFFFF;
}

.btn-primary:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: transparent;
    color: var(--accent);
    border: 1px solid var(--accent);
}

.btn-secondary:hover {
    background-color: var(--accent);
    color: #FFFFFF;
}

/* 6. COMPONENTES: TARJETA NFT */
.nft-card {
    background-color: var(--bg-surface);
    border-radius: var(--border-radius-card);
    padding: 20px;
    border: 1px solid var(--border-color);
    transition: transform 0.3s ease;
}

.nft-card:hover {
    transform: scale(1.02);
    border-color: var(--accent);
}

.nft-card-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 16px;
    background: linear-gradient(45deg, #ff5733, #ffbd33); /* Fondo de fallback */
}

.nft-card-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 12px 0;
    margin: 16px 0;
    text-align: center;
}

.stat-item:not(:last-child) {
    border-right: 1px solid var(--border-color);
}

/* 7. COMPONENTES: INPUTS */
.input-group {
    display: flex;
    gap: 10px;
    background-color: var(--bg-surface);
    padding: 8px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

input[type="text"], input[type="email"] {
    background: var(--bg-main);
    border: 1px solid var(--border-color);
    color: white;
    padding: 12px;
    border-radius: 8px;
    outline: none;
    flex: 1;
}

input:focus {
    border-color: var(--accent);
}

/* 8. LAYOUT & GRID SYSTEM */
.section {
    padding: var(--section-padding) var(--container-padding);
}

.grid-nft {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
}

.stats-hero-bar {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 40px 0;
    margin-top: 50px;
}

/* 9. NAVEGACIÓN Y FOOTER */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px var(--container-padding);
    background-color: var(--bg-main);
}

.nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    margin: 0 15px;
    font-size: 0.9rem;
}

.nav-links a:hover {
    color: var(--text-primary);
}

.footer {
    background-color: var(--bg-surface);
    padding: 60px var(--container-padding);
    margin-top: 100px;
}
```

---

## 5. Modo Claro y Menú Hamburguesa

```
Genera el modo claro de la pagina y haz funcional el memu amburguesa en mobil
```

---

## 6. Estructura de Navegación con ul/li

```
Usa ul y li para la navegacion en todas las paginas en vez de un div
```

---

## 7. Contenedor para Theme Toggle y Login

```
pon esos 2 elemtos en una misma caja :
<button class="theme-toggle" aria-label="Cambiar tema">🌙</button>
        <a href="login.html" class="btn btn-primary nav-cta">Acceso</a>
```

---

## 8. Alineación del Menú Móvil

```
hazque en el menu de telefono los texto de la barra de navegación se alinean a la izquerda
```

---

## Estructura Final del Proyecto

```
opak-mng-site/
├── README.md
├── data/
│   ├── blog-posts.json
│   ├── testimonials.json
│   └── timeline.json
└── public/
    ├── index.html
    ├── about.html
    ├── artist.html
    ├── services.html
    ├── blog.html
    ├── contact.html
    ├── login.html
    └── assets/
        ├── images/
        ├── css/
        │   └── style.css
        └── js/
            └── main.js
```

## Características Implementadas

- Tema claro/oscuro con toggle y localStorage
- Menú hamburguesa funcional en móvil
- Navegación con `<ul>` y `<li>`
- Guía de estilo dark mode (#000000, #1A1A1A, #007BFF)
- Responsive design (breakpoint: 992px)
- Estilos CSS con variables (Design Tokens)
- JavaScript modular con objeto App