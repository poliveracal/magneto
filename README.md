# magneto
## Part2
It contains code implementation to check whether a human is a mutant or not.
The solution is divided as following:
- Persistence Layer manages operations against DynamoDB table (humanTable)
- Business Layer implements algorithm to check a human DNA
- app.js integrates algorithm result with database operations
- index.js contains Lambda code to invoke app.js and generates result in proper format
- tests folder containing scripts to perform unit tests

AWS service - POST method: https://kke2v6695f.execute-api.us-east-1.amazonaws.com/dev/mutant 

Must be sent DNA in "dna" property inside request BODY in a matrix N x N representation

## Part3
It contains code implementation to retrieve human statistics.
The solution is divided as following:
- Persistence Layer manages operations against DynamoDB table (humanStats)
- app.js invokes persistence operations and returns data in proper format
- index.js contains Lambda code to invoke app.js
- tests folder containing scripts to perform unit tests

AWS service - GET method: https://kke2v6695f.execute-api.us-east-1.amazonaws.com/dev/stats

## Installation
In order to preprare code for run please make sure to download all required packages running the following command in a terminal:

npm install

## Unit tests
Once all packages have been downloaded, execute this command on a terminal:

npm run test
