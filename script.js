$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = 3;
    const form = $('#registrationForm');

    // Validate current step
    function validateStep() {
        const currentSection = $(`.form-section[data-section="${currentStep}"]`);
        let isValid = true;

        // Clear previous errors
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();

        // Validate required fields
        currentSection.find('[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            }
        });

        // Special validation for email
        if (currentStep === 1) {
            const email = $('#email').val();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                $('#email').addClass('is-invalid');
                isValid = false;
            }
        }

        return isValid;
    }

    // Handle next button
    $('.btn-next').click(function() {
        if (validateStep()) {
            currentStep++;
            updateFormDisplay();
        }
    });

    // Handle previous button
    $('.btn-prev').click(function() {
        currentStep--;
        updateFormDisplay();
    });

    // Handle subscription selection
    $('.subscription-card').click(function() {
        $('.subscription-card').removeClass('selected');
        $(this).addClass('selected');
        $('#subscription').val($(this).data('value'));
    });

    // Update form display
    function updateFormDisplay() {
        // Update sections
        $('.form-section').removeClass('active').hide();
        $(`.form-section[data-section="${currentStep}"]`).addClass('active').show();

        // Update steps
        $('.step').removeClass('active');
        for (let i = 1; i <= currentStep; i++) {
            $(`.step[data-step="${i}"]`).addClass('active');
        }

        // Update buttons
        $('.btn-prev').toggle(currentStep > 1);
        $('.btn-next').toggle(currentStep < totalSteps);
        $('.btn-submit').toggle(currentStep === totalSteps);
    }

    // Handle form submission
    form.on('submit', function(e) {
        e.preventDefault();
        if (validateStep()) {
            // Mengambil nilai dari form
            const name = $('#name').val();
            const email = $('#email').val();
            const subscription = $('#subscription').val();
            
            // Membuat pesan untuk WhatsApp
            let message = `Halo, saya ingin mendaftar Play Pass!%0A%0A`;
            message += `Nama: ${name}%0A`;
            message += `Email: ${email}%0A`;
            message += `Paket: ${subscription === 'monthly' ? 'Bulanan' : 'Tahunan'}%0A`;
            
            // Nomor WhatsApp tujuan
            const phoneNumber = '6285876825407';
            
            // Membuat URL WhatsApp
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Tampilkan loading
            Swal.fire({
                title: 'Memproses...',
                text: 'Mohon tunggu sebentar',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            // Simulasi delay untuk UX yang lebih baik
            setTimeout(() => {
                // Redirect ke WhatsApp
                window.open(whatsappURL, '_blank');
                
                // Reset form
                form[0].reset();
                currentStep = 1;
                updateFormDisplay();
                
                // Tampilkan pesan sukses
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Formulir telah dikirim. Anda akan diarahkan ke WhatsApp.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#4285f4',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }, 1500);
        }
    });

    // Initialize form
    updateFormDisplay();
});
