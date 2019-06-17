// GLOBALS
// Never reset
var correctAnswers = 0; // Incrementable
var incorrectAnswers = 0;
const questions = [
    'Where does Halloween come from?',
    'Before people used pumpkins, what were Jack O\' Lanterns made out of?',
    'In what year will the next full moon occur during Halloween?',
    'What item is banned only during Halloween from 12am October 31st to 12pm November 1st in Hollywood California?',
    'Pumpkins come in lots of different colours, but which one of these is made up?',
    'Where is Transylvania?',
    'What do you call a fear of Halloween?',
    'Which of these would be most useful if a werewolf attacked you?',
    'When do werewolves transform themselves?',
    'Victorians were big fans of spooky things, but why did they put bells in their coffins?'
];
const rightAnswers = [
    'An ancient festival to celebrate the dead',
    'Turnips',
    '2020',
    'Silly String',
    'Glow in the dark purple pumpkins',
    'Romania',
    'Samhainophobia',
    'A gun with silver bullets in it',
    'When there\'s a full moon',
    'In case they were buried alive by accident and needed to ring for help'
];
const allAnswers = [
    ['An ancient festival to celebrate the dead', 'Father Christmas\' birthday', 'The start of the pumpkin season', 'A motorway service station outside Birmingham'],
    ['Turnips', 'Potatoes', 'Bananas', 'Onions'],
    ['2020', '2021', '2022', ' 2023'],
    ['Silly String', 'Fireworks', 'Matches', 'Cotton Candy'],
    ['Glow in the dark purple pumpkins', 'Blue pumpkins', 'Green pumpkins', 'White pumpkins'],
    ['Romania', 'Hungary', 'Scotland', 'Nowhere - it\'s made up'],
    ['Samhainophobia', 'Spooky-itis', 'Acute Boring Syndrome', 'Deadly Pumpkin Disease'],
    ['A gun with silver bullets in it', 'A big stick', 'A cardboard box to hide in', 'A 10 second headstart to run away'],
    ['When there\'s a full moon', '10pm every second Tuesday of the month', 'During lunar eclipses', 'Whenever they feel like it'],
    ['In case they were buried alive by accident and needed to ring for help', 'So they could get into heaven easier', 'So their ghost could call for their supper', 'It made a nice tinkling noise at the funeral']
];

// Reset each game
var questionNumber = 0;

// Change during game
class TriviaQuestion {
    constructor(question, rightAnswer, allAnswers) {
        this.question = question,
            this.rightAnswer = rightAnswer,
            this.allAnswers = allAnswers;
    }
}

var currentQuestion;
var currentStage = 0; // Current game stage (0 - start screen, 1 - question, 2 - question over, 3 - game over)



// FUNCTIONS
function initializeGame() {
    currentQuestion = new TriviaQuestion(questions[questionNumber], rightAnswers[questionNumber], allAnswers[questionNumber]);

    updatePage(currentQuestion);

    currentStage++;
}

function updatePage(currentQuestion) {
    $('.question').text(currentQuestion.question); // Put the question on the screen

    for (let i = currentQuestion.allAnswers.length - 1; i > 0; i--) { // Randomize our answers
        let j = Math.floor(Math.random() * (i + 1));
        let temp = currentQuestion.allAnswers[i];
        currentQuestion.allAnswers[i] = currentQuestion.allAnswers[j];
        currentQuestion.allAnswers[j] = temp;
    }

    console.log(currentQuestion.allAnswers);

    for (let i = 0; i < currentQuestion.allAnswers.length; i++) { // Set up our answer buttons
        let newButton = $('<button>');
        newButton.text(currentQuestion.allAnswers[i]);
        newButton.on('click', function() {
            checkAnswer(newButton)
        });

        $('.answer-' + (i + 1)).append(newButton);
    }
}

function clearQuestion() {
    $('.question').text('');

    for (let i = 0; i < currentQuestion.allAnswers.length; i++) { // Set up our answer buttons
        $('.answer-' + (i + 1)).empty();
    }
}

function checkAnswer(answer) {
    if (currentQuestion.rightAnswer === $(answer).text()) {
        $('#result').text('That\'s right! Tha answer was ' + $(answer).text())
        clearQuestion();
    }
    else {
        clearQuestion();
    }
}



// FUNCTION CALLS
$('#startButton').on('click', function() {
    initializeGame();

    $('#startGame').css('display', 'none');
});