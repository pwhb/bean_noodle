const { SlashCommandBuilder } = require("discord.js");

const moves = {
  rock: "ROCK",
  paper: "PAPER",
  scissors: "SCISSORS",
};

const results = {
  win: "WIN",
  lose: "LOSE",
  draw: "DRAW",
};

const getResponse = (move) => {
  const choices = Object.values(moves);
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];
  const response = {
    vs: `You: ${move} vs Bean Noodle: ${randomChoice}`,
  };
  if (move === randomChoice) {
    response.result = results.draw;
  }
  if (
    (move === moves.rock && randomChoice === moves.scissors) ||
    (move === moves.paper && randomChoice === moves.rock) ||
    (move === moves.scissors && randomChoice === moves.paper)
  ) {
    response.result = results.win;
  }
  response.result = results.lose;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play Rock Paper Scissors with bean_noodle!")
    .addStringOption((option) =>
      option
        .setName("move")
        .setDescription("Make your move []")
        .setRequired(true)
        .addChoices(
          { name: "rock", value: moves.rock },
          { name: "paper", value: moves.paper },
          { name: "scissors", value: moves.scissors }
        )
    ),
  async execute(interaction) {
    const move = interaction.options.getString("move");
    const response = getResponse(move);

    return interaction.reply(response.vs + "\n" + response.result);
  },
};
