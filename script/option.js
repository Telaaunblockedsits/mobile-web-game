//make welcome page grey
//make option page apear

var welcomePage = document.getElementsByClassName("welcome-page")[0];
var optionPage = document.getElementsByClassName("option-page")[0];
var howToPlayPage = document.getElementsByClassName('howToPlay-page')[0];
var musicSlider = document.getElementById("musicRange");
var sfxSlider = document.getElementById("sfxRange");

window.ontouchstart = function(event) {
    if (event.touches.length>1) { //If there is more than one touch
        event.preventDefault();
    }
}

function showWelcomePage(){
    
    optionPage.style.display="none";
    howToPlayPage.style.display="none";
    welcomePage.style.display="block";
    
}

function showOptionPage(){
    
    welcomePage.style.display="none";
    optionPage.style.display="block";
    
}

function showHowToPlayPage(){
    
    welcomePage.style.display="none";
    howToPlayPage.style.display="block";
     
}

localStorage.setItem("music", musicSlider.value);
localStorage.setItem("sfx", sfxSlider.value);
document.getElementById("result").innerHTML = localStorage.getItem("music");
document.getElementById("result1").innerHTML = localStorage.getItem("sfx");

musicSlider.oninput = function SetMusic()  {
    localStorage.setItem("music", musicSlider.value);
    document.getElementById("result").innerHTML = localStorage.getItem("music");
}

sfxSlider.oninput = function SetSFX()  {
    localStorage.setItem("sfx", sfxSlider.value);
    document.getElementById("result1").innerHTML = localStorage.getItem("sfx");
}