
let start = document.querySelector('.start');
start.addEventListener('click', goGame);

function getRandomHole() {
    let min = 1;
    let max = 5;
    let randNum = Math.random() * (max - min + 1) + min;
    numHole = Math.floor(randNum);
    let hole = document.getElementById(`${'hole_'}${numHole}`);
    return hole;
}

function getRandomAnimalName() {
    //Пытаемся вызвать имя мыши
    let chanceMouse = 0.4;//Вероятность вызова имени мыши
    if( Math.random() <= chanceMouse ) {
        return 'mouse';
    };

    //Если имя мыши не вызвано, то вызываем имя случайного животного
    let zoo = ['bear', 'cat', 'cow', 'fox', 'koala', 'lion', 'panda', 'tiger', 'rabbit', 'pig'];
    let arr = zoo;
    let min = 0;
    let max = zoo.length;
    let numberAnimal = Math.random() * (max - min);
    randAnimal = zoo[Math.floor(numberAnimal)];
    return randAnimal;
} 

function getRandomAnimal() {
    let animalName = getRandomAnimalName();
    let img = document.createElement('img');
    img.classList.add('animal');
    img.id = `${animalName}`;
    img.src = `${'img/animals/'}${animalName}${'.png'}`;
    img.alt = `${animalName}`;
    return img;    
}

//Запуск игры
function goGame() {
    //Получаем случайную нору и случайное животное
    let hole = getRandomHole();
    let animal = getRandomAnimal();

    //Вешаем обработчик клика на животное и вставляем животное в нору
    animal.addEventListener('mousedown', catchedAnimal);
    hole.appendChild(animal);

    //Убираем животное по таймеру и перезапускаем игру
    let removeTimer = setTimeout(removeAnimal, 1000);

    function removeAnimal() {
        hole.removeChild(animal);
        animal.removeEventListener('mousedown', catchedAnimal);
        restart();             
    }

    function restart() {
        setTimeout(goGame, 1000);
    }

    //Обработка клика
    function catchedAnimal(event) {
        clearTimeout(removeTimer); //Отменяем удаление животного по таймеру
        removeAnimal(); //Удаляем животное
        console.log(event.toElement);
    }
};


