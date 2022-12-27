const {
  SlashCommandBuilder,
  quote,
  bold,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");
const { getImageURL } = require("../api/tmdb/image");
const { getMovies, getOneMovieById } = require("../api/tmdb/movies");
const { getYear, getMovieListString } = require("../lib/format");

const types = {
  movie: "MOVIE",
};

const actionTypes = {
  add: "ADD",
  //   update: "UPDATE",
  delete: "DELETE",
  read: "READ",
};

const statusTypes = {
  finished: "FINISHED",
  toWatch: "TO_WATCH",
};

const choices = [{ name: "movie", value: types.movie }];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Manage Lists")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("What kind of list do you want to manage")
        .setRequired(true)
        .addChoices(...choices)
    )
    .addStringOption((option) =>
      option.setName("id").setDescription("Type the ID").setRequired(true)
    ),
  async execute(interaction) {
    const id = interaction.options.getString("id");
    const searchType = interaction.options.getString("type");

    const data = await getOneMovieById(id);
    const initailLine = `${bold(
      "Search"
    )}, type: ${searchType.toLowerCase()}, id: ${id}\n\n`;
    let responseString = quote(initailLine);

    console.log(data);

    // if (releaseYear) {
    //   console.log("releaseYear", releaseYear);
    //   const filteredResults = results.filter(
    //     ({ release_date }) => releaseYear === getYear(release_date)
    //   );

    //   responseString += getMovieListString(filteredResults);
    // } else {
    //   responseString += getMovieListString(results);
    // }
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Nothing selected")
        .addOptions(
          {
            label: "Select me",
            description: "This is a description",
            value: "first_option",
          },
          {
            label: "You can select me too",
            description: "This is also a description",
            value: "second_option",
          }
        )
    );

    const embed = new EmbedBuilder()
      .setDescription(data.title)
      .setImage(getImageURL(data.backdrop_path));

    await interaction.reply({
      content: "Pong!",
      components: [row],
      embeds: [embed, embed],
    });
  },
};
