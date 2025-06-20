// === Constants & Globals ===
new p5();
const xy = 500;
const topMargin = xy / 25;
const bottomMargin = xy - topMargin;
const maxHealth = xy / 2;
const STAR_COUNT = 100;
const FLY_SPEED = 0.01;

let str0ke, clearance, diff;
let healthLoad = 0, healthStart = 0;
let start = random(["S", "F"]);
let showInstructions = true, gameStart = false, energyDrain = false;
let startMission = false, stop1 = false, stop2 = false, stop3 = false;
let finishMission = false, nineteenEightyFive = false;
let failText = null, successText = null;
let instructionPage = 0, screen = 1;
let click = 0;
let circfill, squfill, trifill;
let stars = [];
let segment1a, segment1b, segment2a, segment2b, segment3a, segment3b, segment4a, segment4b;
let retryButton, instructionButton, menuButton, difficultyIncButton, difficultyDecButton;
let buttonText = ["Next Page", "Next Page", "Select Difficulty", "Start Game"];
let successTexts = [
  "Let's go over the bonus situation...",
  "Congratulations! You have made it to Oregon!",
  "I'm feeling very still and\nI think my spaceship knows which way to go.",
  "Things are only impossible until they’re not.",
  "Chalk up another victory to the human spirit.",
  "In my experience, there is no such thing as luck."
];
let failTexts = [
  "In space, no one can hear you scream.",
  "You have died of exhaustion.",
  "Your circuit's dead. There's something wrong.",
  "Khaaaaaan!",
  "Space is boundless. It squashes a man's ego.",
  "We're doomed..."
];

// === Asset Maps ===
let successSounds = [];
let failSounds = [];
let failSoundGroups = [];
let successImages = [];
let failImages = [];

function preload() {
  // Load success sounds
  successSounds = [
    loadSound("MusicSFX/Sound/ParkerSuccess.ogg"),
    loadSound("MusicSFX/Sound/OregonTrailSuccess.ogg"),
    loadSound("MusicSFX/Sound/MajorTomSuccess.ogg"),
    loadSound("MusicSFX/Sound/PicaardSuccess.ogg"),
    loadSound("MusicSFX/Sound/GeorgeSuccess.ogg"),
    loadSound("MusicSFX/Sound/ObiWanSuccess.ogg")
  ];

  // Load success images
  successImages = [
    loadImage("Graphics/Imgs/ParkerSuccess0.png"),
    loadImage("Graphics/Imgs/OregonTrailSuccess0.png"),
    loadImage("Graphics/Imgs/MajorTomSuccess0.png"),
    loadImage("Graphics/Imgs/PicardSuccess0.png"),
    loadImage("Graphics/Imgs/GeorgeSuccess0.png"),
    loadImage("Graphics/Imgs/ObiWanSuccess0.png")
  ];

  // Load fail sounds
  failSounds = [
    null,
    loadSound("MusicSFX/Sound/OregonTrailFail.ogg"),
    loadSound("MusicSFX/Sound/MajorTomFail.ogg"),
    loadSound("MusicSFX/Sound/KirkFail.ogg"),
    loadSound("MusicSFX/Sound/GeorgeFail.ogg"),
    loadSound("MusicSFX/Sound/c3poFail.ogg")
  ];

  // Load fail sound group (multiple variants)
  failSoundGroups = [
    loadSound("MusicSFX/Sound/HudsonFail0.ogg"),
    loadSound("MusicSFX/Sound/HudsonFail1.ogg")
  ];

  // Load fail images
  failImages = [
    [
      loadImage("Graphics/Imgs/RipleyFail0.png"),
      loadImage("Graphics/Imgs/HudsonFail0.png")
    ],
    loadImage("Graphics/Imgs/OregonTrailFail0.png"),
    loadImage("Graphics/Imgs/MajorTomFail0.png"),
    loadImage("Graphics/Imgs/KirkFail0.png"),
    loadImage("Graphics/Imgs/GeorgeFail0.png"),
    loadImage("Graphics/Imgs/C3POFail0.png")
  ];

  // Other key sounds
  energyFill = loadSound("MusicSFX/Sound/EnergyRefill.wav");
  timeCircuitsOn = loadSound("MusicSFX/Sound/PowerUp.ogg");
  engineOn = loadSound("MusicSFX/Sound/EngineRunning.wav");
  engineOff = loadSound("MusicSFX/Sound/PowerDown.wav");
  billandtedSound0 = loadSound("MusicSFX/Sound/Excellent.ogg");
  clickSound0 = loadSound("MusicSFX/Sound/Click0.ogg");
  clickSound1 = loadSound("MusicSFX/Sound/Click1.ogg");
  clickSounds = [clickSound0, clickSound1];
  clickSoundBogus = loadSound("MusicSFX/Sound/Bogus.ogg");
  instructionSoundMusic = loadSound("MusicSFX/Sound/BountyHunters.ogg");
  instructionSoundMusicLoop = loadSound("MusicSFX/Sound/BountyHuntersLoop.ogg");
  instructionSoundPage = loadSound("MusicSFX/Sound/Gunshot.ogg");
  instructionSoundGoodluck = loadSound("MusicSFX/Sound/Goodluck.ogg");
}

function playSuccessAssets(index) {
  engineOff.pause();
  image(successImages[index], height / 4, width / 4, height / 2, width / 2);
  successSounds[index].play();
}

function playFailAssets(index) {
  engineOff.pause();
  if (index === 0) {
    const img = random(failImages[0]);
    image(img, height / 4, width / 4, height / 2, width / 2);
    random(failSoundGroups).play();
  } else {
    image(failImages[index], height / 4, width / 4, height / 2, width / 2);
    failSounds[index].play();
  }
}

// === Setup ===
function setup() {
  createCanvas(xy, xy);
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      z: random(width),
      update() {
        this.z -= FLY_SPEED * 100;
        if (this.z < 1) this.z = width;
      },
      display() {
        fill(255);
        noStroke();
        const sx = map(this.x / this.z, 0, 1, 0, width);
        const sy = map(this.y / this.z, 0, 1, 0, height);
        ellipse(sx, sy, 2, 2);
      }
    });
  }
  circfill = randomColor();
  squfill = randomColor();
  trifill = randomColor();
}

// === Main Game Loop ===
function draw() {
  background(0);
  drawStars();
  drawUI();

  if (gameStart) {
    updateEnergy();
    drawShip();
  }

  if (startMission && !stop1) {
    updateSegment(segment1a, segment1b);
  } else if (stop1 && !stop2) {
    updateSegment(segment2a, segment2b);
  } else if (stop2 && !stop3) {
    updateSegment(segment3a, segment3b);
  } else if (stop3 && !finishMission) {
    updateSegment(segment4a, segment4b);
  } else if (finishMission && !nineteenEightyFive) {
    displayMissionOutcome();
  }
}

// === Utility and Rendering Functions ===
function drawStars() {
  for (let s of stars) {
    s.display();
    s.update();
  }
}

function drawUI() {
  fill(255);
  textAlign(CENTER);
  text("Energy: " + nf(healthLoad, 1, 0), width / 2, 30);
}

function updateEnergy() {
  if (energyDrain) {
    healthLoad = max(0, healthLoad - 1);
  }
}

function drawShip() {
  fill(255);
  ellipse(width / 2, height / 2, 40, 40);
}

function updateSegment(a, b) {
  stroke(str0ke);
  line(a.x, a.y, b.x, b.y);
}

function displayMissionOutcome() {
  textSize(16);
  fill(255);
  textAlign(CENTER);
  if (successText !== null) {
    text(successTexts[successText], width / 2, height / 1.5);
  } else if (failText !== null) {
    text(failTexts[failText], width / 2, height / 1.5);
  }
}

function mouseClicked() {
  if (showInstructions) {
    instructionSoundPage.play();
    instructionPage++;
    if (instructionPage > 3) {
      showInstructions = false;
      screen = 2;
      instructionSoundGoodluck.play();
      gameStart = true;
      energyDrain = true;
      timeCircuitsOn.play();
      healthLoad = maxHealth;
    }
  } else if (gameStart && !startMission) {
    startMission = true;
    clickSound0.play();
  } else if (startMission && !stop1) {
    stop1 = true;
    clickSound1.play();
  } else if (stop1 && !stop2) {
    stop2 = true;
    clickSound0.play();
  } else if (stop2 && !stop3) {
    stop3 = true;
    clickSound1.play();
  } else if (stop3 && !finishMission) {
    finishMission = true;
    clickSoundBogus.play();

    let outcome = random(["success", "fail"]);
    let index = floor(random(6));
    if (outcome === "success") {
      successText = index;
      playSuccessAssets(index);
    } else {
      failText = index;
      playFailAssets(index);
    }
  }
}

function randomColor() {
  return color(random(255), random(255), random(255));
}
