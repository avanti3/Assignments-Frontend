const cat = document.getElementById("category");
const diff = document.getElementById("difficulty");
const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start-screen");
const quiz = document.querySelector(".quiz");
let questions = [];
let currentQuestion = 0;
let score = 0;
const errorPopup = document.getElementById("error-popup");
const closePopupBtn = document.getElementById("close-popup");
const errorMessage = document.getElementById("error-message");

const showErrorPopup = (message) => {
  errorMessage.textContent = message;
  errorPopup.classList.remove("hide");
};

closePopupBtn.addEventListener("click", () => {
  errorPopup.classList.add("hide");
});

const errorOccur = () => {
  closePopupBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadCategories();
  loadDifficulty();
});

const loadCategories = async () => {
  const url = "http://localhost:8081/categories";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response);
    const data = await response.json();
    console.log("Categories:", data);

    data.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.categoryId;
      option.textContent = category.name;
      cat.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    showErrorPopup("Error fetching categories. Try again later!");
    errorOccur();
    return;
  }
};

const loadDifficulty = () => {
  const difficulties = ["easy", "medium", "hard"];
  const diffSelect = document.getElementById("difficulty");

  difficulties.forEach((difficulty) => {
    const option = document.createElement("option");
    option.value = difficulty;
    option.textContent =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    diffSelect.appendChild(option);
  });
};

const startQuiz = async () => {
  loadingQuestions();

  const categoryId = cat.value;
  const difficulty = diff.value;
  if (!categoryId) {
    showErrorPopup("Please select a category!");
    errorOccur();
    return;
  } else if (!difficulty) {
    showErrorPopup("Please select a difficulty level!");
    errorOccur();
    return;
  }
  const url = `http://localhost:8081/questions/${categoryId}/${difficulty}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    if (data.length > 0) {
      questions = data;
      startScreen.classList.add("hide");
      quiz.classList.remove("hide");
      showQuestion();
    } else {
      showErrorPopup(
        "No questions available for this category and difficulty level!"
      );
      errorOccur();
      return;
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    showErrorPopup("Error fetching questions. Try again later!");
    errorOccur();
  }
};

startBtn.addEventListener("click", startQuiz);

function showQuestion() {
  const opt = document.querySelector(".answer-wrapper");
  const questionText = document.querySelector(".question");
  const questionNumber = document.querySelector(".number");

  const question = questions[currentQuestion];

  if (!question || !question.questionText) {
    console.error("Question or question text is undefined.");
    return;
  }

  questionText.innerHTML = question.questionText;
  opt.innerHTML = "";

  const options = [
    question.option1,
    question.option2,
    question.option3,
    question.option4,
  ];

  options.forEach((option) => {
    opt.innerHTML += `
      <div class="answer">
        <span class="text">${option}</span>
        <span class="checkbox"></span>
      </div>
    `;
  });

  questionNumber.innerHTML = `Question <span class="current">${
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

const checkAnswer = () => {
  const selectedAnswer = document.querySelector(".answer.selected");

  if (selectedAnswer) {
    const selectedText = selectedAnswer.querySelector(".text").innerHTML;
    const correctText = questions[currentQuestion].correctOption;

    if (selectedText === correctText) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.querySelectorAll(".answer").forEach((answer) => {
        if (answer.querySelector(".text").innerHTML === correctText) {
          answer.classList.add("correct");
        }
      });
    }
  } else {
    alert("Please select an option!");
    return;
  }

  document.querySelectorAll(".answer").forEach((answer) => {
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

const submitBtn = document.querySelector(".submit");
const nextBtn = document.querySelector(".next");
const endScreen = document.querySelector(".end-screen");
const finalScore = document.querySelector(".final-score");
const totalScore = document.querySelector(".total-score");
const scoreMessage = document.querySelector(".feedback");

submitBtn.addEventListener("click", checkAnswer);

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
