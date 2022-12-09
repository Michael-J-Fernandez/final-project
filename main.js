let questionDisplay = document.querySelector('.question-display');
let userInput = document.querySelector('#user-input');
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

hint.addEventListener('click', () => {
    console.log(userInput.value);
    userInput.value = "";
    userInput.setAttribute('placeholder', answer[0])
})

hint.addEventListener('blur', () => {
    userInput.removeAttribute('placeholder');
})

let readEmmetTypeData = async () => {
    
    let rawEmmetData = await fetch('/emmet-type.json');
    let data = await rawEmmetData.json();
    groupedData = _.groupBy(data, 'topic');
    
    i = 0;
    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    questionDisplay.innerText = question;
    
    console.log(answer);
}
readEmmetTypeData();



// selects topic
practiceTopics.forEach(item => {
    item.addEventListener('click', () => {

        // switches .active to current element
        practiceTopics.forEach(item => {
            item.classList.remove('active');
        })
        // active.classList.toggle('active');
        item.classList.add('active');

        topic = item.id;
        console.log(topic);
        result.innerText = "";
        readEmmetTypeData();
    })
})




userInput.addEventListener('keydown', (event) => {
    result.innerText = "";
    
    if (event.keyCode == 9) {
        event.preventDefault();
        // result.innerText = "";
        console.log("Answer is: " + answer);
        console.log("You typed: " + userInput.value);
        
        if (answer.includes(userInput.value)) {
            
            result.innerText = "Correct!";
            
            if (i === groupedData[topic].length-1) {
                i = 0;
            } else {
                i++;
            }
            
            questionObj = groupedData[topic][i];
            question = questionObj['question'];
            answer = questionObj['answer'];
            questionDisplay.innerText = question;
            userInput.value = "";
            console.log("New answer is: " + answer);
            
            
        } else if (!answer.includes(userInput.value)) {
            result.innerText = "Incorrect";
            // userInput.classList.add('incorrect');
        }
    }
})




// last/next buttons
lastButton.addEventListener('click', () => {
    if (i === 0){
        i = 0;
    } else if (i !== 0){
        i--;
    }

    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    questionDisplay.innerText = question;
    userInput.value = "";
    
    console.log("New answer is: " + answer);
})

nextButton.addEventListener('click', () => {
    if (i === groupedData[topic].length-1){
        i = groupedData[topic].length-1;

    } else if (i !== groupedData[topic].length-1){
        i++;
    }

    questionObj = groupedData[topic][i];
    question = questionObj['question'];
    answer = questionObj['answer'];
    questionDisplay.innerText = question;
    userInput.value = "";
    
    console.log("New answer is: " + answer);
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