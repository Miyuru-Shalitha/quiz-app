const URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

const PAGE_ANIMATION_IN = "page-animation-in 0.5s ease-out";
const PAGE_ANIMATION_OUT = "page-animation-out 0.5s ease-in forwards";
const NEXT_BUTTON_ANIMATION = "next-button-animation 0.5s ease-out forwards";

const allQuizes = [];
let currentQuizIndex = 0;
let isCorrectAnswer = false;
let currentQuiz = null;
let score = 0;

let cardDiv = null;
let quizSpan = null;
let answersContainerDiv = null;
let answerDivs = [];

// Get the json data from the API.
fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((result) => {
      const quiz = getQuiz(result);
      allQuizes.push(quiz);
    });

    currentQuiz = allQuizes[currentQuizIndex];

    createCardDiv(currentQuiz);
    createNextButton();
  })
  .catch((err) => alert(err.message));

function getQuiz(result) {
  const question = result.question;
  const correctAnswer = result.correct_answer;
  const incorrectAnswers = result.incorrect_answers;

  // Make a single list of all the answers.
  // Last answer in the list is the correct answer.
  const allAnswers = incorrectAnswers;
  allAnswers.push(correctAnswer);

  // Return a single quiz object.
  return {
    question: question,
    allAnswers: allAnswers,
  };
}

function createCardDiv(currentQuiz) {
  cardDiv = document.createElement("div");
  cardDiv.className = "card";
  document.body.appendChild(cardDiv);

  createQuizContainerDiv(cardDiv, currentQuiz.question);
  createAnswersContainerDiv(cardDiv, currentQuiz.allAnswers);
}

function createQuizContainerDiv(cardDiv, questionText) {
  const quizContainerDiv = document.createElement("div");
  quizContainerDiv.className = "quiz-container";
  cardDiv.appendChild(quizContainerDiv);

  quizSpan = document.createElement("Span");
  quizSpan.id = "quiz";
  quizSpan.innerHTML = `(${currentQuizIndex + 1}/${
    allQuizes.length
  }). ${questionText}`;
  quizContainerDiv.appendChild(quizSpan);
}

function createAnswersContainerDiv(cardDiv, allAnswersArray) {
  answersContainerDiv = document.createElement("div");
  answersContainerDiv.className = "answers-container";
  cardDiv.appendChild(answersContainerDiv);

  const correctAnswer = allAnswersArray[allAnswersArray.length - 1]; // Last answer in the allAnswersArray is the correct answer. (Before shuffled)
  const shuffledAnswers = shuffle(allAnswersArray);

  answerDivs = shuffledAnswers.map((answer) =>
    createAnswerDiv(answersContainerDiv, answer, correctAnswer)
  );
}

function createAnswerDiv(answersContainerDiv, answer, correctAnswer) {
  const answerDiv = document.createElement("div");
  answerDiv.className = "answer";
  answersContainerDiv.appendChild(answerDiv);

  const answerSpan = document.createElement("span");
  answerSpan.innerHTML = answer;
  answerDiv.appendChild(answerSpan);

  answerDiv.onclick = () => {
    if (answer === correctAnswer) {
      isCorrectAnswer = true;
    } else {
      isCorrectAnswer = false;
    }

    // Highlight selected answerDiv.
    answerDivs.forEach((ansDiv) => {
      ansDiv.classList.remove("selected-answer");
    });
    answerDiv.classList.add("selected-answer");
  };

  return answerDiv;
}

function createNextButton() {
  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.innerText = "Next";
  document.body.appendChild(nextButton);

  nextButton.onclick = () => {
    // If selected answer is correct increase the score by 1.
    if (isCorrectAnswer) {
      score++;
    }
    // Show popupDiv.
    createPopupDiv(isCorrectAnswer);
    // Reset isCorrectAnswer back to false.
    isCorrectAnswer = false;

    cardDiv.style.animation = PAGE_ANIMATION_OUT;
    setTimeout(() => {
      if (currentQuizIndex < allQuizes.length - 1) {
        // Change the question to next one.
        currentQuizIndex++;
        let newQuiz = allQuizes[currentQuizIndex];

        // Update the question text.
        quizSpan.innerHTML = `(${currentQuizIndex + 1}/${allQuizes.length}). ${
          newQuiz.question
        }`;

        // Remove older answersContainer and add new one.
        cardDiv.removeChild(answersContainerDiv);
        createAnswersContainerDiv(cardDiv, newQuiz.allAnswers);

        cardDiv.style.animation = PAGE_ANIMATION_IN;
      } else {
        // Revmove cardDiv.
        document.body.removeChild(cardDiv);

        nextButton.style.animation = NEXT_BUTTON_ANIMATION;
        setTimeout(() => {
          document.body.removeChild(nextButton);
        }, 600);

        // Show Score.
        createResultDiv(score, allQuizes.length);
      }
    }, 600);
  };
}

function createPopupDiv(isCorrect) {
  const popupDiv = document.createElement("div");

  if (isCorrect) {
    popupDiv.className = "pop-up correct";
    popupDiv.innerText = "Correct!";
  } else {
    popupDiv.className = "pop-up incorrect";
    popupDiv.innerText = "Incorrect!";
  }

  document.body.appendChild(popupDiv);

  // Remove the popup after 1.5 seconds.
  setTimeout(() => {
    document.body.removeChild(popupDiv);
  }, 1500);
}

function createResultDiv(score, numOfQuizes) {
  const resultDiv = document.createElement("div");
  resultDiv.id = "result";
  resultDiv.className = "card result";
  resultDiv.innerText = `Your score is ${score} / ${numOfQuizes}`;
  document.body.appendChild(resultDiv);
}

////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
////////////////////////////////////////////////////////////////////
