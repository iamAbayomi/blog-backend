const jwt = require('jsonwebtoken')
const config = {
  authSecret: 'mysecret'
}

exports.config = config

exports.isAuthenticated = (req, res, next) => {
  // get the token from the header if present
  const token = req.headers.authorization
  // if no token founc, return response (without going to the next middelware )
  if (!token) { return res.status(401).send('Access denied. No token provided. ') }

  try {
    // if can verify the token, set req.user and pass to the next middleware
    const decoded = jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret)
    req.user = decoded
    next()
  } catch (ex) {
    // If invalid token
    res.status(400).send('Invalid token')
  }
}

exports.signToken = (data, roles, secret) => {
  const token = jwt.sign({ id: data.user_id, fullname: data.fullname, email: data.email, roles }, secret)
  return token
}
