var startQuiz = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var titleContainer = document.getElementById("title-page");
var pos = 0;
var correct = 0;
// var test, test_status, question, choice, choices, chA, chB, chC, chD;

var questions = [
    {
        question: "Commonly used Data types do not include:",
        a: "Strings",
        b: "boolean",
        c: "alerts",
        d: "numbers",
        correctAnswer: "c"
    },
    {
        question: "Arrays in Javascript can be used to store:",
        a: "numbers and strings",
        b: "other arrays",
        c: "boolean",
        d: "all of the above",
        correctAnswer: "d"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        a: "console.log",
        b: "Javascript",
        c: "terminal/bash",
        d: "for loops",
        correctAnswer: "a"
    },
    {
        question: "The condition in an if/else statement is enclosed with:",
        a: "curly brackets",
        b: "square brackets",
        c: "quotes",
        d: "paranthesis",
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed with ______ when being assigned to variables.",
        a: "curly brackets",
        b: "square brackets",
        c: "quotes",
        d: "paranthesis",
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

}

function get(x) {
    return document.getElementById(x);
}

function renderQuestion() {
    titleContainer.innerHTML = "";

    currentQuestion = "Question " + (pos + 1) + " of " + questions.length;
    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c;
    chD = questions[pos].d;
    // display the question
    // display the answer options
    // the += appends to the data we started on the line above
    
    quizContainer.innerHTML = "<h3>" + question + "</h3>";
    quizContainer.innerHTML += "<h4>" + currentQuestion + "</h4>";

    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + chB + "</label><br>";
    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br>";
    quizContainer.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chD + "</label><br>";
    quizContainer.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";

}

function nextQuestion() {
    if (pos > questions.length - 1) {
        showResults();
    } else {
        renderQuestion();
    }
}

function checkAnswer() {
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    // checks if answer matches the correct choice
    if (choice == questions[pos].correctAnswer) {
        //each time there is a correct answer this value increases
        correct++;
    }
    // changes position of which character user is on
    pos++;
    // then the renderQuestion function runs again to go to next question
    nextQuestion();
}

function showResults() {

    resultsContainer.innerHTML = "<h2> You got " + correct + " of " + questions.length + " questions correct </h2>";
    resultsContainer.innerHTML = "Test completed";
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;

}

startQuiz.addEventListener("click", nextQuestion);

startQuiz.addEventListener('click', countdown);
// submitButton.addEventListener('click', showResults);

