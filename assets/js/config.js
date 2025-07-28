/**
 * CONFIGURACIÓN DEL SITIO WEB - JANOVER GONZALO SALDAÑA VELA
 * ==========================================================
 * 
 * Descripción: Archivo de configuración centralizada para el CV web
 * Autor: Janover Gonzalo Saldaña Vela
 * Fecha: Julio 2025
 * 
 * Este archivo contiene configuraciones globales, constantes y datos
 * estructurados que pueden ser utilizados por toda la aplicación.
 */

'use strict';

/**
 * Configuración global del sitio
 */
window.CVConfig = {
    // Información personal
    personal: {
        fullName: 'Janover Gonzalo Saldaña Vela',
        title: 'Ingeniero de Software',
        subtitle: 'Especialista en Desarrollo Web y Móvil',
        location: 'Chorrillos, Lima - Perú',
        email: 'janover.gonza.sal@gmail.com',
        phone: '+51 992 016 075',
        age: '23 años',
        currentCycle: '8° Ciclo',
        university: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
        scholarship: 'Becario Beca 18 (PRONABEC)'
    },

    // ========================================
    // CONFIGURACIÓN DE ANIMACIONES
    // ========================================
    // Controla el comportamiento de efectos visuales y transiciones
    // Permite habilitar/deshabilitar animaciones según el rendimiento del dispositivo
    animations: {
        enableParticles: true,          // Activa sistema de partículas de fondo
        enableAdvancedEffects: true,    // Habilita efectos CSS avanzados (transforms, filters)
        enableTypingEffect: true,       // Activa efecto de escritura para textos dinámicos
        enableHoverEffects: true,       // Habilita animaciones de hover en elementos interactivos
        particleCount: 50,              // Número máximo de partículas simultáneas
        // Velocidades de animación en milisegundos
        animationSpeed: {
            fast: 150,      // Transiciones rápidas (botones, micro-interacciones)
            normal: 300,    // Velocidad estándar (navegación, modales)
            slow: 500       // Animaciones lentas (entrada de secciones, cargas)
        }
    },

    // ========================================
    // CONFIGURACIÓN DE RENDIMIENTO
    // ========================================
    // Optimizaciones para mejorar la experiencia del usuario
    // Controla la carga diferida y límites de recursos
    performance: {
        lazyLoadImages: true,       // Carga diferida de imágenes para mejorar tiempo inicial
        throttleScroll: 16,         // Limita eventos scroll a 60fps (1000ms/60 ≈ 16ms)
        debounceResize: 250,        // Espera 250ms antes de procesar redimensionado
        observerThreshold: 0.1,     // Umbral de visibilidad para Intersection Observer (10%)
        maxParticles: 50            // Límite máximo de partículas para evitar sobrecarga
    },

    // URLs y enlaces
    links: {
        github: 'https://github.com/janover-gonzalo-saldana',
        linkedin: 'https://linkedin.com/in/janover-gonzalo-saldana',
        portfolio: 'https://janover-gonzalo-saldana.github.io',
        cv_pdf: './assets/Janover_Gonzalo_Saldana_CV.pdf'
    },

    // Configuración de secciones
    sections: {
        perfil: {
            id: 'perfil',
            title: 'Perfil Profesional',
            icon: 'fas fa-user',
            order: 1
        },
        experiencia: {
            id: 'experiencia',
            title: 'Experiencia Laboral',
            icon: 'fas fa-briefcase',
            order: 2
        },
        educacion: {
            id: 'educacion',
            title: 'Formación Académica',
            icon: 'fas fa-graduation-cap',
            order: 3
        },
        habilidades: {
            id: 'habilidades',
            title: 'Habilidades',
            icon: 'fas fa-code',
            order: 4
        },
        certificaciones: {
            id: 'certificaciones',
            title: 'Certificaciones',
            icon: 'fas fa-certificate',
            order: 5
        },
        adicional: {
            id: 'adicional',
            title: 'Información Adicional',
            icon: 'fas fa-star',
            order: 6
        }
    },

    // ========================================
    // DATOS DE HABILIDADES TÉCNICAS
    // ========================================
    // Estructura organizada de skills con niveles de competencia (0-100)
    // Se utilizan para generar las barras de progreso en la sección de habilidades
    // Cada categoría agrupa tecnologías relacionadas para mejor visualización
    skills: {
        // Frontend Development - Tecnologías de interfaz de usuario
        frontend: {
            'Angular': 90,        // Framework principal para SPAs
            'Vue.js': 85,         // Framework progresivo para interfaces reactivas
            'JavaScript': 88,     // Lenguaje base para desarrollo web
            'TypeScript': 85,     // Superset tipado de JavaScript
            'HTML/CSS': 92        // Tecnologías fundamentales de markup y estilos
        },
        // Backend Development - Tecnologías del lado servidor
        backend: {
            'C# / ASP.NET': 88,      // Stack principal .NET para APIs y servicios
            'Java / Spring Boot': 82, // Framework empresarial para microservicios
            'SQL': 85                 // Gestión y consultas de bases de datos
        },
        // Mobile Development - Desarrollo de aplicaciones móviles
        mobile: {
            'Flutter': 85,           // Framework multiplataforma de Google
            'Kotlin (Android)': 75   // Desarrollo nativo Android
        },
        // Development Tools - Herramientas de desarrollo y productividad
        tools: {
            'Git / GitHub': 90,   // Control de versiones y colaboración
            'Figma (UI/UX)': 80,  // Diseño de interfaces y prototipado
            'JIRA': 75,           // Gestión ágil de proyectos
            'Docker': 70          // Containerización y despliegue
        }
    },

    // ========================================
    // ESTADÍSTICAS DEL PERFIL PROFESIONAL
    // ========================================
    // Datos numéricos destacados que se muestran como métricas en la sección perfil
    // Cada stat incluye: número, etiqueta descriptiva e ícono representativo
    // Se utilizan para crear un resumen visual rápido de logros y experiencia
    stats: [
        {
            number: '8°',                           // Progreso académico actual
            label: 'Ciclo Académico',               // Descripción del logro
            icon: 'fas fa-graduation-cap'           // Ícono Font Awesome correspondiente
        },
        {
            number: '2+',                           // Tiempo de experiencia práctica
            label: 'Años Experiencia',             // Etiqueta descriptiva
            icon: 'fas fa-clock'                    // Ícono de tiempo/experiencia
        },
        {
            number: '10+',                          // Cantidad de tecnologías dominadas
            label: 'Tecnologías',                  // Descripción de competencias técnicas
            icon: 'fas fa-code'                     // Ícono de programación
        },
        {
            number: '5+',                           // Cantidad de certificaciones obtenidas
            label: 'Certificaciones',              // Logros académicos adicionales
            icon: 'fas fa-certificate'             // Ícono de certificación
        }
    ],

    // Experiencia laboral estructurada
    experience: [
        {
            id: 'exp-1',
            title: 'Desarrollador Frontend',
            company: 'Aplicación Móvil Lizzo',
            type: 'Freelancer',
            period: 'Junio 2025 - Actualidad',
            current: true,
            description: [
                'Responsable del desarrollo de interfaces móviles en <strong>Flutter</strong>, aplicando <em>Clean Architecture</em>',
                'Colaboración en el diseño <strong>UI/UX</strong> con <em>Figma</em>',
                'Trabajo conjunto con el equipo para integrar funcionalidades clave',
                'Proyección hacia tareas de <strong>QA</strong> (Quality Assurance)'
            ],
            technologies: ['Flutter', 'Clean Architecture', 'Figma', 'UI/UX', 'QA']
        },
        {
            id: 'exp-2',
            title: 'Tutor de Programación y Desarrollo de Software',
            company: 'Tutorías Personalizadas',
            type: 'Independiente',
            period: 'Agosto 2023 - Actualidad',
            current: true,
            description: [
                'Tutorías personalizadas a estudiantes universitarios en <strong>C++, C#, JavaScript</strong>',
                'Enseñanza de fundamentos de <strong>desarrollo web</strong>',
                'Asesoría en el desarrollo de aplicaciones web <em>full stack</em> con <strong>Angular, Vue.js y ASP.NET</strong>',
                'Promoción de buenas prácticas de codificación, pruebas y diseño de software'
            ],
            technologies: ['C++', 'C#', 'JavaScript', 'Angular', 'Vue.js', 'ASP.NET']
        }
    ],

    // Certificaciones estructuradas
    certifications: [
        {
            id: 'cert-1',
            title: 'Inteligencia Artificial y Desarrollo de Software',
            institution: 'Universidad de los Andes',
            date: 'Agosto 2025',
            status: 'En Progreso',
            featured: true,
            icon: 'fas fa-robot',
            description: 'Curso avanzado en IA aplicada al desarrollo de software',
            technologies: []
        },
        {
            id: 'cert-2',
            title: 'Software Development with a Unified Process',
            institution: 'UPC Winter School',
            date: 'Julio 2025',
            status: 'Completado',
            featured: false,
            icon: 'fas fa-code-branch',
            description: 'Curso intensivo en desarrollo de aplicaciones web con Java, JSP, Servlets y Java Beans aplicando PUD.',
            technologies: ['Java', 'JSP', 'Servlets']
        },
        {
            id: 'cert-3',
            title: 'Desarrollo de Aplicaciones Móviles',
            institution: 'UPC',
            date: 'Marzo 2025 - Julio 2025',
            status: 'Completado',
            featured: false,
            icon: 'fas fa-mobile-alt',
            description: 'Diseño y desarrollo de aplicaciones móviles nativas con Android y Flutter.',
            technologies: ['Android', 'Flutter', 'APIs']
        },
        {
            id: 'cert-4',
            title: 'Administración de Bases de Datos SQL Server',
            institution: 'CTIC UNI',
            date: 'Enero 2025',
            status: 'Completado',
            featured: false,
            icon: 'fas fa-database',
            description: 'Fundamentos de SQL Server: creación de bases de datos, consultas, manejo de datos y vistas.',
            technologies: ['SQL Server', 'T-SQL', 'Database Design']
        },
        {
            id: 'cert-5',
            title: 'Desarrollo de Aplicaciones Web y Open Source',
            institution: 'UPC',
            date: 'Agosto 2024 - Diciembre 2024',
            status: 'Completado',
            featured: false,
            icon: 'fas fa-globe',
            description: 'Desarrollo full-stack con arquitecturas DDD, despliegue en la nube y metodologías ágiles.',
            technologies: ['Vue.js', 'Angular', 'ASP.NET', 'Spring Boot', 'DDD']
        }
    ],

    // Información adicional estructurada
    additionalInfo: [
        {
            id: 'sport-1',
            title: 'Selección Deportiva de Taekwondo',
            institution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
            period: 'Febrero 2023 - Actualidad',
            type: 'Deporte',
            icon: 'fas fa-fist-raised',
            description: 'Miembro activo de la selección universitaria, aplicando valores de <strong>disciplina, perseverancia y enfoque</strong> que se trasladan al ámbito profesional y fortalecen el compromiso ético.',
            skills: ['Disciplina', 'Liderazgo', 'Perseverancia', 'Trabajo en Equipo']
        },
        {
            id: 'course-1',
            title: 'Capacitación en Primeros Auxilios',
            institution: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
            period: 'Febrero 2024 - Marzo 2024',
            type: 'Capacitación',
            icon: 'fas fa-first-aid',
            description: 'Certificación en técnicas básicas de primeros auxilios y atención de emergencias, demostrando compromiso con la <strong>responsabilidad social</strong> y el <strong>bienestar comunitario</strong>.',
            skills: ['Responsabilidad Social', 'Atención de Emergencias', 'Compromiso Comunitario']
        }
    ],

    // Configuración de notificaciones
    notifications: {
        duration: 3000,
        position: 'top-right',
        types: {
            info: {
                icon: 'fas fa-info-circle',
                color: '#17a2b8'
            },
            success: {
                icon: 'fas fa-check-circle',
                color: '#28a745'
            },
            warning: {
                icon: 'fas fa-exclamation-triangle',
                color: '#ffc107'
            },
            error: {
                icon: 'fas fa-times-circle',
                color: '#dc3545'
            }
        }
    },

    // ========================================
    // CONFIGURACIÓN DE TEMA Y DISEÑO
    // ========================================
    // Define la paleta de colores, tipografías y espaciados del sitio
    // Centraliza el sistema de diseño para mantener consistencia visual
    theme: {
        // Paleta de colores principal - Tema elegante negro y dorado
        primaryColors: {
            black: '#000000',           // Color principal - Negro puro para fondos y texto
            blackSecondary: '#1a1a1a',  // Negro secundario - Para variaciones y contrastes
            gold: '#ffd700',            // Dorado principal - Para acentos y elementos destacados
            goldHover: '#ffed4e'        // Dorado hover - Para efectos de interacción
        },
        // Sistema tipográfico - Configuración de fuentes y tamaños
        fonts: {
            // Familia tipográfica principal con fallbacks del sistema
            primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            // Escala de tamaños tipográficos - Basada en sistema modular
            sizes: {
                xs: '0.75rem',      // 12px - Texto muy pequeño (notas, metadatos)
                sm: '0.875rem',     // 14px - Texto pequeño (labels, botones pequeños)
                base: '1rem',       // 16px - Texto base del sitio
                lg: '1.125rem',     // 18px - Texto destacado (subtítulos)
                xl: '1.25rem',      // 20px - Títulos de sección pequeños
                '2xl': '1.5rem',    // 24px - Títulos medianos
                '3xl': '1.875rem',  // 30px - Títulos grandes
                '4xl': '2.25rem'    // 36px - Títulos principales/hero
            }
        },
        // Sistema de espaciado - Basado en múltiplos de 0.25rem (4px)
        spacing: {
            xs: '0.25rem',      // 4px - Espaciado mínimo
            sm: '0.5rem',       // 8px - Espaciado pequeño
            md: '1rem',         // 16px - Espaciado estándar
            lg: '1.5rem',       // 24px - Espaciado grande
            xl: '2rem',         // 32px - Espaciado extra grande
            '2xl': '3rem',      // 48px - Espaciado para secciones
            '3xl': '4rem'       // 64px - Espaciado máximo
        },
        // Breakpoints para diseño responsivo - Mobile first approach
        breakpoints: {
            mobile: 768,        // Hasta 768px - Dispositivos móviles
            tablet: 1024,       // 768px - 1024px - Tablets
            desktop: 1200       // 1024px+ - Escritorio y pantallas grandes
        }
    },

    // Configuración de analytics (para futuro uso)
    analytics: {
        googleAnalytics: {
            enabled: false,
            trackingId: 'GA_TRACKING_ID'
        },
        hotjar: {
            enabled: false,
            siteId: 'HOTJAR_SITE_ID'
        }
    },

    // Configuración de SEO
    seo: {
        title: 'Janover Gonzalo Saldaña Vela - Ingeniero de Software',
        description: 'CV de Janover Gonzalo Saldaña Vela, estudiante de 8° ciclo de Ingeniería de Software especializado en desarrollo web y móvil',
        keywords: [
            'Ingeniero de Software',
            'Desarrollador Frontend',
            'Desarrollador Backend',
            'Angular',
            'Vue.js',
            'Flutter',
            'ASP.NET',
            'JavaScript',
            'TypeScript',
            'Lima',
            'Perú',
            'UPC'
        ],
        ogImage: './assets/og-image.jpg',
        twitterHandle: '@janover_dev'
    },

    // ========================================
    // CONFIGURACIÓN DE FUNCIONALIDADES
    // ========================================
    // Controla qué características están habilitadas en el sitio
    // Permite activar/desactivar módulos según necesidades
    features: {
        downloadCV: true,       // Habilita botón de descarga del CV en PDF
        darkMode: false,        // Modo oscuro (funcionalidad futura)
        multiLanguage: false,   // Soporte multiidioma (funcionalidad futura)
        contactForm: false,     // Formulario de contacto (funcionalidad futura)
        blog: false            // Sección de blog/artículos (funcionalidad futura)
    }
};

// ========================================
// UTILIDADES GLOBALES DEL SITIO
// ========================================
/**
 * Colección de funciones utilitarias reutilizables
 * Provee herramientas comunes para manipulación de datos, validaciones y UX
 * Todas las funciones están disponibles globalmente como window.CVUtils
 */
window.CVUtils = {
    // ========================================
    // UTILIDADES DE FORMATEO Y FECHA
    // ========================================
    /**
     * Formatea una fecha al español con formato legible
     * @param {string} dateString - Fecha en formato ISO o parseable
     * @returns {string} Fecha formateada en español (ej: "julio 2025")
     */
    formatDate: (dateString) => {
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const date = new Date(dateString);
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    // ========================================
    // UTILIDADES DE GENERACIÓN Y VALIDACIÓN
    // ========================================
    /**
     * Genera un identificador único alfanumérico
     * @returns {string} ID único de 9 caracteres precedido por guión bajo
     */
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Valida formato de dirección de email usando expresión regular
     * @param {string} email - Dirección de email a validar
     * @returns {boolean} true si el email es válido, false en caso contrario
     */
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // ========================================
    // UTILIDADES DE DETECCIÓN DE DISPOSITIVO
    // ========================================
    /**
     * Detecta el tipo de dispositivo basado en el ancho de pantalla
     * @returns {string} 'mobile', 'tablet' o 'desktop'
     */
    getDeviceType: () => {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';      // Hasta 768px = móvil
        if (width <= 1024) return 'tablet';     // 768px-1024px = tablet
        return 'desktop';                       // 1024px+ = escritorio
    },

    /**
     * Detecta si el dispositivo soporta touch/táctil
     * @returns {boolean} true si es dispositivo táctil
     */
    isTouchDevice: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // ========================================
    // UTILIDADES DE NAVEGACIÓN Y UX
    // ========================================
    /**
     * Implementa scroll suave hacia un elemento específico
     * @param {HTMLElement} element - Elemento DOM de destino
     * @param {number} offset - Desplazamiento en píxeles (default: 0)
     */
    smoothScrollTo: (element, offset = 0) => {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'                  // Scroll animado nativo del navegador
        });
    },

    // ========================================
    // UTILIDADES DE SEGURIDAD Y FORMATO
    // ========================================
    /**
     * Escapa caracteres HTML para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} Texto con caracteres HTML escapados
     */
    escapeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Formatea número telefónico peruano con espacios
     * @param {string} phone - Número telefónico
     * @returns {string} Número formateado (+51 XXX XXX XXX)
     */
    formatPhone: (phone) => {
        return phone.replace(/(\+51)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    },

    // ========================================
    // UTILIDADES DE CARGA DINÁMICA
    // ========================================
    /**
     * Carga un script JavaScript de forma asíncrona
     * @param {string} src - URL del script a cargar
     * @returns {Promise} Promise que resuelve cuando el script se carga exitosamente
     */
    loadScript: (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;        // Éxito en la carga
            script.onerror = reject;        // Error en la carga
            document.head.appendChild(script);
        });
    },

    // ========================================
    // UTILIDADES DE CONTROL DE FLUJO
    // ========================================
    /**
     * Implementa debounce para limitar ejecución de funciones
     * Útil para eventos que se disparan frecuentemente (scroll, resize, input)
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en milisegundos
     * @returns {Function} Función debounced
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Implementa throttle para controlar frecuencia de ejecución
     * Garantiza que la función se ejecute máximo una vez por período
     * @param {Function} func - Función a ejecutar
     * @param {number} limit - Límite de tiempo en milisegundos
     * @returns {Function} Función throttled
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ========================================
// INICIALIZACIÓN Y EXPOSICIÓN GLOBAL
// ========================================

// Confirma que la configuración se cargó correctamente
console.log('CV Configuration loaded successfully');

// ========================================
// CONFIGURACIÓN DE DESARROLLO
// ========================================
// En entorno de desarrollo (localhost), expone objetos de configuración
// para facilitar debugging y testing en la consola del navegador
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debug = {
        config: window.CVConfig,    // Acceso a configuración: window.debug.config
        utils: window.CVUtils       // Acceso a utilidades: window.debug.utils
    };
    console.log('🔧 Debug mode enabled. Access config via window.debug');
}
