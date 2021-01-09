const data = require('./data/zip')
const express = require('express')
const app = express()

app.get('/zipcodes/suggestions/:zip', (req, res) => {
    const { zip } = req.params
    const suggestions = []
    const limit = 5 /* limit the amount of suggestions to 5 */
    for(let i = 0, len = data.all.length; i < len; i++) {
        const currentZipCode = data.all[i]
        if(suggestions.length === limit) break
        if(currentZipCode.startsWith(zip)) suggestions.push(currentZipCode)
        ++i
    }
    res.json({ suggestions })
})

app.get('/zipcodes/:zip', (req, res) => {
    const { zip } = req.params
    const results = data.zipCodes[zip]
    if(results === undefined) {
        res.status(404).json({ 'zip code': zip, message: `Zip code ${zip} isn't valid/registered.` })
    } else {
        res.json({'zip code': zip, ...results})
    }
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})
