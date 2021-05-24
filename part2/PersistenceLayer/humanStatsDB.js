const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateStats = async(mutants, humans) => {
    const params = {
        TableName: 'humanStats',
        Key: {
            'ID': 'stats'
        },
        UpdateExpression: "set mutants = if_not_exists(mutants, :start) + :incM, humans = if_not_exists(humans, :start) + :incH",
        ExpressionAttributeValues:{
            ':start': 0,
            ":incM": mutants,
            ":incH": humans
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    try {
        await dynamodb.update(params).promise();
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    updateStats
}