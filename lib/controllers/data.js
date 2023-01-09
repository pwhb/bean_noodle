const dbConnect = require("../connectDB");
const data = require("../models/data");

const getData = async (name) => {
  await dbConnect();
  const { gifUrls, adverbs } = await data.findOne({ name }).lean();
  return { gifUrls, adverbs };
};

module.exports = { getData };
