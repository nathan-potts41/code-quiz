var startQuiz = document.getElementById("start-btn");
var timerEl = document.getElementById("timer");
console.log(timerEl);



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
    console.log(countdown);
}

startQuiz.onclick = countdown;


