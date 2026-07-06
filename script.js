document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР) И ОВЕРЛЕЙ
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Создаем затемняющий фон (оверлей) при открытии меню
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);

    function toggleMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокируем прокрутку сайта на фоне, когда меню открыто
        if (!isExpanded) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // Закрытие меню при клике на темный фон
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Закрытие меню при клике на любую ссылку навигации (удобно для мобильных)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================
    // 2. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК
    // ==========================================
    // Скрипт срабатывает ТОЛЬКО для ссылок, начинающихся с "#", 
    // поэтому он не сломает переход на другие страницы (например, room-family.html)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Игнорируем пустые якоря
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); // Отменяем резкий прыжок
                
                // Учитываем высоту прилипающей шапки, чтобы она не перекрывала заголовок
                const headerHeight = document.querySelector('header').offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 3. АНИМАЦИЯ ШАПКИ (NAVBAR) ПРИ ПРОКРУТКЕ
    // ==========================================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); // Добавляет тень/фон при скролле вниз
            } else {
                header.classList.remove('scrolled'); // Убирает при возврате наверх
            }
        });
    }

    // ==========================================
    // 4. ИНТЕРАКТИВНАЯ ГАЛЕРЕЯ ДЛЯ СТРАНИЦ НОМЕРОВ
    // ==========================================
    // Проверяем наличие элементов галереи на странице, чтобы не было ошибок в консоли на главной странице
    const mainImage = document.querySelector('.main-room-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Убираем обводку/активный статус у всех миниатюр
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Добавляем активный статус кликнутой миниатюре
                this.classList.add('active');
                
                // Берем картинку из миниатюры и подставляем в главное окно с легким эффектом затухания
                const newImageSrc = this.getAttribute('src');
                
                mainImage.style.opacity = '0.7';
                setTimeout(() => {
                    mainImage.setAttribute('src', newImageSrc);
                    mainImage.style.opacity = '1';
                    mainImage.style.transition = 'opacity 0.2s ease-in-out';
                }, 100);
            });
        });
    }
});