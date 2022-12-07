let questionDisplay = document.querySelector('.question-display');
let userAnswer = document.querySelector('#user-input');
let result = document.querySelector('#result-display');
let practiceTopics = document.querySelectorAll('.topic');
// let  = document.querySelector('');


let topic = 'tags';

let readEmmetTypeData = async () => {
    
    let rawEmmetData = await fetch('/emmet-type.json');
    let data = await rawEmmetData.json();
    let groupedData = _.groupBy(data, 'topic');
    


    let i = 0;
    // getNewQuestion();
    let questionObj = groupedData[topic][i];
    let question = questionObj['question'];
    let answer = questionObj['answer'];
    questionDisplay.innerText = question;

    console.log(answer);

    practiceTopics.forEach(item => {
        item.addEventListener('click', () => {
            
            // removes all .active
            practiceTopics.forEach(item => {
                item.classList.remove('active');
            })
            // adds .active to current
            item.classList.add('active');
            
            
            
            topic = item.id;
            
            readEmmetTypeData();
        })
    })

    userAnswer.addEventListener('keydown', (event) => {

        result.innerText = "";

        // for (let i = 0; i < groupedData[topic].length-1; i++) {

            if (event.keyCode == 9) {
                event.preventDefault();
                result.innerText = "";
    
                if (userAnswer.value === answer) {
                    
                    if (i !== groupedData[topic].length-1) {
                        // i++;
                        // getNewQuestion();
                        
                        i ++;
                        result.innerText = "Correct!";
                        questionObj = groupedData[topic][i];
                        question = questionObj['question'];
                        answer = questionObj['answer'];
                        questionDisplay.innerText = question;
                        console.log(answer);
                        userAnswer.value = "";
    
                    } else {
                        i = 0;
                        result.innerText = "Correct!";
                        questionObj = groupedData[topic][i];
                        question = questionObj['question'];
                        answer = questionObj['answer'];
                        questionDisplay.innerText = question;
                        console.log(answer);
                        userAnswer.value = "";

                    }
    
                } else {
                    result.innerText = "Incorrect";
                    // userAnswer.classList.add('incorrect');
                }
            }
            
        // }


    })
}


// let topic = 'tags';
readEmmetTypeData();










// function getNewQuestion(){

//     questionObj = groupedData[topic][i];
//     question = questionObj['question'];
//     answer = questionObj['answer'];
//     questionDisplay.innerText = question;
//     userAnswer.value = "";
// }






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