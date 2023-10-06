let init;

/**
 * Clear out the old question and display the new one
 */
function displayQuestion(questionText) {
    // Clear previous question and answers
    let questionDiv = document.getElementById("questionDiv");
    questionDiv.style.display = "block";
    questionDiv.innerHTML = "";

    // Display the question
    let questionElement = document.createElement("h2");
    questionElement.textContent = questionText;
    questionDiv.appendChild(questionElement);
}

let displayAnswers;

/**
 * Called when the right answer is picked
 * Updates UI
 * Triggers nextQuestion() after 3 seconds
 */
function isCorrect() {
    alert("Corect!\nDon't leave your " + selectedParticipant.team + " team mates behind!");
    // Add a temporary correct notice

    // Remove the notice after a short time and move to the next question
    setTimeout(() => {
        //questionDiv.removeChild(correctNotice);
        nextQuestion();
    }, 1000);
}

/**
 * Called whent the wrong answer is picked
 * Updates UI with warning
 * Stops user interaction for 10 seconds
 */
function isIncorrect() {
    alert("Incorect");
}
