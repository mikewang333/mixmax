//var key = require('eb6df903547f8123e3cb79e5429a0999');
const request = require('request');
const _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  const url = req.query.url.trim();
  const response = request({
    url: "http://soundcloud.com/oembed",
    qs: {
      url,
      format: 'json',
      maxheight: 81,
      maxwidth: 600
    },
    gzip: true,
    json: true,
    timeout: 15 * 1000
  }, function(err, response) {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    const html = response.body.html  //maybe response.body.data.html
    res.json({
      body: html
    });
  });
};