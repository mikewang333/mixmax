const key = require('../utils/key');
const request = require('request');
const _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  const url = req.query.text.trim();
  const response = request({
    url: "https://emailapps.mixmax.com/article/resolve",
    qs: {
      url,
      user:"mikewang.ca@gmail.com",
    },
    gzip: true,
    json: true,
    timeout: 15 * 1000
  }, function(err, response) {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    res.json({
      body: response.body
    });
  });
};