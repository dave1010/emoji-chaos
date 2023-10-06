let people = [
    "Tom Q",
    "Matt M",
    "Andy B",
    "Helen C",
    "Greg H",
    "James C",
    "Jennifer C",
    "Terry F",
    "Andrew J",
    "Emma B",
    "Amberlee G",
    "Kerrie G",
    // "Chris D",
    "Jamie K",
    "Gemma V",
    "Harry Y",
    "Chris M",
    "Dan C",
    "Alex R",
    "Dave H",
    "Andy L",
    // "Jon G",
    "Chris S",
    // "Jack R",
    "Callum T",
    "Luke W",
    "Reece M",
    "Shane dJ",
    "Brandon P",
    "Harvey D"
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