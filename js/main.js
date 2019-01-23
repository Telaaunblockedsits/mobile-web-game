import pictureSet from "./pictureSet.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");
const pictures = new pictureSet();
let bgm = new sound("./sound/BGM.wav");
let hitSound = new sound("./sound/Hit.wav");
let shootSound = new sound("./sound/shoot.wav");

saveImg().then(() => {

    loadBackground();
    loadPlayer();
    update();

});

// setInterval(update(),20);
function sound(src) {
    // this.sound = document.createElement("audio");
    // this.sound.src = src;
    // this.sound.setAttribute("preload", "auto");
    // this.sound.setAttribute("controls", "none");
    // this.sound.style.display = "none";
    this.sound = new Audio(src);
    console.log("music is" + localStorage.getItem("music"));
    if (src == "./sound/BGM.wav")
        this.sound.volume = 0.01 * localStorage.getItem("music");
    else
        this.sound.volume = 0.01 * localStorage.getItem("sfx");
    // document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

let bulletSound = [];

function duplicate() {
    for (let i = 0; i < 10; i++) {
        bulletSound[i] = new sound("./sound/shoot.wav");
    }
}

duplicate();

function saveImg() {
    return Promise.all([
        pictures.store("0", "./img/hud/hud_0.png"),
        pictures.store("1", "./img/hud/hud_1.png"),
        pictures.store("2", "./img/hud/hud_2.png"),
        pictures.store("3", "./img/hud/hud_3.png"),
        pictures.store("4", "./img/hud/hud_4.png"),
        pictures.store("5", "./img/hud/hud_5.png"),
        pictures.store("6", "./img/hud/hud_6.png"),
        pictures.store("7", "./img/hud/hud_7.png"),
        pictures.store("8", "./img/hud/hud_8.png"),
        pictures.store("9", "./img/hud/hud_9.png"),
        pictures.store("left", "./img/button/left.png"),
        pictures.store("right", "./img/button/right.png"),
        pictures.store("sky", "./img/sky/sky.png"),
        pictures.store("win", "./img/sky/win.png"),
        pictures.store("egg", "./img/sky/onLSD.png"),
        pictures.store("background", "./img/sky/background.png"),
        pictures.store("sandCenter", "./img/tiles/sandCenter.png"),
        pictures.store("sandMid", "./img/tiles/sandMid.png"),
        pictures.store("p3_front", "./img/player/p3_front.png"),
        pictures.store("shoot", "./img/button/shoot.png"),
        pictures.store("bullet", "./img/item/laserPurpleDot.png"),
        pictures.store("grass", "./img/plant/grass.png"),
        pictures.store("bush", "./img/plant/bush.png"),
        pictures.store("mushroom", "./img/plant/mushroom.png"),
        pictures.store("bigMushroom", "./img/plant/bigMushroom.png"),
        pictures.store("worm", "./img/empty/worm.png"),
        pictures.store("wormWalk", "./img/empty/worm_walk.png"),
        pictures.store("wormDead", "./img/empty/worm_dead.png"),
        pictures.store("wormLeft", "./img/empty/wormLeft.png"),
        pictures.store("wormLeftWalk", "./img/empty/wormLeftWalk.png"),
        pictures.store("wormLeftDead", "./img/empty/wormLeftDead.png"),
        pictures.store("flyFly", "./img/empty/flyFly.png"),
        pictures.store("flyFlyWalk", "./img/empty/flyFly_walk.png"),
        pictures.store("flyFlyDead", "./img/empty/flyFly_dead.png"),
        pictures.store("heart", "./img/hud/hud_heartFull.png"),

    ]);
}

function drawCountDown(number) {

    let tempString = number.toString();
    let arr3Num = ["0", "0", "0"];
    if (tempString.length == 3) {
        arr3Num[0] = tempString[0];
        arr3Num[1] = tempString[1];
        arr3Num[2] = tempString[2];
    }
    if (tempString.length == 2) {
        arr3Num[0] = "0";
        arr3Num[1] = tempString[0];
        arr3Num[2] = tempString[1];
    }
    if (tempString.length == 1) {
        arr3Num[0] = "0";
        arr3Num[1] = "0";
        arr3Num[2] = tempString[0];
    }
    pictures.drawWithChange(arr3Num[0], context, 0, 0, "w", "h", 550, 50, 38, 48);
    pictures.drawWithChange(arr3Num[1], context, 0, 0, 30, 38, 600, 50, 38, 48);
    pictures.drawWithChange(arr3Num[2], context, 0, 0, 30, 38, 650, 50, 38, 48);
}

let oddEven = 0;
let bird = [];


let plantData = {
    hp: 5,
    top: {
        x: 536,
        y: 403,
        w: 208,
        h: 40
    },
    bottom: {
        x: 610,
        y: 443,
        w: 59,
        h: 136
    }

}
let worm = [];
let count = 0;
let ememyHp = 2;

function spawnEnemy() {
    let tempX = Math.floor(Math.random() * 1280);

    bird.push({
        hp: ememyHp, x: tempX, y: 0, w: 85, h: 42, oddEven: 0, ratio: (640 - tempX) / 403, draw: function () {
            if ((this.oddEven++) % 20 >= 10) {
                pictures.draw("flyFly", context, this.x, this.y);

            } else {
                pictures.draw("flyFlyWalk", context, this.x, this.y);
            }
        }
    });


    if (count++ % 2 >= 1) {
        worm.push({
            hp: ememyHp, leftSide: true, x: 0, y: 555, w: 63, h: 23, oddEven: 0, draw: function () {
                if ((this.oddEven++) % 20 >= 10) {
                    pictures.draw("wormLeft", context, this.x, this.y);
                    if (this.hit)
                        pictures.draw("wormLeftDead", context, this.x, this.y);
                } else {
                    if (this.hit)
                        pictures.draw("wormLeftDead", context, this.x, this.y);
                    pictures.draw("wormLeftWalk", context, this.x, this.y);
                }
                if (this.oddEven % 30 == 0)
                    this.hit = false
            }, hit: false
        });
    }

    else {
        worm.push({
            hp: ememyHp, leftSide: false, x: 1280, y: 555, w: 63, h: 23, oddEven: 0, draw: function () {
                if (this.oddEven++ % 20 >= 10) {
                    pictures.draw("worm", context, this.x, this.y);
                    if (this.hit)
                        pictures.draw("wormDead", context, this.x, this.y);
                }
                else {
                    if (this.hit)
                        pictures.draw("wormDead", context, this.x, this.y);
                    pictures.draw("wormWalk", context, this.x, this.y);
                }
                if (this.oddEven % 30 == 0)
                    this.hit = false

            }, hit: false
        });
    }

}

let spawnTime = 2000;
setInterval(spawnEnemy, spawnTime);
context.font = '40px game';
context.fillStyle = "Pink ";
context.textAlign = "center";
let isEgg = false;
let eggFirst = 1;

function loadBackground() {
    if (isEgg) {
        if (eggFirst++ == 1) {
            spawnTime = 1000;
            setInterval(spawnEnemy, spawnTime);
        }

        pictures.draw("egg", context, 0, 0);
    } else {
        pictures.draw("background", context, 0, 0);
        pictures.draw("bigMushroom", context, 536, 403);
    }
}

function loadPlayer() {
    pictures.draw("p3_front", context, 320, 490);
}

var playerPosition = {
    x: 320,
    y: 490,
    right: false,
    left: false
}


let isShoot = false;
let bulletsRight = [];
let bulletsLeft = [];
let bulletsUp = [];
let bullets = [bulletsLeft, bulletsRight];

function bothNotEmpty(a, b) {
    return a.length != 0 && b.length != 0;
}

function isHitWorm() {
    bulletsUp.forEach((bullet, i) => {
        bird.forEach((oneBird, iBird) => {
            if (isCollide(oneBird, bullet)) {
                console.log("hit bird");
                hitSound.play();
                bulletsUp.splice(i, 1);
                if (--oneBird.hp <= 0) {
                    bird.splice(iBird, 1);
                }
            }
        });
    })
    bullets.forEach(element => {
        if (bothNotEmpty(element, worm)) {//element is bullets array
            element.forEach((bullet, i) => {
                worm.forEach((oneWorm, iWorm) => {
                    if (isCollide(oneWorm, bullet)) {
                        hitSound.play();
                        oneWorm.hit = true;
                        element.splice(i, 1);
                        if (--oneWorm.hp <= 0)
                            worm.splice(iWorm, 1);
                        console.log("hit..");
                    }
                });

            })
        }
    })
}

function birdMove() {

    bird.forEach(oneBird => {
        oneBird.x += oneBird.ratio;
        oneBird.y += 1;
        oneBird.draw();
    });
}

let enemies = [worm, bird];

function isHitPlant() {

    enemies.forEach(oneKindOfEnemy => {
        if (oneKindOfEnemy.length != 0) {
            oneKindOfEnemy.forEach((oneEnemy, indexOneEnemy) => {
                if (isCollide(oneEnemy, plantData.top) || isCollide(oneEnemy, plantData.bottom)) {
                    hitSound.play();
                    plantData.hp--;
                    console.log("MushRoom Say hurt...");
                    oneKindOfEnemy.splice(indexOneEnemy, 1);

                }
            })
        }
    });

}

let startGameTime = Date.now();
let countEgg = 0;

function lose() {
    // setTimeout(context.fillText("lose!!", 500, 300), 500);

    isUpdate = false;
//    document.ready(function () {
    // Handler for .ready() called.
    window.setTimeout(function () {
        location.href = "quiz structure.php";
    }, 2000);
//})
}

function drawHp() {
    for (let i = 0; i < plantData.hp; i++) {
        pictures.draw("heart", context, (50 * i) + 900, 50);
    }
}

let frameToSkip = 1;
let frame = 0;
let isUpdate = true;
let $name = 'John Doe';
if (localStorage.getItem("u") == null)
    $name = 'John Doe';
else
    $name = localStorage.getItem("u");

$name = $name.substring(0, 4);

function update() {
    // if(frame++<=frameToSkip){
    //     requestAnimationFrame(update);
    //     return;
    // }

    let time = Math.floor((startGameTime + 120000 - Date.now()) / 1000);
    // let time = Math.floor((startGameTime + 1200 - Date.now()) / 1000);
    isHitWorm();
    isHitPlant();

    if (playerPosition.right) {
        playerPosition.x += 5;
        if (playerPosition.x >= 1220)
            playerPosition.x -= 5;
    }

    if (playerPosition.left) {
        playerPosition.x -= 5;
        if (playerPosition.x <= 0)
            playerPosition.x += 5;
    }

    loadBackground();
    drawHp();
    drawCountDown(time);
    if (plantData.hp <= 0) {
        lose();
    }
    pictures.draw("p3_front", context, playerPosition.x, playerPosition.y);
    context.fillText($name, playerPosition.x + 40, playerPosition.y + 140);
    birdMove();
    worm.forEach((element, index) => {
        if (element.leftSide) {
            // console.log("before:"+element.x);
            element.x += 5;
            element.draw();

            // console.log("after:"+element.x);
        } else {
            element.x -= 5;
            element.draw();

        }

    });

    bulletsRight.forEach((element, index) => {
        pictures.drawWithChange("bullet", context, 0, 0, 70, 70, element.x, element.y, 30, 30);
        element.x += 10;
        if (element.x > 1280)
            bulletsRight.splice(index, 1);
    });
    bulletsLeft.forEach((element, index) => {
        pictures.drawWithChange("bullet", context, 0, 0, 70, 70, element.x, element.y, 30, 30);
        element.x -= 10;
        if (element.x < 0)
            bulletsLeft.splice(index, 1);
    });

    bulletsUp.forEach((element, index) => {
        pictures.drawWithChange("bullet", context, 0, 0, 70, 70, element.x, element.y, 30, 30);
        element.y -= 10;
        if (element.y < 0)
            bulletsUp.splice(index, 1);
    });
    if (time > 0) {
        frame = 0;
        if (isUpdate)
            requestAnimationFrame(update);
    }
    else
        pictures.drawWithChange("win", context, 0, 0, 0, 0, 0, 0, 1280, 720);
}


function isCollide(a, b) {
    return !(
        ((a.y + a.h) < (b.y)) ||
        (a.y > (b.y + b.h)) ||
        ((a.x + a.w) < b.x) ||
        (a.x > (b.x + b.w))
    );
}

let soundPointer = 0;
var Touch = {};

Touch.CONTROLS_CSS_NOFILL = 'opacity:0; z-index: 11000; border-style: dashed; border-width: 1px';
Touch.CONTROLS_CSS = 'background-color: red; ' + Touch.CONTROLS_CSS_NOFILL;
Touch.DPAD_BUTTON_WIDTH_PERCENT = 12;
Touch.DPAD_BUTTON_HEIGHT_PERCENT = 20;

Touch.dpad = {}; // map of dpad control objects
Touch.fireButton = {};

Touch.lastDPadPressed = null;

Touch.init = function () {
    // don't init touch on desktops
    // if (!UTIL.platformSupportsTouch())
    // {
    //     return;
    // }

    // disable dragging
    // FIXME this shouldn't be needed but we go a few px off bottom of screen, which enables drag
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    });

    Touch.initFireButton();


    Touch.dpad['left'] = Touch.createDPadButton('left', function () {

        playerPosition.left = true;
        countEgg = 0;
    }, function () {
        playerPosition.left = false;
    });
    Touch.dpad['left'].style.bottom = 0 + '%';

    Touch.dpad['right'] = Touch.createDPadButton('right', function () {
        // Controls.current.turnRight = true;
        if (++countEgg == 10)
            isEgg = true;
        playerPosition.right = true;
    }, function () {
        playerPosition.right = false;
        // Controls.current.turnRight = false;
    });
    Touch.dpad['right'].style.bottom = 0 + '%';
    Touch.dpad['right'].style.left = (Touch.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';

    // create a dummy button in the middle to accept touchstarts. Override the default CSS for no red colour.
    Touch.dpad['deadzone'] = Touch.createDPadButton('deadzone', function () {
        // no op
    }, function () {
        // no op
    }, Touch.CONTROLS_CSS_NOFILL);
    Touch.dpad['deadzone'].style.left = Touch.DPAD_BUTTON_WIDTH_PERCENT + '%';
    Touch.dpad['deadzone'].style.bottom = 0 + '%';
    // Touch.dpad['deadzone'].style.width = "8%";
};

// DPad buttons are divs with explicit press/unpress functions.
// This factory assumes you live at bottom-left of the screen.
Touch.createDPadButton = function (id, pressFunction, unpressFunction, cssOverride) {
    var button = document.createElement('div');
    button.id = id;
    if (cssOverride) {
        button.style.cssText = cssOverride;
    }
    else {
        button.style.cssText = Touch.CONTROLS_CSS;
    }
    button.style.width = Touch.DPAD_BUTTON_WIDTH_PERCENT + '%';
    button.style.height = Touch.DPAD_BUTTON_HEIGHT_PERCENT + '%';
    button.style.position = 'absolute';
    button.style.bottom = '0px';
    button.style.left = '0px';

    button.press = pressFunction;
    button.unpress = unpressFunction;

    // press handler for basic touchstart case
    button.addEventListener('touchstart', function (event) {
        console.log('touchstart received, how novel');
        Touch.lastDPadPressed = button.id;
        event.preventDefault();
        button.press();
    });
    // touch left the canvas, seems rarely called
    button.addEventListener('touchleave', function (event) {
        console.log('touchleave received, how novel');
        event.preventDefault();
        button.unpress();
    });
    // touch ended. The touch may have moved to another button, so handle that
    button.addEventListener('touchend', function (event) {
        console.log('touchend received, how novel');
        event.preventDefault();
        var elementBeingTouched = Touch.getIdOfTouchedElement(event);
        if (elementBeingTouched in Touch.dpad) {
            Touch.dpad[elementBeingTouched].unpress();
        }
    });


    // if a touch has moved onto another button, unpress this and press the other one
    button.addEventListener('touchmove', function (event) {
        // playerPosition.x+=10;
        console.log('touchmove received, how novel');
        event.preventDefault();
        var elementBeingTouched = Touch.getIdOfTouchedElement(event);
        if (elementBeingTouched === Touch.lastDPadPressed) {
            // no change, no op
        }
        else if (elementBeingTouched in Touch.dpad) // verify we moved onto a dpad button
        {
            // unpress the last button if that's appropriate
            if (Touch.lastDPadPressed in Touch.dpad) {
                Touch.dpad[Touch.lastDPadPressed].unpress();
            }
            // press the new button
            Touch.dpad[elementBeingTouched].press();
            Touch.lastDPadPressed = elementBeingTouched;
        }
        else // we moved off the dpad
        {
            console.log('moveoff  received, how novel');
            // unpress the last button if that's appropriate
            if (Touch.lastDPadPressed in Touch.dpad) {
                Touch.dpad[Touch.lastDPadPressed].unpress();
            }

            Touch.lastDPadPressed = null;
        }
    });

    document.body.appendChild(button);
    return button;
};

Touch.getIdOfTouchedElement = function (touchEvent) {
    var touch = touchEvent.changedTouches[0];
    var element = document.elementFromPoint(touch.clientX, touch.clientY);
    // this can return null
    if (element !== null && 'id' in element) {
        return element.id;
    }
    else {
        return null;
    }
};

// fire button is a bit simpler, no need for any touchmove for sliding fingers
Touch.initFireButton = function () {
    Touch.fireButton["right"] = document.createElement('div');
    Touch.fireButton["right"].id = 'rightFireButton';
    Touch.fireButton["right"].style.cssText = Touch.CONTROLS_CSS;
    Touch.fireButton["right"].style.width = '10%';
    Touch.fireButton["right"].style.height = '15%';
    Touch.fireButton["right"].style.position = 'absolute';
    Touch.fireButton["right"].style.bottom = '0px';
    Touch.fireButton["right"].style.right = '5%';

    Touch.fireButton["left"] = document.createElement('div');
    Touch.fireButton["left"].id = 'leftFireButton';
    Touch.fireButton["left"].style.cssText = Touch.CONTROLS_CSS;
    Touch.fireButton["left"].style.width = '10%';
    Touch.fireButton["left"].style.height = ('15%');
    Touch.fireButton["left"].style.position = 'absolute';
    Touch.fireButton["left"].style.bottom = '0px';
    Touch.fireButton["left"].style.right = '25%';

    Touch.fireButton["up"] = document.createElement('div');
    Touch.fireButton["up"].id = 'upFireButton';
    Touch.fireButton["up"].style.cssText = Touch.CONTROLS_CSS;
    Touch.fireButton["up"].style.width = '10%';
    Touch.fireButton["up"].style.height = '15%';
    Touch.fireButton["up"].style.position = 'absolute';
    Touch.fireButton["up"].style.bottom = '15%';
    Touch.fireButton["up"].style.right = '15%';

//Right
    Touch.fireButton["right"].press = function () {

        bgm.play();
        if (soundPointer == 10)
            soundPointer = 0;
        else
            bulletSound[soundPointer++].play();
        bulletsRight.push({x: playerPosition.x + 40, y: 545, h: 30, w: 30, display: true});
        isShoot = true;
        // Keys.shooting = true;
    };
    Touch.fireButton["right"].unpress = function () {
        isShoot = false;
        // Keys.shooting = false;
    };

    Touch.fireButton["right"].addEventListener('touchstart', function (event) {
        event.preventDefault();
        Touch.fireButton["right"].press();
    });
    Touch.fireButton["right"].addEventListener('touchend', function (event) {
        event.preventDefault();
        Touch.fireButton["right"].unpress();
    });
    Touch.fireButton["right"].addEventListener('touchleave', function (event) {
        event.preventDefault();
        Touch.fireButton["right"].unpress();
    });

    // LEFT
    Touch.fireButton["left"].press = function () {


        if (soundPointer == 10)
            soundPointer = 0;
        else
            bulletSound[soundPointer++].sound.play();
        bulletsLeft.push({x: playerPosition.x - 40, y: 545, h: 30, w: 30, display: true});
        isShoot = true;
        // Keys.shooting = true;
    };
    Touch.fireButton["left"].unpress = function () {
        isShoot = false;
        // Keys.shooting = false;
    };

    Touch.fireButton["left"].addEventListener('touchstart', function (event) {
        event.preventDefault();
        Touch.fireButton["left"].press();
    });
    Touch.fireButton["left"].addEventListener('touchend', function (event) {
        event.preventDefault();
        Touch.fireButton["left"].unpress();
    });
    Touch.fireButton["left"].addEventListener('touchleave', function (event) {
        event.preventDefault();
        Touch.fireButton["left"].unpress();
    });
    //UP
    Touch.fireButton["up"].press = function () {

        console.log("press fire");
        if (soundPointer == 10)
            soundPointer = 0;
        else
            bulletSound[soundPointer++].sound.play();
        bulletsUp.push({x: playerPosition.x + 20, y: playerPosition.y - 40, h: 30, w: 30, display: true});
        isShoot = true;
        // Keys.shooting = true;
    };
    Touch.fireButton["up"].unpress = function () {
        isShoot = false;
        // Keys.shooting = false;
    };

    Touch.fireButton["up"].addEventListener('touchstart', function (event) {
        event.preventDefault();
        Touch.fireButton["up"].press();
    });
    Touch.fireButton["up"].addEventListener('touchend', function (event) {
        event.preventDefault();
        Touch.fireButton["up"].unpress();
    });
    Touch.fireButton["up"].addEventListener('touchleave', function (event) {
        event.preventDefault();
        Touch.fireButton["up"].unpress();
    });

    document.body.appendChild(Touch.fireButton["right"]);
    document.body.appendChild(Touch.fireButton["left"]);
    document.body.appendChild(Touch.fireButton["up"]);
};
Touch.init();


