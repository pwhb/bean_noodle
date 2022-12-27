const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server."),
  async execute(interaction) {
    console.log(interaction.guild);
    return interaction.reply(
      `Server ID: ${interaction.guild.ID}\nServer name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  },
};
