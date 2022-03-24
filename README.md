# ThinkPlus Interactive Journal

This is the repository for the backend server used to power ThinkPlus' interactive journal (UniMelb SWEN90013 2021 ED). The server is a Nodejs app with Express and Firebase as the persistence layer. Information on how to run the server locally and deploy it is available below.

## API endpoints

List of all available endpoints: [API docs](apis.md)

## Local development

To start local server normally: <br />
`npm run start`

To start the Nodemon server, which will re-build and re-start the server upon modifications: <br />
`npm run dev`

## Deployment

The server is currently deployed on [Heroku](https://dashboard.heroku.com/apps/think-plus-journal-back), using the following credentials:

| Credential | Value                       |
| ---------- | --------------------------- |
| Email      | `elevo.thinkplus@gmail.com` |
| Password   | `BAUDd.2eJ4JQu4CJT!`        |
| App name   | `think-plus-journal-back`   |

The URL for the deployed server at Heroku is https://think-plus-journal-back.herokuapp.com. Instructions for deploying new versions to Heroku is available [here](https://devcenter.heroku.com/articles/deploying-nodejs#deploy-your-application-to-heroku), using the above credentials.

To inspect the database, log on to the Firebase console [here](https://console.firebase.google.com/project/think-plus-5cc5c/overview) using the above email and password and navigate to "Firestore Database".
