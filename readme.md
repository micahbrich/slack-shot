# slack-shot


`/slack-shot` is a simple tool to quickly nab a screenshot of a website. We wanted to capture fonts-in-use for [The League](https://www.theleagueofmoveabletype.com/), and needed a way to standardize our shots.

This way, anyone on the team can hop on slack after they found a random site using a League font, and just type: `/slackshot browserling.com uses Raleway`, and we'll get back:

- - -
![screen shot example](https://cloud.githubusercontent.com/assets/25366/10265384/ffa1e7de-69fb-11e5-89f3-50eaaa91efe4.png)
- - -
It's built very simply on node.js, utilizing the [https://screenshotlayer.com](screenshotlayer API). We tried to use phantomJS at first, but it couldn't handle webfonts, which  defeated the entire purpose.


## Running locally
```sh
$ git clone git@github.com:micahbrich/slack-shot.git && cd slack-shot
$ npm install
$ npm start
```

Your local copy should now be running at [`localhost:1337`](http://localhost:1337).


## Deploying to Heroku
```sh
$ heroku create
$ git push heroku master
$ heroku open
```

Alternatively, you can deploy your own copy with one click using this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/micahbrich/slack-shot)

See the [Heroku documentation](https://devcenter.heroku.com/articles/config-vars) for more info about changing the configuration variables after deployment.


## Slack setup
1. Create a Slack [incoming WebHook][slack-webhook] integration *(settings aren't important, note the WebHook URL)*
2. Deploy your copy of `slack-shot`, and note your URL endpoint
3. Create a Slack [slash command][slack-command] integration with default settings and use the URL endpoint from above *(optionally note the token for extra security)*
4. *Optional: Add autocomplete help text to Slack command*


## Settings
The following environment variables needs to be set for the command to work, if you use the Heroku Button above it'll ask for these automatically.

- `SLACK_HOOK_URL` - *Slack [incoming WebHook][slack-webhook] URL*
- `USERNAME` - *Username to use when replying with the conversion result (default: slackshot)*
- `EMOJI` - *Emoji icon to use when replying with the conversion result (default: :round_pushpin:)*
- `SLACK_TOKEN` - *Additional security step: Slack [slash command][slack-command] token for verification that the request came from your Slack team (not required)*
- `SCREENSHOTLAYER_TOKEN` - *The token the Screenshotlayer API gives you*


## License

MIT © [micah rich](https://github.com/micahbrich)

[slack-webhook]: https://my.slack.com/services/new/incoming-webhook/
[slack-command]: https://my.slack.com/services/new/slash-commands
