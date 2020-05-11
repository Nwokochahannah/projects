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
const nextBtn = document.querySelector(".next-button");
let questionIndex;
let index = 0;
let myArray = Array.of();
let score = 0;

// Array of Objects to Store the Questions and each Options and Answers

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

// This function loads Each time the we load or Reload the Browser

function load(){
    questionNumberSpan.innerHTML = index + 1;
    question.innerHTML = questions[questionIndex].q;
    opt1.innerHTML = questions[questionIndex].options[0];
    opt2.innerHTML = questions[questionIndex].options[1];
    opt3.innerHTML = questions[questionIndex].options[2];
    opt4.innerHTML = questions[questionIndex].options[3];
    ++index;
};

// This Function Checks if an Option was Clicked and if it Correct or wrong

function check(ele){
    if (ele.id == questions[questionIndex].answer){
        ele.classList.add("correct");
        updateAnswerCounter("correct");
        score++;
    } else {
        ele.classList.add("wrong");
        updateAnswerCounter("wrong");
    }
    disabled();
};

// This function Disables All other options when one has already been clicked and adds the class(correct) to all questions 

function disabled(){
    for (let i = 0; i < options.length; i++){
        options[i].classList.add("disabled");
        if (options[i].id == questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
};

// This function removes classes from The old Question and makes the options clickable Again

function enabled(){
    for (let i = 0; i < options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong");
    }
};

// This Function makes the Next button unclickable unless an Option has already been clicked

function validate(){
    if (!options[0].classList.contains("disabled")){
        nextBtn.classList.add('disabled')
    } else {
        enabled();
        randomize();
        scoreCard();
    }
};

// This Function randomizes the Questions on each load on the browser using random numbers, it also calls the function that ends the quiz and gives an index to each Question

function randomize(){
    let randomNumber = Math.floor(Math.random() * questions.length);
    let duplicate = 0;
    if (index == [questions.length]){
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
                randomize();
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

// This Function changes the score in the score board

function scoreCard(){
    scoreBoard.innerHTML = 'SCORE: ' + score  + '/' + questions.length ;
};

// This function creates functionality for the next button

function next(){
    validate();
};

// This Function cretes the elements for the counter at the bottom of the quiz box

function answerCounter(){
    for (let i = 0; i < questions.length; i++){
        const div = document.createElement("div");
        answerCounterWrapper.appendChild(div);
    }
};

// This Function updates the counter on each click

function updateAnswerCounter(classes){
    answerCounterWrapper.children[index - 1].classList.add(classes);
};

// This Function create sthe message at the end of the quiz 

totalQuestionSpan.innerHTML = questions.length;
function quizOver(){
    document.querySelector(".gameOver").classList.add("show");
    correctNumber.innerHTML = score;
    totalQuestionSpan2.innerHTML = questions.length;
    percentage.innerHTML = (score/questions.length) * 100 + "%";
};

// This Function reloads the quiz if you want to try again

function tryAgain(){
    window.location.reload();
};

// This Function load the quiz whenever the browser is reloaded

window.onload = function(){
   randomize();
   answerCounter();
};