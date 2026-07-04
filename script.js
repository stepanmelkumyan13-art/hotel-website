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

    // 2. Smooth scrolling for same-page anchors only
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

    // 3. Luxury Room Page Interactive Gallery Logic
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