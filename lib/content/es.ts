import type { LocaleContent } from "./types";

/**
 * Spanish — translation of en.ts. Same claims, nothing added or removed.
 */
export const es: LocaleContent = {
  hero: {
    headline:
      "Ingeniero de software. Construyo productos de punta a punta — y opero uno.",
    photoAlt: "Edson Boldrini",
    tagline: "Vitória, Brasil · Actualmente en Superset · Creador de CorteFilme",
  },
  about: [
    "Soy ingeniero de software full-stack: trabajo en web y móvil — TypeScript primero, luego Node, Vue, React, Flutter, Go y Elixir, desplegado en AWS y GCP. Vivo en Vitória, Brasil.",
    "En el trabajo soy ingeniero de software en Superset, la plataforma que usan entrenadores personales y de fitness para gestionar su negocio de entrenamiento. Fuera del trabajo construí CorteFilme y lo opero yo mismo: una aplicación web que ayuda a instaladores brasileños de película para ventanas a desperdiciar menos película por rollo.",
  ],
  work: {
    cortefilme: {
      title: "CorteFilme",
      role: "Creador y propietario",
      oneLine:
        "Una aplicación web que calcula la disposición de corte más eficiente para rollos de película solar, para que los instaladores desperdicien menos.",
      meta: "Corte de película para ventanas · Brasil",
    },
    superset: {
      title: "Superset",
      role: "Ingeniero de software",
      oneLine:
        "La plataforma en la que entrenadores personales y de fitness gestionan su negocio — clientes, programación y pagos — donde trabajo hoy.",
      meta: "Software para entrenamiento de fitness",
    },
    "club-trip": {
      title: "Club Trip · Além",
      role: "Ingeniero full-stack — construí la mayor parte del producto",
      oneLine:
        "Un producto de viajes por suscripción en Além del que construí la mayor parte.",
      meta: "Suscripciones de viajes",
    },
    "le-card": {
      title: "Le Card",
      role: "Ingeniero full-stack — construí la aplicación de pagos desde cero",
      oneLine:
        "La aplicación móvil de pagos que construí desde cero, emparejada con un terminal de tarjetas por Bluetooth.",
      meta: "Pagos · móvil",
    },
  },
  companies: {
    superset: {
      what: "Plataforma de software para entrenadores personales y de fitness",
      role: "Ingeniero de software",
    },
    w3care: {
      what: "Software de salud",
      role: "Ingeniero full-stack — móvil y front-end",
    },
    alem: { what: "Viajes en línea", role: "Ingeniero full-stack" },
    conceptho: {
      what: "Aplicaciones de noticias — protección de contenido y muros de pago",
      role: "Ingeniero full-stack",
    },
    dersalis: {
      what: "Salud y productividad — aplicaciones de pulsera inteligente",
      role: "Ingeniero full-stack — dirigí el equipo de desarrollo",
    },
    lecard: { what: "Pagos", role: "Ingeniero full-stack" },
  },
  openSource: {
    flutter_getnet_pos: {
      description:
        "Un complemento pequeño de Flutter que escribí para comunicarme con terminales POS de Getnet. Una integración acotada, no una biblioteca mantenida.",
    },
    flutter_ycbtsdk: {
      description:
        "Una capa pequeña en Objective-C alrededor del SDK de pulsera inteligente YCB — un experimento, no una biblioteca con usuarios.",
    },
  },
  caseStudy: {
    title: "CorteFilme",
    summary:
      "Una aplicación web que ayuda a talleres brasileños de película para ventanas a desperdiciar menos película por rollo.",
    sections: {
      context: {
        heading: "Contexto",
        body: "CorteFilme es una aplicación web para talleres de película para ventanas en Brasil — talleres que cortan película solar (insulfilm) a partir de rollos. La película viene en rollos de tamaño fijo, y cada corte reduce el sobrante hacia el desperdicio. Es mi producto, de principio a fin: lo creé y todavía soy el propietario.",
      },
      problem: {
        heading: "Problema",
        body: "Como un rollo tiene ancho y largo fijos, una mala disposición de corte deja retazos demasiado pequeños para reutilizar — y ese desperdicio sale directo del margen del taller. El problema central es la disposición: dadas las piezas que un trabajo necesita, ¿cómo cortarlas de un rollo con el menor sobrante?",
      },
      built: {
        heading: "Qué construí",
        body: "Una aplicación web que calcula la disposición de corte más eficiente para un rollo de película, envuelta en las partes poco glamorosas pero necesarias: registros de trabajos, informes y una prueba gratuita de 15 días para atraer talleres. La página de entrada es un sitio estático en Next.js; el producto en sí es una SPA Vue/Quasar sobre Hasura y PostgreSQL, respaldada por un par de servicios Node.js. Todo corre en Docker detrás de nginx en un VPS que opero yo mismo — migrado desde AWS — que es parte de cómo mantengo a raya el costo de un producto de una sola persona.",
      },
      tradeoffs: {
        heading: "Compromisos",
        body: "Prioridad a la web — una aplicación alojada, para que los talleres la usen desde cualquier navegador, sin instalar nada. Al operarla solo, mantengo el alcance acotado — una funcionalidad solo se publica si justifica su mantenimiento. La prueba gratuita de 15 días es la forma honesta de demostrar el plan de corte antes de pedir dinero: una apuesta a que el problema es real, no a un embudo de ventas.",
      },
      result: {
        heading: "Resultado",
        body: "CorteFilme está en producción: cortefilme.com.br, con el producto en sistema.cortefilme.com.br y la prueba de 15 días activa. No publicaré ingresos ni cantidad de clientes — nada de eso es público, y no lo inventaré. Lo que puedo afirmar es lo sencillo: el producto funciona, y yo todavía lo opero.",
      },
      learned: {
        heading: "Qué aprendí",
        body: "Ser el único propietario impone una presión: alcance, soporte y entrega responden a una sola persona. Aprendí que un problema que se puede decir en una frase — 'cortar película con menos desperdicio' — basta para construir un producto real a partir de él, y que mantener vivo un producto de una sola persona supera añadirle funcionalidades.",
      },
    },
  },
  ui: {
    about: "Sobre mí",
    selectedWork: "Trabajo seleccionado",
    experience: "Experiencia",
    openSource: "Código abierto",
    contact: "Contacto",
    backToHome: "Volver al inicio",
    languageLabel: "Idioma",
    notFoundTitle: "Página no encontrada",
    notFoundBody:
      "Esa página no existe — puede que se haya movido o que el enlace sea incorrecto.",
    skipToContent: "Saltar al contenido",
  },
  meta: {
    home: {
      title: "Edson Boldrini — Ingeniero de software",
      description:
        "Ingeniero de software full-stack en Vitória, Brasil. TypeScript, Node, React y Flutter. Actualmente en Superset; creador de CorteFilme.",
    },
    caseStudy: {
      title: "CorteFilme",
      description:
        "Cómo construí CorteFilme, un SaaS que reduce el desperdicio de película para ventanas para instaladores brasileños.",
    },
  },
};
