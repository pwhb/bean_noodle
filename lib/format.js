const { bold } = require("discord.js");
const { table, getBorderCharacters } = require("table");

const getUserString = (user) => {
  const { username, discriminator } = user;
  const userString = `${username}#${discriminator}`;
  return userString;
};

const getYear = (dateString) => {
  const year = dateString.split("-")[0];
  return year;
};

const getMovieTitleWithYear = (title, release_date) =>
  `${title} (${getYear(release_date)})`;

const getMovieListString = (movies) => {
  const moviesArray = movies.map(
    ({ id, title, release_date, poster_path }) =>
      `ID: ${bold(id)}\n${getMovieTitleWithYear(title, release_date)}`
  );
  return moviesArray.join("\n-----\n") + `\n\nCount: ${movies.length}`;
};

const getVSString = (player1, player2, player1Move, player2Move) => {
  const data = [
    [player1, "", player2],
    [player1Move, "   vs   ", player2Move],
  ];
  const output = table(data, {
    border: getBorderCharacters("void"),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 1,
    },
    drawHorizontalLine: () => false,
  });
  return output;
};

module.exports = {
  getUserString,
  getYear,
  getMovieTitleWithYear,
  getMovieListString,
  getVSString,
};
