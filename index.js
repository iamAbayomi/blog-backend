const express = require('express')
const app = express()
const port = 4000

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Initializing Database
const db = require('./models')
db.sequelize.sync({ alter: true })


app.get('/', (req, res) => {
    res.send({
        "message": 'Fola is crazyyling good'
    })
})

require('./routes/user.routes')(app)
require('./routes/post.routes')(app)
require('./routes/comment.routes')(app)
require('./routes/rating.routes')(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})