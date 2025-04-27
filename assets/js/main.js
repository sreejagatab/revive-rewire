/**
 * Main JavaScript for Revive Rewire
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right, .scale-in');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // If element is in viewport
            if (elementPosition < windowHeight - 50) {
                // Remove the animation class and re-add it to restart the animation
                const animationClass = Array.from(element.classList).find(className =>
                    ['fade-in', 'slide-up', 'slide-in-left', 'slide-in-right', 'scale-in'].includes(className)
                );

                if (animationClass && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            }
        });
    };

    // Run once on page load
    setTimeout(animateOnScroll, 300);

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonialContainer = testimonialSlider.querySelector('.testimonial-container');
        const testimonialCards = testimonialContainer.querySelectorAll('.testimonial-card');
        const dotsContainer = testimonialSlider.querySelector('.testimonial-dots');
        const prevButton = testimonialSlider.querySelector('.testimonial-prev');
        const nextButton = testimonialSlider.querySelector('.testimonial-next');

        if (testimonialCards.length > 0) {
            let currentSlide = 0;
            const totalSlides = testimonialCards.length;

            // Create dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.className = 'testimonial-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }

            // Initialize first slide
            testimonialCards[0].classList.add('active');

            // Function to go to a specific slide
            function goToSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;

                // Update current slide
                testimonialCards.forEach((card, i) => {
                    card.classList.remove('active', 'prev', 'next');
                    if (i === index) {
                        card.classList.add('active');
                    } else if (i < index) {
                        card.classList.add('prev');
                    } else {
                        card.classList.add('next');
                    }
                });

                // Update dots
                const dots = dotsContainer.querySelectorAll('.testimonial-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });

                currentSlide = index;
            }

            // Event listeners for navigation
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    goToSlide(currentSlide - 1);
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    goToSlide(currentSlide + 1);
                });
            }

            // Auto-advance slides every 5 seconds
            let slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);

            // Pause auto-advance on hover
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            testimonialContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 5000);
            });
        }
    }

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());

            // Validate name
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            }

            // Validate email
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email address');
            }

            // Validate message
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            }

            if (!isValid) {
                event.preventDefault();
            }
        });

        function showError(input, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.marginTop = '5px';
            input.parentNode.appendChild(errorDiv);
            input.style.borderColor = 'red';
        }

        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }

    // Gallery filters functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Get filter value
                const filterValue = button.getAttribute('data-filter');

                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Gallery lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    if (galleryItems.length > 0 && lightbox) {
        const lightboxImage = lightbox.querySelector('.lightbox-image img');
        const lightboxTitle = lightbox.querySelector('.lightbox-caption h3');
        const lightboxDescription = lightbox.querySelector('.lightbox-caption p');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        // Open lightbox
        document.querySelectorAll('[data-lightbox="gallery"]').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                // Set lightbox content
                lightboxImage.src = this.closest('.gallery-item').querySelector('img').src;
                lightboxTitle.textContent = this.getAttribute('data-title');
                lightboxDescription.textContent = this.getAttribute('data-description');

                // Show lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close lightbox when clicking outside the content
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Toggle the active class on the clicked item
                    item.classList.toggle('active');

                    // Optional: Close other FAQ items when one is opened
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            }
        });
    }

    // Testimonial Slider Functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonialContainer = testimonialSlider.querySelector('.testimonial-container');
        const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
        const prevButton = testimonialSlider.querySelector('.testimonial-prev');
        const nextButton = testimonialSlider.querySelector('.testimonial-next');
        const dotsContainer = testimonialSlider.querySelector('.testimonial-dots');

        let currentIndex = 0;
        let autoplayInterval;
        const autoplayDelay = 5000; // 5 seconds between slides

        // Create dots for each testimonial
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        });

        // Function to go to a specific slide
        function goToSlide(index) {
            // Update current index
            currentIndex = index;

            // Update active dot
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Calculate the translation value
            const slideWidth = testimonialCards[0].offsetWidth;
            const translateValue = -index * slideWidth;

            // Apply the translation
            testimonialContainer.style.transform = `translateX(${translateValue}px)`;
        }

        // Previous button click handler
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            goToSlide(currentIndex);
            resetAutoplay();
        });

        // Next button click handler
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            goToSlide(currentIndex);
            resetAutoplay();
        });

        // Start autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                goToSlide(currentIndex);
            }, autoplayDelay);
        }

        // Reset autoplay
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Pause autoplay on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        // Resume autoplay on mouse leave
        testimonialSlider.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Initialize autoplay
        startAutoplay();

        // Handle window resize
        window.addEventListener('resize', () => {
            goToSlide(currentIndex);
        });
    }
});
