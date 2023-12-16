const express = require('express')
const router = express.Router()
const { fetchRtp } = require('../controllers/home.Controller')

router.get('/', fetchRtp)

module.exports = router