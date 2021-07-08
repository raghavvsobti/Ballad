const express = require('express');
const router = express.Router({
    mergeParams: true
});

const {
    commentSchema
} = require('../schemas.js');
const Comment = require('../models/comment');
const comments = require('../controllers/comments');
const Poem = require('../models/poems');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const {
    isLoggedIn,
    validateComment,
    isCommentAuthor
} = require('../middleware');

router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment))

router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment))

module.exports = router;