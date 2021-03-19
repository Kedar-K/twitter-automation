import React, { Component } from "react";
import Twit from "twit";
import axios from "axios";
import Twitter from "twitter";

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.apikey = "HWtYvo0zbBo2BXcdFLUVWATqA";
    this.apiSecretKey = "9Dkb4qcaDsQYAwhUeDGWr0FOGOFDdt1WT00AFd0x1JuYb5lCBM";
    this.accessToken = "4185077044-pVaoalX9kCxRmIwpxGqSpodj0f79igJIpvZljar";
    this.accessTokenSecret = "LV9P07QWzQqySl3N8NTRkyFPuTgumBuV0PrRojeBmiVCN";
  }

  state = {
    blog_data: "",
    got_data: false,
    error: false,
    final_post_content: "",
    content_tweeted: false,
  };

  componentDidMount() {
    this.tweetContent();
    console.log(this.state);
    axios.get("/api/tweets").then((data) => console.log(data.data));
  }

  getUser = async () => {
    try {
      const response = await axios.get(
        "https://dev.to/api/articles?username=kedark"
      );
      // blog_data = response.data;
      // got_data = true;
      this.setState({
        blog_data: response.data,
        got_data: true,
      });
      console.log(this.state);
      return this.state.got_data;
    } catch (error) {
      console.error(error);
      this.setState({ error: true });
    }
  };

  main = async () => {
    // const T = new Twit({
    //   consumer_key: this.apikey,
    //   consumer_secret: this.apiSecretKey,
    //   access_token: this.accessToken,
    //   access_token_secret: this.accessTokenSecret,
    // });
    // T.get(
    //   "search/tweets",
    //   { q: "banana since:2011-07-11", count: 100 },
    //   function (err, data, response) {
    //     console.log(data);
    //   }
    // );

    var result = await this.getUser();
    if (result && !this.state.error) {
      try {
        let latest_article = this.state.blog_data.find(
          (article) => article["type_of"] === "article"
        );
        // console.log(typeof articles["published_at"]);
        let my_words = "Hello guys, Check out my latest article\n";
        let title = my_words + latest_article["title"];
        let image_path = latest_article["cover_image"];
        let url = latest_article["canonical_url"];
        let tag_list = latest_article["tag_list"];
        let hash_tags = "\n";
        hash_tags += tag_list.map((tag) => "#" + tag + " ");
        hash_tags = hash_tags.replace(/,/g, "");
        let published_time = latest_article["published_at"];
        this.setState({
          final_post_content:
            title + hash_tags + " #100DaysofCode" + "\n" + url,
        });
        return [this.state.final_post_content, image_path, published_time];
      } catch (e) {
        console.log("caught an error", e);
      }
    }
  };

  tweetContent = async () => {
    let content, time, image;
    try {
      [content, image, time] = await this.main();
    } catch (e) {
      console.log(e);
    }

    const today = new Date();
    const published_date = new Date(time);
    const latest_article_interval = Math.ceil(
      Math.abs(today - published_date) / (1000 * 60 * 60 * 24)
    );
    if (latest_article_interval === 1) {
      console.log("posting tweet");
      this.setState({
        content_tweeted: true,
      });
      // T.post(
      //   "statuses/update",
      //   { status: this.state.final_post_content },
      //   function (err, data, response) {
      //     console.log(data);
      //   }
      // );
    } else {
      console.log("no new tweets available");
      console.log("after fetching");
      console.log(this.state);
      // T.post(
      //   "statuses/update",
      //   { status: this.state.final_post_content },
      //   function (err, data, response) {
      //     console.log(data);
      //   }
      // );
      // T.get(
      //   "search/tweets",
      //   { q: "banana since:2011-07-11", count: 100 },
      //   function (err, data, response) {
      //     console.log(data);
      //   }
      // );
    }

    // // POST WITH MEDIA ===========================================
    // var b64content = fs.readFileSync(image, { encoding: "base64" });
    // getImage(image, (err, data) => {
    //   if (err) {
    //     throw new Error(err);
    //   }
    //   return T.post(
    //     "media/upload",
    //     { media_data: data },
    //     function (err, data, response) {
    //       // now we can assign alt text to the media, for use by screen readers and
    //       // other text-based presentations and interpreters
    //       var mediaIdStr = data.media_id;
    //       var altText = "vs code";
    //       var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
    //       T.post(
    //         "media/metadata/create",
    //         meta_params,
    //         function (err, data, response) {
    //           if (!err) {
    //             // now we can reference the media and post a tweet (media will attach to the tweet)
    //             var params = {
    //               status: content,
    //               media_ids: [mediaIdStr],
    //             };
    //             T.post("statuses/update", params, function (err, data, response) {
    //               console.log(data);
    //             });
    //           }
    //         }
    //       );
    //     }
    //   );
    // });
  };

  render() {
    return (
      <div>
        Tweet has been{" "}
        {this.state.content_tweeted ? (
          <span>Tweeted</span>
        ) : (
          <span>cancelled</span>
        )}
      </div>
    );
  }
}

export default Tweet;
