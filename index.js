require('dotenv').config()
const axios = require('axios')

const BASE_URL = process.env.BASE_URL;

exports.handler = async (event) => {
    const zip = event['zip']
    const req = await axios.get(BASE_URL)
    const data = req['data']
    const suggestions = []
    const limit = 5 
    for(let i = 0, len = data.all.length; i < len; i++) {
        const currentZipCode = data.all[i]
        if(suggestions.length === limit) break
        if(currentZipCode.startsWith(zip)) suggestions.push(currentZipCode)
    }
    return { suggestions }
}