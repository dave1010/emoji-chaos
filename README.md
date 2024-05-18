# Emoji Team Chaos Quiz!

## [🎲 Play online! 🎲](https://dave.engineer/chaos)

*Emoji Team Chaos Quiz!* is a "fun" web based VR game for 1 to 4 teams of 4+ people.

**Your team's goal is to look around and find the emoji that corresponds to the answer
to a question. It sounds easy but only 1 team member will be able to see the correct
answer.**

What makes *Emoji Team Chaos Quiz!* so great?

- It requires all team members to collaborate and take part.
- Lots of spinning around.
- Shouting.
- Emoji.

## Tech

*Emoji Team Chaos Quiz!* uses [three.js](https://threejs.org/) to render a 3D scene which you can look around
by moving ([orienting](https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event)) your phone.

It's all static HTML and JavaScript. There is no backend processing or database:
the game makes use of [cryptography](./js/util.js#L1) to provide pseudo-random
gameplay that's consistent across players.

> [!TIP]
> The code is a great resource for anyone who would like to practice refactoring.

### Limitations

> [!WARNING]  
> This was put together in an hour or 2 and, whilst it works, there's lots that could do with improvement.

- The player names are fixed. If you don't have at least 10 people then look at the
  [player listing](https://steady-toffee-d211b8.netlify.app/admin) and pick names based on team colours.
  You can modify [`js/participants.js`](./js/participants.js) and host the game yourself.
- The questions are fixed and there's only 20. Add your own in [`js/questions.js`](./js/questions.js).

## How to play *Emoji Team Chaos Quiz!*

1. Get everyone to open the game on their phone by going to [`dave.engineer/chaos`](https://dave.engineer/chaos)
2. Select a name
3. Remember your team name and other players
4. Make sure everyone has read the game play instructions, then select **I'm ready!**.

> 1. Read the question
> 2. Move your phone around and you'll see 4 emoji
> 3. You, or 1 of your team mates, will have an emoji with the correct answer
> 4. Select the correct emoji by looking at it for 3 seconds
> 5. Make sure your team mates aren't left behind!

### Winning tactics

- The emoji are all around you, so ***spin around as quickly as you can*** to see them all.
- Make sure your team mates can hear you: ***shout louder than anyone else***.

