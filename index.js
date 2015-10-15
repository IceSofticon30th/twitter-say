var say = require('winsay');
var Twit = require('twit');
 
var T = new Twit(require('./keys.json'));
var stream = T.stream('user', {});

var tweetQueue = [];

stream.on('tweet', function (tweet) {
	if (tweet.retweeted_status != undefined) return;
	tweetQueue.push(tweet);
});

function nextTweet() {
	var tweet = tweetQueue.shift();
	if (tweet != undefined) {
		var text = tweet.user.name + ', ' + tweet.text;
		
		if (tweet.entities != undefined) {
			tweet.entities.urls.forEach(function (url) {
				text = text.replace(url.url, ' リンク ');
			});
		}
		
		if (tweet.extended_entities != undefined) {
			tweet.extended_entities.media.forEach(function (media) {
				text = text.replace(media.url, ' 画像 ');
			});
		}
		
		say.speak(null, text, nextTweet);
	}
	else setTimeout(nextTweet, 800);
}

nextTweet();