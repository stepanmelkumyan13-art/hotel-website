document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GLOBAL SMOOTH SCROLLING & NAVIGATION LINKS
    // ==========================================
    // Safely handles cross-page links vs. on-page section jumps
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only intercept if it's a true local ID link on the current page
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if it happens to be open
                    closeMobileMenu();
                    
                    // Smoothly slide down to the targeted section element view
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================
    // 2. STICKY HEADER SCROLL EFFICIENCY EFFECTS
    // ==========================================
    // Listens to scroll events to transform nav styling as users explore down
    const headerElement = document.querySelector('header');
    
    if (headerElement) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                headerElement.classList.add('header-scrolled');
                headerElement.style.padding = '0.8rem 0';
                headerElement.style.backgroundColor = 'rgba(26, 38, 50, 0.95)'; // Blended transparency
            } else {
                headerElement.classList.remove('header-scrolled');
                headerElement.style.padding = '1.2rem 0';
                headerElement.style.backgroundColor = '#1a2632'; // Default opaque luxury slate
            }
        });
    }

    // ==========================================
    // 3. MOBILE RESPONSIVE HAMBURGER NAVIGATION
    // ==========================================
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');

    if (burger && navLinks && overlay) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        overlay.addEventListener('click', () => {
            closeMobileMenu();
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    function closeMobileMenu() {
        if (burger && navLinks && overlay) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // ==========================================
    // 4. INTERACTIVE LIGHTBOX MODAL GALLERY
    // ==========================================
    const galleryImages = document.querySelectorAll('.gallery-clickable'); 
    const lightbox = document.getElementById('lightbox-modal');
    
    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = document.getElementById('lightbox-image');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        
        let currentIndex = 0;

        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
                lightbox.classList.add('active');
                document.body.classList.add('lightbox-open');
            });
        });

        function showImage(index) {
            if (galleryImages[index] && lightboxImg) {
                lightboxImg.src = galleryImages[index].src;
            }
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }

        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        if (prevBtn) prevBtn.addEventListener('click', prevImage);
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeLightbox();
        });

        // --- MOBILE SWIPE TOUCH TRACKING LOGIC ---
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, {passive: true});

        function handleSwipeGesture() {
            const deltaThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance < -deltaThreshold) {
                nextImage();
            }
            if (swipeDistance > deltaThreshold) {
                prevImage();
            }
        }
    }
});

