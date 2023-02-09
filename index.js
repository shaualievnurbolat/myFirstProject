
const errors = document.querySelector('.errors'),
      time = document.querySelector('.timeContent'),
      accuracy = document.querySelector('.accuracy'),
      typingText = document.querySelector('.text'),
      inputText = document.querySelector('.input_area')

let timer = null,

    // счетчик ошибок
    error = null,

    // внутри будет хранит массив символов предложение
    currentText = '',

    // счетчик предложение
    counter = 0,

    // счетчик введенных символов, понадобится для вычисление wpm cpm 
    characterTyped = 0,

    // сохраняет все ошибки от каждого предложение
    total_error = 0,

    // счетчик времени для вычисление wpm cpm 
    timeElapsed = 0

let textArray = [
    "Древние люди тоже умели рисовать, и рисовали часто.",
    "Вот только бумаги у них не было, поэтому рисовали они на стенах пещер.",
    "В пещерах Франции и Испании открыты настоящие картинные галереи каменного века, на которых изображены люди, олени, буйволы, зубры.",
    "Древние люди считали, что если носить при себе частицы зверя",
    "(например, ожерелье из клыков барса), то приобретаешь его силу, выносливость, бесстрашие.",
    "Слово Акрополь в переводе с греческого означает 'верхний город'.",
    "Так в странах Древнего мира называли городскую крепость.",
    "Акрополь служил защитой во время опасности, там хранили сокровища и оружие города.",
    "Парфенон украшали скульптуры, а на высоте 12 метров сплошной полосой проходил знаменитый фриз,",
    "на котором были изображены более 227 животных и 365 человек."
];

// значение по умолчанию для таймера
time.value = 60


// Функция для запуска игры
function startGame() {

    updateText();
  
    // удаляет старый таймер и создает новый таймер 
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

}

// Функции для обновлении таймера 
function updateTimer() {

    let numTime = Number(time.value)

    if (numTime > 0) {
        numTime--

        // счетчик времени для вычисление wpm, cpm 
        timeElapsed++ 

        time.value = numTime
    } else {
        finishGame()
    }
}

// Функция для того чтобы обновить предложение
function updateText() {

    typingText.textContent = ''
    currentText = textArray[counter]

    currentText.split('').forEach(item => {
        const span = document.createElement('span')
        span.innerHTML = item
        typingText.append(span)
    })

    if (counter < textArray.length - 1) {
        counter++
    } else {
        counter = 0
    }

}

// Функция для проверки корректности введенных символов
function processCheck() {

    let inputCurr = inputText.value
    let inputCurrArr = inputCurr.split('')

    characterTyped++

    error = 0

    typingText.querySelectorAll('span').forEach((item, i) => {

        let typedSymbol = inputCurrArr[i]
        console.log(typedSymbol)

        if (typedSymbol == null) {
            console.log('null')
            item.classList.remove('correct_char');
            item.classList.remove('incorrect_char');
      
            // правильные символы
        } else if (typedSymbol === item.innerText) {
            console.log('done')
            item.classList.add('correct_char');
            item.classList.remove('incorrect_char');
      
            // ошибки
        } else {
            console.log('error')
            item.classList.add('incorrect_char');
            item.classList.remove('correct_char');
      
            // 
            error++;
        }
    })

    errors.textContent = total_error + error;

    let correctCharacters = (characterTyped - (total_error + error));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy.textContent = Math.round(accuracyVal);

    if (inputCurr.length == currentText.length) {
        updateText();

        total_error += error

        inputText.value = ''
    }
}



// inputText.addEventListener('click', startGame)
function finishGame() {
    clearInterval(timer)

    typingText.textContent = 'Click on restart to start a new game.'
    inputText.textContent = ''

    let wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    console.log(cpm)
    console.log(wpm)

    document.querySelector('.wpmContent').textContent = wpm;

    document.querySelector('.wpm').style.display = "flex";

}


function order() {
    let audio = new Audio();
    audio.src = 'sound/cb08c3923b42e5c.mp3';
    audio.autoplay = true;
    return true;
}
  
