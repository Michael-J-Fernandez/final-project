let questionDisplay = document.querySelector('.question-display');
let userInput = document.querySelector('.user-input');
let result = document.querySelector('#result-display');
let practiceTopics = document.querySelectorAll('.topic');
let topicContainer = document.querySelector('#topic-container');
let lastButton = document.querySelector('.last');
let nextButton = document.querySelector('.next');
let hint = document.querySelector('.hint');
let active = document.querySelector('.active');
let instructionsDisplay = document.querySelector('.instructions-display');

let topic = 'home';
let groupedData = '';
let i = 0;
let questionObj = '';
let instructions = '';
let question = '';
let answer = [];
let userInputHold = '';
// let lastQuestion = groupedData[topic].length-1;


// --- DATA RETIREVAL/ORGANIZATION ---
let readEmmetTypeData = async () => {
    let rawEmmetData = await fetch('/emmet-type.json');
    let data = await rawEmmetData.json();
    groupedData = _.groupBy(data, 'topic');
    
    i = 0;
    refreshQuestionDisplay()
}

readEmmetTypeData();



// --- TOPIC SELECTION ---
practiceTopics.forEach(item => {
    item.addEventListener('click', () => {

        hint.classList.remove('hint-incorrect');

        // switches .active to selected topic
        practiceTopics.forEach(item => {
            item.classList.remove('active');
        })
        item.classList.add('active');

        // loads data for current topic
        userInputHold = "";
        userInput.value = "";
        topic = item.id;
        result.innerText = "";
        result.classList.remove('incorrect', 'correct');
        readEmmetTypeData();
    })
})



// --- HINTS ---
hint.addEventListener('click', () => {

    hint.classList.remove('hint-incorrect');

    if (!userInput.hasAttribute('placeholder')) {
        if (userInput.value !== '') {
            userInputHold = userInput.value;
        }
        userInput.value = "";
        userInput.setAttribute('placeholder', answer[0]);

    } else {
        userInput.removeAttribute('placeholder');
        userInput.value = userInputHold;
    }
})

hint.addEventListener('blur', () => {
    userInput.removeAttribute('placeholder');
    hint.classList.remove('hint-incorrect');
    userInput.value = userInputHold;
    userInputHold = "";
})



// --- INPUT COLOR STATUS ---
userInput.addEventListener('input', () => {
    console.log(answer.includes(userInput.value));

    if (userInput.value === '') {
        userInput.classList.remove('typing', 'correct', 'incorrect');
        
    } else if (!answer.includes(userInput.value)){
        userInput.classList.add('typing');
        userInput.classList.remove('correct', 'incorrect');

    } else {
        userInput.classList.add('correct');
        userInput.classList.remove('typing', 'incorrect');
    }
})

userInput.addEventListener('keydown', (event) => {
    result.innerText = "";
    result.classList.remove('incorrect', 'correct');
    
    if (event.keyCode == 9) {
        event.preventDefault();
        
        if (answer.includes(userInput.value)) {
            
            result.innerText = "correct!";
            result.classList.add('correct');
            hint.classList.remove('hint-incorrect');
            userInput.classList.remove('typing', 'correct', 'incorrect');
            
            i === groupedData[topic].length-1 ? i = 0 : i++;
            
            questionObj = groupedData[topic][i];
            instructions = questionObj['instructions']
            question = questionObj['question'];
            answer = questionObj['answer'];
            questionDisplay.innerText = question;
            instructionsDisplay.innerText = instructions;
            userInput.value = "";
            
        } else if (!answer.includes(userInput.value)) {
            userInput.classList.add('incorrect');
            result.classList.add('incorrect');
            hint.classList.add('hint-incorrect');
            result.innerText = "incorrect";
        }
    }
})


// --- LAST / NEXT BUTTON ---
lastButton.addEventListener('click', () => {
    i === 0 ? i = 0 : i--;
    refreshQuestionDisplay()
})

nextButton.addEventListener('click', () => {
    i === groupedData[topic].length-1 ? i = groupedData[topic].length-1 : i++;
    refreshQuestionDisplay()
})


function refreshQuestionDisplay(){
    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    instructions = questionObj['instructions'];
    questionDisplay.innerText = question;
    instructionsDisplay.innerText = instructions;
    console.log("Instructions are: " + instructions);
    userInput.value = "";
    result.innerText = "";
    hint.classList.remove('hint-incorrect');
    result.classList.remove('incorrect', 'correct');
    userInput.classList.remove('typing', 'correct', 'incorrect');

}







/* ----- TAGS FOR LATER
    {
        "level": "basic",
        "topic": "tags",
        "question": "<ul></ul>",
        "answer": "ul"
    },
    {
        "level": "basic",
        "topic": "tags",
        "question": "<li></li>",
        "answer": "li"
    },
    {
        "level": "basic",
        "topic": "tags",
        "question": "<a href=\"\"></a>",
        "answer": "a"
    },
    {
        "level": "basic",
        "topic": "tags",
        "question": "<img src=\"\" alt=\"\">",
        "answer": "img"
    },
    {
        "level": "basic",
        "topic": "tags",
        "question": "<link rel=\"stylesheet\" href=\"style.css\">",
        "answer": "link:css"
    },
    {
        "level": "basic",
        "topic": "tags",
        "question": "<script src=\"\"></script>",
        "answer": "script:src"
    },
*/