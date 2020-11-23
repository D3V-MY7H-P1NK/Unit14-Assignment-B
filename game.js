
var gameStarted = false;
var total_score = 0;
var bgImg;
var player;
var playerImg;
var wallsImg;
var size;
var correct;
var tries = 3;
var playerSpeed = 5;
var jump;
var questions ;
var round;

let MENU = 0
var img2;
var shownScreen;
var playbutton;

let correctWav;
let bgWav;
var question;
var check;
var correct_incorrect;
var wrong = 0;

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
    } else if (total_score >= 16 && total_score <= 19){
      random_opt = Math.floor((Math.random() * 3))
      question = "Question : " + y + options[random_opt] + x;

      if (random_opt == 0){
        answer = y + x;
        //random_opt = false;
      } else if (random_opt == 1){
        answer = y - x;
        //random_opt = false;
      } else if (random_opt == 2){
        answer = y / x;
        //random_opt = false;
      } else if (random_opt == 3){
        answer = y * x;
        //random_opt = false;
      }

    } else if (total_score >=20){
      sprite.destroy();
    }

    return question;
  }

function submit(button) {
    name = input.value();
    if (name == answer){
      check = 1
    } else if (name != answer){
      check = 2
    }

    input.value('');
    console.log(check);
    round = true
  }
  
function gameEnd() {
  fill(255);  
  text("GAME OVER", width/2-60, height/2);
  text("YOU GOT ", str(total_score) , " QUESTIONS CORRECT :)", width/2-60, height/2+60); 
}

function setup(){
  createCanvas(1500, 600);
  background (0);

  if (gameStarted === false){
    textSize(50);
    fill(255);  
    text("Math Mine", 100, 50);
    textSize(10);
    text("Press RETURN TO START", width/2-60, height/2);
  }

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

  bou1 = createSprite(300,450);
  bou1.addImage(bouldersImg);
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

  winImg.resize(300,300)
  winner = createSprite(1285,450);
  winner.addImage(winImg);

  round = true;

}

function draw(){

  if (gameStarted === true) {

  frameRate(60);
  background(img2);
  drawSprites()

  if (round == true){
    question = Question()
    round = false
  }

  if (tries == 0){
    
  }

  button.mousePressed(submit)

  if (check == 1){
    fill('green');
    check = 'Correct'
    total_score = total_score + 1;
  } else if (check == 2){
    fill('red');
    wrong = wrong + 1;
    if (wrong == 4){
      tries = tries - 1;
      wrong = 0
    }
    if (tries <= 0){
      gameEnd();
    }
    check = 'Incorrect'
  }

  // Display Correct or False
  textSize(20)
  text(check, 730, 110);

  // Displays Question on screen
  fill("white");
  textSize(20);
  text(question, 730, 32);

  // Displays Users Score
  let s = 'Score: ' + int(total_score);
  fill('white');
  textSize(15);
  text(s, 10, 20);

  // Displays Users Trys Left
  let t = 'Tries: ' + int(tries);
  fill('red');
  textSize(15);
  text(t, 10, 40);

  player.collide(bou1);
  player.collide(bou2);
  player.collide(bou3);
  player.collide(bou4);

  // gravity
  player.position.y += playerSpeed;

  // Gravity Jump
  if (player.collide(ground)) {
    jump = false;
  }
  else {
    playerSpeed ++;
  }
  
  
  //drawSprites()
  keyboardCode()
  }
}

function keyboardCode(){
  
  if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 2;
    player.mirrorX(1);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 2;
    player.mirrorX(-1);
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
    //correctWav.play()
    //Question();
    //setVolume(0.5)
    //bgWav.play()
  }
}

function keyPressed() {
  
  if (keyCode === RETURN) {
    
    clear();  // clears any shapes, text 
    gameStarted = true;
  }
}