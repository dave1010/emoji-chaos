function init() {
    
}

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

/**
 * Takes a list of answer objects with emoji and an optional label
 * Displays them
 * When selecting one then pickEmoji(emoji) is triggered
 */
function displayAnswers(answers) {
    // Display the answers
    answers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.textContent = answer.emoji + " " + (answer.label ? answer.label : "");
        button.onclick = () => pickEmoji(answer.emoji);
        questionDiv.appendChild(button);
    });
}

/**
 * Called when the right answer is picked
 * Updates UI
 * Triggers nextQuestion() after 3 seconds
 */
function isCorrect() {
    let questionDiv = document.getElementById("questionDiv");

    // Add a temporary correct notice
    let correctNotice = document.createElement("div");
    correctNotice.textContent = "Correct!";
    correctNotice.className = "correct-notice";
    questionDiv.appendChild(correctNotice);

    // Remove the notice after a short time and move to the next question
    setTimeout(() => {
        questionDiv.removeChild(correctNotice);
        nextQuestion();
    }, 3000);
}

/**
 * Called whent the wrong answer is picked
 * Updates UI with warning
 * Stops user interaction for 10 seconds
 */
function isIncorrect() {
    let questionDiv = document.getElementById("questionDiv");

    // Disable interaction with #questionDiv
    questionDiv.style.pointerEvents = "none";

    // Disable all buttons
    let buttons = questionDiv.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);

    // Add a temporary warning notice
    let warningNotice = document.createElement("div");
    warningNotice.textContent = "Wrong answer. Try again in 10 seconds.";
    warningNotice.className = "warning-notice";
    questionDiv.appendChild(warningNotice);

    // Re-enable interaction and remove the notice after 10 seconds
    setTimeout(() => {
        questionDiv.style.pointerEvents = "auto";
        questionDiv.removeChild(warningNotice);

        // Re-enable all buttons
        buttons.forEach(button => button.disabled = false);
    }, 10000);
}
