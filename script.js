$(document).ready(function() {
    // Form handling
    const handleFormValidation = () => {
        $('.form-control, .form-select').on('input', function() {
            $(this).removeClass('is-invalid');
            $(this).toggleClass('is-valid', $(this).val().trim() !== '');
        });
    };

    // Form submission
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val().trim(),
            subscription: $('#subscription').val(),
            terms: $('#terms').prop('checked')
        };
        
        // Validation
        const validations = [
            { field: 'name', condition: formData.name.length < 3, message: 'Nama minimal 3 huruf ya bestie! 😅' },
            { field: 'email', condition: !formData.email.includes('@') || !formData.email.includes('.'), message: 'Email-nya belum bener nih! 📧' },
            { field: 'password', condition: formData.password.length < 6, message: 'Password minimal 6 karakter ya! 🔐' },
            { field: 'subscription', condition: !formData.subscription, message: 'Pilih paket dulu dong! 🎮' },
            { field: 'terms', condition: !formData.terms, message: 'Jangan lupa centang syarat & ketentuan ya! 📝' }
        ];

        $('.is-invalid').removeClass('is-invalid');

        for (const validation of validations) {
            if (validation.condition) {
                $(`#${validation.field}`).addClass('is-invalid');
                alert(validation.message);
                return;
            }
        }

        // Format WhatsApp message
        const message = `*Pendaftaran Play Pass Baru!*%0A
--------------------------------%0A
*Nama:* ${formData.name}%0A
*Email:* ${formData.email}%0A
*Paket:* ${formData.subscription}%0A
--------------------------------`;
        
        window.open(`https://wa.me/6285643025633?text=${encodeURIComponent(message)}`, '_blank');
        
        this.reset();
        $('.is-invalid').removeClass('is-invalid');
    });

    // Scroll handling
    const handleScroll = () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    // Smooth scroll
    const initSmoothScroll = () => {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800, 'easeInOutQuad');
            }
        });
    };

    // Mobile detection
    const isMobile = window.innerWidth <= 768;

    // Feature animations (desktop only)
    if (!isMobile) {
        document.querySelectorAll('.feature-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / item.clientWidth - 0.5) * 20;
                const y = ((e.clientY - rect.top) / item.clientHeight - 0.5) * 20;
                item.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Initialize
    handleFormValidation();
    window.addEventListener('scroll', handleScroll);
    initSmoothScroll();

    // Cleanup
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('scroll', handleScroll);
    });
});

// Add easing function if not included in jQuery
jQuery.easing.easeInOutQuad = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
};
