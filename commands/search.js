const { SlashCommandBuilder, quote, bold } = require("discord.js");
const { getMovies } = require("../api/tmdb/movies");
const { getMovieEmbeds } = require("../lib/controllers/embeds");
const { filterByYear } = require("../lib/controllers/filter");
const { getYear, getMovieListString } = require("../lib/format");

const types = {
  movie: "MOVIE",
};

const choices = [{ name: "movie", value: types.movie }];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Ask me to search things")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("What kind of things do you want to search")
        .setRequired(true)
        .addChoices(...choices)
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Search by Title")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("year").setDescription("Search by Year")
    ),
  async execute(interaction) {
    const searchQuery = interaction.options.getString("title");
    const searchType = interaction.options.getString("type");
    const releaseYear = interaction.options.getString("year");
    const { results } = await getMovies(searchQuery);
    const initailLine = `${bold(
      "Search"
    )}, type: ${searchType.toLowerCase()}, title: ${searchQuery} ${
      releaseYear ? `, Year: ${releaseYear}` : ""
    }\n\n`;
    const responseString = quote(initailLine);

    const movies = filterByYear(results, releaseYear).slice(0, 9);
    const embeds = getMovieEmbeds(movies);
    return interaction.reply({ content: responseString, embeds });
  },
};
