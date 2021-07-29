exports.sendError = (res, err, data) => {
  res.status(500).send({
    message:
             err.message || `${data}`
  })
}

exports.sendResponse = (res, data, token) => {
  res.send({
    message: data,
    token
  })
}
