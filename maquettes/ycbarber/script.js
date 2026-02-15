// Loading animation
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });

        // Smooth scroll functionality
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1200;
                    let start = null;

                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }

                    function easeInOutCubic(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t * t + b;
                        t -= 2;
                        return c / 2 * (t * t * t + 2) + b;
                    }

                    requestAnimationFrame(animation);
                }
            });
        });

        // Mobile navigation
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('navLinks');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Scroll animations (fade-in/fade-out)
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.getElementById('scrollIndicator');
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = scrollTop / (docHeight - winHeight);
            const scrollPercentRounded = Math.round(scrollPercent * 100);

            scrollIndicator.style.width = scrollPercentRounded + '%';
        });

        // Add stagger animation to service items
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add hover effect to gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05) rotate(1deg)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Text reveal animation
        function revealText(element) {
            const text = element.textContent;
            element.textContent = '';

            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.opacity = '0';
                span.style.animation = `fadeInUp 0.5s ease ${i * 0.05}s forwards`;
                element.appendChild(span);
            }
        }

        // Apply text reveal to section titles when they become visible
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    entry.target.classList.add('revealed');
                    revealText(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.section-title').forEach(title => {
            titleObserver.observe(title);
        });

        // Parallax effect on images
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        function animateParallax() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            const parallaxImages = document.querySelectorAll('.parallax-image');
            parallaxImages.forEach((img, index) => {
                const speed = (index + 1) * 20;
                img.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
            });

            requestAnimationFrame(animateParallax);
        }

        animateParallax();

        // Scroll-based parallax for gallery items (disabled on mobile)
        function scrollParallax() {
            // Only run on desktop (screens wider than 768px)
            if (window.innerWidth <= 768) {
                return;
            }

            const scrolled = window.pageYOffset;

            // Gallery items parallax
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemOffset = rect.top + scrolled;
                const itemParallax = (scrolled - itemOffset) * 0.15;

                // Alternate direction for even/odd items
                if (index % 2 === 0) {
                    item.style.transform = `translateY(${itemParallax}px)`;
                } else {
                    item.style.transform = `translateY(${-itemParallax}px)`;
                }
            });
        }

        // Reset transforms on mobile
        function resetMobileTransforms() {
            if (window.innerWidth <= 768) {
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    item.style.transform = '';
                });
            }
        }

        window.addEventListener('scroll', scrollParallax);
        window.addEventListener('load', () => {
            scrollParallax();
            resetMobileTransforms();
        });
        window.addEventListener('resize', resetMobileTransforms);

        // Form submission handling
        const reservationForm = document.querySelector('.reservation-form form');
        if (reservationForm) {
            reservationForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(reservationForm);
                const data = Object.fromEntries(formData.entries());

                // Here you would typically send the data to a backend
                console.log('Reservation data:', data);

                // Show success message
                alert('Merci pour votre demande de réservation ! Nous vous contacterons bientôt pour confirmer votre rendez-vous.');

                // Reset form
                reservationForm.reset();
            });
        }

        // Service type change handler to show/hide address field
        const serviceSelect = document.getElementById('service');
        const addressField = document.getElementById('address');
        const addressFieldGroup = addressField.closest('.form-group');

        serviceSelect.addEventListener('change', () => {
            const selectedValue = serviceSelect.value;
            if (selectedValue.startsWith('domicile-')) {
                addressFieldGroup.style.display = 'block';
                addressField.required = true;
            } else {
                addressFieldGroup.style.display = 'none';
                addressField.required = false;
            }
        });

        // Initially hide address field
        addressFieldGroup.style.display = 'none';
        addressField.required = false;

        // Instagram Feed - Using SnapWidget or similar embed
        // Note: For production, you'll need to use Instagram's official API or a third-party service
        function loadInstagramFeed() {
            const instagramFeed = document.getElementById('instagram-feed');

            // This is a placeholder implementation
            // In production, you would either:
            // 1. Use Instagram Basic Display API with an access token
            // 2. Use a third-party service like SnapWidget, Curator.io, or Instafeed.js
            // 3. Use server-side scraping (check Instagram's terms of service)

            // For now, we'll use a simple iframe embed approach
            // You can replace this with actual Instagram posts

            const username = 'ycbarber06';

            // Placeholder: Show message to use embed widget
            setTimeout(() => {
                instagramFeed.innerHTML = `
                    <div class="instagram-embed-message" style="grid-column: 1 / -1; padding: 3rem; border: 3px solid #fff; text-align: center;">
                        <h3 style="font-weight: 900; font-size: 1.5rem; margin-bottom: 1rem; text-transform: uppercase;">Instagram Feed</h3>
                        <p style="margin-bottom: 1.5rem;">Pour afficher les posts Instagram en temps réel, vous devez :</p>
                        <ol style="text-align: left; max-width: 600px; margin: 0 auto 1.5rem; line-height: 1.8;">
                            <li>Créer un compte développeur Instagram</li>
                            <li>Obtenir un Access Token via l'API Instagram Basic Display</li>
                            <li>Ou utiliser un service comme <strong>SnapWidget</strong>, <strong>Curator.io</strong>, ou <strong>EmbedSocial</strong></li>
                        </ol>
                        <a href="https://www.instagram.com/${username}/" target="_blank" class="hero-cta" style="display: inline-block; margin-top: 1rem;">
                            Voir sur Instagram
                        </a>
                    </div>
                `;
            }, 1000);
        }

        // Uncomment to load Instagram feed
        // loadInstagramFeed();
