
let start = document.querySelector('.start');
start.addEventListener('click', beginGame);

//Запуск игры
function beginGame() {
    let pointsSuccess = document.querySelector('.couter__points-success');
        pointsSuccess.innerHTML = 0;

    goGame();

    function goGame() {
        //Получаем случайную нору и случайное животное
        let hole = randomValue.getRandomHole();
        let animal = randomValue.getRandomAnimal();

        //Вешаем обработчик клика на животное и вставляем животное в нору
        animal.addEventListener('mousedown', catchedAnimal);
        hole.appendChild(animal);

        //Убираем животное по таймеру и перезапускаем игру
        let timer = setTimeout(newCycle, 3000);

        function newCycle() {
            hole.removeChild(animal);
            animal.removeEventListener('mousedown', catchedAnimal);
            restart();             
        }

        function restart() {
            setTimeout(goGame, 1000);
        }

        //Обработка клика
        function catchedAnimal(event) {
            clearTimeout(timer); //Отменяем удаление животного по таймеру
            checkClick (event);
            newCycle(); //Запускаем новый цикл
            console.log(event.toElement);
        }

        //Запись очков и жизней
        function checkClick (event) {
            let animalName = event.toElement.id;
            if (animalName === 'mouse') {
                newGame.scope += 10;
                pointsSuccess.innerHTML = newGame.scope;
            }
            console.log(animalName);
            console.log(newGame.scope);

        }
    }
};

//Генератор случайных нор и животных
let randomValue = {
    getRandomHole() {
        let min = 1;
        let max = 5;
        let randNum = Math.random() * (max - min + 1) + min;
        let numHole = Math.floor(randNum);
        let hole = document.getElementById(`${'hole_'}${numHole}`);
        return hole;
    },

    getRandomAnimalName() {
        //Пытаемся вызвать имя мыши
        let chanceMouse = 0.4;//Вероятность вызова имени мыши
        if( Math.random() <= chanceMouse ) {
            return 'mouse';
        };
        //Если имя мыши не вызвано, то вызываем имя случайного животного
        let zoo = ['bear', 'cat', 'cow', 'fox', 'koala', 'lion', 'panda', 'tiger', 'rabbit', 'pig'];
        let min = 0;
        let max = zoo.length;
        let numberAnimal = Math.random() * (max - min);
        let randAnimal = zoo[Math.floor(numberAnimal)];
        return randAnimal;
    },

    getRandomAnimal() {
        let animalName = this.getRandomAnimalName();
        let img = document.createElement('img');
        img.classList.add('animal');
        img.id = `${animalName}`;
        img.src = `${'img/animals/'}${animalName}${'.png'}`;
        img.alt = `${animalName}`;
        return img;    
    },
};

class Game {
    constructor () {
        this.scope = 0;
        this.lives = 3;
        this.isRunning = false;
        this.isMouse = false;
    }



};

let newGame = new Game();


