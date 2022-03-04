const express = require('express')
const router = express.Router()
const {
  createComment,
  deleteComment,
  updateComment,
  voteComment,
} = require('../controllers/protected.comment')

router.post('/create', createComment)
router.delete('/delete/:id', deleteComment)
router.patch('/update/:id', updateComment)
router.patch('/vote/:id', voteComment)

module.exports = router
