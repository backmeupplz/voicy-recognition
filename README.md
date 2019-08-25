# Voicy recognition

This is the code for the recognition.voicybot.com backend.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/backmeupplz/voicy-recognition`
2. Create `.env` with the environment variables listed below
3. Run `yarn install` in the root folder
4. Run `yarn develop`

And you should be good to go!

## Environment variables

| Name    | Description                              |
| ------- | ---------------------------------------- |
| `MONGO` | URL of the mongo database to store stats |

Also, please, consider looking at `.env.sample`.

## Continuous integration

Any commit pushed to master gets deployed to [recognition.voicybot.com](https://recognition.voicybot.com) via [CI Ninja](https://github.com/backmeupplz/ci-ninja).
