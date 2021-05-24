const AWS = require('aws-sdk');
const app = require('./app');

exports.handler = async (event, context, callback) => {
    try {
        const body = JSON.parse(event.body);
        const dnaStr = app.DNAToStr(body.dna);
        const result = await app.isMutantDNA(dnaStr, body.dna);

        let response = 
        {
            "isBase64Encoded": false,
            "statusCode": result ? 200 : 403,
            "headers": {},
            "multiValueHeaders": { },
            "body": ""
        }
        
        return response;
    } catch {
        let response = 
        {
            "isBase64Encoded": false,
            "statusCode": 404,
            "headers": {},
            "multiValueHeaders": { },
            "body": "An error has ocurred"
        }
        
        return response;
    }
};
