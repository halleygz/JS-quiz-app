const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Oceanea", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nxtBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nxtBtn.textContent = "Next";
  showQuestion()
}
function resetState(){
    nxtBtn.style.display = 'none'
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled=true
    })
    nxtBtn.style.display = 'block'
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex+1;
    questionElement.textContent =  `${questionNo}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.text
        button.classList.add('btn')
        answerBtns.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}
function showScore(){
    resetState()
    questionElement.textContent = `You scored ${score} out of ${questions.length}`
    nxtBtn.textContent = 'Play Again'
    nxtBtn.style.display = 'block'
}
function handleNxtBtn (){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion()
    } else {
        showScore()
    }
}
nxtBtn.addEventListener('click', ()=> {
    if(currentQuestionIndex<questions.length){
        handleNxtBtn()
    } else {
        startQuiz()
    }
})
startQuiz()