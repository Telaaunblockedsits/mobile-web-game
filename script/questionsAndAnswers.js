// var quizzes =  [
//     new QuizData("How much food is wasted in a year?", 
//     "5 tons", "1 million tons", "100 tons", "1.3 billion tons", 
//     "1.3 billion tons"),
//     new QuizData("What would make a celery crisp again?",
//     "Sunlight", "A bowl of water", "Fresh air", "None of the above",
//     "A bowl of water"),
//     new QuizData("How to store a carrot for longer?",
//     "Cut off the stem", "Store it with apples", "Wash it before storing",
//     "Keep the greens intact", "Cut off the stem"),
//     new QuizData("What can you not do with chocolate?",
//     "Compost it", "Remove oil marker ink on surfaces", 
//     "Make chocolate mug cake", "Feed it to a dog",
//     "Feed it to a dog"),
//     new QuizData("How to tell if an egg is not fresh in a float test?",
//     "Sinks and stands on one end", "Floats to the surface", 
//     "Sinks and lays flat on their side", "None of the above",
//     "Sinks and lays flat on their side")
// ];

let gameQuiz = new Quiz(quizzes);

function displayQuestion() {
    let q = document.getElementById("question");
    q.innerHTML = gameQuiz.getQuizData().question;
}

function displayChoices() {
    var optionA = gameQuiz.getQuizData().choiceA;
    var optionB = gameQuiz.getQuizData().choiceB;
    var optionC = gameQuiz.getQuizData().choiceC;
    var optionD = gameQuiz.getQuizData().choiceD;
    $("#btn1").html(optionA);
    $("#btn2").html(optionB);
    $("#btn3").html(optionC);
    $("#btn4").html(optionD);
}

function getUserChoice(id) {
    let choice = document.getElementById(id).innerHTML;
    gameQuiz.validateChoice(choice);
    quizApp();
}

// function setReviewColor() {
//     if(gameQuiz.getQuizData().reviewColor) {
//         window.location.href = "review.html";
//         document.getElementById("factList")[gameQuiz.getQuizData().quizzesIndex].style.color = "red";
//     }
// }

function incrementProgress(id) {
    var qProgress = document.getElementById(id);
    switch(gameQuiz.quizzesIndex) {
        case 0:
        qProgress.src = "style/images/one.png";
        break;
        case 1:
        qProgress.src = "style/images/two.png";
        break;
        case 2:
        qProgress.src = "style/images/three.png";
        break;
        case 3:
        qProgress.src = "style/images/four.png";
        break;
        case 4:
        qProgress.src = "style/images/five.png";
        break;
        default:
        gameQuiz.quizzesIndex = 0;
        break;
    }
};

function quizApp() {
    if(!gameQuiz.quizComplete()) {
        displayQuestion();
        displayChoices();
        incrementProgress("qProgress");
        setReviewColor();
    } else {
        //===================================================================== 
        window.location = "review.php";
        //===================================================================== 
    }
    //return to the game
}

$(document).ready(quizApp);
