require('dotenv').config()
const axios = require('axios')

const BASE_URL = process.env.BASE_URL;

exports.handler = async (event) => {
    const zip = event['zip']
    const req = await axios.get(BASE_URL)
    const data = req['data']
    const results = data['zipCodes']
    if(results[zip] === undefined) {
        return { 'zip code': zip, message: `Zip code ${zip} isn't valid/registered.` }
    } else {
        return { 'zip code': zip, ...results[zip] }
    }
}