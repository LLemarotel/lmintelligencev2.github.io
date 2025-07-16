// Loading animation
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
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
                } else {
                    // Optional: remove 'visible' class when out of view
                    // entry.target.classList.remove('visible');
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

        // Add stagger animation to menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
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

        // Blur effect for stacking sections
        const sections = document.querySelectorAll('.section');

        function applyBlurEffect() {
            // Only apply blur effect on screens wider than 768px
            if (window.innerWidth > 768) {
                sections.forEach((currentSection, index) => {
                    if (index === 0) return; // Skip the first section

                    const previousSection = sections[index - 1];
                    const currentRect = currentSection.getBoundingClientRect();
                    const previousRect = previousSection.getBoundingClientRect();

                    // Calculate how much the current section is covering the previous one
                    // A positive value means currentSection is covering previousSection
                    const overlap = previousRect.bottom - currentRect.top;

                    if (overlap > 0) {
                        // Calculate blur intensity based on overlap
                        // Max blur when currentSection fully covers previousSection
                        const blurAmount = Math.min(overlap / previousRect.height, 1) * 10; // Max 10px blur
                        previousSection.style.filter = `blur(${blurAmount}px)`;
                    } else {
                        previousSection.style.filter = 'blur(0px)';
                    }
                });
            } else {
                // Ensure no blur is applied on smaller screens
                sections.forEach(section => {
                    section.style.filter = 'blur(0px)';
                });
            }
        }

        // Apply blur effect on scroll
        window.addEventListener('scroll', applyBlurEffect);
        // Apply blur effect on load in case of initial scroll position
        window.addEventListener('load', applyBlurEffect);

        // Re-apply blur effect on resize in case the screen crosses the breakpoint
        window.addEventListener('resize', applyBlurEffect);

        