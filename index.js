// кнопка "Начать"
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
// время
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $gameTime = document.querySelector('#game-time');
// заголовки
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
// массив colors
const colors = ['#FFBF00', '#CCCCFF', '#6495ED', '#DE3163', '#9FE2BF', '#40E0D0', '#DFFF00', '#008080'];
// кол-во нажатий
let score = 0;
let isGameStartes = false;
// добавляем события
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);
// удаляем элементы
function show($el) {
   $el.classList.remove('hide')
};
// добавляем элементы
function hide($el) {
   $el.classList.add('hide')
};
// начало игры
function startGame() {
   // обнуляем значения игры - время
   score = 0;
   setGameTime();

   $gameTime.setAttribute('disabled', true);

   isGameStartes = true;
   // меняем фон игры после нажатия на кнопку "Начать"
   $game.style.cssText = "background-color: #ffffff;"
   // скрываем кнопку после нажатия на кнопку "Начать"
   hide($start);

   // делаем интервал (каждое определенное время будет срабатывать интервал)
   const interval = setInterval(function() {
      const time = parseFloat($time.textContent);

      if (time <= 0) {
         clearInterval(interval)
         endGame();
      } else {
         $time.textContent = (time - 0.1).toFixed(1);
      }
   }, 100);

   renderBox();
};
// вывод результата
function setGameStore() {
   $result.textContent = score.toString();
};
// устанавливаем время для игры
function setGameTime() {
   const timeInput = parseInt($gameTime.value);
   $time.textContent = timeInput.toFixed(1);   
   
   show($timeHeader); 
   hide($resultHeader);
};
// конец игры
function endGame() {
   isGameStartes = false;
   setGameStore();
   $gameTime.removeAttribute('disabled');

   show($start);
   $game.innerHTML = "";
   $game.style.backgroundColor = "#ccc";

   hide($timeHeader);
   show($resultHeader);
};
// клик на квадрат
function handleBoxClick(event) {
   if (!isGameStartes) {
      return;
   }
   // если кликнули на наш квадрат, то передаем на повторное генерацию квадрата
   if (event.target.dataset.box) {
      score++;

      renderBox();
   }
};
// рaндомные квадраты
function renderBox() {
   // чтобы квадрат не дублировался, то есть прошлый удаляется
   $game.innerHTML = '';
   // создаем <div></div>
   const divBox = document.createElement('div');

   // динамические значения
   const boxSize =  getRandom(30, 100);
   const gameSize = $game.getBoundingClientRect();
   const maxTop = gameSize.height - boxSize;
   const maxLeft = gameSize.width - boxSize;
   const randomColorsIndex = getRandom(0, colors.length);

   // стили
   divBox.style.height = divBox.style.width = boxSize + 'px';
   divBox.style.position = 'absolute';
   divBox.style.backgroundColor = colors[randomColorsIndex];
   divBox.style.top = getRandom(0, maxTop) + 'px';
   divBox.style.left = getRandom(0, maxLeft) + 'px';
   divBox.style.cursor = 'pointer';

   // добавили атрибу data-box="true" для <div></div>
   divBox.setAttribute('data-box', 'true');

   // добавление элемента в DOM дерева относительно элемента, 
   // вызвавшего метод
   $game.insertAdjacentElement('afterbegin', divBox);
};
// формула для рандомного значения квадрата (-1)
function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
};