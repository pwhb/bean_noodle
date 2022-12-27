const { imageBaseUrl } = require(".");

const widths = {
  w500: "w500",
  original: "original",
};

module.exports = {
  getImageURL: (path) => `${imageBaseUrl}/${widths.w500}/${path}`,
  getOriginalImageURL: (path) => `${imageBaseUrl}/${widths.original}/${path}`,
};
