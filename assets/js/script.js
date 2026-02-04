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
    // Refined 3D Tilt with Glare for Device
    // ==========================================
    const deviceFrame = document.querySelector('.device-frame');
    const heroSection = document.querySelector('.hero');

    if (deviceFrame && heroSection) {
        // Track mouse relative to hero section for more localized control
        heroSection.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (Magnetic effect - tilts TOWARDS mouse)
            // Mouse Top (-y) -> RotateX negative (Top comes clsoer)
            const xRotation = (y - rect.height / 2) / rect.height * 20;
            const yRotation = -1 * (x - rect.width / 2) / rect.width * 20;

            // Calculate glare position relative to the DEVICE, not just the section
            const deviceRect = deviceFrame.getBoundingClientRect();
            const deviceX = e.clientX - deviceRect.left;
            const deviceY = e.clientY - deviceRect.top;

            const glarePosX = (deviceX / deviceRect.width) * 100;
            const glarePosY = (deviceY / deviceRect.height) * 100;

            // Apply via CSS variables
            deviceFrame.style.setProperty('--rotate-x', `${xRotation}deg`);
            deviceFrame.style.setProperty('--rotate-y', `${yRotation}deg`);
            deviceFrame.style.setProperty('--glare-x', `${glarePosX}%`);
            deviceFrame.style.setProperty('--glare-y', `${glarePosY}%`);
        });

        // Reset on leave
        heroSection.addEventListener('mouseleave', () => {
            deviceFrame.style.setProperty('--rotate-x', '0deg');
            deviceFrame.style.setProperty('--rotate-y', '0deg');
            deviceFrame.style.setProperty('--glare-x', '0%');
            deviceFrame.style.setProperty('--glare-y', '0%');
        });
    }

    // ==========================================
    // Auto-Swipe Animation for Job Card
    // ==========================================
    const swipeCard = document.querySelector('.job-card-mini.demo-swipe');

    if (swipeCard) {
        // Initial pause before starting animation loop
        setTimeout(() => {
            const runSwipe = () => {
                // Return if user prefers reduced motion
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                // Add class to "swipe" (reveal text)
                swipeCard.classList.add('swiped');

                // Remove it after a delay to "unswipe" (hide text)
                setTimeout(() => {
                    swipeCard.classList.remove('swiped');
                }, 2000);
            };

            runSwipe(); // Run once immediately after initial delay

            const swipeInterval = setInterval(runSwipe, 6000); // Repeat every 6 seconds

            // Allow user interaction to pause animation temporarily
            const jobCards = document.querySelectorAll('.job-card-mini');
            jobCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    // For CSS animations
                    card.style.animationPlayState = 'paused';
                });
            });

        }, 2000);
    }

    // Modals logic removed as store links are now live

    // ==========================================
    // Smart Banner Device Detection
    // ==========================================
    const bannerBtn = document.querySelector('.js-banner-btn');
    if (bannerBtn) {
        const isAndroid = /Android/i.test(navigator.userAgent);
        if (isAndroid) {
            bannerBtn.href = 'https://play.google.com/store/apps/details?id=com.selectd.app';
            document.querySelector('.banner-subtitle').textContent = 'Official Android Command Center';
        }
    }

    // ==========================================
    // Job Search Health Score Scan
    // ==========================================
    const runHealthBtn = document.querySelector('.js-run-health');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizOpts = document.querySelectorAll('.quiz-opt');
    const healthNumber = document.querySelector('.js-health-number');
    const healthPathFinal = document.querySelector('.js-health-path-final');
    const healthStatus = document.querySelector('.js-health-status');
    const healthMsg = document.querySelector('.js-health-msg');
    const shareResult = document.querySelector('.js-share-result');
    const shareTwitter = document.querySelector('.js-share-twitter');
    const shareLinkedin = document.querySelector('.js-share-linkedin');

    let currentStep = 0;
    let totalScore = 0;

    if (runHealthBtn) {
        runHealthBtn.addEventListener('click', () => {
            if (currentStep === 0) {
                goToStep(1);
                runHealthBtn.style.display = 'none';
            }
        });

        quizOpts.forEach(opt => {
            opt.addEventListener('click', () => {
                const points = parseInt(opt.dataset.points);
                totalScore += points;
                opt.classList.add('selected');
                setTimeout(() => goToStep(currentStep + 1), 300);
            });
        });

        function goToStep(step) {
            quizSteps.forEach(s => s.classList.remove('active'));
            currentStep = step;
            const nextStep = document.querySelector(`.quiz-step[data-step="${step}"]`);
            if (nextStep) {
                nextStep.classList.add('active');
            } else {
                calculateFinalScore();
            }
        }

        function calculateFinalScore() {
            const finalStep = document.querySelector('.quiz-step[data-step="final"]');
            finalStep.classList.add('active');
            let displayScore = 0;
            const targetScore = Math.min(98, totalScore);
            const interval = setInterval(() => {
                displayScore++;
                if (healthNumber) healthNumber.textContent = displayScore;
                if (healthPathFinal) healthPathFinal.setAttribute('stroke-dasharray', `${displayScore}, 100`);
                if (displayScore >= targetScore) {
                    clearInterval(interval);
                    healthStatus.textContent = targetScore > 85 ? 'Elite Seeker Found' : 'Strong Profile Found';
                    healthMsg.textContent = targetScore > 85 ?
                        `You are in the top ${100 - targetScore}% of candidates. Use selectd to maintain this edge.` :
                        `You have a solid foundation. selectd will help you push into the elite 1%.`;
                    shareResult.style.display = 'flex';
                }
            }, 20);
        }

        if (shareTwitter) {
            shareTwitter.addEventListener('click', () => {
                const score = healthNumber.textContent;
                const text = encodeURIComponent(`My Job Search Health Score is ${score}%! I'm in the top tier of job seekers. 🚀\n\n#JobSearch #CareerGrowth`);
                const url = "https://selectd.co.in";
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
            });
        }

        if (shareLinkedin) {
            shareLinkedin.addEventListener('click', () => {
                const url = "https://selectd.co.in";
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            });
        }
    }

    // ==========================================
    // Live Metrics Fluctuations
    // ==========================================
    const initLiveMetrics = () => {
        const seekersElements = Array.from(document.querySelectorAll('.ticker-item.metric')).filter(el => el.textContent.includes('Seekers Online'));

        if (seekersElements.length === 0) return;

        setInterval(() => {
            seekersElements.forEach(el => {
                const strong = el.querySelector('strong');
                if (!strong) return;

                const currentText = strong.textContent;
                const match = currentText.match(/Seekers Online: ([\d,]+)/);

                if (match) {
                    let count = parseInt(match[1].replace(/,/g, ''));
                    // Add or subtract 1-3 people
                    const change = Math.floor(Math.random() * 7) - 3;
                    count = Math.max(1000, count + change);

                    strong.textContent = `Seekers Online: ${count.toLocaleString()}`;

                    // Add a tiny flash effect
                    strong.style.transition = 'color 0.3s ease';
                    strong.style.color = '#10b981';
                    setTimeout(() => {
                        strong.style.color = '';
                    }, 500);
                }
            });
        }, 4000);
    };

    initLiveMetrics();
});
