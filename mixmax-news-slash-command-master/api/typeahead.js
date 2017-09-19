var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var createTemplate = require('../utils/template.js').typeahead;
var _ = require('underscore');

module.exports = function(req, res) {
  var term = req.query.text.trim();
  console.log(term)
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var response;
  try {
    response = sync.await(request({
      // https://developers.soundcloud.com/docs/api/reference#tracks
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      qs: {
        q: term,
        page: 0,
        "api-key": key
      },
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error1');
    return;
  }

  if (response.statusCode !== 200 || !response.body) {
    res.status(500).send('Error2' + response.statusCode);
    return;
  }

  var results = _.chain(response.body.response.docs)
    .reject(function(data) {
      // Filter out results without artwork.
      return !Array.isArray(data.multimedia); //|| !(data.multimedia.length >= 3);
    })
    .map(function(data) {
      return {
        resolve: false,
        title: createTemplate(data),
        text: data.web_url
      };
    })
    .value();

    console.log(results)

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};