const { EmbedBuilder, userMention } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const { getData } = require("../lib/controllers/data");
const { getRandom } = require("../lib/random");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cuddle")
    .setDescription("Select someone and cuddle with them")
    .addUserOption((option) =>
      option
        .setName("whom")
        .setDescription("Whom you want to cuddle with")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const { user } = interaction;
    const member = interaction.options.getMember("whom");
    const { gifUrls, adverbs } = await getData("cuddle");
    const gifUrl = getRandom(gifUrls);
    const adverb = getRandom(adverbs);
    const embed = new EmbedBuilder()
      .setDescription(
        `${userMention(user.id)} is cuddling with ${userMention(
          member.user.id
        )} ${adverb}\n`
      )
      .setImage(gifUrl);
    await interaction.editReply({ embeds: [embed] });
  },
};
