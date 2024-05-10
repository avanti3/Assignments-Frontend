let num;
const cat = document.getElementById("category");
const diff = document.getElementById("difficulty");
const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start-screen");
const quiz = document.querySelector(".quiz");
let questions = [];
let currentQuestion = 0;
let score = 0;

startQuiz = async () => {
  loadingQuestions();
  if (diff.value == "easy") num = 5;
  else if (diff.value == "medium") num = 15;
  else if (diff.value == "hard") num = 25;
  else num = 10;
  console.log(diff.value);
  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat.value}&difficulty=${diff.value}&type=multiple`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code === 0) {
      questions = data.results;
      startScreen.classList.add("hide");
      quiz.classList.remove("hide");

      showQuestion();
    } else {
      console.error("Error fetching questions:", data.response_message);
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function showQuestion() {
  const opt = document.querySelector(".answer-wrapper");
  const questionText = document.querySelector(".question");
  const questionNumber = document.querySelector(".number");

  const question = questions[currentQuestion];

  questionText.innerHTML = decodeHTMLEntities(question.question);
  opt.innerHTML = "";
  const correctAnswer = decodeHTMLEntities(question.correct_answer);
  console.log(question);
  const incorrectAnswers = question.incorrect_answers.map((answer) =>
    decodeHTMLEntities(answer)
  );
  const options = [correctAnswer, ...incorrectAnswers];
  options.sort(() => Math.random() - 0.5);
  options.forEach((option) => {
    opt.innerHTML += `
        <div class="answer">
          <span class="text">${option}</span>
          <span class="checkbox"></span>
        </div>
      `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    currentQuestion + 1
  }</span>
                <span class="total">/${questions.length}</span>`;
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });
}

const loadingQuestions = () => {
  startBtn.innerHTML = "Loading";
  setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};
const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  const selectedAnswer = document.querySelector(".answer.selected");

  if (selectedAnswer) {
    const selectedText = decodeHTMLEntities(
      selectedAnswer.querySelector(".text").innerHTML
    );
    const correctText = decodeHTMLEntities(
      questions[currentQuestion].correct_answer
    );

    if (selectedText === correctText) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            decodeHTMLEntities(answer.querySelector(".text").innerHTML) ===
            correctText
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    alert("Please select an option!");
    return;
  }

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score"),
  scoreMessage = document.querySelector(".feedback");

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");

  const percentage = (score / questions.length) * 100;
  let feedback = "";

  if (percentage < 50) {
    feedback = "Keep practicing! Aim for a higher score next time.";
  } else if (percentage >= 50 && percentage < 70) {
    feedback = "Well done! You're on the right track.";
  } else if (percentage >= 70 && percentage < 90) {
    feedback = "Great job! You're almost there!";
  } else {
    feedback = "Congratulations! You've aced the quiz!";
  }

  scoreMessage.innerText = feedback;
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
