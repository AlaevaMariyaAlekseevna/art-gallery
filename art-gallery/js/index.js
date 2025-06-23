document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const slideCount = slides.length;
    
    // Инициализация слайдера
    function initSlider() {
        updateSlider();
        startSlideShow();
    }
    
    // Обновление позиции слайдера
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновление активных точек
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    // Предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Автопереключение слайдов
    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Обработчики событий
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideShow();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideShow();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            startSlideShow();
        });
    });
    
    // Анимация при прокрутке с показом и скрытием
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        const windowHeight = window.innerHeight;
        const offset = 100;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - offset && elementPosition > offset) {
                element.classList.add('animated');
            } else {
                element.classList.remove('animated');
            }
        });
    }
    
    // Инициализация
    initSlider();
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
