// Массив с позициями для 5 кнопок
const buttonPositions = [
    { top: '20%', left: '50%' },
    { top: '80%', left: '80%' },
    { top: '60%', left: '20%' },
    { top: '30%', left: '10%' },
    { top: '70%', left: '50%' }
];

// Функция для показа следующей кнопки
function showNextButton(step) {
    if (step === 1) {
        document.getElementById('start-screen').classList.remove('active');
    }

    if (step === 5) {
        createButton(step);
        return;
    }

    createButton(step);
}

// Функция для создания и отображения кнопки
function createButton(step) {
    const buttonsContainer = document.getElementById('buttons-container');
    const newButton = document.createElement('button');
    
    newButton.innerText = 'Нажми на меня';
    newButton.style.top = buttonPositions[step - 1].top;
    newButton.style.left = buttonPositions[step - 1].left;
    newButton.classList.add('fade-in-button');
    
    newButton.onclick = () => {
        // Создаем сердечки вокруг кнопки
        if (typeof createHeartsAt === 'function') {
            const rect = newButton.getBoundingClientRect();
            createHeartsAt(rect.left + rect.width/2, rect.top + rect.height/2, 12);
        }
        
        if (step === 5) {
            hideButtonAndRedirect(newButton);
        } else {
            hideButton(newButton, step + 1);
        }
    };
    
    buttonsContainer.appendChild(newButton);
}

// Функция для скрытия кнопки с анимацией
function hideButton(button, nextStep) {
    button.classList.remove('fade-in-button');
    button.classList.add('fade-out-button');
    
    setTimeout(() => {
        button.remove();
        showNextButton(nextStep);
    }, 500);
}

// Функция для скрытия кнопки и перехода на новую страницу
function hideButtonAndRedirect(button) {
    button.classList.remove('fade-in-button');
    button.classList.add('fade-out-button');
    
    // Создаем финальный салют из сердечек
    createFinalHeartSalute();
    
    setTimeout(() => {
        window.location.href = 'congratulations.html';
    }, 2000);
}

// Финальный салют из сердечек перед переходом
function createFinalHeartSalute() {
    const container = document.getElementById('hearts-container');
    
    // Очень много сердечек!
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            // Из центра экрана
            heart.style.left = '50%';
            heart.style.top = '50%';
            
            // Разный размер
            const size = 15 + Math.random() * 40;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Анимация разлета
            const angle = Math.random() * 2 * Math.PI;
            const distance = 80 + Math.random() * 120;
            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;
            
            heart.style.animation = `heartBurst 2.5s ease-out forwards`;
            heart.style.setProperty('--translate-x', translateX + 'px');
            heart.style.setProperty('--translate-y', translateY + 'px');
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, 2500);
        }, i * 15);
    }
}

console.log('Игровой скрипт загружен - кнопки готовы!');    