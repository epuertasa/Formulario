document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('incident-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Get checkboxes (multiple values)
            const components = formData.getAll('components');
            data.components = components;

            console.log('Incidència rebuda:', data);

            // Simple feedback for the user
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviant...';

            setTimeout(() => {
                submitBtn.style.backgroundColor = '#28a745';
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviat Correctament';
                
                alert('Gràcies! Hem rebut la teva incidència. Un tècnic es posarà en contacte amb tu en breu.');
                
                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.innerText = originalText;
                }, 2000);
            }, 1500);
        });
    }

    // Smooth scroll for anchor links
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

    // Add scroll effect to header - Removed for cleaner UX

    // =========================================
    // TESTIMONIALS CAROUSEL
    // =========================================
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track) {
        const slides = track.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoPlayInterval = null;

        // Build dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Testimoni ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goTo(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        function goNext() { goTo(currentIndex + 1); }
        function goPrev() { goTo(currentIndex - 1); }

        nextBtn.addEventListener('click', () => { goNext(); resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { goPrev(); resetAutoPlay(); });

        // Auto-play every 4 seconds
        function startAutoPlay() {
            autoPlayInterval = setInterval(goNext, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        startAutoPlay();

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', startAutoPlay);

        // Touch swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goNext() : goPrev();
                resetAutoPlay();
            }
        });
    }
});

