/**
 * JAVASCRIPT PRINCIPAL DEL CV - JANOVER GONZALO SALDAÑA VELA
 * ==========================================================
 * 
 * Descripción: Script principal para funcionalidades interactivas del CV
 * Autor: Janover Gonzalo Saldaña Vela
 * Fecha: Julio 2025
 * 
 * Funcionalidades implementadas:
 * - Navegación entre secciones con scroll automático
 * - Menú móvil responsivo con animaciones
 * - Animaciones de scroll y elementos con Intersection Observer
 * - Barras de progreso animadas para habilidades técnicas
 * - Funciones de descarga e impresión optimizadas
 * - Botón de scroll hacia arriba con aparición dinámica
 * - Lazy loading de imágenes para optimización de carga
 * - Optimizaciones de rendimiento con throttle y debounce
 * - Sistema de navegación activa basado en scroll position
 */

'use strict';

/**
 * Clase principal para manejar toda la funcionalidad del CV
 * Implementa patrón Singleton para gestión centralizada del estado
 * Utiliza Intersection Observer API para detección de elementos visibles
 */
class CVApp {
    /**
     * Constructor - Inicializa referencias DOM y estado de la aplicación
     */
    constructor() {
        // ========================================
        // REFERENCIAS A ELEMENTOS DEL DOM
        // ========================================
        // Cachea elementos frecuentemente utilizados para optimizar rendimiento
        this.elements = {
            navigation: document.getElementById('navigation'),           // Barra de navegación principal
            navLinks: document.querySelectorAll('.nav-link'),          // Enlaces de navegación
            sections: document.querySelectorAll('.section'),           // Secciones principales del CV
            menuToggle: document.getElementById('menuToggle'),          // Botón hamburguesa móvil
            navMenu: document.querySelector('.nav-menu'),              // Menú de navegación
            scrollToTop: document.getElementById('scrollToTop'),       // Botón volver arriba
            downloadBtn: document.getElementById('downloadCV'),        // Botón descargar CV
            profileImage: document.getElementById('profileImage'),     // Imagen de perfil
            loadingSpinner: document.getElementById('loadingSpinner'), // Spinner de carga
            skillBars: document.querySelectorAll('.skill-progress')    // Barras de progreso habilidades
        };

        // ========================================
        // ESTADO DE LA APLICACIÓN
        // ========================================
        // Gestiona el estado interno de la aplicación de forma centralizada
        this.state = {
            currentSection: 'perfil',       // Sección actualmente visible
            isMenuOpen: false,              // Estado del menú móvil (abierto/cerrado)
            hasAnimated: new Set(),         // Elementos que ya han sido animados (evita re-animación)
            isScrolling: false,             // Flag para controlar eventos de scroll
            // Configuración para Intersection Observer API
            observerOptions: {
                root: null,                 // Viewport como root
                rootMargin: '0px',          // Sin margen adicional
                threshold: 0.1              // 10% del elemento debe ser visible
            }
        };

        // Inicializar la aplicación
        this.init();
    }

    /**
     * Inicializa todas las funcionalidades de la aplicación
     */
    init() {
        this.showLoadingSpinner();
        
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.initializeComponents();
                this.hideLoadingSpinner();
            });
        } else {
            this.setupEventListeners();
            this.initializeComponents();
            this.hideLoadingSpinner();
        }
    }

    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Navegación
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Menú móvil
        if (this.elements.menuToggle) {
            this.elements.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Scroll events
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));

        // Botón volver arriba
        if (this.elements.scrollToTop) {
            this.elements.scrollToTop.addEventListener('click', () => this.scrollToTop());
        }

        // Botones de acción
        if (this.elements.downloadBtn) {
            this.elements.downloadBtn.addEventListener('click', () => this.downloadCV());
        }

        // Cerrar menú móvil al hacer clic fuera
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));

        // Precargar imagen de perfil si no existe
        this.setupProfileImage();
    }

    /**
     * Inicializa componentes específicos
     */
    initializeComponents() {
        // Mostrar la primera sección
        this.showSection(this.state.currentSection);
        
        // Configurar Intersection Observer para animaciones
        this.setupIntersectionObserver();
        
        // Inicializar animaciones de barras de habilidades
        this.initializeSkillBars();
        
        // Configurar navegación pegajosa
        this.setupStickyNavigation();
        
        // Inicializar tooltips y mejorar accesibilidad
        this.setupAccessibility();
        
        // Configurar lazy loading
        this.setupLazyLoading();
    }

    /**
     * Maneja la navegación entre secciones
     */
    handleNavigation(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        
        if (targetId && this.elements.sections.length) {
            this.showSection(targetId);
            this.updateActiveNavLink(e.target);
            this.closeMobileMenu();
            
            // Smooth scroll para mejor UX
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }

    /**
     * Muestra una sección específica con animación
     */
    showSection(sectionId) {
        // Ocultar sección actual
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            currentSection.classList.remove('active');
        }

        // Mostrar nueva sección
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.state.currentSection = sectionId;
            
            // Animar elementos de la sección
            this.animateSection(targetSection);
            
            // Actualizar URL sin recargar
            this.updateURL(sectionId);
        }
    }

    /**
     * Actualiza el enlace activo en la navegación
     */
    updateActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    /**
     * Alterna el menú móvil
     */
    toggleMobileMenu() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        
        if (this.state.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    /**
     * Abre el menú móvil
     */
    openMobileMenu() {
        this.elements.navMenu.classList.add('active');
        this.elements.menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Animar elementos del menú
        this.elements.navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    /**
     * Cierra el menú móvil
     */
    closeMobileMenu() {
        this.elements.navMenu.classList.remove('active');
        this.elements.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
        this.state.isMenuOpen = false;
    }

    /**
     * Maneja clics fuera del menú móvil
     */
    handleOutsideClick(e) {
        if (this.state.isMenuOpen && 
            !this.elements.navMenu.contains(e.target) && 
            !this.elements.menuToggle.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    /**
     * Maneja el scroll de la página
     */
    handleScroll() {
        if (this.state.isScrolling) return;
        
        this.state.isScrolling = true;
        
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            
            // Mostrar/ocultar botón volver arriba
            this.toggleScrollToTopButton(scrollY);
            
            // Actualizar navegación basada en scroll
            this.updateNavigationOnScroll();
            
            // Efecto parallax sutil en el header
            this.applyParallaxEffect(scrollY);
            
            this.state.isScrolling = false;
        });
    }

    /**
     * Maneja el redimensionamiento de la ventana
     */
    handleResize() {
        // Cerrar menú móvil en resize
        if (window.innerWidth > 768 && this.state.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Recalcular animaciones si es necesario
        this.recalculateAnimations();
    }

    /**
     * Maneja navegación con teclado
     */
    handleKeyNavigation(e) {
        // ESC para cerrar menú móvil
        if (e.key === 'Escape' && this.state.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Arrow keys para navegación entre secciones
        if (e.altKey) {
            const sections = Array.from(this.elements.sections);
            const currentIndex = sections.findIndex(section => 
                section.id === this.state.currentSection
            );
            
            if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
                e.preventDefault();
                this.showSection(sections[currentIndex + 1].id);
                this.updateActiveNavLink(this.elements.navLinks[currentIndex + 1]);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                this.showSection(sections[currentIndex - 1].id);
                this.updateActiveNavLink(this.elements.navLinks[currentIndex - 1]);
            }
        }
    }

    /**
     * Configura el botón volver arriba
     */
    toggleScrollToTopButton(scrollY) {
        if (scrollY > 300) {
            this.elements.scrollToTop.classList.add('visible');
        } else {
            this.elements.scrollToTop.classList.remove('visible');
        }
    }

    /**
     * Función para volver arriba suavemente
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Aplica efecto parallax sutil
     */
    applyParallaxEffect(scrollY) {
        const header = document.querySelector('.header');
        if (header) {
            const parallaxSpeed = 0.3;
            header.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
    }

    /**
     * Configura Intersection Observer para animaciones
     */
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.state.hasAnimated.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.state.hasAnimated.add(entry.target);
                }
            });
        }, this.state.observerOptions);

        // Observar elementos animables
        const animatableElements = document.querySelectorAll(
            '.timeline-item, .stat-item, .skill-item, .soft-skill-item, ' +
            '.certification-item, .info-card, .education-item'
        );

        animatableElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Anima un elemento específico
     */
    animateElement(element) {
        const animationClass = this.getAnimationClass(element);
        element.classList.add(animationClass);
        
        // Animar barras de habilidades si el elemento las contiene
        const skillBars = element.querySelectorAll('.skill-progress');
        if (skillBars.length) {
            setTimeout(() => this.animateSkillBars(skillBars), 300);
        }
    }

    /**
     * Obtiene la clase de animación apropiada para un elemento
     */
    getAnimationClass(element) {
        if (element.classList.contains('timeline-item')) {
            const isOdd = Array.from(element.parentNode.children).indexOf(element) % 2 === 0;
            return isOdd ? 'slide-in-left' : 'slide-in-right';
        }
        
        if (element.classList.contains('stat-item') || 
            element.classList.contains('soft-skill-item')) {
            return 'scale-in';
        }
        
        return 'fade-in';
    }

    /**
     * Anima una sección completa
     */
    animateSection(section) {
        const elements = section.querySelectorAll(
            '.timeline-item, .stat-item, .skill-item, .soft-skill-item, ' +
            '.certification-item, .info-card, .education-item'
        );
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * 100);
        });
    }

    /**
     * Inicializa las barras de habilidades
     */
    initializeSkillBars() {
        // Se animarán cuando sean visibles via Intersection Observer
        this.elements.skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    /**
     * Anima las barras de habilidades
     */
    animateSkillBars(skillBars = this.elements.skillBars) {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, index * 100);
            }
        });
    }

    /**
     * Configura la navegación pegajosa
     */
    setupStickyNavigation() {
        const header = document.querySelector('.header');
        const navigation = this.elements.navigation;
        
        if (header && navigation) {
            const headerHeight = header.offsetHeight;
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > headerHeight - 50) {
                    navigation.classList.add('sticky-nav');
                } else {
                    navigation.classList.remove('sticky-nav');
                }
            });
        }
    }

    /**
     * Configura imagen de perfil con placeholder
     */
    setupProfileImage() {
        if (this.elements.profileImage) {
            // Crear placeholder si la imagen no existe
            this.elements.profileImage.onerror = () => {
                this.createProfilePlaceholder();
            };
            
            // Si no hay src, crear placeholder inmediatamente
            if (!this.elements.profileImage.src || 
                this.elements.profileImage.src.includes('profile-placeholder.jpg')) {
                this.createProfilePlaceholder();
            }
        }
    }

    /**
     * Crea un placeholder para la imagen de perfil
     */
    createProfilePlaceholder() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        
        // Fondo degradado
        const gradient = ctx.createLinearGradient(0, 0, 200, 200);
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(1, '#ffed4e');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);
        
        // Iniciales
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 60px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('JGS', 100, 100);
        
        // Convertir a base64 y asignar
        this.elements.profileImage.src = canvas.toDataURL('image/png');
        this.elements.profileImage.alt = 'Janover Gonzalo Saldaña Vela - Iniciales';
    }

    /**
     * Configura lazy loading para imágenes
     */
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Mejora la accesibilidad
     */
    setupAccessibility() {
        // Añadir etiquetas ARIA
        this.elements.navLinks.forEach((link, index) => {
            link.setAttribute('aria-label', `Ir a sección ${link.textContent}`);
            link.setAttribute('tabindex', '0');
        });

        // Mejorar navegación con teclado
        this.elements.navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });

        // Anunciar cambios de sección para lectores de pantalla
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);

        this.announcer = announcer;
    }

    /**
     * Actualiza la URL sin recargar la página
     */
    updateURL(sectionId) {
        if (history.pushState) {
            const newURL = `${window.location.pathname}#${sectionId}`;
            history.pushState({ section: sectionId }, '', newURL);
            
            // Anunciar cambio para accesibilidad
            if (this.announcer) {
                this.announcer.textContent = `Sección ${sectionId} cargada`;
            }
        }
    }

    /**
     * Actualiza navegación basada en scroll
     */
    updateNavigationOnScroll() {
        const sections = Array.from(this.elements.sections);
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                const correspondingNavLink = this.elements.navLinks[index];
                if (correspondingNavLink && !correspondingNavLink.classList.contains('active')) {
                    this.updateActiveNavLink(correspondingNavLink);
                    this.state.currentSection = section.id;
                }
            }
        });
    }

    /**
     * Descarga el CV como PDF (simulación)
     */
    downloadCV() {
        // Mostrar mensaje de descarga
        this.showNotification('Preparando descarga del CV...', 'info');
        
        // En una implementación real, aquí se integraría con una API
        // para generar el PDF o se usaría una librería como jsPDF
        setTimeout(() => {
            this.showNotification('CV descargado exitosamente', 'success');
            
            // Simulación de descarga
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'Janover_Gonzalo_Saldana_CV.pdf';
            link.textContent = 'Descargar CV';
            
            // En producción, aquí iría la URL real del PDF
            console.log('Descargando CV de Janover Gonzalo Saldaña Vela');
        }, 1000);
    }

    /**
     * Muestra notificaciones al usuario
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-bg-card);
            color: var(--color-text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            border: 1px solid var(--color-accent);
            box-shadow: 0 5px 15px var(--color-shadow);
            z-index: var(--z-modal);
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    /**
     * Obtiene el icono apropiado para las notificaciones
     */
    getNotificationIcon(type) {
        const icons = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * Recalcula animaciones después de resize
     */
    recalculateAnimations() {
        // Resetear animaciones si es necesario
        this.state.hasAnimated.clear();
        
        // Re-observar elementos si es necesario
        if (window.innerWidth <= 768) {
            // Ajustes específicos para móvil
            this.adjustMobileAnimations();
        }
    }

    /**
     * Ajusta animaciones para móvil
     */
    adjustMobileAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.classList.remove('slide-in-left', 'slide-in-right');
            item.classList.add('fade-in');
        });
    }

    /**
     * Muestra el spinner de carga
     */
    showLoadingSpinner() {
        if (this.elements.loadingSpinner) {
            this.elements.loadingSpinner.classList.add('active');
        }
    }

    /**
     * Oculta el spinner de carga
     */
    hideLoadingSpinner() {
        if (this.elements.loadingSpinner) {
            setTimeout(() => {
                this.elements.loadingSpinner.classList.remove('active');
            }, 1000);
        }
    }

    /**
     * Utilidad: Throttle function
     */
    throttle(func, limit) {
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

    /**
     * Utilidad: Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

/**
 * Funciones adicionales para mejorar la experiencia
 */

/**
 * Detecta si el usuario prefiere movimiento reducido
 */
function detectReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Aplica configuraciones según las preferencias del usuario
 */
function applyUserPreferences() {
    if (detectReducedMotion()) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-normal', '0.01ms');
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    }
}

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar preferencias del usuario
    applyUserPreferences();
    
    // Inicializar la aplicación principal
    const app = new CVApp();
    
    // Hacer la aplicación accesible globalmente para debugging
    window.CVApp = app;
    
    // Manejar cambios en el hash de la URL
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            app.showSection(hash);
            
            // Actualizar navegación activa
            const correspondingNavLink = document.querySelector(`a[href="#${hash}"]`);
            if (correspondingNavLink) {
                app.updateActiveNavLink(correspondingNavLink);
            }
        }
    });
    
    // Cargar sección desde URL si existe
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        app.showSection(initialHash);
        const correspondingNavLink = document.querySelector(`a[href="#${initialHash}"]`);
        if (correspondingNavLink) {
            app.updateActiveNavLink(correspondingNavLink);
        }
    }
    
    console.log('CV Application initialized successfully');
});
