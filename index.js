require('dotenv').config()
var AWS = require("aws-sdk");

AWS.config.update({
    region: process.env['REGION'],
    endpoint: process.env['DB_ENDPOINT']
});

var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const zipcode = parseInt(event['zip'])
    var params = {
        TableName: 'zipcodes',
        Key:{
            'zipcode': zipcode
        }
    };

    try {
        const data = await new Promise((resolve, reject) => {
                                    docClient.get(params, function(err, data) {
                                        if (err) {
                                            reject(null)
                                        } else {
                                            resolve(data)
                                        }
                                    });
                                })
        let { Item: { info: { department, municipality, neighbourhood } }} = data
        let results = { 'zip code': zipcode, department, municipality, neighbourhood }
        return results
    } catch (ex) {
        if(ex.name === 'TypeError') {
            return { 'zip code': zipcode, message: `Zip code ${zipcode} isn't valid or registered`}
        } else {
            return { 'zip code': zipcode, message: ex.message }
        }
    }
}