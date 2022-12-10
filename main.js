let questionDisplay = document.querySelector('.question-display');
let userInput = document.querySelector('.user-input');
let userInputFocus = document.querySelector('#user-input:focus');
let result = document.querySelector('#result-display');
let practiceTopics = document.querySelectorAll('.topic');
let topicContainer = document.querySelector('#topic-container');
let lastButton = document.querySelector('.last');
let nextButton = document.querySelector('.next');
let hint = document.querySelector('.hint');
let active = document.querySelector('.active');
// let  = document.querySelector('');

let topic = 'tags';
let groupedData = '';
let i = 0;
let questionObj = '';
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
    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    questionDisplay.innerText = question;
    userInput.value = "";
    
    // console.log(answer);
}
readEmmetTypeData();



// --- TOPIC SELECTION ---
practiceTopics.forEach(item => {
    item.addEventListener('click', () => {

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
        readEmmetTypeData();
    })
})



// --- HINTS ---
hint.addEventListener('click', () => {

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

    console.log("Input hold: " + userInputHold);
})

hint.addEventListener('blur', () => {
    userInput.removeAttribute('placeholder');
    userInput.value = userInputHold;
})




// --- INPUT COLOR STATUS ---
userInput.addEventListener('input', () => {
    console.log(answer.includes(userInput.value));

    if (userInput.value === '') {
        userInput.classList.remove('typing');
        userInput.classList.remove('correct');
        userInput.classList.remove('incorrect');
        
    } else if (!answer.includes(userInput.value)){
        userInput.classList.add('typing');
        userInput.classList.remove('correct');
        userInput.classList.remove('incorrect');

    } else {
        userInput.classList.add('correct');
        userInput.classList.remove('typing');
        userInput.classList.remove('incorrect');
    }
})


userInput.addEventListener('keydown', (event) => {
    result.innerText = "";
    
    if (event.keyCode == 9) {
        event.preventDefault();
        
        if (answer.includes(userInput.value)) {
            
            result.innerText = "Correct!";
            userInput.classList.remove('correct');
            userInput.classList.remove('incorrect');
            userInput.classList.remove('typing');
            
            i === groupedData[topic].length-1 ? i = 0 : i++;
            
            questionObj = groupedData[topic][i];
            question = questionObj['question'];
            answer = questionObj['answer'];
            questionDisplay.innerText = question;
            userInput.value = "";
            
        } else if (!answer.includes(userInput.value)) {
            result.innerText = "Incorrect";
            userInput.classList.add('incorrect');
        }
    }
})









// --- LAST / NEXT BUTTON ---
lastButton.addEventListener('click', () => {

    i === 0 ? i = 0 : i--;

    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    questionDisplay.innerText = question;
    userInput.value = "";
})

nextButton.addEventListener('click', () => {

    i === groupedData[topic].length-1 ? i = groupedData[topic].length-1 : i++;

    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    questionDisplay.innerText = question;
    userInput.value = "";
})











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