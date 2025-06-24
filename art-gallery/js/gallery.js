        // Функционал для миниатюр
        document.addEventListener('DOMContentLoaded', function() {
            // Получаем все миниатюры и основное изображение
            const thumbnails = document.querySelectorAll('.thumbnail');
            const mainImage = document.getElementById('main-image');
            
            // Добавляем обработчик клика для каждой миниатюры
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    // Удаляем класс active у всех миниатюр
                    thumbnails.forEach(t => t.classList.remove('active'));
                    // Добавляем класс active к текущей миниатюре
                    this.classList.add('active');
                    // Обновляем основное изображение
                    mainImage.src = this.src;
                    mainImage.alt = this.alt;
                });
            });
            // Модальное окно для увеличенного изображения
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-image');
            const captionText = document.getElementById('caption');
            mainImage.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
            document.querySelector('.close').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            // Функционал для отзывов
            const reviewForm = document.getElementById('review-form');
            const reviewsContainer = document.getElementById('reviews-container');
            // Загружаем отзывы из localStorage
            loadReviews();
            // Обработчик отправки формы отзыва
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const author = document.getElementById('review-author').value;
                const rating = document.getElementById('review-rating').value;
                const text = document.getElementById('review-text').value;
                const date = new Date().toLocaleDateString('ru-RU');
                // Создаем новый отзыв
                const newReview = {
                    author,
                    rating,
                    text,
                    date
                };
                // Сохраняем отзыв
                saveReview(newReview);
                // Добавляем отзыв на страницу
                addReviewToPage(newReview);
                // Очищаем форму
                reviewForm.reset();
            });
            // Функция для сохранения отзыва в localStorage
            function saveReview(review) {
                let reviews = JSON.parse(localStorage.getItem('artwork-reviews')) || [];
                reviews.push(review);
                localStorage.setItem('artwork-reviews', JSON.stringify(reviews));
            }
            // Функция для загрузки отзывов из localStorage
            function loadReviews() {
                const reviews = JSON.parse(localStorage.getItem('artwork-reviews')) || [];   
                // Очищаем контейнер от стандартных отзывов
                reviewsContainer.innerHTML = '';
                // Добавляем каждый отзыв на страницу
                reviews.forEach(review => {
                    addReviewToPage(review);
                });
                // Если нет отзывов, добавляем стандартные
                if (reviews.length === 0) {
                    const defaultReviews = [
                        {
                            author: 'Анна К.',
                            rating: '5',
                            text: 'Потрясающая картина! Видеть ее вживую - совершенно другой опыт, чем на репродукциях. Энергия мазков просто завораживает.',
                            date: '15 мая 2023'
                        },
                        {
                            author: 'Михаил П.',
                            rating: '4',
                            text: 'Очень мощное впечатление, но хотелось бы больше информации о технике создания и истории картины прямо рядом с экспозицией.',
                            date: '3 мая 2023'
                        },
                        {
                            author: 'Елена С.',
                            rating: '5',
                            text: 'Этот шедевр стоит того, чтобы приехать в галерею специально для него. Особенно впечатляет игра света на рельефных мазках краски.',
                            date: '22 апреля 2023'
                        }
                    ]; 
                    defaultReviews.forEach(review => {
                        addReviewToPage(review);
                    });
                }
            }
            // Функция для добавления отзыва на страницу
            function addReviewToPage(review) {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';   
                // Создаем звезды рейтинга
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    if (i < parseInt(review.rating)) {
                        stars += '★';
                    } else {
                        stars += '☆';
                    }
                }
                reviewItem.innerHTML = `
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <span class="review-rating">${stars}</span>
                    </div>
                    <p class="review-text">${review.text}</p>
                    <p class="review-date">${review.date}</p>
                `;
                reviewsContainer.prepend(reviewItem);
            }
        });