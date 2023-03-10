const { SlashCommandBuilder, userMention } = require("discord.js");
const { getUserString, getVSString } = require("../lib/format");
const { getRandom } = require("../lib/random");
const bot = require("../lib/constants/bean_noodle.json");

const moves = {
  rock: "ROCK ✊",
  paper: "PAPER ✋",
  scissors: "SCISSORS ✌️",
};

const results = {
  win: "You win.",
  lose: "You lose.",
  draw: "It's a draw.",
};

const choices = [
  { name: "rock", value: moves.rock },
  { name: "paper", value: moves.paper },
  { name: "scissors", value: moves.scissors },
];

const getComputerMove = () => {
  const choices = Object.values(moves);
  const computerMove = getRandom(choices);
  return computerMove;
};

const getResponse = (move, player1, player2) => {
  const computerMove = getComputerMove();
  const response = {
    // vsString: `${player1}       ${player2}\n${move} vsString ${computerMove}`,
    vsString: getVSString(player1, player2, move, computerMove),
  };
  if (move === computerMove) {
    response.result = results.draw;
  } else if (
    (move === moves.rock && computerMove === moves.scissors) ||
    (move === moves.paper && computerMove === moves.rock) ||
    (move === moves.scissors && computerMove === moves.paper)
  ) {
    response.result = results.win;
  } else {
    response.result = results.lose;
  }

  return response;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play Rock Paper Scissors with bean_noodle!")
    .addStringOption((option) =>
      option
        .setName("move")
        .setDescription("Make your move")
        .setRequired(true)
        .addChoices(...choices)
    ),
  async execute(interaction) {
    const move = interaction.options.getString("move");
    const player1 = userMention(interaction.user.id);
    const player2 = bot.mention;
    const response = getResponse(move, player1, player2);
    return interaction.reply(response.vsString + response.result);
  },
};
