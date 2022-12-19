const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Select someone and kiss them")
    .addUserOption((option) =>
      option.setName("whom").setDescription("Whom you want to kiss").setRequired(true)
    ),
  async execute(interaction) {
    const { user } = interaction
    const member = interaction.options.getMember("whom");
    // const gifUrl = "https://tenor.com/bRn7v.gif"
    // const gifUrl = "https://cdn3.emoji.gg/emojis/1473-tongue-kissy.gif"
    const gifUrl = "https://media.tenor.com/ONx_IN1MwtEAAAAi/mochi.gif"
    const embed = new EmbedBuilder()
      .setTitle(`${user.username} is kissing ${member.user.username}\n`)
      .setURL(gifUrl)
      .setImage(gifUrl)
    return interaction.reply({ embeds: [embed] })
  },
};
