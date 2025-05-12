const questions = [
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text:"The head section",correct: false },
            { text:"The body section",correct: false },
            { text:"Both the head section and the body section are correct",correct: true },
            { text:"None of the above",correct: false },
        ]

    },
    {
        question: "Which of the following method can also be used to create objects in javascript",
        answers: [
            { text:"new keyword",correct: false },
            { text:"object.create",correct: false },
            { text:"create.object",correct: false },
            { text:"Both a and b",correct: true },
        ]

    },
    {
        question: "How many ways are there with which we can declare a variable in javascript?",
        answers: [
            { text:'Only one',correct: false },
            { text:'Two',correct: false },
            { text:'Three',correct: true },
            { text:"Infinitely many",correct: false },
        ]

    },
    {
        question: "What is the type of variable data declared below const data=[ ]?",
        answers: [
            { text:'Number',correct: false },
            { text:'object',correct: true },
            { text:'string',correct: false },
            { text:"Boolean",correct: false },
        ]

    },
    {
        question: "Which of the following represents loops in javascript?",
        answers: [
            { text:'While',correct: false },
            { text:'for',correct: false },
            { text:'forEach',correct: false },
            { text:"All of the above",correct: true },
        ]

    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo +". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none"
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
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==='true'){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display='block';
}
function showScore(){
    resetState();
    questionElement.innerHTML=`Your Score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion(); 
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();