document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. ЛОГИКА АДАПТИВНОЙ МОБИЛЬНОЙ НАВИГАЦИИ (ГАМБУРГЕР-МЕНЮ)
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-book-btn');

    // Функция переключения состояния меню (открыть/закрыть)
    function toggleMenu() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        
        if (isExpanded) {
            navOverlay.setAttribute('hidden', '');
            document.body.style.overflow = ''; // Разрешаем скролл страницы
        } else {
            navOverlay.removeAttribute('hidden');
            document.body.style.overflow = 'hidden'; // Блокируем скролл фона
        }
    }

    // Функция принудительного закрытия меню
    function closeMenu() {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
        navOverlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    // Привязка кликов к элементам управления меню
    if (navToggle && mainNav && navOverlay) {
        navToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);

        // Автоматически закрывать панель при выборе любого пункта меню
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Если ссылка якорная (на текущей странице), просто закрываем меню
                if (link.getAttribute('href').startsWith('#')) {
                    closeMenu();
                }
            });
        });
    }

    /* ==========================================================================
       2. ИНТЕРАКТИВНАЯ ГАЛЕРЕЯ ДЛЯ СТРАНИЦ НОМЕРОВ (ROOM PAGES)
       ========================================================================== */
    const mainImage = document.querySelector('.main-img-wrapper img');
    const thumbnails = document.querySelectorAll('.thumb-wrapper');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const thumbImg = thumb.querySelector('img');
                if (thumbImg) {
                    // Сохраняем текущую главную картинку во временную переменную
                    const currentMainSrc = mainImage.src;
                    const currentMainAlt = mainImage.alt;

                    // Меняем главную картинку на ту, на которую кликнули
                    mainImage.src = thumbImg.src;
                    mainImage.alt = thumbImg.alt;

                    // Возвращаем старую главную картинку в миниатюру
                    thumbImg.src = currentMainSrc;
                    thumbImg.alt = currentMainAlt;

                    // Обновляем визуальный класс активной рамки
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                }
            });
        });
    }
});