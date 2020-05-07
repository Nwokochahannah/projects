let scoreBoard = document.querySelector(".scoreBoard");
const question = document.querySelector(".question");
const opt1 = document.querySelector(".option1");
const opt2 = document.querySelector(".option2");
const opt3 = document.querySelector(".option3");
const opt4 = document.querySelector(".option4");
const options = document.querySelector(".options").children;
const answerCounterWrapper = document.querySelector(".answersCounter");
const questionNumberSpan = document.querySelector(".questionNumValue");
const totalQuestionSpan = document.querySelector(".totalNumber");
const correctNumber = document.querySelector(".correctNumber");
const totalQuestionSpan2 = document.querySelector(".totalNumber2");
const percentage = document.querySelector(".percentage");
let questionIndex;
let index = 0;
let myArray = [];
let score = 0;

const questions = [
    {
        q: 'HTML is a?', 
        options:['Programming Language','Database software','Operating system','Markup Language with Tags'], 
        answer:3
    },
    {
        q:'The main content of the webpage are kept?', 
        options:['Inside the head section of the page', 'After closing html tag of the page',
         'Before the Head section of the page', 'Inside the body section of the page'],
        answer:3
    },
    {
        q:'Line break can be added in HTML pages by using', 
        options:['break', 'br', 'line', 'new-line'],
        answer:1
    },
    {
        q:'Title tag is kept', 
        options:['Inside the body tag', 'Inside the head tag', 'before the main content', 'before the html tag'],
        answer: 1
    },
    {
        q: 'Which tag is used to draw horizontal line in HTML',
        options:['br', 'title', 'html', 'hr'],
        answer: 3
    },
];

totalQuestionSpan.innerHTML = questions.length;
function load(){
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    opt1.innerHTML = questions[questionIndex].options[0];
    opt2.innerHTML = questions[questionIndex].options[1];
    opt3.innerHTML = questions[questionIndex].options[2];
    opt4.innerHTML = questions[questionIndex].options[3];
    index++;
};

function check(ele){
    if (ele.id == questions[questionIndex].answer){
        ele.classList.add("correct");
        updateAnswerCounter("correct");
        score++;
        console.log("score:" + score);
    } else {
        ele.classList.add("wrong");
        updateAnswerCounter("wrong");
    }
    disabled();
};

function disabled(){
    for (let i = 0; i < options.length; i++){
        options[i].classList.add("disabled");
        if (options[i].id == questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
};

function enabled(){
    for (let i = 0; i < options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong");
    }
};

function validate(){
    if (!options[0].classList.contains("disabled")){
        alert("Select an option");
    } else {
        enabled();
        randomQuestion();
        scoreCard();
    }
};

function randomQuestion(){
    let randomNumber = Math.floor(Math.random() * questions.length);
    let duplicate = 0;
    if (index == questions.length){
        quizOver();
    } else {
        if (myArray.length > 0){
            for (let i = 0; i < myArray.length; i++){
                if(myArray[i] == randomNumber){
                    duplicate = 1;
                    break;
                }
            } 
            if (duplicate == 1){
                randomQuestion();
            } else { 
                questionIndex = randomNumber; 
                load();
            }
        }
        if (myArray.length == 0){
            questionIndex = randomNumber; 
            load();
    }
    
    }
    myArray.push(randomNumber);
};

function scoreCard(){
    scoreBoard.innerHTML = 'SCORE: ' + score  + '/' + questions.length ;
};

function next(){
    validate();
};

function answerCounter(){
    for (let i = 0; i < questions.length; i++){
        const div = document.createElement("div");
        answerCounterWrapper.appendChild(div);
    }
};

function updateAnswerCounter(classes){
    answerCounterWrapper.children[index - 1].classList.add(classes);
};

function quizOver(){
    document.querySelector(".gameOver").classList.add("show");
    correctNumber.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score/questions.length) * 100 + "%";
};

function tryAgain(){
    window.location.reload();
};

window.onload = function(){
   randomQuestion();
   answerCounter();
};