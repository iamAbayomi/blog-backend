module.exports = (app) => {
  const cors = require('cors')

  const allowedOrigins = ['http://localhost:3000','http://localhost:4000', 'https://a-blog-in-react.netlify.app/',
    'https://spiinge.com', 'https://www.spiinge.com', 'https://spiinge.appspot.com/']

  app.use(cors({
    origin (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
      if (!origin) { return callback(null, true) }
      if (!allowedOrigins.includes(origin)) {
        const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    }
  }))
}
