let Twitter = require('twitter');
const fs = require('fs');
const path = require('path'); 
let Sentiment = require('sentiment');
let sentiment = new Sentiment();

// Author name and other things. Add your details here
console.log(`Project Name: Twitter Sentimental Analysis`)
console.log(`Author Name: Ishwar Sarade`)
console.log(`Author Email: ishwar@some1.in`)
console.log(`Author Github: https://github.com/heyIshwar\n`)
// setting up client using API keys
let client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

// we are going to store sentimental analysis in this array
let sentimentalAnalysis = []

// add username from twitter
let params = {screen_name: 'TheTweetOfGod'};

// final call to Twitter API and we will get data in `tweets` variable
// variable `error` will be set if there is error

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    let dirName = `${params.screen_name}_${Date.now()}`

    // creating directory
    fs.mkdir(path.join(__dirname, dirName), (err) => {
      if (err) console.log("App: Could not create directory")
      else console.log(`App: Directory '${dirName}' created`)
    })
    
    // ?do you know Array.forEach? if not then search
    tweets.forEach(tweet => {
      // declaring object to store temporary response 
      let temp = {}

      temp.tweet = tweet.text
      temp.result = sentiment.analyze(tweet.text)

      // storing temp object in sentimentalAnalasys array
      sentimentalAnalysis.push(temp)

      console.log(`Tweet: ${temp.tweet}\nScore: ${JSON.stringify(temp.result.score)}\n\n`)
    });

    // ?search what is JSON.parse & JSON.stringify
    // writing to file
    fs.writeFileSync(`${dirName}/tweets.json`, JSON.stringify(tweets, null, '\t'))
    console.log(`App: Tweets JSON written to file '${dirName}/tweets.json'`)
    fs.writeFileSync(`${dirName}/sentimentalAnalysis.json`, JSON.stringify(sentimentalAnalysis, null, '\t'))
    console.log(`App: sentimentalAnalysis JSON written to file '${dirName}/sentimentalAnalysis.json'`)
  }
});