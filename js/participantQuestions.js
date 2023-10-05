let participantQuestions = [];

function getParticipantQuestion(questionIndex, participantIndex) {
    let question = questions[questionIndex];
    let participant = participants[participantIndex];
    let affinity = participant.affinity;

    // Include the correct answer in the allAnswers array
    let allAnswers = [{emoji: question.emoji[0], label: question.a}].concat(
        question.emoji.slice(1).map((emoji, index) => {
            return {emoji: emoji, label: question.no[index]};
        })
    );

    // Shuffle the answers in a deterministic way
    allAnswers.sort((a, b) => {
        let hashA = simpleHash(a.emoji + question.q + participant.team);
        let hashB = simpleHash(b.emoji + question.q + participant.team);
        return hashA - hashB;
    });

    // Use participant affinity to pick 1 of the 4 possible answers to unmask
    let unmaskedIndex = affinity % 4;
    let unmaskedAnswer = allAnswers[unmaskedIndex];

    // Create an array of answer objects
    let answerObjects = allAnswers.map((answer, index) => {
        let label = (index === unmaskedIndex) ? answer.label : "";
        return {emoji: answer.emoji, label: label};
    });

    // Find the correct answer
    let correctAnswer = allAnswers.find(answer => answer.label === question.a).emoji;

    return {
        question: question.q,
        answers: answerObjects,
        correctAnswer: correctAnswer
    };
}



function getAllParticipantQuestion(questionIndex) {
    let allParticipantQuestions = [];

    for (let i = 0; i < participants.length; i++) {
        allParticipantQuestions.push(getParticipantQuestion(questionIndex, i));
    }

    return allParticipantQuestions;
}

