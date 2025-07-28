/**
 * ANIMACIONES AVANZADAS DEL CV - JANOVER GONZALO SALDAÑA VELA
 * ===========================================================
 * 
 * Descripción: Sistema de animaciones avanzadas y efectos visuales para el CV
 * Autor: Janover Gonzalo Saldaña Vela
 * Fecha: Julio 2025
 * 
 * Funcionalidades implementadas:
 * - Sistema de partículas animadas en canvas para el fondo
 * - Animaciones de texto con efectos de escritura (typing effect)
 * - Efectos de hover personalizados con transiciones CSS avanzadas
 * - Transiciones de página suaves con manejo de estados
 * - Cursor personalizado que responde al movimiento del mouse
 * - Animaciones de scroll con parallax y fade-in effects
 * - Respeto por preferencias de accesibilidad (prefers-reduced-motion)
 * - Optimización de rendimiento con RequestAnimationFrame
 */

'use strict';

/**
 * Clase para manejar animaciones avanzadas y efectos visuales
 * Implementa un sistema modular de animaciones con optimizaciones de rendimiento
 * Respeta las preferencias de accesibilidad del usuario
 */
class CVAnimations {
    /**
     * Constructor - Inicializa el sistema de animaciones
     */
    constructor() {
        // ========================================
        // DETECCIÓN DE PREFERENCIAS DE ACCESIBILIDAD
        // ========================================
        // Respeta la configuración "prefers-reduced-motion" para usuarios con sensibilidad al movimiento
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // ========================================
        // ESTADO DEL SISTEMA DE ANIMACIONES
        // ========================================
        this.particles = [];           // Array de partículas para el sistema de fondo
        this.mouse = { x: 0, y: 0 };  // Posición actual del cursor para efectos interactivos
        
        // Inicializa todos los sistemas de animación
        this.init();
    }

    /**
     * Inicializa todas las animaciones según las preferencias del usuario
     * Si está habilitado "reduced motion", solo activa animaciones esenciales
     */
    init() {
        // Verificación de accesibilidad - respeta preferencias del usuario
        if (this.isReducedMotion) {
            console.log('🔇 Reduced motion detected - skipping advanced animations');
            // Solo activa animaciones esenciales para navegación
            this.setupEssentialAnimations();
            return;
        }

        // ========================================
        // INICIALIZACIÓN DE SISTEMAS DE ANIMACIÓN
        // ========================================
        console.log('🎨 Initializing advanced animation systems...');
        
        this.setupParticleSystem();      // Sistema de partículas de fondo
        this.setupTextAnimations();      // Efectos de texto dinámicos
        this.setupHoverEffects();        // Efectos de hover personalizados
        this.setupCursorEffects();       // Cursor personalizado e interactivo
        this.setupScrollAnimations();    // Animaciones basadas en scroll
        this.setupTypingEffect();        // Efecto de máquina de escribir
    }

    /**
     * Configura el sistema de partículas de fondo usando Canvas API
     * Crea efectos visuales sutiles que no interfieren con la legibilidad
     */
    setupParticleSystem() {
        // Crear elemento canvas para las partículas
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(canvas);
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.resizeCanvas();
        this.createParticles();
        this.animateParticles();
        
        // Escuchar eventos de mouse
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Redimensionar canvas
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Redimensiona el canvas
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Crea partículas para el fondo
     */
    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }

    /**
     * Anima las partículas
     */
    animateParticles() {
        if (this.isReducedMotion) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Actualizar posición
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Efecto de atracción hacia el mouse
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.0001;
                particle.vy += dy * force * 0.0001;
            }
            
            // Limitar velocidad
            const maxSpeed = 2;
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }
            
            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Conectar partículas cercanas
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${(80 - distance) / 80 * 0.2})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    /**
     * Configura animaciones de texto avanzadas
     */
    setupTextAnimations() {
        // Efecto de escritura para el nombre
        const nameElement = document.querySelector('.profile-details .name');
        if (nameElement) {
            this.typeWriter(nameElement, nameElement.textContent, 100);
        }

        // Efecto de fade-in escalonado para elementos de contacto
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 500 + (index * 150));
        });
    }

    /**
     * Efecto de máquina de escribir
     */
    typeWriter(element, text, speed = 100) {
        if (this.isReducedMotion) {
            element.textContent = text;
            return;
        }
        
        element.textContent = '';
        let i = 0;
        
        const typing = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.classList.add('typing-complete');
            }
        };
        
        // Esperar un poco antes de empezar
        setTimeout(typing, 1000);
    }

    /**
     * Configura efectos de hover personalizados
     */
    setupHoverEffects() {
        // Efecto de brillo en tarjetas
        const cards = document.querySelectorAll(
            '.timeline-content, .education-item, .certification-item, ' +
            '.info-card, .stat-item, .soft-skill-item'
        );

        cards.forEach(card => {
            this.addShineEffect(card);
            this.addTiltEffect(card);
        });

        // Efecto especial en botones
        const buttons = document.querySelectorAll('.btn-download');
        buttons.forEach(button => {
            this.addRippleEffect(button);
        });
    }

    /**
     * Añade efecto de brillo a las tarjetas
     */
    addShineEffect(element) {
        element.addEventListener('mouseenter', () => {
            if (this.isReducedMotion) return;
            
            const shine = document.createElement('div');
            shine.className = 'shine-effect';
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 215, 0, 0.2),
                    transparent
                );
                transition: left 0.6s ease-in-out;
                pointer-events: none;
                z-index: 2;
            `;
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(shine);
            
            setTimeout(() => {
                shine.style.left = '100%';
            }, 50);
            
            setTimeout(() => {
                element.removeChild(shine);
            }, 650);
        });
    }

    /**
     * Añade efecto de inclinación 3D
     */
    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            if (this.isReducedMotion) return;
            
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    /**
     * Añade efecto ripple a los botones
     */
    addRippleEffect(button) {
        button.addEventListener('click', (e) => {
            if (this.isReducedMotion) return;
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                button.removeChild(ripple);
            }, 600);
        });
    }

    /**
     * Configura efectos de cursor personalizado
     */
    setupCursorEffects() {
        if (window.innerWidth <= 768) return; // No en móviles
        
        // Crear cursor personalizado
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);
        
        // Seguir el mouse
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });
        
        // Efectos en elementos interactivos
        const interactiveElements = document.querySelectorAll(
            'a, button, .nav-link, .contact-item, .timeline-content, ' +
            '.stat-item, .skill-item, .certification-item'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
        
        // Ocultar cursor por defecto
        document.body.style.cursor = 'none';
    }

    /**
     * Configura animaciones de scroll
     */
    setupScrollAnimations() {
        // Parallax para elementos de fondo
        const parallaxElements = document.querySelectorAll('.section-header');
        
        window.addEventListener('scroll', () => {
            if (this.isReducedMotion) return;
            
            const scrollY = window.scrollY;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    /**
     * Configura efecto de typing para descripciones
     */
    setupTypingEffect() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    this.typeText(entry.target);
                    entry.target.classList.add('typed');
                }
            });
        }, observerOptions);

        // Observar párrafos de descripción
        const descriptions = document.querySelectorAll(
            '.profile-description p, .job-description li, .cert-description, .info-description p'
        );
        
        descriptions.forEach(desc => {
            if (desc.textContent.length < 200) { // Solo textos cortos
                observer.observe(desc);
            }
        });
    }

    /**
     * Efecto de typing para texto
     */
    typeText(element) {
        if (this.isReducedMotion) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-accent)';
        
        let i = 0;
        const speed = 30;
        
        const typing = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        typing();
    }

    /**
     * Destructor para limpiar recursos
     */
    destroy() {
        if (this.canvas) {
            document.body.removeChild(this.canvas);
        }
        
        const customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            document.body.removeChild(customCursor);
            document.body.style.cursor = '';
        }
    }
}

/**
 * CSS adicional para animaciones
 */
const additionalCSS = `
    /* Animaciones adicionales */
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    .typing-complete {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.8;
        }
    }

    /* Mejoras visuales */
    .timeline-content:hover {
        box-shadow: 0 20px 40px var(--color-shadow) !important;
    }

    .stat-item:hover .stat-number {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }

    .skill-item:hover .skill-progress {
        background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover), var(--color-accent));
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }

    /* Efectos de hover para certificaciones */
    .certification-item:hover .cert-icon {
        transform: rotateY(360deg);
        transition: transform 0.6s ease;
    }

    /* Efectos para información adicional */
    .info-card:hover .info-icon {
        animation: bounce 1s infinite;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    /* Transiciones suaves para cambios de sección */
    .section {
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .section.active {
        animation: sectionFadeIn 0.8s ease-out;
    }

    @keyframes sectionFadeIn {
        0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    /* Mejoras para accesibilidad en animaciones */
    @media (prefers-reduced-motion: reduce) {
        .custom-cursor {
            display: none !important;
        }
        
        #particles-canvas {
            display: none !important;
        }
        
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inyectar CSS adicional
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

/**
 * Inicializar animaciones cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Pequeño delay para asegurar que otros scripts se hayan cargado
    setTimeout(() => {
        window.CVAnimations = new CVAnimations();
        console.log('Advanced animations initialized');
    }, 500);
});

/**
 * Limpiar recursos al cerrar la página
 */
window.addEventListener('beforeunload', () => {
    if (window.CVAnimations) {
        window.CVAnimations.destroy();
    }
});
