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

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentSlide = 0;
        const slides = testimonialSlider.children;
        const totalSlides = slides.length;

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        testimonialSlider.parentNode.appendChild(dotsContainer);

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        // Function to go to a specific slide
        function goToSlide(index) {
            currentSlide = index;
            testimonialSlider.scrollTo({
                left: slides[index].offsetLeft,
                behavior: 'smooth'
            });

            // Update active dot
            document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 5000);
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
});
