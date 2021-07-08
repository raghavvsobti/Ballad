const {
    poemSchema,
    commentSchema
} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Poem = require('./models/poems');
const Comment = require('./models/comment')



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validatePoem = (req, res, next) => {
    const {
        error
    } = poemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const {
        id
    } = req.params;
    const poem = await Poem.findById(id);
    if (!poem.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/poems/${poem._id}`)
    }
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const {
        id,
        commentId
    } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/poems/${id}`);
    }
    next();
}

module.exports.validateComment = (req, res, next) => {
    const {
        error
    } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}