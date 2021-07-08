const express = require('express');
const router = express.Router();
const poems = require('../controllers/poems');
const Poem = require('../models/poems');
const catchAsync = require('../utils/catchAsync');
const {
    poemSchema
} = require('../schemas.js');
const {
    isLoggedIn,
    isAuthor,
    validatePoem
} = require('../middleware');



router.route('/')
    .get(catchAsync(poems.index))
    .post(isLoggedIn, validatePoem, catchAsync(poems.createPoem));

router.get('/new', isLoggedIn, poems.renderNewForm);

router.route('/:id')
    .get(catchAsync(poems.showPoems))
    .put(isLoggedIn, isAuthor, validatePoem, catchAsync(poems.updatePoem))
    .delete(isLoggedIn, isAuthor, catchAsync(poems.deletePoem))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(poems.renderEditForm));

module.exports = router;