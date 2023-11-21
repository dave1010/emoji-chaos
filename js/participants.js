let people = [
    "Olivia",
    "Liam",
    "Sophia",
    "Noah",
    "Isabella",
    "Ethan",
    "Emma",
    "Mason",
    "Ava",
    "Logan",
    "Charlotte",
    "Lucas",
    "Mia",
    "Aiden",
    "Amelia",
    "Jackson",
    "Harper",
    "Elijah",
    "Evelyn",
    "James"
];

people = people.sort();

let teams = [
    "red",
    "blue",
    "green",
    "yellow"
];

let numberOfAnswersPerQuestion = 4;

let participants = [];
let teamCounters = {};


teams.forEach(team => {
    teamCounters[team] = 0;
});

for (let i = 0; i < people.length; i++) {
    let person = people[i];
    let team = teams[i % teams.length];  // Cycle through the teams
    let affinity = teamCounters[team] % numberOfAnswersPerQuestion;

    participants.push({
        name: person,
        team: team,
        affinity: affinity
    });

    teamCounters[team]++;
}
