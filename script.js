document.addEventListener('DOMContentLoaded', () => {

    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Optional: Close mobile menu on click if active
                const navLinksContainer = document.querySelector('.nav-links');
                if (window.getComputedStyle(document.querySelector('.nav-toggle')).display !== 'none') {
                    // Mobile menu active - close logic goes here
                    // e.g. navLinksContainer.classList.remove('active');
                }
            }
        });
    });

    // 3. Intersection Observer for Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes fully into view
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Form Submission UI Handling (No Backend)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            const submitBtn = contactForm.querySelector('.submit-btn');
            
            // Simple UI loading state feedback
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Mock a network request delay for demonstration
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent ✓';
                contactForm.reset(); // Clear form fields
                
                // Return button to original state after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
            }, 1000);
        });
    }

});
