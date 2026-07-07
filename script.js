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

    // 2. Mobile navigation toggle (Hamburger Menu)
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

    // Ensure the hamburger menu elements exist before running logic
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

    // 4. Luxury Room Page Interactive Gallery & Lightbox Logic
    
    // Bulletproof selectors: checks for both IDs and Classes
    const mainImage = document.getElementById('main-room-image') || document.querySelector('.main-room-image');
    const thumbnails = document.querySelectorAll('.thumbnails .thumb, .gallery-thumbnails .thumb, .room-gallery img');
    
    // Lightbox elements 
    const lightboxOverlay = document.querySelector('.lightbox'); 
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    let currentIndex = 0;

    // Only run this logic if we are on a page that actually has the room images
    if (mainImage && thumbnails.length > 0) {
        
        // --- 1. THUMBNAIL CLICK LOGIC ---
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Safely update the main image regardless of local or unsplash links
                mainImage.src = this.src; 
                mainImage.alt = this.alt;
                currentIndex = index; // Sync the index for the lightbox

                // Toggle active class visually
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                this.classList.add('active-thumb');
            });
        });

        // --- 2. LIGHTBOX OPEN/CLOSE LOGIC ---
        // Open lightbox when clicking the main image
        mainImage.addEventListener('click', () => {
            if(lightboxOverlay && lightboxImg) {
                lightboxImg.src = mainImage.src;
                lightboxOverlay.classList.add('active'); 
            }
        });

        // Close lightbox when clicking the 'X'
        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightboxOverlay.classList.remove('active');
            });
        }

        // Close lightbox when clicking the blurred background
        if(lightboxOverlay) {
            lightboxOverlay.addEventListener('click', (e) => {
                if (e.target === lightboxOverlay) {
                    lightboxOverlay.classList.remove('active');
                }
            });
        }

        // --- 3. LIGHTBOX NAVIGATION (PREV/NEXT) ---
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
                lightboxImg.src = thumbnails[currentIndex].src;
                
                // Keep the main page image synced in the background
                mainImage.src = thumbnails[currentIndex].src;
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                thumbnails[currentIndex].classList.add('active-thumb');
            });
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
                lightboxImg.src = thumbnails[currentIndex].src;
                
                // Keep the main page image synced in the background
                mainImage.src = thumbnails[currentIndex].src;
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                thumbnails[currentIndex].classList.add('active-thumb');
            });
        }
    }
});