import express from "express";
import dotenv from "dotenv";
import Twit from "twit";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.get("/api/tweets", (req, res) => {
  var T = new Twit({
    consumer_key: process.env.APIKEY,
    consumer_secret: process.env.APISECRETKEY,
    access_token: process.env.ACCESSTOKEN,
    access_token_secret: process.env.ACCESSTOKENSECRET,
  });
  T.get(
    "search/tweets",
    { q: "banana since:2011-07-11", count: 1 },
    function (err, data, response) {
      console.log(data);
      res.json(data);
    }
  );
});

app.post("/api/tweet/post", (req, res) => {
  //   console.log(req.body.content);
  res.json(req.body.content);
  var T = new Twit({
    consumer_key: process.env.APIKEY,
    consumer_secret: process.env.APISECRETKEY,
    access_token: process.env.ACCESSTOKEN,
    access_token_secret: process.env.ACCESSTOKENSECRET,
  });
  T.post(
    "statuses/update",
    { status: req.body.content },
    function (err, data, response) {
      console.log(data);
    }
  );
});

const PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
