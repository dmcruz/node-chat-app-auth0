# Readme

## Overview

This uses Auth0's QuickStart (JS Express) sample code and added in the chat logic from [node-chat-app](https://github.com/dmcruz/node-chat-app).

## Links

- [Auth0 QuickStart WebApp Express Guide](https://auth0.com/docs/quickstart/webapp/express/interactive) 
- [QuickStart code in Github](https://github.com/auth0-samples/auth0-express-webapp-sample)

## How to use this project

1. Replace the values in .env file with your Auth0 application details

Sample (not real values):

```
SECRET='generate any long random string'
BASEURL='http://localhost:3001'
CLIENTID='gkUje2230ndkfjdUjekwelurif238'
ISSUER='https://dev-xxxxxx.au.auth0.com'
```

2. Open terminal, browse to this project and run `npm install`
3. Run `npm start` to start the application

## Testing

1. Open a browser and browse to http://localhost:3001

2. Sign in, and access the chat

3. To test the chat, open a different browser and sign in with a different account