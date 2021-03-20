# Twitter Automation - automatically tweets about your new blog on DEV.to

This app will automatically check for your latest blog on DEV.to and if it's availabe, it will post about it on your twitter account

## Getting Started

- Clone the repository
  ```shell
  git clone https://github.com/Kedar-K/twitter-automation.git
  ```
- add environment variables

  ```shell
  cd twitter-automation
  vi .env
  ```

  and now add the following variables to the .env file

  ```
  NODE_ENV = development
  PORT = port which you would like to use ex :5000
  APIKEY = twitter api key
  APISECRETKEY = twitter api secret
  ACCESSTOKEN = twitter access token
  ACCESSTOKENSECRET = twitter access token secret
  ```

  If you dont have there you can [apply for access](https://developer.twitter.com/en/apply-for-access)

- install npm modules\
  make sure you are in twitter-automation folder

  ```shell
  npm install
  ```

  once it's completed

  ```shell
  cd frontend
  npm install
  ```

- change dev api to your blog\
   `frontend -> tweet.js -> get_user() -> change the link i.e. https://dev.to/api/articles?username={your user name} `

- run application

  ```
  cd ..
  npm run dev
  ```
