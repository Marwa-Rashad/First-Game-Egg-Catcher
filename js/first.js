var basket = document.getElementById("basket");
var score = 0;
var life = 10;
var playControls = document.getElementById("play");
var startBtn = document.getElementById("playBtn");
var hens = document.getElementById("hens");
var brokenEggs = document.getElementById("brokenEggs");
var scoreDiv = document.querySelector(".score");
var lifeDiv = document.querySelector(".life");
var eggList = document.getElementsByClassName('egg');
var brokenEggList = document.getElementsByClassName("brokenEgg");
var eggFunction = "";


/*Start Game*/

function start(){

  playControls.style.opacity = 0;
  gameAudio();

  eggFunction = setInterval(eggDown, 300);

}


var eTop1 = 65;
var eTop2 = 65;
var eTop3 = 65;

/*Basket movement*/

document.body.addEventListener('mousemove', function(e){
  basket.style.left = e.clientX; 
})

/*Egg Movement*/


 function eggDown() {

  for (var i = 0; i < eggList.length; i++)  {
    eggList[i].style.display = "block";
    brokenEggList[i].style.opacity = 0;
    eggScore(i);

    }

    /*Iterate top values*/

    eggList[0].style.top = eTop1  + "px";
    eTop1 += 30;


    eggList[1].style.top = eTop2  + "px";
    eTop2 += 40;


    eggList[2].style.top = eTop3  + "px";
    eTop3 += 20;
  } 

 
/*Score Count*/
 function eggScore(i){
      var basketX = basket.getBoundingClientRect().x;
      var eggX = eggList[i].getBoundingClientRect().x;
      var basketY = basket.getBoundingClientRect().y;
      var eggY = eggList[i].getBoundingClientRect().y;

      /*Distance between two objects*/
      var d = Math.sqrt(Math.pow(eggX - basketX, 2) + Math.pow(eggY - basketY, 2));

      /*Score Conditions*/

      if ((d < eggList[i].getBoundingClientRect().height))   {
      score+=1;
      scoreAudio();
      document.getElementById("score").innerHTML = score;
      eggList[i].style.display = "none";
        switch (i) {
        case 0:
        eTop1 = 65;
        break;
        case 1:
        eTop2 = 65;
        break;
        case 2:
        eTop3 = 65;
        break;
            }

    } else if  (eggList[i].getBoundingClientRect().top > 580) {
      brokenEggs.style.opacity = 1;

      eggList[i].style.opacity = 1;
      life-=1;
      eggList[i].style.display = "none";        
      switch (i) {
        case 0:
        eTop1 = 65;
        break;
        case 1:
        eTop2 = 65;
        break;
        case 2:
        eTop3 = 65;
        break;
            }

      brokenEggList[i].style.opacity = 1;
      document.getElementById("life").innerHTML = life;
      
       }
      
       endGame();
       
      }
      
      
      
/*End Game and Show score*/
function endGame() {
if (life < 1) {
  stopEggs();
  playControls.style.opacity = 1;
  playControls.innerHTML = ` <div class="position-relative text-center d-flex flex-column rounded-pill gameEnd justify-content-center mx-auto my-5 align-items-center col-sm-7 px-4 py-5"> 
  <div class=""><h1 class="title text-white font-weight-bolder">HAPPY EGGS</h1></div>
  <h1 class="title text-warning">`+ score +`</h1>
  <div class="btn2 position-absolute"><button class="btn btn-lg px-5 rounded-pill text-white font-weight-bold" onclick="replay()">Play Again</button></div>`;
  hens.style.opacity = 0;
  brokenEggs.style.opacity = 0;
  scoreDiv.style.opacity = 0;
  lifeDiv.style.opacity = 0; 
  eTop1 = 65;
  eTop2 = 65;
  eTop3 = 65;
  gameAudioPause();
  gameOverAudio();

}

}
/*Replay*/

function replay(){
  playControls.innerHTML = `<div class="position-relative text-center d-flex flex-column rounded-pill gameStart justify-content-center mx-auto my-5 align-items-center col-sm-7 px-4 py-5"> 
  <div class=""><h1 class="title text-white font-weight-bolder">HAPPY EGGS</h1></div>
  <div class="btn1 position-absolute"><button class="btn btn-lg px-5 badge-pill text-white font-weight-bold col-sm-12" id="playBtn" onclick="start()">Play</button></div>
`;
  hens.style.opacity = 1;
  scoreDiv.style.opacity = 1;
  lifeDiv.style.opacity = 1; 

  score = 0;
  life = 10;
  document.getElementById("life").innerHTML = life;
  document.getElementById("score").innerHTML = score;



  
}

 /*Sounds functions*/

 /*Score*/

 var scoreSound = document.getElementById("scoreAudio"); 

function scoreAudio() { 
  scoreSound.play(); 
} 

 /*GameOn*/

 var gameSound = document.getElementById("gameAudio"); 

/*Start Game On Sound*/
function gameAudio() { 
  gameSound.play(); 
} 
/*Stop Game On Sound*/
function gameAudioPause() { 
  gameSound.pause(); 
  gameSound.currentTime = 0;
} 


/*Game Over*/

var gameOverSound = document.getElementById("gameOverAudio");
function gameOverAudio(){
  gameOverSound.play();
}

 /*Stop Eggs*/
 function stopEggs() {
  clearInterval(eggFunction);
}

