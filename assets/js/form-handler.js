/**
 * Contact Form Handler for Revive Rewire
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (in production, this would be an actual API call)
            setTimeout(() => {
                // In a real implementation, this would be replaced with an actual API call
                // For example:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formDataObj),
                // })
                // .then(response => response.json())
                // .then(data => {
                //     // Handle success
                // })
                // .catch(error => {
                //     // Handle error
                // });
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <h3>Thank you for your message!</h3>
                    <p>We've received your inquiry and will get back to you as soon as possible.</p>
                `;
                
                // Replace form with success message
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Style the success message
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '30px';
                successMessage.style.backgroundColor = 'rgba(112, 192, 61, 0.1)';
                successMessage.style.borderRadius = '8px';
                
                // Log form data to console (for demonstration purposes)
                console.log('Form submitted with data:', formDataObj);
                
            }, 1500); // Simulate network delay
        });
    }
});
