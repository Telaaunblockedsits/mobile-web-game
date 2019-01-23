var Quiz = function(quizzes) {
        this.score = 0;
        this.quizzes = quizzes;
        this.quizzesIndex = 0;
};

Quiz.prototype.getQuizData = function() {
    return this.quizzes[this.quizzesIndex];
};

Quiz.prototype.quizComplete = function() {
    return this.quizzesIndex === this.quizzes.length;
};

Quiz.prototype.validateChoice = function(choice) {
    if(!this.quizComplete()) {
        if (this.getQuizData().checkAns(choice)) {
            // this.score++;
            // console.log("Your Score: " + this.score);
            // this.getQuizData().reviewColor = true;
            //===================================================================== 
            localStorage.setItem("q"+this.quizzesIndex,"true");
            //===================================================================== 
        } else {
            // this.score--;
            // console.log("Your Score: " + this.score);
            // this.getQuizData().reviewColor =  false;
            //===================================================================== 
            localStorage.setItem("q"+this.quizzesIndex,"false");
            //===================================================================== 
        }

        this.quizzesIndex++;
    }
};








