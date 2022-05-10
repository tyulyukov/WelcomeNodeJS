let express = require('express')
let app = express()

app.get('/', function (req, res) {
    res.send('А я сейчас вам покажу, откуда на Беларусь готовилось нападение.')
})

app.listen(3000)