# CherryPicker Backend API

## Things to note:

- This is meant to be a middleman between Frontend React Project and the Backend DB.

- This project runs on port 9000 locally.

- This project has been deployed onto AWS as of 10th August 2020, hence can be accessed from anywhere in your browser.

- To access in the browser use the following base url: https://1xvwcs2af5.execute-api.us-east-1.amazonaws.com/dev/api/0.1

- To understand how to use the API endpoints in your browser, please type the following in your browser where you will see the documentation: https://1xvwcs2af5.execute-api.us-east-1.amazonaws.com/dev/api-docs

## Starting local Development

- `npm install` to download all required dependencies

- `npm run dev` to run the project locally

- The base URL for this API in local development is: http://localhost:9000/api/0.1

- To understand how to use the API endpoints, please type the following in your browser where you will see the documentation: http://localhost:9000/api-docs

- If any API Endpoints were edited, please update swagger.json

## How to deploy this (Only for admin)

- pre-requisite: downloaded serverless cli in local desktop and preconfigure connection to AWS account.

- `npm install` to download all required dependencies

- `sls deploy` to deploy to AWS
