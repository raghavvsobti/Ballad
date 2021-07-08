const Poem = require('../models/poems');

module.exports.index = async (req, res) => {
    const poems = await Poem.find({});
    res.render('poems/index', {
        poems
    })
}

module.exports.renderNewForm = (req, res) => {
    res.render('poems/new');
}

module.exports.createPoem = async (req, res) => {
    const poem = new Poem(req.body.poem);
    poem.author = req.user._id;
    await poem.save();
    req.flash('success', 'Successfully added a new Poem!');
    res.redirect(`/poems/${poem._id}`)
}

module.exports.showPoems = async (req, res, ) => {
    const poem = await Poem.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!poem) {
        req.flash('error', 'Cannot find that Poem!');
        return res.redirect('/poems');
    }
    res.render('poems/show', {
        poem
    });
}

module.exports.renderEditForm = async (req, res) => {
    const {
        id
    } = req.params;
    const poem = await Poem.findById(id);
    if (!poem) {
        req.flash('error', 'Cannot find that poem!');
        return res.redirect('/poems');
    }
    res.render('poems/edit', {
        poem
    });
}

module.exports.updatePoem = async (req, res) => {
    const {
        id
    } = req.params;
    const poem = await Poem.findByIdAndUpdate(id, {
        ...req.body.poem
    });
    req.flash('success', 'Successfully updated Poem!');
    res.redirect(`/poems/${poem._id}`)
}

module.exports.deletePoem = async (req, res) => {
    const {
        id
    } = req.params;
    await Poem.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Poem!')
    res.redirect('/poems');
}