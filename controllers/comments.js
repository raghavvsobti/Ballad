const Comment = require('../models/comment');
const Poem = require('../models/poems');

module.exports.createComment = async (req, res) => {
    const poem = await Poem.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    poem.comments.push(comment);
    await comment.save();
    await poem.save();
    req.flash('success', 'Posted a new Comment!');
    res.redirect(`/poems/${poem._id}`);
}

module.exports.deleteComment = async (req, res) => {
    const {
        id,
        commentId
    } = req.params;
    await Poem.findByIdAndUpdate(id, {
        $pull: {
            comments: commentId
        }
    });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Successfully deleted Comment!')
    res.redirect(`/poems/${id}`);
}