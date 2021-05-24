const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getHuman = async (dnaStr) => {
    const params = {
        TableName : 'humanTable',
        Key: {
            'DNA': dnaStr
        }
      }

    try {
        const data = await dynamodb.get(params).promise()
        return data
    } catch (err) {
        return err
    }
    
}

const saveHuman = async (dnaStr, isMutant) => {
    const params = {
        TableName:'humanTable',
        Item: {
            'DNA': dnaStr,
            'isMutant': isMutant
        }
    };

    try {
        await dynamodb.put(params).promise();
    } catch (err) {
        return err
    }
}

module.exports = {
    getHuman,
    saveHuman
}