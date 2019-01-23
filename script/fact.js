// var factList = [
//     new FactData("1.3 billion tons of food is wasted each year"),
//     new FactData("Dogs can't eat chocolate the quick brown fox jumps over the lazy dog"),
//     new FactData("Wilted celery can be revived with a bowl of water"),
//     new FactData("Carrots can be stored longer by removing the stem the quick brown fox jumps over the lazy dog"),
//     new FactData("An egg is fresh in a float test if it sinks and lays flat on their side")
// ];

let dykFact = new DidYouKnow(factList);
var f = document.getElementById("factList");

//===================================================================== 
function displayFact() {
    if(localStorage.getItem("q"+dykFact.factIndex)==="false"){

        f.innerHTML += "<li style=\"color:red\">" + dykFact.getFactData().fact + "</li>";

    }else{

        f.innerHTML += "<li >" + dykFact.getFactData().fact + "</li>";
        
    }
    dykFact.factIndex++;
    dykApp();
}
//===================================================================== 

function dykApp() {
    if(!dykFact.allFacts()) {
        displayFact();
    }
}

$(document).ready(dykApp);