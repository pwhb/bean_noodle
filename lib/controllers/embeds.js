const { bold, EmbedBuilder } = require("discord.js");
const { getImageURL } = require("../../api/tmdb/image");
const { getMovieTitleWithYear } = require("../format");

module.exports = {
  getMovieEmbeds: (movies) => {
    const embeds = [];
    for (const movie of movies) {
      const { id, title, release_date, poster_path } = movie;
      const embed = new EmbedBuilder()
        .setTitle(getMovieTitleWithYear(title, release_date))
        .setDescription(bold(`ID: ${id}`))
        .setImage(getImageURL(poster_path));
      embeds.push(embed);
    }
    return embeds;
  },
};
