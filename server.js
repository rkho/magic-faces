var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

var swig = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('./views/index.html', {html: html});
    res.send(page);
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
