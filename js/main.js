window.onload = function() {
    // select name and store user details
    // display team mates
    populateParticipantList();

    // show startGame() button
};

let currentQuestionIndex = -1;


// Start the game
function startGame() {
    document.querySelector("#teamInfo button").style.display = "none";
    document.querySelector("#help").style.display = "none";
    
    init();

    currentQuestionIndex = 0;
    handleCurrentQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < participantQuestions.length) {
        handleCurrentQuestion();
    } else {
        alert("Well done! Let everyone know that your team has finished.");
        location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}

function handleCurrentQuestion() {
    let questionData = participantQuestions[currentQuestionIndex][selectedParticipantIndex];
    let questionText = questionData.question;
    let answers = [...questionData.answers];

    // Shuffle the answers
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    displayQuestion(questionText);
    displayAnswers(answers);
}

function pickEmoji(emoji) {  
    let questionData = participantQuestions[currentQuestionIndex][selectedParticipantIndex];
    let correctAnswer = questionData.correctAnswer;

    if (emoji === correctAnswer) {
        isCorrect();
    } else {
        isIncorrect();
    }    
}
