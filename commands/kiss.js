const { EmbedBuilder, userMention } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const json = require("../utils/constants/kiss.json");
const { getRandom } = require("../utils/random");

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
    const gifUrl = getRandom(json.urls)
    const adverb = getRandom(json.adverbs)
    const embed = new EmbedBuilder()
      .setDescription(`${userMention(user.id)} is kissing ${userMention(member.user.id)} ${adverb}\n`)
      .setImage(gifUrl)
    return interaction.reply({ embeds: [embed] })
  },
};
