var DidYouKnow = function(factList) {
    this.factList = factList;
    this.factIndex = 0;
}

DidYouKnow.prototype.getFactData = function() {
    return this.factList[this.factIndex];
};

DidYouKnow.prototype.allFacts = function() {
    return this.factIndex === this.factList.length;
};