const mongoose = require('mongoose');
const Comment = require('./comment')
const Schema = mongoose.Schema;

const PoemSchema = new Schema({
    title: String,
    ballad: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

});

PoemSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Poem', PoemSchema);