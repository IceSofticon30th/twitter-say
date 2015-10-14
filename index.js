var say = require('say');
var Twit = require('twit');
 
var T = new Twit(require('./keys.json'));
var stream = T.stream('user', {});

var tweetQueue = [];

stream.on('tweet', function (tweet) {
	var text = tweet.user.name + ', ' + tweet.text;
	tweetQueue.push(text);
});

function nextTweet() {
	var text = tweetQueue.shift();
	if (text != undefined) say.speak('Kyoko', text, nextTweet);
	else setTimeout(nextTweet, 800);
}

nextTweet();