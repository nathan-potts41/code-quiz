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

var startQuiz = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var scoreboardContainer = document.getElementById("scoreboard");
var submitButton = document.getElementById("submit");
var titleContainer = document.getElementById("title-page");
var resetButton = document.getElementById("rstBtn");
var timeLeft = questions.length * 15;
var timerID;
var highScore = [];
var finalScore;
var initials;
var scoreboard;
var pos = 0;
var correct = 0;

function countdown() {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        showResults();
    };
};

function renderQuestion() {

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

function beginQuiz() {
    titleContainer.style.display = "none";
    resetButton.style.display = "none";
    submitButton.style.display = "none";

    timerID = setInterval(countdown, 1000);
    
    timerEl.textContent = timeLeft;

    nextQuestion();
};

function nextQuestion() {
    if (pos > questions.length - 1) {
        clearInterval(timerID);
        timerEl.textContent = "";
        quizContainer.innerHTML = "";
        showResults();
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
    } else {
        timeLeft -= 5;
        quizContainer.innerHTML = "Incorrect!";
    }
    // changes position of which character user is on
    pos++;
    // then the renderQuestion function runs again to go to next question
    nextQuestion();
};

function showResults() {
    submitButton.style.display = "block";

    finalScore = correct
    results = "You got " + finalScore + " of " + questions.length + " questions correct";

    resultsContainer.innerHTML = "Test completed";
    resultsContainer.innerHTML += "<h2>" + results + "</h2>";
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;

    var form = document.createElement("form");
    form.setAttribute("method", "post");

    var FN = document.createElement("input");
    FN.setAttribute("method", "post");
    FN.setAttribute("type", "text");
    FN.setAttribute("name", "initials");
    FN.setAttribute("id", "initial")
    FN.setAttribute("placeholder", "Initials");
    resultsContainer.innerHTML += "<h1> Your HighScore <h1>"
    resultsContainer.innerHTML += "<h2>" + finalScore + "</h2>";

    form.appendChild(FN);
    resultsContainer.appendChild(form);
    // stops rest of renderQuestion function running when test is completed
    // inputResults(finalScore);
};

function addToStorage() {
    initials = document.getElementById("initial").value;
    highScore.push({ initials, finalScore });
    console.log(highScore);

    var scoreboard = localStorage.setItem("highScore", JSON.stringify(highScore));
    delete finalScore;
    delete initials;
    viewScoreboard();
};

function resetTest() {
    scoreboardContainer.innerHTML = "";

    titleContainer.style.display = "block";

    resetButton.style.display = "block";

    delete timerID;
    delete timeLeft;
}

function viewScoreboard() {
    resultsContainer.innerHTML = '';
    highScore = JSON.parse(localStorage.getItem("highScore"));
    scoreboard = document.getElementById("scoreboard");
    for(let i = 0; i < localStorage.length; i++) {
        scoreboard.innerHTML = "<h2> Initials: " + highScore[i].initials + "</h2>";
        scoreboard.innerHTML += "<h2> Score: " + highScore[i].finalScore + "</h2>";
    };

    resetButton.style.display = "block";
    scoreboardContainer.appendChild(resetButton);
};

startQuiz.addEventListener("click", beginQuiz);

submitButton.addEventListener("click", addToStorage);
