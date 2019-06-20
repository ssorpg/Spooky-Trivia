// GLOBALS
// Never change
const questions = [ // Can add as many questions as we want
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
const rightAnswers = [ // Answer in position rightAnswers[i] is the answer to question in position questions[i]
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
const allAnswers = [ // Answers in position allAnswers[i] are the wrong answers to question in position questions[i]
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

// Change during game
var correctAnswers = 0; // Incrementable
var incorrectAnswers = 0;
var questionNumber = 0;
var timeToAnswer = 0;

var currentQuestion;
var currentTimeout;
var currentInterval;


class TriviaQuestion { // Our question object, because classes are fun :)
    constructor(question, rightAnswer, allAnswers) {
        this.question = question,
            this.rightAnswer = rightAnswer,
            this.allAnswers = allAnswers;
    }
}



// FUNCTIONS
function initializeGame() {
    currentQuestion = new TriviaQuestion(questions[questionNumber], rightAnswers[questionNumber], allAnswers[questionNumber]);

    clearPage();
    if (questionNumber === questions.length) { // We went through all the questions
        triviaComplete(); // Finish the game
        return;
    }

    updatePage(currentQuestion);
}

function countDown() {
    timeToAnswer = 10;  // Sets how many seconds to answer

    currentTimeout = setTimeout(function () { // Behind the scenes timer
        timesUp(); // Didn't answer in time
    }, timeToAnswer * 1000); // In milliseconds

    $('.timer').text('Time Left: ' + timeToAnswer + 's'); // We want this to be called right away

    currentInterval = setInterval(function() { // Visible timer
        timeToAnswer--; // Lost one second
        $('.timer').text('Time Left: ' + timeToAnswer + 's'); // Set timer display
    }, 1000); // Count down once per second
}

function updatePage(currentQuestion) {
    $('.question').text(currentQuestion.question); // Put the question on the screen
    countDown(); // Start question timer

    for (let i = currentQuestion.allAnswers.length - 1; i > 0; i--) { // Randomize our answers
        let j = Math.floor(Math.random() * (i + 1));
        let temp = currentQuestion.allAnswers[i];
        currentQuestion.allAnswers[i] = currentQuestion.allAnswers[j];
        currentQuestion.allAnswers[j] = temp;
    }

    for (let i = 0; i < currentQuestion.allAnswers.length; i++) { // Set up our answer buttons
        let newButton = $('<button>');
        newButton.text(currentQuestion.allAnswers[i]);
        newButton.on('click', function () {
            checkAnswer(newButton);
        });

        $('.answer-' + i).append(newButton);
    }
}

function clearPage() { // Clear the page
    $('.clearMe').text('');
    $('.clearMe').empty();
}

function checkAnswer(answer) {
    if (currentQuestion.rightAnswer === $(answer).text()) { // Selected the correct answer
        correctAnswers++;

        clearPage();
        $('#result').text('That\'s right!');
    }
    else { // Selected the wrong answer
        incorrectAnswers++;

        clearPage();
        $('#result').text('That\'s incorrect.');
        $('#correctAnswer').text('The answer was \'' + currentQuestion.rightAnswer + '\'.'); // Display the right answer
    }
    clearTimeout(currentTimeout); // Cancel our countdowns
    clearInterval(currentInterval);
    nextQuestion();
}

function timesUp() {
    incorrectAnswers++;
    clearPage();
    $('#result').text('Time\'s up!');
    $('#correctAnswer').text('The answer was \'' + currentQuestion.rightAnswer + '\'.');

    clearInterval(currentInterval); // Need to make sure our interval doesn't keep counting
    nextQuestion();
}

function nextQuestion() {
    questionNumber++; // Next question in questions array
    setTimeout(function () { // Timer until next question is displayed
        initializeGame();
    }, 3000);
}

function triviaComplete() { // End of the game
    $('#result').text('Quiz complete!');
    $('#correctAnswer').text('You answered ' + correctAnswers + ' questions correctly.');
    $('#incorrectAnswer').text('You answered ' + incorrectAnswers + ' questions incorrectly.');
    $('#startGame').css('display', 'flex'); // We want our start button back
}



// DIRECT FUNCTION CALLS
$('#startButton').on('click', function () {
    correctAnswers = 0; // Reset our variables for a new game
    incorrectAnswers = 0;
    questionNumber = 0;

    $('#startGame').css('display', 'none'); // Our start button disappears!
    $('#startButton').text('Restart'); // Start button now becomes our restart button

    initializeGame(); // Start the game!
});