        // Инициализация карты
        ymaps.ready(init);
        function init() {
            // Создаем карту
            const map = new ymaps.Map("map", {
                center: [56.129057, 40.406635], // Координаты Владимира (примерные)
                zoom: 15
            });
            // Добавляем метку
            const marker = new ymaps.Placemark([56.129057, 40.406635], {
                hintContent: 'Галерея "Вдохновение"',
                balloonContent: 'г. Владимир, ул. Искусств, д. 15'
            });
            map.geoObjects.add(marker);
        }
        // Валидация формы
        document.getElementById('feedbackForm').addEventListener('submit', function(event) {
            event.preventDefault();   
            let isValid = true;
            const form = event.target;
            // Валидация имени
            const nameInput = form.elements['name'];
            const nameError = document.getElementById('nameError');
            if (!nameInput.validity.valid) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            // Валидация email
            const emailInput = form.elements['email'];
            const emailError = document.getElementById('emailError');
            if (!emailInput.validity.valid) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            // Валидация темы
            const subjectInput = form.elements['subject'];
            const subjectError = document.getElementById('subjectError');
            if (!subjectInput.value) {
                subjectError.style.display = 'block';
                isValid = false;
            } else {
                subjectError.style.display = 'none';
            }
            // Валидация сообщения
            const messageInput = form.elements['message'];
            const messageError = document.getElementById('messageError');
            if (!messageInput.validity.valid) {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            // Если форма валидна, можно отправить данные
            if (isValid) {
                // Собираем данные формы
                const formData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value,
                    timestamp: new Date().toISOString()
                };   
                // В реальном проекте здесь был бы AJAX-запрос к серверу
                console.log('Данные формы:', formData);
                // Сохраняем в localStorage для демонстрации
                saveFormData(formData);
                alert('Форма успешно отправлена! Спасибо за ваше сообщение.');
                form.reset();
            }
        });
        // Функция для сохранения данных формы
        function saveFormData(data) {
            // Получаем текущие данные из localStorage
            let savedForms = JSON.parse(localStorage.getItem('feedbackForms') || '[]'); 
            // Добавляем новые данные
            savedForms.push(data);
            // Сохраняем обратно в localStorage
            localStorage.setItem('feedbackForms', JSON.stringify(savedForms));
            console.log('Данные сохранены в localStorage. Всего сообщений:', savedForms.length);
        }
        // Динамическая валидация при вводе
        document.querySelectorAll('#feedbackForm input, #feedbackForm textarea, #feedbackForm select').forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    if (this.validity.valid) {
                        errorElement.style.display = 'none';
                    } else {
                        errorElement.style.display = 'block';
                    }
                }
            });
        });