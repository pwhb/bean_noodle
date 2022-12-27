module.exports = {
  filterByYear: (results, releaseYear) => {
    if (!releaseYear) {
      return results;
    }

    const filteredResults = results.filter(
      ({ release_date }) => releaseYear === getYear(release_date)
    );

    return filteredResults;
  },
};
