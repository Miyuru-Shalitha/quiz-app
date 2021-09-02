const PAGE_ANIMATION_OUT = "page-animation-out 0.5s ease-in forwards";

const allQuizes = [];
let currentQuizIndex = 2;
let isCorrectAnswer = false;
let currentQuiz = null;

// Get the json data from the API.
fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((result) => {
      const quiz = getQuiz(result);
      allQuizes.push(quiz);
    });

    currentQuiz = allQuizes[currentQuizIndex];

    createCard(currentQuiz);
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

function createCard(currentQuiz) {
  const cardDiv = document.createElement("div");
  cardDiv.id = "card";
  document.body.appendChild(cardDiv);

  createQuizContainerDiv(cardDiv, currentQuiz.question);
  createAnswersContainerDiv(cardDiv, currentQuiz.allAnswers);
}

function createQuizContainerDiv(cardDiv, questionText) {
  const quizContainerDiv = document.createElement("div");
  quizContainerDiv.className = "quiz-container";
  cardDiv.appendChild(quizContainerDiv);

  const quizSpan = document.createElement("Span");
  quizSpan.id = "quiz";
  quizSpan.innerHTML = questionText;
  quizContainerDiv.appendChild(quizSpan);
}

function createAnswersContainerDiv(cardDiv, allAnswersArray) {
  const answersContainerDiv = document.createElement("div");
  answersContainerDiv.className = "answers-container";
  cardDiv.appendChild(answersContainerDiv);

  const correctAnswer = allAnswersArray[allAnswersArray.length - 1]; // Last answer in the allAnswersArray is the correct answer. (Before shuffled)
  const shuffledAnswers = shuffle(allAnswersArray);

  shuffledAnswers.forEach((answer) => {
    createAnswerDiv(answersContainerDiv, answer, correctAnswer);
  });
}

function createAnswerDiv(answersContainerDiv, answer, correctAnswer) {
  const answerDiv = document.createElement("div");
  answerDiv.className = "answer";
  answersContainerDiv.appendChild(answerDiv);

  const answerSpan = document.createElement("span");
  answerSpan.innerText = answer;
  answerDiv.appendChild(answerSpan);

  answerDiv.onclick = () => {
    if (answer === correctAnswer) {
      isCorrectAnswer = true;
    } else {
      isCorrectAnswer = false;
    }
  };
}

function createNextButton() {
  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.innerText = "Next";
  document.body.appendChild(nextButton);

  nextButton.onclick = () => {
    console.log(isCorrectAnswer);
    const cardDiv = document.querySelector("#card");
    cardDiv.style.animation = PAGE_ANIMATION_OUT;
    setTimeout(() => {
      document.body.removeChild(cardDiv);
      createCard(currentQuiz);
    }, 600);
  };
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
