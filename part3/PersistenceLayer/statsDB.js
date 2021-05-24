const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getStats = async() => {
    const params = {
        TableName : 'humanStats',
        Key: {
            'ID': 'stats'
        }
      }

    try {
        const data = await dynamodb.get(params).promise()
        return data.Item
    } catch (err) {
        return err
    }
}

module.exports = {
    getStats
}