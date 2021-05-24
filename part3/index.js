const AWS = require('aws-sdk');
const app = require('./app');

exports.handler = async (event, context) => {
  try {
      const result = await app.calculateStats();
      return { body: JSON.stringify(result) }
  } catch (err) {
    return { error: err }
  }
}