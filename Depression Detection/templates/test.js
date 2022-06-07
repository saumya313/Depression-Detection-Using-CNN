let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let styles = [];
var subCat;

var SCORE_POINTS;
var MAX_QUESTIONS = 10;

startGame = (questions) => {
  questionCounter = 0;
  score = 0;
  getNewQuestion(questions);
};

setStyles = (styles) => {
  var a = styles.Background; 

  if (a.length <= 20) document.body.style.backgroundColor = a;
 
  else if (a[0] == "l") document.body.style.backgroundImage = a;
 
  else document.body.style.backgroundImage = "url(" + a + ")"; 

  var b = styles.progressBarColor; 
  $("#progressBar").css("borderColor", b);
  $("#progressBarFull").css("background", b);

  var c = styles.topTextColor; //Color of the Question, Timer and Text on top of the Progress Bar (Question number)
  var elements2 = [
    "#progressText",
    // ".hud-prefix_ch",
    // ".hud-prefix_cd",
    "#question",
  ];
  elements2.forEach((x) => {
    document.querySelector(x).style.color = c;
  });

  var d = styles.optionTextColor; //Color of the options
  $(".choice-prefix").css("color", d);
  $(".choice-text").css("color", d);

  var e = styles.optionBgColor; //Background Color of the options
  $(".choice-container").css("background", e);
};

// background - white and blue
// text - black, dark blue (clearly visible on white)
// option - light blue,

//Main Quiz Page Interface
getNewQuestion = (availableQuestions) => {
  // console.log(catCode);
  // console.log(availableQuestions.length);
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html?cat=" + catCode);
  }

  const question = document.querySelector("#question");
  const information = document.querySelector("#information");
  const choices = Array.from(document.querySelectorAll(".choice-text"));
  const progressText = document.querySelector("#progressText");
  const progressBarFull = document.querySelector("#progressBarFull");

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  // console.log(currentQuestion.question.length)

  // if (currentQuestion.question.length > 300) {
  //   //If question is too lengthy
  //   document.querySelector("#question").style.fontSize = "3.5rem";
  //   document.querySelector(".container").style.marginTop = "90px";
  // } else if (currentQuestion.question.length > 135) {
  //   document.querySelector("#question").style.fontSize = "4rem";
  //   document.querySelector(".container").style.marginTop = "60px";
  // } else {
  //   document.querySelector("#question").style.fontSize = "5.4rem";
  //   document.querySelector(".container").style.marginTop = "0";
  // }

  question.innerText = currentQuestion.question;
  information.innerText = currentQuestion.info;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;

  //Quiz Evaluation
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      // let isCorrect =
      //   selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      // if (isCorrect === "correct") {
      // }
      console.log(selectedAnswer - 1);
      incrementScore(selectedAnswer - 1);

      setTimeout(() => {
        getNewQuestion(availableQuestions);
      }, 800);
    });
  });
  incrementScore = (num) => {
    score += num;
    console.log("Score = " + score);
  };
};

var catCode = "mt1";

//To fetch Styles and Questions from Json file
fetch("./questions.json")
  .then((response) => response.json())
  .then((data) => {
    subCat = data.Subcategories.filter((cat) => cat.id === catCode);
    questions = subCat[0].Questions;
    styles = subCat[0].Styles;
    setStyles(styles[0]);
    startGame(questions);
  });

