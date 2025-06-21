new p5();

let canvasSize = 500;
let topMargin = canvasSize / 25;
let bottomMargin = canvasSize - topMargin;
let diff;
let strokeWidth;
let clearance;
let maxHealth = canvasSize / 2;
let healthLoad = 0;
let healthStart = 0;
let startFinish = ['S', 'F'];
let start = random(startFinish);
let showInstructions = true;
let gameStart = false;
let energyDrain = false;
let startMission = false;
let currentStop = 0;
let finishMission = false;
let selectedFailText = 0;
let selectedSuccessText = 0;

let retryButton, instructionButton, menuButton;
let difficultyIncButton, difficultyDecButton;
let buttonText = ['Next Page', 'Next page', 'Select Difficulty', 'Start Game'];
let instructionPage = 0;
let startDisplay;
let screenStep = 1;

let a, b, sign;
let segments = [];
let segmentVectors = [];

let energyFill, timeCircuitsOn, engineOn, engineOff;

let fills = {
  circle: color(random(256), random(256), random(256), random(256)),
  square: color(random(256), random(256), random(256), random(256)),
  triangle: color(random(256), random(256), random(256), random(256))
};

const STAR_COUNT = 100;
const FLY_SPEED = 0.01;
let stars;

// Asset groups
let instructionAssets, successAssets, failAssets;
let billandtedSound0, clickSounds, clickSoundBogus;
let instructionSoundMusic, instructionSoundMusicLoop;
let instructionSoundPage, instructionSoundGoodluck;

function preload() {
  // === Instruction Images ===
  instructionAssets = {
    image1: loadImage('Graphics/Imgs/RetroTV.png'),
    buttons: [
      loadImage('Graphics/Imgs/Keypad1.png'),
      loadImage('Graphics/Imgs/Keypad2.png'),
      loadImage('Graphics/Imgs/Keypad3.png'),
      loadImage('Graphics/Imgs/Keypad4.png'),
      loadImage('Graphics/Imgs/KeypadLoop.png')
    ]
  };

  // === Success Images & Sounds ===
  successAssets = {
    text0Imgs: [loadImage('Graphics/Imgs/ParkerSuccess0.png')],
    text1Img: loadImage('Graphics/Imgs/OregonTrailSuccess0.png'),
    text2Imgs: [loadImage('Graphics/Imgs/MajorTomSuccess0.png')],
    text3Img: loadImage('Graphics/Imgs/PicardSuccess0.png'),
    text4Img: loadImage('Graphics/Imgs/GeorgeSuccess0.png'),
    text5Imgs: [
      loadImage('Graphics/Imgs/ObiWanSuccess0.png'),
      loadImage('Graphics/Imgs/ObiWanSuccess1.png')
    ],
    sounds: {
      text0: loadSound('MusicSFX/Sound/ParkerSuccess.ogg'),
      text1: loadSound('MusicSFX/Sound/OregonTrailSuccess.ogg'),
      text2: loadSound('MusicSFX/Sound/MajorTomSuccess.ogg'),
      text3: loadSound('MusicSFX/Sound/PicaardSuccess.ogg'),
      text4: loadSound('MusicSFX/Sound/GeorgeSuccess.ogg'),
      text5: loadSound('MusicSFX/Sound/ObiWanSuccess.ogg')
    }
  };

  // === Fail Images & Sounds ===
  failAssets = {
    text0Imgs: [
      loadImage('Graphics/Imgs/RipleyFail0.png'),
      loadImage('Graphics/Imgs/HudsonFail0.png')
    ],
    text1Img: loadImage('Graphics/Imgs/OregonTrailFail0.png'),
    text2Img: loadImage('Graphics/Imgs/MajorTomFail0.png'),
    text3Img: loadImage('Graphics/Imgs/KirkFail0.png'),
    text4Img: loadImage('Graphics/Imgs/GeorgeFail0.png'),
    text5Img: loadImage('Graphics/Imgs/C3POFail0.png'),
    sounds: {
      text0: [
        loadSound('MusicSFX/Sound/HudsonFail0.ogg'),
        loadSound('MusicSFX/Sound/HudsonFail1.ogg')
      ],
      text1: loadSound('MusicSFX/Sound/OregonTrailFail.ogg'),
      text2: loadSound('MusicSFX/Sound/MajorTomFail.ogg'),
      text3: loadSound('MusicSFX/Sound/KirkFail.ogg'),
      text4: loadSound('MusicSFX/Sound/GeorgeFail.ogg'),
      text5: loadSound('MusicSFX/Sound/c3poFail.ogg')
    }
  };

  // === Game SFX ===
  soundFormats('mp3', 'wav', 'ogg');
  energyFill = loadSound('MusicSFX/Sound/EnergyRefill.wav');
  timeCircuitsOn = loadSound('MusicSFX/Sound/PowerUp.ogg');
  engineOn = loadSound('MusicSFX/Sound/EngineRunning.wav');
  engineOff = loadSound('MusicSFX/Sound/PowerDown.wav');

  clickSoundExcellent = loadSound('MusicSFX/Sound/Excellent.ogg');
  clickSounds = [
    loadSound('MusicSFX/Sound/Click0.ogg'),
    loadSound('MusicSFX/Sound/Click1.ogg')
  ];
  clickSoundBogus = loadSound('MusicSFX/Sound/Bogus.ogg');
  instructionSoundMusic = loadSound('MusicSFX/Sound/BountyHunters.ogg');
  instructionSoundMusicLoop = loadSound('MusicSFX/Sound/BountyHuntersLoop.ogg');
  instructionSoundPage = loadSound('MusicSFX/Sound/Gunshot.ogg');
  instructionSoundGoodluck = loadSound('MusicSFX/Sound/Goodluck.ogg');
}

function orthogonalProjection2(a, b, p) {
  const d1 = p5.Vector.sub(b, a);
  const d2 = p5.Vector.sub(p, a);
  const length = d1.mag();
  const dotProduct = constrain(d2.dot(d1.normalize()), 0, length);
  return p5.Vector.add(a, d1.mult(dotProduct));
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    sessionStorage.setItem('id', 0);
    location.reload();
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  drawMissionRoute();
  if (showInstructions && screenStep === 1) {
    instructionPage = 0;
    drawInstructionPage1();
  }
}

function drawInstructionPage1() {
  instructionSoundMusic.setVolume(0.2);
  instructionSoundMusic.play();
  instructionSoundMusicLoop.setVolume(0.15);
  instructionSoundMusicLoop.loop();

  background(240, 100, 150);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(width / 20);
  text('Howdy cowboys!', 10, 10 + width / 20, width - 20, height - 30);
  textSize(width / 32);
  text('You have been tasked to transport valuable cargo through space.\n\nYou must traverse a pre-determined flight path through space with the limited energy in your ship.', 10, 20 + width / 10, width - 20, height - 30);

  let img = createImg('Graphics/Imgs/PunchandJudy.gif');
  img.size(height / 3, width / 3);
  img.position(height / 3 - 31, width / 2);

  let overlay = createImg('Graphics/Imgs/RetroTV.png');
  overlay.size(height / 3 + 120, width / 3 + 75);
  overlay.position(height / 3 - 60, width / 2 - 30);

  instructionButton1 = createButton(buttonText[0]);
  instructionButton1.position(width / 2 - 45, bottomMargin - textSize());
  instructionButton1.size(90, 30);
  instructionButton1.mousePressed(() => {
    img.remove();
    overlay.remove();
    instructionButton1.remove();
    drawInstructionPage2();
  });
}

function drawInstructionPage2() {
  instructionSoundPage.play();

  background(100, 220, 170);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(width / 20);
  text('CAUTION', 10, 10 + width / 20, width - 20, height - 30);
  textSize(width / 32);
  text('Once you begin your space jump, energy will deplete.\nBe careful, if you stray from the flight path, energy will deplete faster as you go further from the flight path.\n\nYou MUST dock at each station, by clicking the mouse button at each station. Docking also replenishes your energy.', 10, 20 + width / 10, width - 20, height - 30);

  let img = createImg('Graphics/Imgs/PunchandJudy.gif');
  img.size(height / 3, width / 3);
  img.position(height / 3 - 31, width / 2);

  let overlay = createImg('Graphics/Imgs/RetroTV.png');
  overlay.size(height / 3 + 120, width / 3 + 75);
  overlay.position(height / 3 - 60, width / 2 - 30);

  instructionButton2 = createButton(buttonText[1]);
  instructionButton2.position(width / 2 - 45, bottomMargin - textSize());
  instructionButton2.size(90, 30);
  instructionButton2.mousePressed(() => {
    img.remove();
    overlay.remove();
    instructionButton2.remove();
    drawInstructionPage3();
  });
}

function drawInstructionPage3() {
  instructionSoundGoodluck.play();

  background(180, 80, 200);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(width / 20);
  text('Ready?', 10, 10 + width / 20, width - 20, height - 30);
  textSize(width / 32);
  text('If you successfully dock at each station (1, 2, and 3) as well as the final station (F), you survive.\n\nAs difficulty increases, your flight path will narrow and energy depletes faster.\n\nGood luck cowboys!', 10, 20 + width / 10, width - 20, height - 30);

  let img = createImg('Graphics/Imgs/PunchandJudy.gif');
  img.size(height / 3, width / 3);
  img.position(height / 3 - 31, width / 2);

  let overlay = createImg('Graphics/Imgs/RetroTV.png');
  overlay.size(height / 3 + 120, width / 3 + 75);
  overlay.position(height / 3 - 60, width / 2 - 30);

  instructionButton3 = createButton(buttonText[2]);
  instructionButton3.position(width / 2 - 60, bottomMargin - textSize());
  instructionButton3.size(120, 30);
  instructionButton3.mousePressed(() => {
    img.remove();
    overlay.remove();
    instructionButton3.remove();
    drawInstructionPage4();
  });
}

function drawInstructionPage4() {
  instructionSoundMusic.stop();
  instructionSoundMusicLoop.stop();

  background(17, 30, 108);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(width / 20);
  text('Select a difficulty.', 10, 10 + width / 20, width - 20, height - 30);
  textSize(width / 32);
  text('1: Basic\n2: Intermediate\n3: Advanced\n4: Expert', 10, 20 + width / 10, width - 20, height - 30);

  let keypad = createImg('Graphics/Imgs/BillandTedKeypad.png');
  keypad.size(height / 3, width / 3);
  keypad.position(height / 3, width / 2 - 50);
  keypad.mousePressed(() => {
    if (!billandtedSound0.isPlaying()) {
      billandtedSound0.play();
    }
  });

  if (instructionButton3) instructionButton3.remove(); // clean up previous button if needed

  instructionButton4 = createButton(buttonText[3]);
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
  difficultyButton5.mousePressed(() => {
    if (!billandtedSound0.isPlaying()) {
      billandtedSound0.play();
    }
  });
}


function playBall() {
  showInstructions = false;

  if (diff === undefined) {
    diff = 1;
  }

  createCanvas(canvasSize, canvasSize);
  pixelDensity(1);

  strokeWidth = (canvasSize / 20) * (2 / diff);
  clearance = (diff / 5) * strokeWidth;

  createStars();
  drawBackground();
  drawMissionRoute();
  energyFillSound();
  timeCircuitsOnSound();

  // Remove instruction UI elements if still lingering
  if (instructionButton4) instructionButton4.remove();
  if (difficultyButton1) difficultyButton1.remove();
  if (difficultyButton2) difficultyButton2.remove();
  if (difficultyButton3) difficultyButton3.remove();
  if (difficultyButton4) difficultyButton4.remove();
  if (difficultyButton5) difficultyButton5.remove();
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


function drawMissionRoute() {
  a = canvasSize / 6;
  b = canvasSize / 2;
  strokeWidth = (canvasSize / 20) * (2 / diff);
  sign = [-1, 1];

  segments = [];
  segmentVectors = [];

  for (let i = 0; i < 4; i++) {
    let prev = i === 0 ? { x: a, y: b } : segments[i - 1].end;
    let x2 = random(a * (i + 1) + strokeWidth, a * (i + 2));
    let y2 = random(topMargin + strokeWidth, bottomMargin - strokeWidth);
    let segment = { start: prev, end: { x: x2, y: y2 } };
    segments.push(segment);
    segmentVectors.push({
      a: createVector(segment.start.x, segment.start.y),
      b: createVector(segment.end.x, segment.end.y)
    });
  }

  strokeWeight(strokeWidth);
  segments.forEach((s) => {
    stroke(random(255), random(255), random(255));
    line(s.start.x, s.start.y, s.end.x, s.end.y);
  });

  let shapes = ['circ', 'squ', 'tri'];
  let labels = ['1', '2', '3'];
  let missions = [random(shapes), random(shapes), random(shapes)];

  stroke(255);
  strokeWeight(strokeWidth / clearance);

  circle(segments[0].start.x, segments[0].start.y, strokeWidth);

  for (let i = 0; i < 3; i++) {
    let pos = segments[i].end;
    let shape = missions[i];
    switch (shape) {
      case 'circ':
        fill(fills.circle);
        circle(pos.x, pos.y, strokeWidth);
        break;
      case 'squ':
        fill(fills.square);
        square(pos.x - strokeWidth / 2, pos.y - strokeWidth / 2, strokeWidth);
        break;
      case 'tri':
        fill(fills.triangle);
        triangle(
          pos.x - strokeWidth / 2, pos.y + strokeWidth / 4,
          pos.x + strokeWidth / 2, pos.y + strokeWidth / 4,
          pos.x, pos.y - strokeWidth / 1.6
        );
        break;
    }
  }

  fill(fills.circle);
  circle(segments[3].end.x, segments[3].end.y, strokeWidth);

  stroke(0);
  strokeWeight(0);
  textSize(diff === 1 ? clearance * 2 : diff === 2 ? clearance * 1.5 : clearance);
  textAlign(CENTER, CENTER);
  fill(0);
  start = random(startFinish);
  text(start, segments[0].start.x, segments[0].start.y);

  fill(255);
  if (start === 'S') {
    for (let i = 0; i < 3; i++) text(i + 1, segments[i].end.x, segments[i].end.y);
    fill(0);
    text('F', segments[3].end.x, segments[3].end.y);
  } else {
    for (let i = 0; i < 3; i++) text(3 - i, segments[i].end.x, segments[i].end.y);
    fill(0);
    text('S', segments[3].end.x, segments[3].end.y);
  }
}

function draw() {
  let active = !(timeCircuitsOn.isPlaying() && !gameStart) &&
               !(energyFill.isPlaying() && !gameStart);
  if (!active) return;

  if (!gameStart && !energyDrain && !showInstructions) {
    energyCounterLoad();
    startDisplay = createElement('startDisplay', 'Click S to begin your mission.');
    startDisplay.style('color', 'turquoise');
    startDisplay.size(width / 4, topMargin);
    startDisplay.style('text-align', 'center');
    startDisplay.position(width / 2 - width / 8, topMargin - topMargin / 3);

    startDifficulty = createElement('startDiff', 'Difficulty: ' + diff);
    startDifficulty.style('color', 'turquoise');
    startDifficulty.size(width / 4, topMargin);
    startDifficulty.style('text-align', 'center');
    startDifficulty.position(LEFT, topMargin - topMargin / 3);
  }

  frameRate([24, 36, 48, 60][diff - 1]);

  if (healthLoad === maxHealth && active) {
    if (energyDrain) {
      energyCounterStart();
      let p = createVector(mouseX, mouseY);
      let order = start === 'S' ? segmentVectors : [...segmentVectors].reverse();
      order.forEach(({ a, b }, i) => {
        let proj = orthogonalProjection2(a, b, p);
        let dist = p5.Vector.dist(p, proj);
        if ((startMission && i === 0) || (!startMission && currentStop === i)) {
          if (dist > strokeWidth / 2) {
            healthStart += (dist - strokeWidth / 2) * diff;
          }
        }
      });

      if (mouseButton === LEFT) {
        fill(fills.circle);
        circle(mouseX, mouseY, clearance);
      } else if (mouseButton === RIGHT) {
        fill(fills.square);
        square(mouseX - clearance / 2, mouseY - clearance / 2, clearance);
      } else if (mouseButton === CENTER) {
        fill(fills.triangle);
        triangle(
          mouseX - clearance / 2, mouseY + clearance / 2,
          mouseX + clearance / 2, mouseY + clearance / 2,
          mouseX, mouseY - clearance / 2
        );
      }
    }
  }

  missionOver();
}

function mouseClicked() {
  if (!(timeCircuitsOn.isPlaying() && !gameStart) &&
      !(energyFill.isPlaying() && !gameStart)) {

    const isClose = (p) => dist(mouseX, mouseY, p.x, p.y) <= strokeWidth;

    const path = start === 'S'
      ? [segments[0].start, segments[0].end, segments[1].end, segments[2].end, segments[3].end]
      : [segments[3].end, segments[3].start, segments[2].start, segments[1].start, segments[0].start];

    if (!gameStart && healthLoad === maxHealth && isClose(path[0])) {
      gameStart = true;
      energyDrain = true;
      startMission = true;
      engineOnSound();
      return;
    }

    if (energyDrain && startMission && currentStop < path.length - 1) {
      if (isClose(path[currentStop + 1])) {
        healthStart = 0;
        energyFillSound();
        startMission = false;
        currentStop++;
        if (currentStop < path.length - 2) {
          startMission = true;
        } else {
          finishMission = true;
          engineOffSound();
        }
      }
    }
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
  rect(10, (3 * height) / 4 - healthLoad, 20, map(healthStart, 0, maxHealth, 0, healthLoad));
}

function energyCounterRefill() {
  healthLoad = 0;
  noStroke();
  fill(0, 255, 100);
  rect(10, height / 2, 20, map(healthLoad, 0, maxHealth, 0, -maxHealth));
}

function missionOver() {
  if (finishMission || healthStart >= maxHealth) {
    finishMission ? missionSuccess() : missionFail();
    createReset();
    createMenu();
    createIncreaseDiff();
    createDecreaseDiff();
    finishMission = false;
    energyDrain = false;
    healthStart = 0;
    healthLoad = 0;
  }
}

function missionSuccess() {
  energyDrain = false;
  engineOn.stop();
  textSize(topMargin);
  let messages = [
    "Let's go over the bonus situation...",
    "Congratulations! You have made it to Oregon!",
    "I'm feeling very still and\nI think my spaceship knows which way to go.",
    "Things are only impossible until they’re not.",
    "Chalk up another victory to the human spirit.",
    "In my experience, there is no such thing as luck."
  ];

  fill(255);
  text("You have successfully navigated through space.", width / 2, topMargin - topMargin / 3);

  if (!selectedSuccessText) {
    selectedSuccessText = random(messages);
  }
  text(selectedSuccessText, 0.5 * width, bottomMargin);

  switch (selectedSuccessText) {
    case messages[0]:
      image(random(successAssets.text0Imgs), height / 4, width / 4, height / 2, width / 2);
      successAssets.sounds.text0.play(); break;
    case messages[1]:
      image(successAssets.text1Img, height / 4, width / 4, height / 2, width / 2);
      successAssets.sounds.text1.play(); break;
    case messages[2]:
      image(random(successAssets.text2Imgs), height / 4, width / 4, height / 2, width / 2);
      successAssets.sounds.text2.play(); break;
    case messages[3]:
      image(successAssets.text3Img, height / 4, width / 4, height / 2, width / 2);
      successAssets.sounds.text3.play(); break;
    case messages[4]:
      image(successAssets.text4Img, height / 4, width / 4, height / 2, width / 2);
      successAssets.sounds.text4.play(); break;
    case messages[5]:
      image(random(successAssets.text5Imgs), height / 4, width / 4, height / 2, width / 2);
      successAssets.sounds.text5.play(); break;
  }
}

function missionFail() {
  energyDrain = false;
  engineOn.stop();
  textSize(topMargin);
  let messages = [
    "In space, no one can hear you scream.",
    "You have died of exhaustion.",
    "Your circuit's dead. There's something wrong.",
    "Khaaaaaan!",
    "Space is boundless. It squashes a man's ego.",
    "We're doomed..."
  ];

  fill(255);
  text("You have run out of energy.", width / 2, topMargin - topMargin / 3);

  if (!selectedFailText) {
    selectedFailText = random(messages);
  }
  text(selectedFailText, 0.5 * width, bottomMargin);

  switch (selectedFailText) {
    case messages[0]:
      image(random(failAssets.text0Imgs), height / 4, width / 4, height / 2, width / 2);
      random(failAssets.sounds.text0).play(); break;
    case messages[1]:
      image(failAssets.text1Img, height / 4, width / 4, height / 2, width / 2);
      failAssets.sounds.text1.play(); break;
    case messages[2]:
      image(failAssets.text2Img, height / 4, width / 4, height / 2, width / 2);
      failAssets.sounds.text2.play(); break;
    case messages[3]:
      image(failAssets.text3Img, height / 4, width / 4, height / 2, width / 2);
      failAssets.sounds.text3.play(); break;
    case messages[4]:
      image(failAssets.text4Img, height / 4, width / 4, height / 2, width / 2);
      failAssets.sounds.text4.play(); break;
    case messages[5]:
      image(failAssets.text5Img, height / 4, width / 4, height / 2, width / 2);
      failAssets.sounds.text5.play(); break;
  }
}

function resetSketch() {
  maxHealth = canvasSize / 2;
  gameStart = false;
  energyDrain = false;
  startMission = false;
  currentStop = 0;
  finishMission = false;
  showInstructions = false;
  selectedFailText = 0;
  selectedSuccessText = 0;
  timeCircuitsOnSound();

  fills = {
    circle: color(random(256), random(256), random(256), random(256)),
    square: color(random(256), random(256), random(256), random(256)),
    triangle: color(random(256), random(256), random(256), random(256))
  };

  createStars();
  drawBackground();
  drawMissionRoute();

  if (retryButton) retryButton.remove();
  if (menuButton) menuButton.remove();
  if (difficultyIncButton) difficultyIncButton.remove();
  if (difficultyDecButton) difficultyDecButton.remove();

  energyFillSound();
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    let x = random(canvasSize);
    let y = random(canvasSize);
    let s = random(3);
    stars.push([x, y, s]);
  }
}

function drawBackground() {
  background(0);
  noStroke();
  fill(255);

  for (let i = 0; i < STAR_COUNT; i++) {
    let [x, y, s] = stars[i];
    x -= canvasSize / 2;
    y -= canvasSize / 2;
    if (x === 0) x = random(1) - 0.5;
    if (y === 0) y = random(1) - 0.5;

    x *= 1 + FLY_SPEED / 3;
    y *= 1 + FLY_SPEED / 3;

    if (abs(x) > canvasSize / 2 + 5 || abs(y) > canvasSize / 2 + 5) {
      x = random(canvasSize) - canvasSize / 2;
      y = random(canvasSize) - canvasSize / 2;
      s = 0;
    }

    x += canvasSize / 2;
    y += canvasSize / 2;
    stars[i] = [x, y, s + FLY_SPEED];
    circle(x, y, s);
  }
}

function energyFillSound() {
  if (!finishMission) energyFill.play();
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
}
