document.addEventListener('DOMContentLoaded', function() {
    // Данные выставок
    const exhibitions = [
        {
            id: 1,
            image: "images/7c2ba6548114c5b244c45e773019ebb5.png",
            alt: "Современное искусство",
            date: "2023-06-10",
            name: "Современное искусство",
            title: "Современное искусство: новые имена",
            dateText: "10 июня - 10 июля 2023",
            description: "Экспозиция представляет работы молодых художников, работающих в различных техниках и направлениях.",
            popularity: 85,
            rating: "★ 4.8/5"
        },
        {
            id: 2,
            image: "images/967ed88c338b50e9af97c048a80c281b.jpg",
            alt: "Русский авангард",
            date: "2023-06-15",
            name: "Русский авангард",
            title: "Русский авангард: революция в искусстве",
            dateText: "15 июня - 15 августа 2023",
            description: "Уникальная коллекция работ художников русского авангарда из частных собраний.",
            popularity: 92,
            rating: "★ 4.9/5"
        },
        {
            id: 3,
            image: "images/vozrozhdenie(9).webp",
            alt: "Итальянское возрождение",
            date: "2023-06-20",
            name: "Итальянское возрождение",
            title: "Шедевры итальянского Возрождения",
            dateText: "20 июня - 20 сентября 2023",
            description: "Репродукции знаменитых работ мастеров эпохи Возрождения в высоком разрешении.",
            popularity: 78,
            rating: "★ 4.7/5"
        },
        {
            id: 4,
            image: "images/3eb635470d564298a3e977455eff5d52.jpg",
            alt: "Японская гравюра",
            date: "2023-07-01",
            name: "Японская гравюра",
            title: "Мир укиё-э: японская гравюра",
            dateText: "1 июля - 1 октября 2023",
            description: "Коллекция традиционных японских гравюр XVIII-XIX веков.",
            popularity: 81,
            rating: "★ 4.8/5"
        },
        {
            id: 5,
            image: "images/66b519425f06370375459befbd6c3420.jpg",
            alt: "Французский импрессионизм",
            date: "2023-07-10",
            name: "Французский импрессионизм",
            title: "Импрессионисты: свет и цвет",
            dateText: "10 июля - 10 ноября 2023",
            description: "Работы известных французских импрессионистов из музейных коллекций.",
            popularity: 88,
            rating: "★ 4.9/5"
        },
        {
            id: 6,
            image: "images/Фотография как искусство.webp",
            alt: "Современная фотография",
            date: "2023-08-01",
            name: "Современная фотография",
            title: "Фотография как искусство",
            dateText: "1 августа - 1 декабря 2023",
            description: "Выставка современных фотографов, работающих на стыке искусства и документалистики.",
            popularity: 76,
            rating: "★ 4.6/5"
        },
        {
            id: 7,
            image: "images/Абстракция и эмоция.jpg",
            alt: "Абстрактный экспрессионизм",
            date: "2023-08-15",
            name: "Абстрактный экспрессионизм",
            title: "Абстракция и эмоция",
            dateText: "15 августа - 15 января 2024",
            description: "Работы художников-абстракционистов середины XX века.",
            popularity: 82,
            rating: "★ 4.7/5"
        },
        {
            id: 8,
            image: "images/ab6a44b95238e4b6f61f572699b8f40e.jpg",
            alt: "Современная скульптура",
            date: "2023-09-01",
            name: "Современная скульптура",
            title: "Форма и пространство",
            dateText: "1 сентября - 1 марта 2024",
            description: "Современные скульптурные композиции из различных материалов.",
            popularity: 79,
            rating: "★ 4.7/5"
        }
    ];
    // Элементы DOM
    const exhibitionsContainer = document.getElementById('exhibitions-container');
    const paginationContainer = document.getElementById('pagination-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const sortButtons = document.querySelectorAll('.sort-btn');
    // Настройки пагинации
    let currentPage = 1;
    const itemsPerPage = 4;
    let filteredExhibitions = [...exhibitions];
    let sortDirection = { date: 'asc', name: 'asc', popularity: 'desc' };
    // Инициализация
    renderExhibitions();
    renderPagination();
    // Функция рендеринга выставок
    function renderExhibitions() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const exhibitionsToShow = filteredExhibitions.slice(startIndex, endIndex);
        exhibitionsContainer.innerHTML = exhibitionsToShow.map(exhibition => `
            <div class="exhibition-item" data-date="${exhibition.date}" data-name="${exhibition.name}" data-popularity="${exhibition.popularity}">
                <img src="${exhibition.image}" alt="${exhibition.alt}">
                <div class="exhibition-info">
                    <h2>${exhibition.title}</h2>
                    <p class="date">${exhibition.dateText}</p>
                    <p class="description">${exhibition.description}</p>
                    <span class="popularity">${exhibition.rating}</span>
                </div>
            </div>
        `).join('');
    }
    // Функция рендеринга пагинации
    function renderPagination() {
        const pageCount = Math.ceil(filteredExhibitions.length / itemsPerPage);   
        if (pageCount <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        let paginationHTML = '';
        // Кнопка "Назад"
        if (currentPage > 1) {
            paginationHTML += `<button class="page-btn prev" data-page="${currentPage - 1}">← Назад</button>`;
        }
        // Номера страниц
        for (let i = 1; i <= pageCount; i++) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        // Кнопка "Вперед"
        if (currentPage < pageCount) {
            paginationHTML += `<button class="page-btn next" data-page="${currentPage + 1}">Вперед →</button>`;
        }
        paginationContainer.innerHTML = paginationHTML;
        // Добавляем обработчики событий для кнопок пагинации
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentPage = parseInt(this.dataset.page);
                renderExhibitions();
                renderPagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
    // Функция фильтрации выставок
    function filterExhibitions() {
        const searchTerm = searchInput.value.toLowerCase();   
        filteredExhibitions = exhibitions.filter(exhibition => 
            exhibition.title.toLowerCase().includes(searchTerm) || 
            exhibition.description.toLowerCase().includes(searchTerm) ||
            exhibition.name.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderExhibitions();
        renderPagination();
    }
    // Функция сортировки выставок
    function sortExhibitions(sortBy) {
        filteredExhibitions.sort((a, b) => {
            let comparison = 0;       
            if (sortBy === 'date') {
                comparison = new Date(a.date) - new Date(b.date);
            } else if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortBy === 'popularity') {
                comparison = a.popularity - b.popularity;
            }
            return sortDirection[sortBy] === 'asc' ? comparison : -comparison;
        });
        // Меняем направление сортировки для следующего раза
        sortDirection[sortBy] = sortDirection[sortBy] === 'asc' ? 'desc' : 'asc';
        currentPage = 1;
        renderExhibitions();
        renderPagination();
    }
    // Обработчики событий
    searchButton.addEventListener('click', filterExhibitions);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterExhibitions();
        }
    });
    sortButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sortBy = this.dataset.sort;
            sortExhibitions(sortBy);     
            // Обновляем активную кнопку сортировки
            sortButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});