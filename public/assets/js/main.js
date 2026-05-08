const App = {
    init: function() {
        this.initTheme();
        this.initNavigation();
        this.initMobileMenu();
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