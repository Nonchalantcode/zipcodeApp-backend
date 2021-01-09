const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({ message: 'Hello, world' })
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})