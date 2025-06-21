new p5();
let xy = 500; //canvas pixels for each side of square canvas
let topMargin = xy / 25;
let bottomMargin = xy - (1 / 25) * xy;
let diff;
let str0ke;
let clearance;
var maxHealth = xy / 2;
var healthLoad = 0;
var healthStart = 0;
var healthRefill = 0;
let startFinish = ['S', 'F'];
let start = random(startFinish);
var showInstructions = true;
var gameStart = false;
var energyDrain = false;
var startMission = false;
var stop1 = false;
var stop2 = false;
var stop3 = false;
var finishMission = false;
let failText = 0;
let successText = 0;
var retryButton;
var instructionButton;
var menuButton;
var difficultyIncButton;
var difficultyDecButton;
var menu = false;
let buttonText = ['Next Page', 'Next page', 'Select Difficulty', 'Start Game'];
var instructionPage = 0;
var startDisplay;
var scr33n = 1;
var click = 0;
let missionLcirc;
let missionRcirc;
let a;
let b;
let sign;
let segment1x1;
let segment1y1;
let segment1x2;
let segment1y2;
let segment2x1;
let segment2y1;
let segment2x2;
let segment2y2;
let segment3x1;
let segment3y1;
let segment3x2;
let segment3y2;
let segment4x1;
let segment4y1;
let segment4x2;
let segment4y2;

let segment1a;
let segment1b;
let segment2a;
let segment2b;
let segment3a;
let segment3b;
let segment4a;
let segment4b;

let energyFill;
let timeCircuitsOn;
let engineOn;
let engineOff;
let nineteenEightyFive = false;

var instructionImage0;

let circfill = color(
  random(0, 256),
  random(0, 256),
  random(0, 256),
  random(0, 256)
);
let squfill = color(
  random(0, 256),
  random(0, 256),
  random(0, 256),
  random(0, 256)
);
let trifill = color(
  random(0, 256),
  random(0, 256),
  random(0, 256),
  random(0, 256)
);

const STAR_COUNT = 100;
const FLY_SPEED = 0.01;

let stars;

function preload() {
  //Instruction Image File Load
  instructionImage1 = loadImage('Graphics/Imgs/RetroTV.png');
  difficultyButton1 = loadImage('Graphics/Imgs/Keypad1.png');
  difficultyButton2 = loadImage('Graphics/Imgs/Keypad2.png');
  difficultyButton3 = loadImage('Graphics/Imgs/Keypad3.png');
  difficultyButton4 = loadImage('Graphics/Imgs/Keypad4.png');
  difficultyButtonLoop = loadImage('Graphics/Imgs/KeypadLoop.png');

  //Success Image File Load
  successText0Img0 = loadImage('Graphics/Imgs/ParkerSuccess0.png');
  successText0Imgs = [successText0Img0];
  successText1Img0 = loadImage('Graphics/Imgs/OregonTrailSuccess0.png');
  successText2Img0 = loadImage('Graphics/Imgs/MajorTomSuccess0.png');
  successText2Imgs = [successText2Img0];
  successText3Img0 = loadImage('Graphics/Imgs/PicardSuccess0.png');
  successText4Img0 = loadImage('Graphics/Imgs/GeorgeSuccess0.png');
  successText5Img0 = loadImage('Graphics/Imgs/ObiWanSuccess0.png');
  successText5Img1 = loadImage('Graphics/Imgs/ObiWanSuccess1.png');
  successText5Imgs = [successText5Img0, successText5Img1];

  //Fail Image File Load
  failText0Img0 = loadImage('Graphics/Imgs/RipleyFail0.png');
  failText0Img1 = loadImage('Graphics/Imgs/HudsonFail0.png');
  failText0Imgs = [failText0Img0, failText0Img1];
  failText1Img0 = loadImage('Graphics/Imgs/OregonTrailFail0.png');
  failText2Img0 = loadImage('Graphics/Imgs/MajorTomFail0.png');
  failText3Img0 = loadImage('Graphics/Imgs/KirkFail0.png');
  failText4Img0 = loadImage('Graphics/Imgs/GeorgeFail0.png');
  failText5Img0 = loadImage('Graphics/Imgs/C3POFail0.png');

  //Success Sound File Load
  soundFormats('mp3', 'wav', 'ogg');
  energyFill = loadSound('MusicSFX/Sound/EnergyRefill.wav');
  timeCircuitsOn = loadSound('MusicSFX/Sound/PowerUp.ogg');
  engineOn = loadSound('MusicSFX/Sound/EngineRunning.wav');
  engineOff = loadSound('MusicSFX/Sound/PowerDown.wav');
  successText0Sound0 = loadSound('MusicSFX/Sound/ParkerSuccess.ogg');
  successText1Sound0 = loadSound('MusicSFX/Sound/OregonTrailSuccess.ogg');
  successText2Sound0 = loadSound('MusicSFX/Sound/MajorTomSuccess.ogg');
  successText3Sound0 = loadSound('MusicSFX/Sound/PicaardSuccess.ogg');
  successText4Sound0 = loadSound('MusicSFX/Sound/GeorgeSuccess.ogg');
  successText5Sound0 = loadSound('MusicSFX/Sound/ObiWanSuccess.ogg');

  //Fail Sound File Load
  failText0Sound0 = loadSound('MusicSFX/Sound/HudsonFail0.ogg');
  failText0Sound1 = loadSound('MusicSFX/Sound/HudsonFail1.ogg');
  failText0Sounds = [failText0Sound0, failText0Sound1];
  failText1Sound0 = loadSound('MusicSFX/Sound/OregonTrailFail.ogg');
  failText2Sound0 = loadSound('MusicSFX/Sound/MajorTomFail.ogg');
  failText3Sound0 = loadSound('MusicSFX/Sound/KirkFail.ogg');
  failText4Sound0 = loadSound('MusicSFX/Sound/GeorgeFail.ogg');
  failText5Sound0 = loadSound('MusicSFX/Sound/c3poFail.ogg');

  clickSoundExcellent = loadSound('MusicSFX/Sound/Excellent.ogg');
  clickSound0 = loadSound('MusicSFX/Sound/Click0.ogg');
  clickSound1 = loadSound('MusicSFX/Sound/Click1.ogg');
  clickSounds = [clickSound0, clickSound1];
  clickSoundBogus = loadSound('MusicSFX/Sound/Bogus.ogg');
  instructionSoundMusic = loadSound('MusicSFX/Sound/BountyHunters.ogg');
  instructionSoundMusicLoop = loadSound('MusicSFX/Sound/BountyHuntersLoop.ogg');
  instructionSoundPage = loadSound('MusicSFX/Sound/Gunshot.ogg');
  instructionSoundGoodluck = loadSound('MusicSFX/Sound/Goodluck.ogg');
}

function setup() {
  createCanvas(xy, xy);
  //createStars();
  //drawBackground();
  //drawMissionRoute();

  if (showInstructions == true) {
    if (scr33n == 1) {
      instructionPage1 = 0;
      drawInstructionPage1();
    }
  }
}

function playBall() {
  showInstructions = false;
  if (diff == undefined) {
    diff = 1;
  }

  createCanvas(xy, xy);
  pixelDensity(1);
  str0ke = (xy / 20) * (2 / diff);
  clearance = (diff / 5) * str0ke;

  createStars();
  drawBackground();
  drawMissionRoute();
  energyFillSound();
  timeCircuitsOnSound();

  instructionButton4.remove();
  instructionImage04.remove();
  //instructionImage13.remove();

  difficultyButton1.remove();
  difficultyButton2.remove();
  difficultyButton3.remove();
  difficultyButton4.remove();
  difficultyButton5.remove();
}

function energyFillSound() {
  if (finishMission == false) {
    energyFill.play();
  }
}

function engineOffSound() {
  engineOff.play();
}

function engineOnSound() {
  engineOn.loop();
  removeElements();
}

function timeCircuitsOnSound() {
  timeCircuitsOn.play();
  //nineteenEightyFive = true;
}

function setDifficulty1() {
  random(clickSounds).play();
  diff = 1;
}

function setDifficulty2() {
  random(clickSounds).play();
  diff = 2;
}

function setDifficulty3() {
  random(clickSounds).play();
  diff = 3;
}

function setDifficulty4() {
  random(clickSounds).play();
  diff = 4;
}

function bogus() {
  if (clickSoundBogus.isPlaying() == false) {
    clickSoundBogus.play();
  }
}

function missionOver() {
  if (finishMission == true) {
    missionSuccess();
    createReset();
    createMenu();
    createIncreaseDiff();
    createDecreaseDiff();
    finishMission = false;
    energyDrain = false;
    healthStart = 0;
    healthLoad = 0;
    nineteenEightyFive = false;
  }
  if (healthStart == maxHealth) {
    missionFail();
    createReset();
    createMenu();
    createIncreaseDiff();
    createDecreaseDiff();
    finishMission = false;
    energyDrain = false;
    healthStart = 0;
    healthLoad = 0;
    nineteenEightyFive = false;
  }
}

function drawInstructionPage1() {
  while (instructionPage < 1) {
    const colors = [
      [240, 100, 150],
      [100, 220, 170],
      [180, 80, 200],
    ];
    const ttl = ['Howdy cowboys!', 'CAUTION', 'Ready?'];
    const txt = [
      'You have been tasked to transport valuable cargo through space.  \n\nYou must traverse a pre-determined flight path through space with the limited energy in your ship.',
      'Once you begin your space jump, energy will deplete. \nBe careful, if you stray from the flight path, energy will deplete faster as you go further from the flight path.  \n\nYou MUST dock at each station, by clicking the mouse button at each station.  Docking also replenishes your energy for the next leg of your flight path.',
      'If you successfully dock at each station (1, 2, and 3) as well as the final station (F), you survive. \n\nAs difficulty increases, your flight path will narrow and energy depletes faster. \n\nGood luck cowboys!',
    ];

    background(
      colors[instructionPage][0],
      colors[instructionPage][1],
      colors[instructionPage][2]
    );

    fill(255);

    textAlign(CENTER, TOP);

    textSize(width / 20);
    text(ttl[instructionPage], 10, 10 + width / 20, width - 20, height - 30);

    textSize(width / 32);
    text(txt[instructionPage], 10, 20 + width / 10, width - 20, height - 30);

    instructionImage01 = createImg('Graphics/Imgs/PunchandJudy.gif');
    instructionImage01.size(height / 3, width / 3);
    instructionImage01.position(height / 3 - 31, width / 2);

    instructionImage11 = createImg('Graphics/Imgs/RetroTV.png');
    instructionImage11.size(height / 3 + 120, width / 3 + 75);
    instructionImage11.position(height / 3 - 60, width / 2 - 30);

    instructionSoundMusic.play();
    ++instructionPage;
    createInstruction1();
    instructionSoundMusic.setVolume(0.2);
    //instructionSoundMusic.play();
    instructionSoundMusicLoop.setVolume(0.15);
    instructionSoundMusicLoop.loop();
  }
}
function drawInstructionPage2() {
  while (instructionPage < 2) {
    const colors = [
      [240, 100, 150],
      [100, 220, 170],
      [180, 80, 200],
    ];
    const ttl = ['Howdy cowboys!', 'CAUTION', 'Ready?'];
    const txt = [
      'You have been tasked to transport valuable cargo through space.  \n\nYou must traverse a pre-determined flight path through space with the limited energy in your ship.',
      'Once you begin your space jump, energy will deplete. \nBe careful, if you stray from the flight path, energy will deplete faster as you go further from the flight path.  \n\nYou MUST dock at each station, by clicking the mouse button at each station.  Docking also replenishes your energy for the next leg of your flight path.',
      'If you successfully dock at each station (1, 2, and 3) as well as the final station (F), you survive. \n\nAs difficulty increases, your flight path will narrow and energy depletes faster. \n\nGood luck cowboys!',
    ];

    background(
      colors[instructionPage][0],
      colors[instructionPage][1],
      colors[instructionPage][2]
    );

    fill(255);

    textAlign(CENTER, TOP);

    textSize(width / 20);
    text(ttl[instructionPage], 10, 10 + width / 20, width - 20, height - 30);

    textSize(width / 32);
    text(txt[instructionPage], 10, 20 + width / 10, width - 20, height - 30);

    instructionImage02 = createImg('Graphics/Imgs/PunchandJudy.gif');
    instructionImage02.size(height / 3, width / 3);
    instructionImage02.position(height / 3 - 31, width / 2);

    instructionImage12 = createImg('Graphics/Imgs/RetroTV.png');
    instructionImage12.size(height / 3 + 120, width / 3 + 75);
    instructionImage12.position(height / 3 - 60, width / 2 - 30);

    ++instructionPage;
    createInstruction2();
  }

  if ((num = 4)) {
  }
  /*if someone clicks and mouse x is where the rectangle usually is{
  drawInstructionPage(num+1)
}
*/
}
function drawInstructionPage3() {
  while (instructionPage < 3) {
    const colors = [
      [240, 100, 150],
      [100, 220, 170],
      [180, 80, 200],
    ];
    const ttl = ['Howdy cowboys!', 'CAUTION', 'Ready?'];
    const txt = [
      'You have been tasked to transport valuable cargo through space.  \n\nYou must traverse a pre-determined flight path through space with the limited energy in your ship.',
      'Once you begin your space jump, energy will deplete. \nBe careful, if you stray from the flight path, energy will deplete faster as you go further from the flight path.  \n\nYou MUST dock at each station, by clicking the mouse button at each station.  Docking also replenishes your energy for the next leg of your flight path.',
      'If you successfully dock at each station (1, 2, and 3) as well as the final station (F), you survive. \n\nAs difficulty increases, your flight path will narrow and energy depletes faster. \n\nGood luck cowboys!',
    ];

    background(
      colors[instructionPage][0],
      colors[instructionPage][1],
      colors[instructionPage][2]
    );

    fill(255);

    textAlign(CENTER, TOP);

    textSize(width / 20);
    text(ttl[instructionPage], 10, 10 + width / 20, width - 20, height - 30);

    textSize(width / 32);
    text(txt[instructionPage], 10, 20 + width / 10, width - 20, height - 30);

    instructionImage03 = createImg('Graphics/Imgs/PunchandJudy.gif');
    instructionImage03.size(height / 3, width / 3);
    instructionImage03.position(height / 3 - 31, width / 2);

    instructionImage13 = createImg('Graphics/Imgs/RetroTV.png');
    instructionImage13.size(height / 3 + 120, width / 3 + 75);
    instructionImage13.position(height / 3 - 60, width / 2 - 30);

    ++instructionPage;
    createInstruction3();
  }

  if ((num = 4)) {
  }
  /*if someone clicks and mouse x is where the rectangle usually is{
  drawInstructionPage(num+1)
}
*/
}

function drawInstructionPage4() {
  removeElements();

  while (instructionPage < 4) {
    const colors = [
      [240, 100, 150],
      [100, 220, 170],
      [180, 80, 200],
      [17, 30, 108],
    ];
    const ttl = ['Howdy cowboys!', 'CAUTION', 'Ready?', 'Select a difficulty.'];
    const txt = [
      'You have been tasked to transport valuable cargo through space.  \n\nYou must traverse a pre-determined flight path through space with the limited energy in your ship.',
      'Once you begin your space jump, energy will deplete. \nBe careful, if you stray from the flight path, energy will deplete faster as you go further from the flight path.  \n\nYou MUST dock at each station, by clicking the mouse button at each station.  Docking also replenishes your energy for the next leg of your flight path.',
      'If you successfully dock at each station (1, 2, and 3) as well as the final station (F), you survive. \n\nAs difficulty increases, your flight path will narrow and energy depletes faster. \n\nGood luck cowboys!',
      '1: Basic\n2: Intermediate\n3: Advanced\n4:Expert',
    ];

    background(
      colors[instructionPage][0],
      colors[instructionPage][1],
      colors[instructionPage][2]
    );

    fill(255);

    textAlign(CENTER, TOP);

    textSize(width / 20);
    text(ttl[instructionPage], 10, 10 + width / 20, width - 20, height - 30);

    textSize(width / 32);
    text(txt[instructionPage], 10, 20 + width / 10, width - 20, height - 30);

    instructionImage04 = createImg('Graphics/Imgs/BillandTedKeypad.png');
    instructionImage04.size(height / 3, width / 3);
    instructionImage04.position(height / 3, width / 2 - 50);
    instructionImage04.mousePressed(bogus);

    ++instructionPage;
    createInstruction4();
  }

  if ((num = 4)) {
  }
  /*if someone clicks and mouse x is where the rectangle usually is{
  drawInstructionPage(num+1)
}
*/
}

function createInstruction1() {
  instructionButton1 = createButton(buttonText[0]);
  //instructionButton.mouseClicked(drawInstructionPage(num+1))

  instructionButton1.position(width / 2 - 45, bottomMargin - textSize());
  instructionButton1.size(90, 30);
  instructionButton1.mousePressed(drawInstructionPage2);
}

function createInstruction2() {
  instructionSoundPage.play();
  instructionImage01.remove();
  instructionImage11.remove();
  instructionButton1.remove();
  instructionButton2 = createButton(buttonText[1]);
  //instructionButton.mouseClicked(drawInstructionPage(num+1))

  instructionButton2.position(width / 2 - 45, bottomMargin - textSize());
  instructionButton2.size(90, 30);
  instructionButton2.mousePressed(drawInstructionPage3);
}

function createInstruction3() {
  instructionSoundGoodluck.play();
  instructionImage02.remove();
  instructionImage12.remove();
  instructionButton2.remove();
  instructionButton3 = createButton(buttonText[2]);
  //instructionButton.mouseClicked(drawInstructionPage(num+1))

  instructionButton3.position(width / 2 - 60, bottomMargin - textSize());
  instructionButton3.size(120, 30);
  instructionButton3.mousePressed(drawInstructionPage4);
}

function createInstruction4() {
  instructionSoundMusic.stop();
  instructionSoundMusicLoop.stop();
  instructionImage03.remove();
  instructionImage13.remove();
  instructionButton3.remove();
  instructionButton4 = createButton(buttonText[3]);
  //instructionButton.mouseClicked(drawInstructionPage(num+1))

  instructionButton4.position(width / 2 - 45, bottomMargin - textSize());
  instructionButton4.size(90, 30);
  instructionButton4.mousePressed(playBall);

  difficultyButton1 = createImg('Graphics/Imgs/Keypad1.png');
  difficultyButton1.position(height / 3 + 7, width / 2 - 44);
  difficultyButton1.size(43, 31);
  difficultyButton1.mousePressed(setDifficulty1);

  difficultyButton2 = createImg('Graphics/Imgs/Keypad2.png');
  difficultyButton2.position(height / 3 + 62, width / 2 - 45);
  difficultyButton2.size(43, 31);
  difficultyButton2.mousePressed(setDifficulty2);

  difficultyButton3 = createImg('Graphics/Imgs/Keypad3.png');
  difficultyButton3.position(height / 3 + 117, width / 2 - 45);
  difficultyButton3.size(44, 31);
  difficultyButton3.mousePressed(setDifficulty3);

  difficultyButton4 = createImg('Graphics/Imgs/Keypad4.png');
  difficultyButton4.position(height / 3 + 7, width / 2 - 2);
  difficultyButton4.size(43, 31);
  difficultyButton4.mousePressed(setDifficulty4);

  difficultyButton5 = createImg('Graphics/Imgs/KeypadLoop.png');
  difficultyButton5.position(height / 3 + 123, width / 2 + 85);
  difficultyButton5.size(32, 25);
  difficultyButton5.mousePressed(somethingIsaFoot);
}

function somethingIsaFoot() {
  if (clickSoundExcellent.isPlaying() == false) {
    clickSoundExcellent.play();
  }
}

function draw() {
  if (
    (timeCircuitsOn.isPlaying() == true && gameStart == false) ||
    (energyFill.isPlaying() == true && gameStart == false)
  ) {
    nineteenEightyFive = false;
  } else {
    nineteenEightyFive = true;
  }

  if (gameStart == false && energyDrain == false && showInstructions == false) {
    energyCounterLoad();
    startDisplay = createElement(
      'startDisplay',
      'Click S to begin your mission.'
    );
    startDisplay.style('color', 'turquoise');
    startDisplay.size(width / 4, topMargin);
    startDisplay.style('text-align', 'center');
    startDisplay.position(width / 2 - width / 4 / 2, topMargin - topMargin / 3);

    startDifficulty = createElement('startDiff', 'Difficulty: ' + diff);
    startDifficulty.style('color', 'turquoise');
    startDifficulty.size(width / 4, topMargin);
    startDifficulty.style('text-align', 'center');
    startDifficulty.position(LEFT, topMargin - topMargin / 3);
  }

  if (diff == 1) {
    frameRate(24);
  }
  if (diff == 2) {
    frameRate(36);
  }
  if (diff == 3) {
    frameRate(48);
  }
  if (diff == 4) {
    frameRate(60);
  }

  if (healthLoad == maxHealth && nineteenEightyFive == true) {
    if (start == 'S') {
      if (energyDrain == true) {
        energyCounterStart();
        //print (healthStart);
        //print (healthLoad);
        //print (maxHealth);

        let p1 = createVector(mouseX, mouseY);
        let op1 = orthogonalProjection2(segment1a, segment1b, p1);
        let d1 = p5.Vector.dist(p1, op1);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op1.x, op1.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);

        let p2 = createVector(mouseX, mouseY);
        let op2 = orthogonalProjection2(segment2a, segment2b, p2);
        let d2 = p5.Vector.dist(p2, op2);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op2.x, op2.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);

        let p3 = createVector(mouseX, mouseY);
        let op3 = orthogonalProjection2(segment3a, segment3b, p3);
        let d3 = p5.Vector.dist(p3, op3);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op3.x, op3.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);
        let p4 = createVector(mouseX, mouseY);
        let op4 = orthogonalProjection2(segment4a, segment4b, p4);
        let d4 = p5.Vector.dist(p4, op4);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op4.x, op4.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);

        if (mouseButton == LEFT) {
          fill(circfill);
          circle(mouseX, mouseY, clearance);
          //if (dist(mouseX,mouseY,)
        }
        if (mouseButton == RIGHT) {
          fill(squfill);
          square(mouseX - clearance / 2, mouseY - clearance / 2, clearance);
        }

        if (mouseButton == CENTER) {
          fill(trifill);
          triangle(
            mouseX - clearance / 2,
            mouseY + clearance / 2,
            mouseX + clearance / 2,
            mouseY + clearance / 2,
            mouseX,
            mouseY - clearance / 2
          );
        }
        if (startMission == true) {
          if (d1 > str0ke / 2) {
            healthStart += (d1 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
        if (stop1 == true) {
          //needs to be fixed with a counter so only runs once
          energyCounterLoad();
          energyCounterStart();
          if (d2 > str0ke / 2) {
            healthStart += (d2 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
        if (stop2 == true) {
          //needs to be fixed with a counter so only runs once
          energyCounterLoad();
          energyCounterStart();
          if (d3 > str0ke / 2) {
            healthStart += (d3 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
        if (stop3 == true) {
          //needs to be fixed with a counter so only runs once
          energyCounterLoad();
          energyCounterStart();
          if (d4 > str0ke / 2) {
            healthStart += (d4 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
      }
    }
    if (start == 'F') {
      if (energyDrain == true) {
        energyCounterStart();
        //print (healthStart);
        //print (healthLoad);
        //print (maxHealth);

        let p1 = createVector(mouseX, mouseY);
        let op1 = orthogonalProjection2(segment4a, segment4b, p1);
        let d1 = p5.Vector.dist(p1, op1);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op1.x, op1.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);

        let p2 = createVector(mouseX, mouseY);
        let op2 = orthogonalProjection2(segment3a, segment3b, p2);
        let d2 = p5.Vector.dist(p2, op2);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op2.x, op2.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);

        let p3 = createVector(mouseX, mouseY);
        let op3 = orthogonalProjection2(segment2a, segment2b, p3);
        let d3 = p5.Vector.dist(p3, op3);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op3.x, op3.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);
        let p4 = createVector(mouseX, mouseY);
        let op4 = orthogonalProjection2(segment1a, segment1b, p4);
        let d4 = p5.Vector.dist(p4, op4);

        //line(a.x, a.y, b.x, b.y);
        //ellipse(op4.x, op4.y, clearance, clearance);
        //text(d, p.x + 5, p.y - 5);
        //print(d);

        if (mouseButton == LEFT) {
          fill(circfill);
          circle(mouseX, mouseY, clearance);
          //if (dist(mouseX,mouseY,)
        }
        if (mouseButton == RIGHT) {
          fill(squfill);
          square(mouseX - clearance / 2, mouseY - clearance / 2, clearance);
        }

        if (mouseButton == CENTER) {
          fill(trifill);
          triangle(
            mouseX - clearance / 2,
            mouseY + clearance / 2,
            mouseX + clearance / 2,
            mouseY + clearance / 2,
            mouseX,
            mouseY - clearance / 2
          );
        }
        if (startMission == true) {
          if (d1 > str0ke / 2) {
            healthStart += (d1 - str0ke / 2) * diff;
          }
        }
        if (stop1 == true) {
          energyCounterLoad();
          energyCounterStart();
          if (d2 > str0ke / 2) {
            healthStart += (d2 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
        if (stop2 == true) {
          energyCounterLoad();
          energyCounterStart();
          if (d3 > str0ke / 2) {
            healthStart += (d3 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
        if (stop3 == true) {
          energyCounterLoad();
          energyCounterStart();
          if (d4 > str0ke / 2) {
            healthStart += (d4 - str0ke / 2) * diff;
            //++healthStart;
          }
        }
      }
    }
  }

  missionOver();
}

function drawBackground() {
  background(0);
  noStroke();
  fill(255);

  for (let i = 0; i < STAR_COUNT; i++) {
    let star = stars[i];
    let x = star[0] - xy / 2;
    let y = star[1] - xy / 2;
    let s = star[2] + FLY_SPEED;

    if (x == 0) x = random(1) - 0.5;
    if (y == 0) y = random(1) - 0.5;

    x *= 1 + FLY_SPEED / 3;
    y *= 1 + FLY_SPEED / 3;

    if (abs(x) > xy / 2 + 5 || abs(y) > xy / 2 + 5) {
      x = random(xy) - xy / 2;
      y = random(xy) - xy / 2;
      s = 0;
    }

    x += xy / 2;
    y += xy / 2;

    stars[i] = [x, y, s];
    circle(x, y, s);
  }
}

function energyCounterLoad() {
  healthLoad = min(maxHealth, healthLoad + 10);

  noStroke();
  fill(0, 255, 100);
  rect(10, (3 * height) / 4, 20, map(healthLoad, 0, maxHealth, 0, -maxHealth));
}

function energyCounterStart() {
  healthStart = min(maxHealth, ++healthStart);

  noStroke();
  fill(255, 0, 0);
  rect(
    10,
    (3 * height) / 4 - healthLoad,
    20,
    map(healthStart, 0, maxHealth, 0, healthLoad)
  );
}

function energyCounterRefill() {
  healthLoad = 0;
  //healthStart = maxHealth
  noStroke();
  fill(0, 255, 100);
  rect(10, height / 2, 20, map(healthLoad, 0, maxHealth, 0, -maxHealth));
}

function missionSuccess() {
  energyDrain = false;
  engineOn.stop();
  textSize(topMargin);
  let successTexts = [
    "Let's go over the bonus situation...", //Alien, Parker
    'Congratulations! You have made it to Oregon!', //Oregon Trail
    "I'm feeling very still and\nI think my spaceship knows which way to go.", //Space Oddity, David Bowie
    'Things are only impossible until they’re not.', //Star Trek, Picard
    'Chalk up another victory to the human spirit.', //Planet of the Apes, George
    'In my experience, there is no such thing as luck.', //Star Wars: Episode IV, Obi-Wan
  ];
  fill(255);
  text(
    'You have successfully navigated through space.',
    width / 2,
    topMargin - topMargin / 3
  );
  if (successText == 0) {
    successText = random(successTexts);
    //successText = successTexts[3];

    text(successText, 0.5 * width, bottomMargin);
  }

  if (successText == "Let's go over the bonus situation...") {
    image(
      random(successText0Imgs),
      height / 4,
      width / 4,
      height / 2,
      width / 2
    );
    engineOff.pause();
    successText0Sound0.play();
  }
  if (successText == 'Congratulations! You have made it to Oregon!') {
    image(successText1Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    successText1Sound0.play();
  }
  if (
    successText ==
    "I'm feeling very still and\nI think my spaceship knows which way to go."
  ) {
    image(
      random(successText2Imgs),
      height / 4,
      width / 4,
      height / 2,
      width / 2
    );
    engineOff.pause();
    successText2Sound0.play();
  }
  if (successText == 'Things are only impossible until they’re not.') {
    image(successText3Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    successText3Sound0.play();
  }
  if (successText == 'Chalk up another victory to the human spirit.') {
    image(successText4Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    successText4Sound0.play();
  }
  if (successText == 'In my experience, there is no such thing as luck.') {
    image(
      random(successText5Imgs),
      height / 4,
      width / 4,
      height / 2,
      width / 2
    );
    engineOff.pause();
    successText5Sound0.play();
  }
}
function missionFail() {
  energyDrain = false;
  engineOn.stop();
  textSize(topMargin);
  let failTexts = [
    'In space, no one can hear you scream.',
    'You have died of exhaustion.',
    "Your circuit's dead. There's something wrong.",
    'Khaaaaaan!',
    "Space is boundless. It squashes a man's ego.",
    "We're doomed...",
  ];
  fill(255);
  text('You have run out of energy.', 0.5 * width, topMargin - topMargin / 3);
  if (failText == 0) {
    failText = random(failTexts);
    //failText = failTexts[2];

    text(failText, 0.5 * width, bottomMargin);
  }
  if (failText == 'In space, no one can hear you scream.') {
    image(random(failText0Imgs), height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    random(failText0Sounds).play();
  }
  if (failText == 'You have died of exhaustion.') {
    image(failText1Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    failText1Sound0.play();
  }
  if (failText == "Your circuit's dead. There's something wrong.") {
    image(failText2Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    failText2Sound0.play();
  }
  if (failText == 'Khaaaaaan!') {
    image(failText3Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    failText3Sound0.play();
  }
  if (failText == "Space is boundless. It squashes a man's ego.") {
    image(failText4Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    failText4Sound0.play();
  }
  if (failText == "We're doomed...") {
    image(failText5Img0, height / 4, width / 4, height / 2, width / 2);
    engineOff.pause();
    failText5Sound0.play();
  }
}

function createReset() {
  buttonResetW = 50;
  buttonResetH = 20;
  retryButton = createButton('Retry');
  retryButton.position(width / 2 - buttonResetW, topMargin + textSize());
  retryButton.size(buttonResetW, buttonResetH);
  retryButton.mousePressed(resetSketch);
}

function createMenu() {
  buttonMenuW = 50;
  buttonMenuH = 20;
  menuButton = createButton('Menu');
  menuButton.position(width / 2, topMargin + textSize());
  menuButton.size(buttonMenuW, buttonMenuH);
  menuButton.mousePressed(windowOpen);
}

function createIncreaseDiff() {
  instructionPage = 3;
  buttonDifficultyW = 80;
  buttonDifficultyH = 20;
  difficultyIncButton = createButton('+ Difficulty');
  difficultyIncButton.position(width / 2, topMargin + 2 * textSize());
  difficultyIncButton.size(buttonDifficultyW, buttonDifficultyH);
  difficultyIncButton.mousePressed(increaseDiff);
}

function createDecreaseDiff() {
  instructionPage = 3;
  buttonDifficultyW = 80;
  buttonDifficultyH = 20;
  difficultyDecButton = createButton('- Difficulty');
  difficultyDecButton.position(
    width / 2 - buttonDifficultyW,
    topMargin + 2 * textSize()
  );
  difficultyDecButton.size(buttonDifficultyW, buttonDifficultyH);
  difficultyDecButton.mousePressed(decreaseDiff);
}

function increaseDiff() {
  if (diff < 4) {
    diff++;
  }
  resetSketch();
}

function decreaseDiff() {
  if (diff > 1) {
    diff--;
  }
  resetSketch();
}

function windowOpen() {
  //window.open('https://Space-Therapy.nicholasseidel.repl.co', '_self'); REMOVED DUE TO BREAK FROM GUI
  location.reload();
}

function resetSketch() {
  maxHealth = xy / 2; //200 * (1 / diff);
  //healthLoad = 0;
  //healthStart = 0;
  gameStart = false;
  energyDrain = false;
  startMission = false;
  stop1 = false;
  stop2 = false;
  stop3 = false;
  finishMission = false;
  showInstructions = false;
  failText = 0;
  successText = 0;
  timeCircuitsOnSound();

  circfill = color(
    random(0, 256),
    random(0, 256),
    random(0, 256),
    random(0, 256)
  );
  squfill = color(
    random(0, 256),
    random(0, 256),
    random(0, 256),
    random(0, 256)
  );
  trifill = color(
    random(0, 256),
    random(0, 256),
    random(0, 256),
    random(0, 256)
  );

  createStars();
  drawBackground();
  drawMissionRoute();
  retryButton.remove();
  menuButton.remove();
  difficultyIncButton.remove();
  difficultyDecButton.remove();

  energyFillSound();
}

function createStars() {
  stars = Array();

  for (let i = 0; i < STAR_COUNT; i++) {
    let x = random(xy);
    let y = random(xy);
    let s = random(3);
    stars.push([x, y, s]);
  }
}

function drawMissionRoute() {
  a = xy / 6;
  b = xy / 2;
  str0ke = (xy / 20) * (2 / diff);
  sign = [-1, 1];
  segment1x1 = a;
  segment1y1 = b;
  segment1x2 = random(a + str0ke, a * 2);
  segment1y2 = random(topMargin + str0ke, bottomMargin - str0ke);
  segment2x1 = segment1x2;
  segment2y1 = segment1y2;
  segment2x2 = random(a * 2 + str0ke, a * 3);
  segment2y2 = random(topMargin + str0ke, bottomMargin - str0ke);
  segment3x1 = segment2x2;
  segment3y1 = segment2y2;
  segment3x2 = random(a * 3 + str0ke, a * 4);
  segment3y2 = random(topMargin + str0ke, bottomMargin - str0ke);
  segment4x1 = segment3x2;
  segment4y1 = segment3y2;
  segment4x2 = random(a * 4 + str0ke, a * 5);
  segment4y2 = random(topMargin + str0ke, bottomMargin - str0ke);

  segment1a = createVector(segment1x1, segment1y1);
  segment1b = createVector(segment1x2, segment1y2);
  segment2a = createVector(segment2x1, segment2y1);
  segment2b = createVector(segment2x2, segment2y2);
  segment3a = createVector(segment3x1, segment3y1);
  segment3b = createVector(segment3x2, segment3y2);
  segment4a = createVector(segment4x1, segment4y1);
  segment4b = createVector(segment4x2, segment4y2);

  strokeWeight(str0ke);
  stroke(random(0, 256), random(0, 256), random(0, 256));
  line(segment1a.x, segment1a.y, segment1b.x, segment1b.y);
  stroke(random(0, 256), random(0, 256), random(0, 256));
  line(segment2a.x, segment2a.y, segment2b.x, segment2b.y);
  stroke(random(0, 256), random(0, 256), random(0, 256));
  line(segment3a.x, segment3a.y, segment3b.x, segment3b.y);
  stroke(random(0, 256), random(0, 256), random(0, 256));
  line(segment4a.x, segment4a.y, segment4b.x, segment4b.y);

  let missions = ['circ', 'squ', 'tri'];
  let mission1 = random(missions);
  let mission2 = random(missions);
  let mission3 = random(missions);

  stroke(255);
  strokeWeight(str0ke / clearance);

  let missionLcirc = circle(segment1x1, segment1y1, str0ke);
  if (mission1 == 'circ') {
    fill(circfill);
    let mission1circ = circle(segment1x2, segment1y2, str0ke);
  }
  if (mission1 == 'squ') {
    fill(squfill);
    let mission1squ = square(
      segment1x2 - str0ke / 2,
      segment1y2 - str0ke / 2,
      str0ke
    );
  }
  if (mission1 == 'tri') {
    fill(trifill);
    let mission1tri = triangle(
      segment1x2 - str0ke / 2,
      segment1y2 + str0ke / 4,
      segment1x2 + str0ke / 2,
      segment1y2 + str0ke / 4,
      segment1x2,
      segment1y2 - str0ke / 1.6
    );
  }

  if (mission2 == 'circ') {
    fill(circfill);
    let mission2circ = circle(segment2x2, segment2y2, str0ke);
  }
  if (mission2 == 'squ') {
    fill(squfill);
    let mission1squ = square(
      segment2x2 - str0ke / 2,
      segment2y2 - str0ke / 2,
      str0ke
    );
  }
  if (mission2 == 'tri') {
    fill(trifill);
    let mission1tri = triangle(
      segment2x2 - str0ke / 2,
      segment2y2 + str0ke / 4,
      segment2x2 + str0ke / 2,
      segment2y2 + str0ke / 4,
      segment2x2,
      segment2y2 - str0ke / 1.6
    );
  }

  if (mission3 == 'circ') {
    fill(circfill);
    let mission3circ = circle(segment3x2, segment3y2, str0ke);
  }
  if (mission3 == 'squ') {
    fill(squfill);
    let mission1squ = square(
      segment3x2 - str0ke / 2,
      segment3y2 - str0ke / 2,
      str0ke
    );
  }
  if (mission3 == 'tri') {
    fill(trifill);
    let mission1tri = triangle(
      segment3x2 - str0ke / 2,
      segment3y2 + str0ke / 4,
      segment3x2 + str0ke / 2,
      segment3y2 + str0ke / 4,
      segment3x2,
      segment3y2 - str0ke / 1.6
    );
  }
  fill(255);
  let missionRcirc = circle(segment4x2, segment4y2, str0ke);

  stroke(0);
  strokeWeight(0);
  if (diff == 1) {
    textSize(clearance * 2);
  }
  if (diff == 2) {
    textSize(clearance * 1.5);
  }
  if (diff == 3) {
    textSize(clearance);
  }
  if (diff == 4) {
    textSize(clearance);
  }

  textAlign(CENTER, CENTER);
  fill(0);

  start = random(startFinish);
  text(start, segment1x1, segment1y1);

  fill(0);
  if (start == 'S') {
    fill(255);
    text('1', segment1x2, segment1y2);
    text('2', segment2x2, segment2y2);
    text('3', segment3x2, segment3y2);
    fill(0);
    text('F', segment4x2, segment4y2);
  }
  if (start == 'F') {
    fill(255);
    text('3', segment1x2, segment1y2);
    text('2', segment2x2, segment2y2);
    text('1', segment3x2, segment3y2);
    fill(0);
    text('S', segment4x2, segment4y2);
  }
}

function orthogonalProjection2(a, b, p) {
  // find nearest point along a SEGMENT

  d1 = p5.Vector.sub(b, a);
  d2 = p5.Vector.sub(p, a);
  l1 = d1.mag();

  dotp = constrain(d2.dot(d1.normalize()), 0, l1);

  return p5.Vector.add(a, d1.mult(dotp));
}

function mouseClicked() {
  if (nineteenEightyFive == true) {
    if (start == 'S') {
      if (healthLoad == maxHealth) {
        if (dist(mouseX, mouseY, segment1x1, segment1y1) <= str0ke) {
          gameStart = true;
          energyDrain = true;
          startMission = true;
          engineOnSound();
        }
      }
      if (
        dist(mouseX, mouseY, segment2x1, segment2y1) <= str0ke &&
        startMission == true &&
        energyDrain == true
      ) {
        healthStart = 0;
        stop1 = true;
        //circle(segment2x1, segment2y1, str0ke/2, str0ke/2);
        startMission = false;
        energyFillSound();
      }
      if (
        dist(mouseX, mouseY, segment3x1, segment3y1) <= str0ke &&
        stop1 == true &&
        energyDrain == true
      ) {
        healthStart = 0;
        stop2 = true;
        stop1 = false;
        energyFillSound();
      }
      if (
        dist(mouseX, mouseY, segment4x1, segment4y1) <= str0ke &&
        stop2 == true &&
        energyDrain == true
      ) {
        healthStart = 0;
        stop3 = true;
        stop2 = false;
        energyFillSound();
      }
      if (
        dist(mouseX, mouseY, segment4x2, segment4y2) <= str0ke &&
        stop3 == true &&
        energyDrain == true
      ) {
        finishMission = true;
        stop3 = false;
        engineOffSound();
      }
    }
    if (start == 'F') {
      if (healthLoad == maxHealth) {
        if (dist(mouseX, mouseY, segment4x2, segment4y2) <= str0ke) {
          gameStart = true;
          energyDrain = true;
          startMission = true;
          engineOnSound();
        }
      }
      if (
        dist(mouseX, mouseY, segment4x1, segment4y1) <= str0ke &&
        startMission == true &&
        energyDrain == true
      ) {
        healthStart = 0;
        stop1 = true;
        //circle(segment2x1, segment2y1, str0ke/2, str0ke/2);
        startMission = false;
        energyFillSound();
      }
      if (
        dist(mouseX, mouseY, segment3x1, segment3y1) <= str0ke &&
        stop1 == true &&
        energyDrain == true
      ) {
        healthStart = 0;
        stop2 = true;
        stop1 = false;
        energyFillSound();
      }
      if (
        dist(mouseX, mouseY, segment2x1, segment2y1) <= str0ke &&
        stop2 == true &&
        energyDrain == true
      ) {
        healthStart = 0;
        stop3 = true;
        stop2 = false;
        energyFillSound();
      }
      if (
        dist(mouseX, mouseY, segment1x1, segment1y1) <= str0ke &&
        stop3 == true &&
        energyDrain == true
      ) {
        finishMission = true;
        stop3 = false;
        engineOffSound();
      }
    }
  }
}

function keyPressed() {
  if (keyCode == ESCAPE) {
    sessionStorage.setItem('id', 0);
    location.reload();
  }
}
