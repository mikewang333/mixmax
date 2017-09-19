var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');
var createTemplate = require('../utils/template.js').resolver;

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  handleSearchString(term, req, res);
};

function handleSearchString(term, req, res) {
  var response;
  response = term
  res.json({
    body: response.body
  });
}