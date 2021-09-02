const allQuizes = [];

let currentQuizIndex = 2;

// Get the json data from the API.
fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((result) => {
      const quiz = getQuiz(result);
      allQuizes.push(quiz);
    });

    const currentQuiz = allQuizes[currentQuizIndex];

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
  cardDiv.className = "card";
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

  allAnswersArray.forEach((answer) => {
    createAnswerDiv(answersContainerDiv, answer);
  });
}

function createAnswerDiv(answersContainerDiv, answer) {
  const answerDiv = document.createElement("div");
  answerDiv.className = "answer";
  answersContainerDiv.appendChild(answerDiv);

  const answerSpan = document.createElement("span");
  answerSpan.innerText = answer;
  answerDiv.appendChild(answerSpan);
}

function createNextButton() {
  const nextButton = document.createElement("button");
  nextButton.id = "next";
  nextButton.innerText = "Next";
  document.body.appendChild(nextButton);
}
