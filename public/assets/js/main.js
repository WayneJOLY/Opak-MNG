const App = {
    init: function() {
        this.initTheme();
        this.initNavigation();
        this.initMobileMenu();
        this.initStickyCTA();
        this.initTrackCarousels();
        this.initForms();
        this.initResponsiveCarousels();
    },

    isMobile: function() {
        return window.matchMedia('(max-width: 768px)').matches;
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

    /* Inicializa carruseles: cada .track-list[data-carousel] se transforma en slider horizontal */
    initTrackCarousels: function() {
        const lists = document.querySelectorAll('.track-list[data-carousel]');
        this.carousels = [];
        lists.forEach(list => {
            const items = list.querySelectorAll('.track-item');
            if (items.length < 2) return;
            const c = {
                list, items,
                originalItems: parseInt(list.dataset.carouselItems) || 3,
                autoplay: parseInt(list.dataset.carouselAutoplay) || 0,
                current: 0
            };
            c.visibleItems = this.isMobile() ? 1 : c.originalItems;
            const title = list.querySelector('.track-list-title');
            const track = document.createElement('div');
            track.className = 'track-list__track';
            c.track = track;
            items.forEach(item => track.appendChild(item));
            if (title) list.insertBefore(track, title.nextSibling);
            else list.prepend(track);
            const gapTotal = 16 * (c.visibleItems - 1);
            const itemWidth = `calc((100% - ${gapTotal}px) / ${c.visibleItems})`;
            items.forEach(item => item.style.flexBasis = itemWidth);
            const nav = document.createElement('div');
            nav.className = 'track-list__nav';
            nav.innerHTML = '<button class="track-list__btn" aria-label="Prev">\u2039</button><button class="track-list__btn" aria-label="Next">\u203A</button>';
            list.appendChild(nav);
            c.prevBtn = nav.firstElementChild;
            c.nextBtn = nav.lastElementChild;
            c.totalSlides = Math.max(1, Math.ceil(items.length / c.visibleItems));
            const dots = document.createElement('div');
            dots.className = 'track-list__dots';
            c.dots = dots;
            for (let i = 0; i < c.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'track-list__dot' + (i === 0 ? ' track-list__dot--active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dots.appendChild(dot);
            }
            list.appendChild(dots);
            const scrollToSlide = (index) => {
                const slideWidth = c.items[0].offsetWidth + 16;
                c.track.scrollTo({ left: slideWidth * index * c.visibleItems, behavior: 'smooth' });
                c.dots.querySelectorAll('.track-list__dot').forEach((d, i) => {
                    d.classList.toggle('track-list__dot--active', i === index);
                });
                c.prevBtn.disabled = index === 0;
                c.nextBtn.disabled = index >= c.totalSlides - 1;
            };
            c.prevBtn.addEventListener('click', () => { c.current = Math.max(0, c.current - 1); scrollToSlide(c.current); });
            c.nextBtn.addEventListener('click', () => { c.current = Math.min(c.totalSlides - 1, c.current + 1); scrollToSlide(c.current); });
            c.dots.querySelectorAll('.track-list__dot').forEach((dot, i) => {
                dot.addEventListener('click', () => { c.current = i; scrollToSlide(c.current); });
            });
            requestAnimationFrame(() => scrollToSlide(0));
            if (c.autoplay > 0) {
                let interval = setInterval(() => {
                    c.current = (c.current + 1) % c.totalSlides;
                    scrollToSlide(c.current);
                }, c.autoplay);
                c.track.addEventListener('mouseenter', () => clearInterval(interval));
                c.track.addEventListener('mouseleave', () => {
                    interval = setInterval(() => {
                        c.current = (c.current + 1) % c.totalSlides;
                        scrollToSlide(c.current);
                    }, c.autoplay);
                });
            }
            c.track.addEventListener('scroll', () => {
                const slideWidth = c.items[0].offsetWidth + 16;
                const idx = Math.round(c.track.scrollLeft / (slideWidth * c.visibleItems));
                if (idx !== c.current && idx >= 0 && idx < c.totalSlides) {
                    c.current = idx;
                    c.dots.querySelectorAll('.track-list__dot').forEach((d, i) => {
                        d.classList.toggle('track-list__dot--active', i === c.current);
                    });
                    c.prevBtn.disabled = c.current === 0;
                    c.nextBtn.disabled = c.current >= c.totalSlides - 1;
                }
            });
            this.carousels.push(c);
        });
    },

    /* Refresca carruseles al cambiar de mobile a desktop y viceversa */
    initResponsiveCarousels: function() {
        const mql = window.matchMedia('(max-width: 768px)');
        mql.addListener(() => {
            this.carousels.forEach(c => {
                const isMobile = this.isMobile();
                const newVisible = isMobile ? 1 : c.originalItems;
                if (newVisible === c.visibleItems) return;
                c.visibleItems = newVisible;
                const gapTotal = 16 * (newVisible - 1);
                const itemWidth = `calc((100% - ${gapTotal}px) / ${newVisible})`;
                c.items.forEach(item => item.style.flexBasis = itemWidth);
                const newTotal = Math.max(1, Math.ceil(c.items.length / newVisible));
                c.totalSlides = newTotal;
                c.current = 0;
                c.dots.innerHTML = '';
                const scrollFn = (index) => {
                    const slideWidth = c.items[0].offsetWidth + 16;
                    c.track.scrollTo({ left: slideWidth * index * newVisible, behavior: 'smooth' });
                    c.dots.querySelectorAll('.track-list__dot').forEach((d, i) => {
                        d.classList.toggle('track-list__dot--active', i === index);
                    });
                    c.prevBtn.disabled = index === 0;
                    c.nextBtn.disabled = index >= newTotal - 1;
                };
                for (let i = 0; i < newTotal; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'track-list__dot' + (i === 0 ? ' track-list__dot--active' : '');
                    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                    dot.addEventListener('click', () => { c.current = i; scrollFn(i); });
                    c.dots.appendChild(dot);
                }
                c.track.scrollTo({ left: 0, behavior: 'smooth' });
                c.prevBtn.disabled = true;
                c.nextBtn.disabled = newTotal <= 1;
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