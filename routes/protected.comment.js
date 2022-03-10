const express = require('express')
const router = express.Router()
const {
  createComment,
  deleteComment,
  updateComment,
  upvote,
  downvote,
  replyComment,
} = require('../controllers/protected.comment')

router.post('/create', createComment)
router.delete('/delete/:id', deleteComment)
router.patch('/update/:id', updateComment)
router.patch('/upvote/:id', upvote)
router.patch('/downvote/:id', downvote)
router.patch('/reply/:id', replyComment)

module.exports = router
