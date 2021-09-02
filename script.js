// const allQuizes = [];

const allQuizes = [
  {
    question:
      "What does AD stand for in relation to Windows Operating Systems? ",
    allAnswers: [
      "Alternative Drive",
      "Automated Database",
      "Active Department",
      "Active Directory",
    ],
  },
  {
    question: "How many Hz does the video standard PAL support?",
    allAnswers: ["59", "60", "25", "50"],
  },
  {
    question:
      "If you were to code software in this language you&#039;d only be able to type 0&#039;s and 1&#039;s.",
    allAnswers: ["JavaScript", "C++", "Python", "Binary"],
  },
  {
    question: "Who invented the &quot;Spanning Tree Protocol&quot;?",
    allAnswers: ["Paul Vixie", "Vint Cerf", "Michael Roberts", "Radia Perlman"],
  },
  {
    question:
      "In programming, what do you call functions with the same name but different implementations?",
    allAnswers: ["Overriding", "Abstracting", "Inheriting", "Overloading"],
  },
  {
    question:
      "What type of sound chip does the Super Nintendo Entertainment System (SNES) have?",
    allAnswers: [
      "FM Synthesizer",
      "Programmable Sound Generator (PSG)",
      "PCM Sampler",
      "ADPCM Sampler",
    ],
  },
  {
    question:
      "Which of the following computer components can be built using only NAND gates?",
    allAnswers: ["CPU", "RAM", "Register", "ALU"],
  },
  {
    question:
      "What is the codename of the eighth generation Intel Core micro-architecture launched in October 2017?",
    allAnswers: ["Sandy Bridge", "Skylake", "Broadwell", "Coffee Lake"],
  },
  {
    question:
      "Which of these Cherry MX mechanical keyboard switches is both tactile and clicky?",
    allAnswers: [
      "Cherry MX Black",
      "Cherry MX Red",
      "Cherry MX Brown",
      "Cherry MX Blue",
    ],
  },
  {
    question: "Which kind of algorithm is Ron Rivest not famous for creating?",
    allAnswers: [
      "Hashing algorithm",
      "Asymmetric encryption",
      "Stream cipher",
      "Secret sharing scheme",
    ],
  },
];

let currentQuizIndex = 2;

// // Get the json data from the API.
// fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
//   .then((res) => res.json())
//   .then((data) => {
//     data.results.forEach((result) => {
//       const quiz = getQuiz(result);
//       allQuizes.push(quiz);
//     });
//     createPage();
//   })
//   .catch((err) => alert(err.message));

// function getQuiz(result) {
//   const question = result.question;
//   const correctAnswer = result.correct_answer;
//   const incorrectAnswers = result.incorrect_answers;

//   // Make a single list of all the answers.
//   // Last answer in the list is the correct answer.
//   const allAnswers = incorrectAnswers;
//   allAnswers.push(correctAnswer);

//   // Return a single quiz object.
//   return {
//     question: question,
//     allAnswers: allAnswers,
//   };
// }

const currentQuiz = allQuizes[currentQuizIndex];

createCard(currentQuiz);

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
