const { SlashCommandBuilder, quote, bold } = require("discord.js");
const { getMovies } = require("../api/tmdb/movies");
const { getYear, getMovieListString } = require("../lib/format");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("movie")
    .setDescription("Find movie id!")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("Search by Movie Title")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("year").setDescription("Search by Release Date")
    ),
  async execute(interaction) {
    const query = interaction.options.getString("search");
    const releaseYear = interaction.options.getString("year");
    const { results } = await getMovies(query);
    const initailLine = `${bold("Search")}: ${query} ${
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
