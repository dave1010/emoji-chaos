// list participants
document.addEventListener("DOMContentLoaded", function() {
    // Get the table body element
    let tableBody = document.getElementById("participantTable").getElementsByTagName("tbody")[0];

    // Populate Participants Table
    participants.forEach(function(participant) {
        let newRow = tableBody.insertRow();
        let nameCell = newRow.insertCell(0);
        let teamCell = newRow.insertCell(1);
        let affinityCell = newRow.insertCell(2);

        nameCell.textContent = participant.name;
        teamCell.textContent = participant.team;
        affinityCell.textContent = participant.affinity;
    });

    // Populate Questions Table
    let questionTableBody = document.getElementById("questionTable").getElementsByTagName("tbody")[0];
    populateTable(questionTableBody, questions, ["q", "a", "no", "emoji"]);

    function populateTable(tableBody, dataList, keys) {
        dataList.forEach(function(data) {
            let newRow = tableBody.insertRow();
            keys.forEach(function(key) {
                let cell = newRow.insertCell();
                cell.textContent = Array.isArray(data[key]) ? data[key].join(", ") : data[key];
            });
        });
    }

    // Populate Questions and Answers Section
    let questionsAnswersDiv = document.getElementById("questionsAnswers");

    participantQuestions.forEach((questionSet, questionIndex) => {
        let questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";

        let questionTitle = document.createElement("h3");
        questionTitle.textContent = questions[questionIndex].q;
        questionDiv.appendChild(questionTitle);

        let ul = document.createElement("ul");

        questionSet.forEach((participantQuestion, participantIndex) => {
            let li = document.createElement("li");
            let participantName = participants[participantIndex].name;
            let team = participants[participantIndex].team;
            let unmasked = participantQuestion.answers.find(answer => answer.label !== "");
            let unmaskedEmoji = unmasked.emoji;
            let unmaskedLabel = unmasked.label;
            let correctMark = (unmaskedEmoji === participantQuestion.correctAnswer) ? "✅" : "";
            li.textContent = `${participantName}: ${team} ${unmaskedEmoji} (${unmaskedLabel}) ${correctMark}`;
            ul.appendChild(li);
        });
        

        questionDiv.appendChild(ul);
        questionsAnswersDiv.appendChild(questionDiv);
    });




});


// list questions and answers
