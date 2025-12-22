document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Scroll Reveal Animations
    // ==========================================
    const reveals = document.querySelectorAll('[data-reveal]');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < triggerBottom) {
                const delay = reveal.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    reveal.classList.add('active');
                }, delay);
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ==========================================
    // Mobile Hamburger Menu
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (hamburger && navLinks && navOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // Floating Particles
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.hue = Math.random() > 0.5 ? 239 : 187;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            particles.forEach((a, index) => {
                particles.slice(index + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(10, 15, 26, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 15, 26, 0.8)';
            }
        });
    }

    // ==========================================
    // Tabs Functionality
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(tabId)?.classList.add('active');
        });
    });

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // Animated Counters
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;

        const statsSection = document.querySelector('.stats-dashboard');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            countersAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(start + (target - start) * easeOutQuart);

                    stat.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };

                requestAnimationFrame(updateCounter);
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ==========================================
    // Pipeline Card Hover Effects
    // ==========================================
    const showcaseCards = document.querySelectorAll('.showcase-card');

    showcaseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==========================================
    // Pricing Card Hover Effects
    // ==========================================
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });

    // ==========================================
    // Add subtle parallax to hero device
    // ==========================================
    const deviceFrame = document.querySelector('.device-frame');

    if (deviceFrame) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            deviceFrame.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            deviceFrame.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});
