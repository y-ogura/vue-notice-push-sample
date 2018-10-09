const express = require('express')
const router = express.Router()
const accounts = require('./mock/account')

router.post('/login', function(req, res) {
  const email = req.body.email
  for (let i = 0, len = accounts.length; i < len; i++) {
    if (accounts[i].email === email) {
      res.json(accounts[i])
      return
    }
  }
  res.json(null)
})

module.exports = router