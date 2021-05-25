// 2. grab our HTML elements 
let playButton = document.getElementById("play-button")
let opponentDisplay = document.getElementById("opponent-display")
let userDisplay = document.getElementById("user-display")
let resultDisplay = document.getElementById("result-display")


// 2. generate opponent play when the play button is clicked
let opponentPlay = "";
let userPlay = "";

playButton.addEventListener("click", function(){
  options = ["Rock", "Paper", "Scissors"]
  opponentPlay = options[Math.floor(Math.random()*options.length)]
  opponentDisplay.innerHTML = "Opponent Played: " + opponentPlay
  // 5. Declaring a winner
  let result = ""
  if(userPlay == opponentPlay){
    result = "It's a tie! 👔"
  }
  else if(userPlay == "Rock"){
    if(opponentPlay == "Paper"){
      result = "You lose! 💩"
    }
    else if(opponentPlay == "Scissors"){
      result = "You win! 🏆"
    }
  }
  else if(userPlay == "Paper"){
    if(opponentPlay == "Rock"){
      result = "You win! 🏆"
    }
    else if(opponentPlay == "Scissors"){
      result = "You lose! 💩"
    }
    
  }
  else if(userPlay == "Scissors"){
    if(opponentPlay == "Paper"){
      result = "You win! 🏆"
    }
    else if(opponentPlay == "Rock"){
      result = "You lose! 💩"
    }
  }
  userDisplay.innerHTML = "User Played: " + userPlay;
  resultDisplay.innerHTML = "Result: " + result; 
})

// 3. classify video

// 3.a load the model
let modelURL = "https://teachablemachine.withgoogle.com/models/O-jTpCyTd/"
let classifier;

function preload(){
	classifier = ml5.imageClassifier(modelURL + "model.json")
}
// 3.b Setting up a video capture on the canvas

let video;

function setup() {
  video = createCapture(VIDEO);
  video.hide()
  createCanvas(640, 480);
  classifyVideo();
}

function draw() {
  background(220);
  image(video,0,0);
  // 4. Creating an indicator of the model's guess
  textSize(32);
  let emoji = "😊";
  if(userPlay == "Rock"){
    emoji = "🪨";
  }
  else if(userPlay == "Paper"){
    emoji = "📄";
  }
  else if(userPlay == "Scissors"){
    emoji = "✂️";
  }
  text(emoji, 20, 60)
}

// 3.c classify the video
function classifyVideo(){
  classifier.classify(video, useResults)
}
// 3.d use the result to update userPlay
function useResults(error, result){
  if(error){
    console.log(error)
  }
  userPlay = result[0].label;
  // 3.e Establish Classification Loop
  classifyVideo();
}

