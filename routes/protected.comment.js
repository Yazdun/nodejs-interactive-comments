const express = require('express')
const router = express.Router()
const {
  createComment,
  deleteComment,
  updateComment,
  voteComment,
  replyComment,
} = require('../controllers/protected.comment')

router.post('/create', createComment)
router.delete('/delete/:id', deleteComment)
router.patch('/update/:id', updateComment)
router.patch('/vote/:id', voteComment)
router.patch('/reply/:id', replyComment)

module.exports = router
