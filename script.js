// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation bar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                // Remove scrolled class ONLY if it's not a native inner page where it should stay fixed
                if (!document.body.classList.contains('inner-page')) {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    // 2. Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.getElementById('nav-overlay');

    function openMobileNav() {
        navToggle.classList.add('is-open');
        mainNav.classList.add('is-open');
        navbar.classList.add('menu-open');
        navOverlay.hidden = false;
        mainNav.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => navOverlay.classList.add('is-visible'));
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Закрыть меню');
        document.body.classList.add('nav-open');
    }

    function closeMobileNav() {
        navToggle.classList.remove('is-open');
        mainNav.classList.remove('is-open');
        navbar.classList.remove('menu-open');
        navOverlay.classList.remove('is-visible');
        mainNav.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Открыть меню');
        document.body.classList.remove('nav-open');

        if (!document.body.classList.contains('inner-page') && window.scrollY <= 50) {
            navbar.classList.remove('scrolled');
        }

        setTimeout(() => {
            if (!mainNav.classList.contains('is-open')) {
                navOverlay.hidden = true;
            }
        }, 300);
    }

    if (navToggle && mainNav && navOverlay && navbar) {
        if (window.innerWidth <= 768) {
            mainNav.setAttribute('aria-hidden', 'true');
        }

        navToggle.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        navOverlay.addEventListener('click', closeMobileNav);

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
                closeMobileNav();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mainNav.removeAttribute('aria-hidden');
                if (mainNav.classList.contains('is-open')) {
                    closeMobileNav();
                }
            } else if (!mainNav.classList.contains('is-open')) {
                mainNav.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // 3. Smooth scrolling for same-page anchors only
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90; // adjusts for fixed header
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Luxury Room Page Interactive Gallery Logic
    const mainImage = document.getElementById('main-room-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumb');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Change the main image source to the thumbnail source
                mainImage.src = this.src.replace('&w=400', '&w=1000'); // upgrades resolution if using unsplash
                mainImage.alt = this.alt;

                // Toggle active class representation
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                this.classList.add('active-thumb');
            });
        });
    }
});