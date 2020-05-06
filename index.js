let questionNum = document.getElementById('question-number');
let scoreBoard = document.getElementById('scoreBoard');
let questionBox = document.getElementById("questionBox");
let ul = document.getElementById("ul");
let opt1 = document.getElementById("opt1");
let opt2 = document.getElementById("opt2");
let opt3 = document.getElementById("opt3");
let opt4 = document.getElementById("opt4");
let nxt = document.getElementById("nextButton");
let correctNumber = document.getElementById("correctNumber");
let totalNumber = document.getElementById("totalNumber");
let percentage = document.getElementById("percentage");
let quizBox = document.getElementById("quizBox");
// let scoreCounter = document.getElementById("score-counter");

// let correctNumber = this.score;
let quiz = {
    questions:[
        {q: 'HTML is a?', 
            options:['Programming Language','Database software','Markup Language with Tags','Operating system'], 
            answer:3
        },
        {q:'The main content of the webpage are kept?', 
            options:['Inside the head section of the page', 'After closing html tag of the page',
                'Inside the body section of the page', 'Before the Head section of the page'],
            answer:3
        },
        {q:'Line break can be added in HTML pages by using', 
            options:['break', 'br', 'line', 'new-line'],
            answer:2
        },
        {q:'Title tag is kept inside', 
            options:['body tag', 'head tag', 'before starting of the main content', 'before starting of html tag'],
            answer: 2
        },
        {q: 'Which tag is used to draw horizontal line in HTML',
            options:['br', 'title', 'html', 'hr'],
            answer: 4
        },
    ],

   
    index:0,
    load:function(){
        if (this.index <= this.questions.length - 1){
            questionBox.innerHTML = this.questions[this.index].q;
            opt1.innerHTML = this.questions[this.index].options[0];
            opt2.innerHTML = this.questions[this.index].options[1];
            opt3.innerHTML = this.questions[this.index].options[2];
            opt4.innerHTML = this.questions[this.index].options[3];
        } else {
            questionBox.innerHTML = 'Quiz is over. Thanks';
            opt1.style.display = 'none';
            opt2.style.display = 'none';
            opt3.style.display = 'none';
            opt4.style.display = 'none';
            nxt.style.display = 'none';
            questionNum.innerHTML = '';
            quizBox.innerHTML = this.scoreBoard();
        }
    },

    quizOver:function (){
        this.scoreBoard();
    //     document.querySelector(".gameOver").classList.add("show");
    //     correctNumber.innerHTML = this.num;
    //     totalNumber.innerHTML = this.scoreBoard();
    //     percentage.innerHTML = (this.score/this.questions) * 100 + "%";
    },

    check: function(elem){
        let id = elem.id.split('');
        if(id[id.length - 1] == this.questions[this.index].answer){
            this.score++;
            elem.classList.add("correct");
            elem.innerHTML = 'Correct';
            this.scoreBoard();
        } else {
            elem.classList.add('wrong');
            elem.innerHTML = 'Wrong';
        }
        this.disabled();
    },

    next:function(){
        this.index++;
        this.num++;
        this.load();
        this.questionNum();
    },

    disabled:function(){
        for (let i = 0; i < ul.children.length; i++){
            ul.children[i].classList.add("disabled");
            ul.children[i].style.pointerEvents = 'none';
        }
    },

    abled:function(){
        for (let i = 0; i < ul.children.length; i++){
            ul.children[i].style.pointerEvents = 'auto';
            ul.children[i].className = '';
        }
    },

    score:0,
    scoreBoard:function(){
        scoreBoard.innerHTML = 'SCORE: ' + this.score  + '/' + this.questions.length ;
    },

    num:1,
    questionNum:function(){
        if (this.index <= this.questions.length - 1){
        questionNum.innerHTML = 'Question ' + this.num + ' of ' + this.questions.length;
        }
    }
}

ques = this.index;
function validate(){
    if (!ul.children[0].classList.contains("disabled")){
        alert("Select an option");
    } else {
        quiz.abled();
        quiz.next();
    }
}

function button(elem){
    quiz.check(elem);
    quiz.disabled();
}

function next (){
    validate();
}

function quizOver(){
    document.querySelector(".gameOver").classList.add("show");
    correctNumber.innerHTML = this.num;
    totalNumber.innerHTML = quiz.scoreBoard();
    percentage.innerHTML = (this.score/ques) * 100 + "%";
}

function tryAgain(){
    window.location.reload();
}

window.onload = quiz.load();