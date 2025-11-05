### Start up instructions
- you need  the nodejs environment and a mysql database
- launch your sql server
- create a database named geekou
- run the backend using the command: node server.js
- in case of error:
- - verify you have the required dependencies by running the command: npm install
- - checkout if the have the .env file and all its active constants

## User FLOW
- A user first needs to register
- A token is required to authenticate each request,so the registered user needs to login to have an access token

## KYC Flow
- The kyc is first submitted(the save endpoint) before any file upload is being uploaded
- Files are then uploaded respscing the selected file type
- after saving, the user can submit his information for verification (the submit endpoint) 