// Initialize AOS with enhanced settings
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 120,
            delay: 100
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '10px 60px';
            navbar.style.background = 'rgba(10, 10, 20, 0.98)';
            navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.padding = '12px 60px';
            navbar.style.background = 'linear-gradient(180deg, rgba(10, 10, 20, 0.98) 0%, rgba(10, 10, 20, 0.9) 100%)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Update navbar padding for mobile on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.innerWidth <= 768) {
            const currentScroll = window.pageYOffset;
            navbar.style.zIndex = '9999';
            navbar.style.position = 'fixed';
            if (currentScroll > 100) {
                navbar.style.padding = '8px 25px';
            } else {
                navbar.style.padding = '10px 25px';
            }
        }
    });

    // Ensure navbar is always visible on mobile on page load
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.zIndex = '9999';
            navbar.style.position = 'fixed';
        }
    }

    // Smooth scroll for nav links (for same-page anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Particles with Islamic-themed config
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 900 } },
                color: { value: '#d4af37' },
                shape: {
                    type: ['circle', 'star'],
                    star: { nb_sides: 8 }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1 }
                },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 180,
                    color: '#d4af37',
                    opacity: 0.08,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 150, line_linked: { opacity: 0.4 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }

    // Counter animation for stats
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        if (!target) return;

        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('en-US');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('en-US');
            }
        }, 25);
    }

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hadith-stats').forEach(el => observer.observe(el));

    // Parallax effect for floating symbols
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.floating-symbol').forEach((symbol, i) => {
            const speed = 0.05 + (i * 0.02);
            symbol.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Drag to Scroll - Grab Hand functionality
    const body = document.body;
    body.classList.add('grab-scroll');

    let isGrabbing = false;
    let startY = 0;
    let scrollStart = 0;

    body.addEventListener('mousedown', (e) => {
        // Don't activate on interactive elements
        if (e.target.closest('a, button, input, textarea, select, .menu-toggle, .nav-links, .video-link')) {
            return;
        }

        isGrabbing = true;
        startY = e.clientY;
        scrollStart = window.pageYOffset;
        body.classList.add('grabbing');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isGrabbing) return;

        const deltaY = startY - e.clientY;
        window.scrollTo(0, scrollStart + deltaY);
    });

    document.addEventListener('mouseup', () => {
        isGrabbing = false;
        body.classList.remove('grabbing');
    });

    document.addEventListener('mouseleave', () => {
        isGrabbing = false;
        body.classList.remove('grabbing');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks && navLinks.classList.contains('active')) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Card Zoom Functionality
    const zoomableCards = document.querySelectorAll('.islamic-card, .bio-card, .date-box, .timeline-item, .scholar-card, .stat-card, .book-feature, .method-card, .death-card, .category-item');

    // Create overlay for zoomed cards
    const overlay = document.createElement('div');
    overlay.className = 'card-zoom-overlay';
    document.body.appendChild(overlay);

    let currentZoomedCard = null;

    zoomableCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', function(e) {
            // Don't zoom if clicking on a link or button inside the card
            if (e.target.closest('a, button, video, iframe')) {
                return;
            }

            e.stopPropagation();

            if (this.classList.contains('card-zoomed')) {
                // Unzoom
                this.classList.remove('card-zoomed');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                currentZoomedCard = null;
            } else {
                // Close any previously zoomed card
                if (currentZoomedCard) {
                    currentZoomedCard.classList.remove('card-zoomed');
                }

                // Zoom this card
                this.classList.add('card-zoomed');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                currentZoomedCard = this;
            }
        });
    });

    // Close zoomed card when clicking overlay
    overlay.addEventListener('click', function() {
        if (currentZoomedCard) {
            currentZoomedCard.classList.remove('card-zoomed');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            currentZoomedCard = null;
        }
    });

    // Close zoomed card with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentZoomedCard) {
            currentZoomedCard.classList.remove('card-zoomed');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            currentZoomedCard = null;
        }
    });
});
