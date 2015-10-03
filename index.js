'use strict';

var http = require('http');
var querystring = require('querystring');
var slack = require('slack-notify')(process.env.SLACK_HOOK_URL);
var request = require('request');
var prependHttp = require('prepend-http');

var config =  {
  username: process.env.USERNAME || 'slackshot',
  emoji: process.env.EMOJI || ':round_pushpin:',
  token: process.env.SLACK_TOKEN || void 0
};

http.createServer(function (req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end();

    body = querystring.parse(body);
    console.log(body);

    handlePayload(body);
  });
}).listen(process.env.PORT || 1337);

function handlePayload(body){
  if(config.token && config.token !== body.token){
    return console.error('Token `' + body.token + '` didn\'t match environment variable');
  }

  var text = body.text.split(' ');
  var url = prependHttp(text[0]);

  request.get('http://api.screenshotlayer.com/api/capture', {
    access_key: process.env.SCREENSHOTLAYER_TOKEN,
    url: url,
    viewport: 1440x900,
    width: 900
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        console.log(response);
        console.log(body);

        slack.send({
          username: config.username,
          icon_emoji: config.emoji,
          channel: body.channel_id,
          text: '<' + url + '>',
          unfurl_links: true,
          attachments: [{
            title: 'result here',
            fields:[
              {
                 "title":"Screenshot",
                 "value":"<" + "awesome" + ">",
                 "short":false
              }
            ]
          }]
        });

    }
  });
}
