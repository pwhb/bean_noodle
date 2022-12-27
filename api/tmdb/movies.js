// https://api.themoviedb.org/3/search/movie?api_key=a8476f292fb155cb1d9b9a1c2004ecfb&language=en-US&query=star&page=1&include_adult=false

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

const { baseUrl } = require(".");
const { TMDB_API_KEY } = process.env;

module.exports = {
  getMovies: async (query) => {
    const url = `${baseUrl}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  getOneMovieById: async (id) => {
    const url = `${baseUrl}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};
