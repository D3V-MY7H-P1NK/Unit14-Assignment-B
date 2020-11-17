var total_score = 0;
var bgImg;
var player;
var playerImg;
var wallsImg;
var size;
var shownScreen = 1;
var correct;
var tries = 3;
var playerSpeed = 5;
var jump;
var questions ;
var round = 0;

let MENU = 0
var img2;
var shownScreen;
var playbutton;

let correctWav;
let bgWav;

function preload(){
  // Load Images
  img2 = loadImage("assets/images/menu_screen.jpg");
  title = loadImage("assets/images/menu/logo_title.png");
  bgImg = loadImage("assets/images/background.jpg"); 
  playerImg = loadImage("assets/images/player.png");
  groundImg = loadImage("assets/images/floor.jpg");
  bouldersImg = loadImage("assets/images/b_rock.png");
  winImg = loadImage("assets/images/trophy.png");

  // Load Sounds
  correctWav = loadSound("assets/sounds/bell.wav"); // Correct Bell 
  bgWav = loadSound("assets/sounds/bg_sound.ogg"); // Background Sound
}

function Question() {

    var options = [" + ", " - ", " ÷ ", " x "]

    x = Math.floor((Math.random() * 10) + 1);
    y = Math.floor((Math.random() * 100) + 1);

    if (total_score <= 3 && total_score >= 0){
      question = "Question : " + y + options[0] + x;
      answer = y + x;
    } else if (total_score >= 4 && total_score <= 6){
      question = "Question : " + y + options[1] + x;
      answer = y - x;
    } else if (total_score >= 7 && total_score <= 11){
      question = "Question : " + y + options[2] + x;
      answer = y / x;
    } else if (total_score >= 12 && total_score <= 15){
      question = "Question : " + y + options[3] + x;
      answer = y * x;
    } else if (total_score >= 16){
      random_opt = Math.floor((Math.random() * 3))
      question = "Question : " + y + options[random_opt] + x
    }

    fill("white");
    textSize(20);
    text(question, 730, 32);
  }

function button() {
    const name = input.value();
    if (name == answer){
      let correct = "Correct"
      fill('green');
      textSize(20);
      text(correct, 50, 60);
      input.value('');
      Question();
    } else if (name != answer){
      let incorrect = "Incorrect"
      fill('red');
      textSize(20);
      text(incorrect, 50, 60);
      input.value('');
      Question();
    }
  }
  

function setup(){
  createCanvas(1500, 600);

  // Ground Info
  groundImg.resize(4000,100);
  ground = createSprite(115,580,2000,50);
  ground.addImage(groundImg);
  
  // Player Info
  playerImg.resize(100,100);
  //player = createSprite(450,510);
  player = createSprite(50,505);
  player.addImage(playerImg);

  bouldersImg.resize(200,200);

  boul = createSprite(300,450);
  boul.addImage(bouldersImg);
  //bou1.setCollider("circle",0,0,40);

  bou2 = createSprite(460,450);
  bou2.addImage(bouldersImg);
  //bou2.setCollider("circle",0,0,40);

  bou3 = createSprite(620,450);
  bou3.addImage(bouldersImg);
 // bou3.setCollider("circle",0,0,40);

  bou4 = createSprite(780,450);
  bou4.addImage(bouldersImg);
  //bou4.setCollider("circle",0,0,40);

  input = createInput();
  input.position(730, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(button);

  winImg.resize(300,300)
  winner = createSprite(1285,450);
  winner.addImage(winImg);
}

function draw(){

  frameRate(144);
  background(img2);
  //background(130,130,255);
  drawSprites()
  

  //block.visible=0
  //Question();
  if (round == 0){
    total_score = total_score + 1;
    Question();
    questions = 'Question: ' + x;
    round = 2;

  } //else if (round === 1){
    //total_score = total_score - 1

  //} else if (round === 2){
    //
  //}

  let s = 'Score: ' + int(total_score);
  fill('white');
  textSize(15);
  text(s, 10, 20);

  let t = 'Tries: ' + int(tries);
  fill('red');
  textSize(15);
  text(t, 10, 40);

  fill("white");
  textSize(20);
  text(questions, 730, 32);

  if (player.collide(ground)) {

    //allow jumping again
    jump = false;
    
  }
  //player is not colliding with the ground
  else {
    //gravity accelerates the movement speed
    playerSpeed ++;
  }
  
  
  drawSprites()
  keyboardCode()
}
function keyboardCode(){
  
  if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 5;
  }

  if (keyIsDown(UP_ARROW) && keyIsPressed===true && jump === false) {
    jump = true;
    player.position.y -= 10;
    playerSpeed = -20;
    //player.position.y -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.position.y += 5;
  }

  if (keyIsDown(90)) {
    correctWav.play()
    Question();
    //setVolume(0.5)
    bgWav.play()
  }
}