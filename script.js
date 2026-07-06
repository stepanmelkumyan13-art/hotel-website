document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SMOOTH SCROLLING FOR NAVIGATION LINKS
  // ==========================================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      // Only apply smooth scroll if it's a valid ID, not just a bare "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 2. ROOM GALLERY: THUMBNAIL SWAP & LIGHTBOX
  // ==========================================
  
  // Select gallery elements
  const mainImage = document.querySelector('.main-image img');
  const thumbnails = document.querySelectorAll('.thumbnails img');
  
  // Select lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  // SAFEGUARD: Only run gallery/lightbox logic if we are actually on a room page
  if (mainImage && thumbnails.length > 0) {
    
    // --- FEATURE A: Swap Thumbnail with Main Image ---
    thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', function() {
        // Swap the 'src' (image link) between the clicked thumbnail and the big main image
        const tempSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = tempSrc;
      });
    });

    // --- FEATURE B: Lightbox Overlay Logic ---
    if (lightbox) {
      let imageUrls = [];
      let currentIndex = 0;

      // Function to get the current state of images (Main Image + All Thumbnails)
      function updateImageUrls() {
        imageUrls = [mainImage.src, ...Array.from(thumbnails).map(t => t.src)];
      }

      // Open Lightbox when clicking the Main Image
      mainImage.style.cursor = 'pointer'; // Make it look clickable
      mainImage.addEventListener('click', () => {
        updateImageUrls(); // Refresh array in case they swapped thumbnails
        currentIndex = 0;  // Main image is always index 0
        openLightbox(imageUrls[currentIndex]);
      });

      // Function to Open Lightbox
      function openLightbox(src) {
        lightbox.style.display = 'flex'; 
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden'; // Stop the page behind it from scrolling
      }

      // Function to Close Lightbox
      function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restore normal page scrolling
      }

      // Show Next Image
      function showNext() {
        currentIndex = (currentIndex + 1) % imageUrls.length;
        lightboxImg.src = imageUrls[currentIndex];
      }

      // Show Previous Image
      function showPrev() {
        currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
        lightboxImg.src = imageUrls[currentIndex];
      }

      // Button Click Events
      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (nextBtn) nextBtn.addEventListener('click', showNext);
      if (prevBtn) prevBtn.addEventListener('click', showPrev);

      // Close when clicking the dark blurred background
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });

      // Keyboard Controls (Esc to close, Arrows to navigate)
      document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
          if (e.key === 'Escape') closeLightbox();
          if (e.key === 'ArrowRight') showNext();
          if (e.key === 'ArrowLeft') showPrev();
        }
      });
    }
  }
});