var startQuiz = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var titleContainer = document.getElementById("title-page");
var pos = 0;
var correct = 0;

var questions = [
    {
        question: "Commonly used Data types do not include:",
        answers: {
            a: "Strings",
            b: "boolean",
            c: "alerts",
            d: "numbers"
        },
        correctAnswer: "c"
    },
    {
        question: "Arrays in Javascript can be used to store:",
        answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "boolean",
            d: "all of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            a: "console.log",
            b: "Javascript",
            c: "terminal/bash",
            d: "for loops"
        },
        correctAnswer: "a"
    },
    {
        question: "The condition in an if/else statement is enclosed with:",
        answers: {
            a: "curly brackets",
            b: "square brackets",
            c: "quotes",
            d: "paranthesis"
        },
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed with ______ when being assigned to variables.",
        answers: {
            a: "curly brackets",
            b: "square brackets",
            c: "quotes",
            d: "paranthesis"
        },
        correctAnswer: "b"
    },
];

//Timer function section

function countdown() {
    var timeLeft = 75;

    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
        }
    }, 1000);

};

function stopCountdown() {
    if (pos > questions.length) {
        timerEl.textContent = '';
        clearInterval(timeInterval);
        console.log(timeInterval);
        console.log(timerEl);
    }
    showResults();
};

function get(x) {
    return document.getElementById(x);
};

function renderQuestion() {
    titleContainer.innerHTML = "";

    currentQuestion = "Question " + (pos + 1) + " of " + questions.length;
    question = questions[pos].question;
    chA = questions[pos].answers.a;
    chB = questions[pos].answers.b;
    chC = questions[pos].answers.c;
    chD = questions[pos].answers.d;
    // display the question
    // display the answer options
    // the += appends to the data we started on the line above

    quizContainer.innerHTML = "<h3>" + question + "</h3>";
    quizContainer.innerHTML += "<h4>" + currentQuestion + "</h4>";

    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='a'> " + chA + "</label><br>";
    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='b'> " + chB + "</label><br>";
    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='c'> " + chC + "</label><br>";
    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='d'> " + chD + "</label><br>";
    quizContainer.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";

};

function nextQuestion() {
    if (pos > questions.length - 1) {
        quizContainer.innerHTML = "";
        stopCountdown();
    } else {
        renderQuestion();
    }
};

function checkAnswer() {
    // use getElementsByName because we have an array which it will loop through
    var choices = document.getElementsByName('choices');
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            var choice = choices[i].value;
            console.log(choice);
        }
    }

    // checks if answer matches the correct choice
    if (choice === questions[pos].correctAnswer) {
        //each time there is a correct answer this value increases
        correct++;
    }
    // changes position of which character user is on
    pos++;
    // then the renderQuestion function runs again to go to next question
    nextQuestion();
};

function showResults() {
    results = "You got " + correct + " of " + questions.length + " questions correct";
    console.log(correct)

    resultsContainer.innerHTML = "Test completed";
    resultsContainer.innerHTML += "<h2>" + results + "</h2>";
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;

};

startQuiz.addEventListener("click", nextQuestion);

startQuiz.addEventListener('click', countdown);
// submitButton.addEventListener('click', showResults);

