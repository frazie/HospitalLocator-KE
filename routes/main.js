const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')
const facilitiesController = require('../controllers/facilities')


router.get('/', mainController.getIndex)
router.get('/facilities', facilitiesController.getHospital)
router.post('/facilities/results', facilitiesController.getResults)

module.exports = router