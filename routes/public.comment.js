const express = require('express')
const router = express.Router()
const { getAllComments } = require('../controllers/public.comment')

router.get('/', getAllComments)

module.exports = router
