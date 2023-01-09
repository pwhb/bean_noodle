const dbConnect = require("../../lib/connectDB");
const data = require("../../lib/models/data");

const main = async () => {
  await dbConnect();

  const newDoc = await data.create({
    name: "cuddle",
    gifUrls: [
      "https://media.tenor.com/nK6OHJ8EOmEAAAAi/love-cwtch.gif",
      "https://media.tenor.com/2k1nnPnfuj0AAAAi/cat-farsi-cuddle.gif",
      "https://media.tenor.com/f12eCjpiJVoAAAAi/peachcat-peachcat-and-goma.gif",
    ],
    adverbs: ["warmly", "lovingly"],
  });

  console.log(newDoc)

  process.exit(1)
};

main()
