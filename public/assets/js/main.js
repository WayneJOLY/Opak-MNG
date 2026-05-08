const App = {
    init: function() {
        this.initTheme();
        this.initNavigation();
        this.initMobileMenu();
        this.initStickyCTA();
        this.initTrackCarousels();
        this.initForms();
    },

    initTheme: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            this.updateThemeIcon();
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                this.updateThemeIcon();
            });
        }
    },

    updateThemeIcon: function() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.innerHTML = isLight ?  '🌙':'☀️';
        }
    },

    initNavigation: function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    },

    initMobileMenu: function() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-links');
        const body = document.body;

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                // Toggle visual state
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Update ARIA attributes for accessibility
                const isExpanded = hamburger.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
                
                // Prevent body scroll when menu is open
                body.style.overflow = isExpanded ? 'hidden' : '';
            });

            // Close menu when clicking a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                });
            });
            
            // Close menu when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                    hamburger.focus();
                }
            });
        }
    },

    initStickyCTA: function() {
        const cta = document.querySelector('.sticky-cta');
        const footer = document.querySelector('.footer');
        if (!cta || !footer) return;
        const observer = new IntersectionObserver(([entry]) => {
            cta.classList.toggle('sticky-cta--hidden', entry.isIntersecting);
        }, { threshold: 0 });
        observer.observe(footer);
    },

    initTrackCarousels: function() {
        const lists = document.querySelectorAll('.track-list[data-carousel]');
        lists.forEach(list => {
            const items = list.querySelectorAll('.track-item');
            if (items.length < 2) return;
            const visibleItems = parseInt(list.dataset.carouselItems) || 3;
            const autoplay = parseInt(list.dataset.carouselAutoplay) || 0;
            const title = list.querySelector('.track-list-title');
            const track = document.createElement('div');
            track.className = 'track-list__track';
            items.forEach(item => track.appendChild(item));
            if (title) list.insertBefore(track, title.nextSibling);
            else list.prepend(track);
            const gapTotal = 16 * (visibleItems - 1);
            const itemWidth = `calc((100% - ${gapTotal}px) / ${visibleItems})`;
            items.forEach(item => item.style.flexBasis = itemWidth);
            const nav = document.createElement('div');
            nav.className = 'track-list__nav';
            nav.innerHTML = '<button class="track-list__btn" aria-label="Prev">\u2039</button><button class="track-list__btn" aria-label="Next">\u203A</button>';
            list.appendChild(nav);
            const prevBtn = nav.firstElementChild;
            const nextBtn = nav.lastElementChild;
            const totalSlides = Math.max(1, Math.ceil(items.length / visibleItems));
            const dots = document.createElement('div');
            dots.className = 'track-list__dots';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'track-list__dot' + (i === 0 ? ' track-list__dot--active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dots.appendChild(dot);
            }
            list.appendChild(dots);
            let current = 0;
            const scrollToSlide = (index) => {
                const slideWidth = items[0].offsetWidth + 16;
                track.scrollTo({ left: slideWidth * index * visibleItems, behavior: 'smooth' });
                dots.querySelectorAll('.track-list__dot').forEach((d, i) => {
                    d.classList.toggle('track-list__dot--active', i === index);
                });
                prevBtn.disabled = index === 0;
                nextBtn.disabled = index >= totalSlides - 1;
            };
            prevBtn.addEventListener('click', () => { current = Math.max(0, current - 1); scrollToSlide(current); });
            nextBtn.addEventListener('click', () => { current = Math.min(totalSlides - 1, current + 1); scrollToSlide(current); });
            dots.querySelectorAll('.track-list__dot').forEach((dot, i) => {
                dot.addEventListener('click', () => { current = i; scrollToSlide(current); });
            });
            requestAnimationFrame(() => scrollToSlide(0));
            if (autoplay > 0) {
                let interval = setInterval(() => {
                    current = (current + 1) % totalSlides;
                    scrollToSlide(current);
                }, autoplay);
                track.addEventListener('mouseenter', () => clearInterval(interval));
                track.addEventListener('mouseleave', () => {
                    interval = setInterval(() => {
                        current = (current + 1) % totalSlides;
                        scrollToSlide(current);
                    }, autoplay);
                });
            }
            track.addEventListener('scroll', () => {
                const slideWidth = items[0].offsetWidth + 16;
                const idx = Math.round(track.scrollLeft / (slideWidth * visibleItems));
                if (idx !== current && idx >= 0 && idx < totalSlides) {
                    current = idx;
                    dots.querySelectorAll('.track-list__dot').forEach((d, i) => {
                        d.classList.toggle('track-list__dot--active', i === current);
                    });
                    prevBtn.disabled = current === 0;
                    nextBtn.disabled = current >= totalSlides - 1;
                }
            });
        });
    },

    initForms: function() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit);
        });
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        alert('Formulario enviado correctamente');
        form.reset();
    },

    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});