const questions =[
    {
        question:"What does SQL Stands for?",
        answers: [
            { text: "Standard Query Link", correct: false},
            { text: "Standard Questions Last", correct: false},
            { text: "Structured Query language", correct: true},
            { text: "Standard Question Link", correct: false},
        ]
    },
    {
        question:"Which one of the Following is Front End Language?",
        answers: [
            { text: "C++", correct: false},
            { text: "Java", correct: false},
            { text: "Python", correct: false},
            { text: "Javascript", correct: true},
        ]
    },
    {
        question:"The two major categories of software include",
        answers: [
        { text: "Operating system and utility ", correct: true},
        { text: "Personal productivity and system", correct: false},
        { text: "System and utility", correct: false},
        { text: "System and application", correct: false},
    ]
},
{
    question:"Which of the following is NOT a famous Operating System",
    answers: [
    { text: "Virtual Box ", correct: true},
    { text: "Sun OS", correct: false},
    { text: "Linux", correct: false},
    { text: "Mac OS ", correct: false},
]
},

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer);


    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
 
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
     }else{
        selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = "true";

     });
     nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
        length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});
startQuiz();
