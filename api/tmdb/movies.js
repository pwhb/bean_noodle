// https://api.themoviedb.org/3/search/movie?api_key=a8476f292fb155cb1d9b9a1c2004ecfb&language=en-US&query=star&page=1&include_adult=false

const { baseUrl } = require(".");
const { TMDB_API_KEY } = process.env;

module.exports = {
  getMovies: async (query) => {
    const url = `${baseUrl}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};
