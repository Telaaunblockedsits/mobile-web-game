var QuizData = function(question, choiceA, choiceB, choiceC, choiceD, answer) {
    this.question = question;   
    this.choiceA = choiceA;
    this.choiceB = choiceB;
    this.choiceC = choiceC;
    this.choiceD = choiceD;
    this.answer = answer;
    this.reviewColor = false;
};

QuizData.prototype.checkAns = function(choice) {
    return choice === this.answer;
};

