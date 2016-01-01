var FeedParser = require('feedparser');
var request = require('request');
// TODO: Have site include link element in RSS feed so you don't have to fish it
// out with cheerio
var $ = require('cheerio');

var news = {
  items: [],
  timestamp: Date.now()
};

var tenMinutes = 1000 * 60 * 10;

var fetchNews = function (cb) {
  var results = [];
  var req = request('https://news.library.ucsf.edu/feed');
  var feedparser = new FeedParser();

  req.on('error', function (error) {
    cb(error);
  });

  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) {
      return this.emit('error', new Error('Bad status code'));
    }

    stream.pipe(feedparser);
  });

  feedparser.on('error', function(error) {
    cb(error);
  });

  feedparser.on('readable', function() {
    var stream = this;
    var meta = this.meta;
    var item;

    while ((results.length < 4) && (item = stream.read())) {
      var result = {
        title: item.title,
        link: item.link,
        image: $(item.description).first('img').attr('src')
      };

      results.push(result);
    }

    cb(null, results);
  });
};

var fetchNewsCallback = function(err, data) {
  // TODO: log the error or do something with it
  if (!err) {
    news.items = data;
  }
};
fetchNews(fetchNewsCallback);


module.exports = function (index, prop) {
  if (news.items.length < 4 || Date.now() - news.timestamp > tenMinutes) {
    news.timestamp = Date.now();
    fetchNews(fetchNewsCallback);
  }
  return news.items[index][prop];
};