
var gameStarted = false;
var total_score = 0;
var bgImg;
var player;
var playerImg;
var wallsImg;
var size;
var correct;
var tries;
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
var restart = true;

function preload(){
  // Load Images
  img2 = loadImage("assets/images/menu_screen.jpg");
  playerImg = loadImage("assets/images/player.png");
  groundImg = loadImage("assets/images/floor.jpg");
  bouldersImg = loadImage("assets/images/b_rock.png");
  winImg = loadImage("assets/images/trophy.png");
  game_name = loadImage("assets/images/menu/game_name.png")

  // Load Sounds
  correctWav = loadSound("assets/sounds/bell.wav"); // Correct Bell 
  bgWav = loadSound("assets/sounds/bg_sound.ogg"); // Background Sound
}

function Question() {

    var options = [" + ", " - ", " / ", " x "]

    x = Math.floor((Math.random() * 10) + 1);
    y = Math.floor((Math.random() * 100) + 1);

    if (total_score <= 3 && total_score >= 0){
      question = "Question : " + y + options[0] + x;
      answer = y + x;
    } else if (total_score >= 4 && total_score <= 6){
      bou1.position.y = 100
      bou1.remove();
      question = "Question : " + y + options[1] + x;
      answer = y - x;
    } else if (total_score >= 7 && total_score <= 11){
      bou2.position.y = 100
      bou2.remove();
      question = "Question : " + y + options[2] + x;
      answer_unround = y / x;
      answer = Math.floor(answer_unround);
    } else if (total_score >= 12 && total_score <= 15){
      bou3.position.y = 100
      bou3.remove();
      question = "Question : " + y + options[3] + x;
      answer = y * x;
    } else if (total_score >= 16 && total_score <= 19){
      bou4.position.y = 100
      bou4.remove();
      random_opt = Math.floor((Math.random() * 3))
      question = "Question : " + y + options[random_opt] + x;

      if (random_opt == 0){
        answer = y + x;
        //random_opt = false;
      } else if (random_opt == 1){
        answer = y - x;
        //random_opt = false;
      } else if (random_opt == 2){
        answer = y % x;
        //random_opt = false;
      } else if (random_opt == 3){
        answer = y * x;
        //random_opt = false;
      }
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
  
function gameEnd(total_score) {
  background('black');

  if (bgWav.isPlaying()) {
    bgWav.stop();
    console.log("Game Over. Music Paused.")
  }

  textSize(20);
  fill(255);  
  text("GAME OVER", width/2-60, height/2);

  feed = "YOU GOT " + str(total_score) + " QUESTIONS CORRECT :)";
  text(feed, width/2-60, height/2+60);
  text("Click enter to play again", 100, 100)

  if (total_score <= 20){
    text("Congrats on getting the trophy", 200, 200)
  }
  
  gameStarted = false;
  restart = true;
}

function setup(){
  createCanvas(1500, 600);
  background (0);

  if (gameStarted === false){
    fill(255);  
    logo = createSprite(830, 200);
    logo.addImage(game_name);
    drawSprite(logo);
    textSize(20);
    text("Press RETURN TO START", width/2-60, height/2);
  }

  // Ground Info
  groundImg.resize(4000,100);
  ground = createSprite(115,580,2000,50);
  ground.addImage(groundImg);
  
  // Player Info
  playerImg.resize(100,100);
  player = createSprite(50,505);
  player.addImage(playerImg);

  // Rock Info
  bouldersImg.resize(200,200);

  bou1 = createSprite(300,450);
  bou1.addImage(bouldersImg);

  bou2 = createSprite(460,450);
  bou2.addImage(bouldersImg);

  bou3 = createSprite(620,450);
  bou3.addImage(bouldersImg);

  bou4 = createSprite(780,450);
  bou4.addImage(bouldersImg);

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

  if (player.position.y > 580){
    console.log("OUT OF BOUNDS")
    player.position.y = 505
    player.position.x = 50
  }

  button.mousePressed(submit)

  if (check == 1){
    fill('green');
    check = 'Correct'
    total_score = total_score + 1;
  } else if (check == 2){
    fill('red');
    tries = tries - 1;
    if (tries <= 0){
      gameEnd(total_score);
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

  // Sound
  

  if (bgWav.isPlaying()) {
    console.log("Sound Is Already Playing")
  } else {
    bgWav.play();
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
    clear();
    gameStarted = true;
    if (restart === true){
      logo.remove();
      tries = 5;
      total_score = 0;
      restart = False
    }
  }
}