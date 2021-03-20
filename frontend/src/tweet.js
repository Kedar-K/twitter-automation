import React, { Component } from "react";
import axios from "axios";

class Tweet extends Component {
  state = {
    blog_data: "",
    got_data: false,
    error: false,
    final_post_content: "",
    content_tweeted: false,
  };

  componentDidMount() {
    this.tweetContent();
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
      // console.log(this.state);
      return this.state.got_data;
    } catch (error) {
      console.error(error);
      this.setState({ error: true });
    }
  };

  main = async () => {
    var result = await this.getUser();
    if (result && !this.state.error) {
      try {
        let latest_article = this.state.blog_data.find(
          (article) => article["type_of"] === "article"
        );

        let url = latest_article["canonical_url"];
        let tag_list = latest_article["tag_list"];
        let hash_tags = "\n";
        hash_tags += tag_list.map((tag) => "#" + tag + " ");
        hash_tags = hash_tags.replace(/,/g, "");
        let published_time = latest_article["published_at"];
        let full_content = `Hello guys, Check out my latest article
${latest_article["title"]}
${hash_tags} #100DaysofCode
${url}`;
        this.setState({
          final_post_content: full_content,
        });
        return [published_time];
      } catch (e) {
        console.log("caught an error", e);
      }
    }
  };

  tweetContent = async () => {
    let time;
    try {
      [time] = await this.main();
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

      axios
        .post("/api/tweet/post", {
          content: this.state.final_post_content,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("no new tweets available");
      console.log("after fetching");
      console.log(this.state.final_post_content);
    }
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
