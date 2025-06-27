
// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Enhanced header scroll effect with parallax
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('#home');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    const scrollPosition = window.scrollY;
    const halfHeroHeight = heroHeight / 2;

    // Check if we're in the hero section (home page area)
    if (scrollPosition < halfHeroHeight) {
        // We're in the home/hero section (first half)
        header.classList.remove('scrolled');
        header.classList.add('on-home');
    } else {
        // We've scrolled past half of the home section
        header.classList.add('scrolled');
        header.classList.remove('on-home');
    }

    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && scrollPosition < heroHeight) {
        const parallaxSpeed = scrollPosition * 0.5;
        heroBg.style.transform = `translateY(${parallaxSpeed}px)`;
    }

    // Fade effect for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollPosition < heroHeight) {
        const opacity = Math.max(0, 1 - (scrollPosition / heroHeight) * 1.5);
        heroContent.style.opacity = opacity;
    }

    // Animate elements based on scroll position
    const animateElements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    animateElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollPosition + windowHeight > elementTop + elementHeight * 0.2) {
            element.classList.add('animated');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced counter animation with easing
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const duration = 2000; // 2 seconds

    counters.forEach((counter, index) => {
        setTimeout(() => {
            const originalText = counter.innerText;
            const target = parseInt(originalText.replace(/[^\d]/g, ''));
            
            // Extract prefix (like "RS ") and suffix (like "L+")
            const prefix = originalText.match(/^[^\d]*/)[0];
            const suffix = originalText.replace(/^[^\d]*[\d,]*/, '');
            
            let start = 0;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.innerText = prefix + current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = prefix + target.toLocaleString() + suffix;
                }
            };

            requestAnimationFrame(updateCount);
        }, index * 200); // Stagger the animations
    });
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                setTimeout(() => animateCounters(), 300);
            }

            // Animate progress bars in causes section
            if (entry.target.classList.contains('causes')) {
                setTimeout(() => animateProgressBars(), 500);
            }

            // Stagger animations for grid items
            const gridItems = entry.target.querySelectorAll('.cause-card, .gallery-item, .stat-item, .feature');
            gridItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-on-scroll', 'animated');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Gallery lightbox effect (simple implementation)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
            </div>
        `;

        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            z-index: 10001;
        `;

        const imgElement = lightbox.querySelector('img');
        imgElement.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            border-radius: 10px;
        `;

        document.body.appendChild(lightbox);

        // Close lightbox events
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });

        closeBtn.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });

        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Enhanced loading animation with typing effect
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';

    // Add typing animation to hero text
    const heroText = document.querySelector('.hero-text p:last-of-type');
    if (heroText) {
        heroText.classList.add('typing-text');
    }

    // Animate images as they load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // Add float animation to logo
    //     const logo = document.querySelector('.logo img');
    //     if (logo) {
    //         logo.classList.add('float-animation');
    //     }
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 50,
            disable: function() {
                var maxWidth = 800;
                return window.innerWidth < maxWidth;
            }
        });
    }

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-in-out';
                    progressBar.style.width = width;
                }, 200);
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// Initial page setup
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';

    // Add active class to current navigation item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #F6F0F0 !important;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);
