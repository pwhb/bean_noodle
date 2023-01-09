const { SlashCommandBuilder } = require("discord.js");
const { getMovies } = require("../api/tmdb/movies");
const { getYear } = require("../lib/format");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test command!")
    .addStringOption((option) =>
      option.setName("search").setDescription("Search by Movie Title")
    ),
  async execute(interaction) {
    const query = interaction.options.getString("search");
    const { results } = await getMovies(query);
    
    const movies = results.map(({ id, title, release_date, overview }) => {
      return {
        id,
        title: `${title} (${getYear(release_date)})`,
        overview,
      };
    });
    console.log("movies", movies);
    console.log("movies count", movies.length);
    return interaction.reply("testy test");
  },
};
