import express from "express";
import dotenv from "dotenv";
import Twitter from "twitter";
import Twit from "twit";

const apikey = "HWtYvo0zbBo2BXcdFLUVWATqA";
const apiSecretKey = "9Dkb4qcaDsQYAwhUeDGWr0FOGOFDdt1WT00AFd0x1JuYb5lCBM";
const accessToken = "4185077044-pVaoalX9kCxRmIwpxGqSpodj0f79igJIpvZljar";
const accessTokenSecret = "LV9P07QWzQqySl3N8NTRkyFPuTgumBuV0PrRojeBmiVCN";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.get("/api/tweets", (req, res) => {
  var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
  });
  T.get(
    "search/tweets",
    { q: "banana since:2011-07-11", count: 100 },
    function (err, data, response) {
      console.log(data);
      res.json(data);
    }
  );
});

const PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
