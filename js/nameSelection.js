
let selectedParticipant = null;
let selectedParticipantIndex = null;

// Populate the participant list
function populateParticipantList() {
    let select = document.getElementById("participantList");
    
    // Add an empty option as the first element
    let emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.text = "Select your name";
    emptyOption.disabled = true;
    emptyOption.selected = true;
    select.appendChild(emptyOption);

    // Add the participants
    participants.forEach((participant, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.text = participant.name;
        select.appendChild(option);
    });
}


// Select a participant and display team info
function selectParticipant() {
    let select = document.getElementById("participantList");
    selectedParticipantIndex = select.value;

    if (select.value === "") {
        return;
    }

    selectedParticipant = participants[selectedParticipantIndex];

    // add emoji based on team
    let allEmoji = ["🍄", "🎪", "🐙", "🚀", "🌈", "🎸", "🍕", "👽", "🦄", "🌮", "🏰", "🔮", "🎨", "🚲", "🌵", "🎭", "🍣", "🌕", "🦜", "📚", "🏄", "🍩", "🛸", "🦖", "🌶", "🎲", "🍹", "⚽", "🎡", "🌠"];

    let teamLength = selectedParticipant.team.length;
    let removed = allEmoji.splice(0, teamLength);
    allEmoji = allEmoji.concat(removed);


    // set up questions
    function getQuestionAndAnswersAndEmoji(index) {
        let question = questions[index];
        let seed = 42;  // A fixed seed value to make the randomness reproducible
        question.emoji = [];

        for (let i = 0; i < 4; i++) {
            // Calculate a "random" index based on the question index, seed, and loop counter
            let emojiIndex = ((index * 4) + seed + i) % allEmoji.length;
            
            // Add the selected emoji to the question's emoji array
            question.emoji.push(allEmoji[emojiIndex]);
        }

        return question;
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i] = getQuestionAndAnswersAndEmoji(i);
    }

    for (let i = 0; i < questions.length; i++) {
        participantQuestions.push(getAllParticipantQuestion(i));
    }
    



    // Hide participant selection and show team info
    document.getElementById("participantSelection").style.display = "none";
    document.getElementById("teamInfo").style.display = "block";

    // Display team name
    document.getElementById("teamName").textContent = selectedParticipant.team;

    // Display team members
    let ul = document.getElementById("teamMembers");
    participants.filter(p => p.team === selectedParticipant.team).forEach(p => {
        let li = document.createElement("li");
        li.textContent = p.name;
        ul.appendChild(li);
    });
}