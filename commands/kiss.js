const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Select a member and kiss them")
    .addUserOption((option) =>
      option.setName("target").setDescription("Whom you want to kiss")
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    return interaction.reply({
      content: `You wanted to kiss: ${member.user.username}`,
      ephemeral: true,
    });
  },
};
