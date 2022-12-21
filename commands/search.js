const { SlashCommandBuilder, quote, bold } = require("discord.js");
const { getMovies } = require("../api/tmdb/movies");
const { getYear, getMovieListString } = require("../utils/format");

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
    const initailLine = `${bold("Search")}, type: ${searchType.toLowerCase()}, title: ${searchQuery} ${
      releaseYear ? `, Year: ${releaseYear}` : ""
    }\n\n`;
    let responseString = quote(initailLine);

    if (releaseYear) {
      console.log("releaseYear", releaseYear);
      const filteredResults = results.filter(
        ({ release_date }) => releaseYear === getYear(release_date)
      );

      responseString += getMovieListString(filteredResults);
    } else {
      responseString += getMovieListString(results);
    }

    return interaction.reply(responseString);
  },
};
