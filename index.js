require('dotenv').config()
var AWS = require("aws-sdk");

AWS.config.update({
    region: process.env['REGION'],
    endpoint: process.env['DB_ENDPOINT']
});

var docClient = new AWS.DynamoDB.DocumentClient();

function calcZipcodeRange(zipcode) {
    /* The frontend enforces that zipcodes suggestions will be shown only if the user has specified at least the first 3 digits */
    typeof zipcode === 'number' 
        ? zipcode = `${zipcode}`
        : (() => {})()
    switch(zipcode.length) {
        /* If we have only the first three numbers of a zipcode */
        case 3: {
            zipcode = zipcode + '00'
            const min = parseInt(zipcode)
            return [min, min + 10]
        }
        case 4: {
            zipcode = zipcode + '0'
            const min = parseInt(zipcode)
            return [min, min + 10]
        }
        default: 
            return [parseInt(zipcode), parseInt(zipcode) + 10]
    }
}

exports.handler = async (event) => {
    const zipcode = event['zip']
    let [min, max] = calcZipcodeRange(zipcode)
    var params = {
        TableName: 'zipcodes',
        ProjectionExpression: "#zipnum",
        FilterExpression: "#zipnum between :min and :max",
        ExpressionAttributeNames: {
            "#zipnum": "zipcode"
        },
        ExpressionAttributeValues: {
            ":min": min,
            ":max": max
        },
    }

    try {
        const data = await new Promise((resolve, reject) => {
            docClient.scan(params, (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    let results = 
                        data.Items.reduce((acc, {zipcode}) => {
                            acc.push(String(zipcode))
                            return acc
                        }, [])
                    resolve(results.sort())
                }
            })
        })
        return { "suggestions": data }
    } catch (err) {
        return { "suggestions": [] }
    }
}