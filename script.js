/**
 * ============================================
 * PORTFÓLIO FERNANDO GUSTAVO
 * Script principal com animações e interatividade
 * ============================================
 */

// ============================================
// CONFIGURAÇÕES E CONSTANTES
// ============================================

const TYPEWRITER_TEXTS = [
    'Desenvolvedor Full Stack',
    'QA | Testes de Software',
    'Apaixonado por Tecnologia'
];

const TYPEWRITER_SPEED = 50; // ms por caractere
const TYPEWRITER_DELETE_SPEED = 50; // ms por caractere ao deletar
const TYPEWRITER_PAUSE = 1000; // ms pausa entre textos

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
    initCurrentYear();
});

// ============================================
// TYPEWRITER EFFECT
// ============================================

/**
 * Efeito typewriter no hero section
 * Cria animação de digitação para os títulos
 */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const fullText = TYPEWRITER_TEXTS[currentTextIndex];

        if (isDeleting) {
            // Deletando caracteres
            currentText = fullText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typewriterElement.textContent = currentText;

            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % TYPEWRITER_TEXTS.length;
                setTimeout(type, TYPEWRITER_PAUSE);
                return;
            }

            setTimeout(type, TYPEWRITER_DELETE_SPEED);
        } else {
            // Adicionando caracteres
            currentText = fullText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typewriterElement.textContent = currentText;

            if (currentText === fullText) {
                isDeleting = true;
                setTimeout(type, TYPEWRITER_PAUSE);
                return;
            }

            setTimeout(type, TYPEWRITER_SPEED);
        }
    }

    // Inicia após um pequeno delay
    setTimeout(type, 500);
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Controle da navegação (menu mobile e scroll)
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Atualizar link ativo
        updateActiveNavLink();

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Atualiza o link ativo na navegação baseado na seção visível
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 200; // Offset para ativação

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Animações de revelação ao scroll
 * Usa Intersection Observer para performance
 */
function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    // Se o usuário prefere menos animação, mostra tudo e sai
    if (prefersReducedMotion) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // AQUI é o comportamento que você pediu:
                // sai da tela? remove. desce de novo? anima de novo.
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    targets.forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Scroll suave para links internos
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignora links vazios ou apenas #
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Altura da navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

/**
 * Botão de voltar ao topo
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Atualiza o ano atual no footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

/**
 * Debounce function para otimizar eventos de scroll
 */
function debounce(func, wait) {
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

/**
 * Throttle function para limitar execução de funções
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Tratamento de erros global
 */
window.addEventListener('error', (event) => {
    console.error('Erro capturado:', event.error);
    // Em produção, você pode enviar para um serviço de logging
});

// ============================================
// LAZY LOADING (Futuro)
// ============================================

/**
 * Lazy loading para imagens (quando adicionadas)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

/**
 * Mensagem no console para desenvolvedores
 */
console.log(
    '%c👋 Olá, desenvolvedor!',
    'font-size: 20px; font-weight: bold; color: #00d9ff;'
);
console.log(
    '%cEste portfólio foi desenvolvido com foco em performance, acessibilidade e código limpo.',
    'font-size: 12px; color: #b0b0b8;'
);
console.log(
    '%cCódigo disponível em: https://github.com/seu-usuario',
    'font-size: 12px; color: #00ff88;'
);
