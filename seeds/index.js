const mongoose = require('mongoose');
const Poem = require('../models/poems');

// const ejsMate = require('ejs-mate')


mongoose.connect('mongodb://localhost:27017/ballad', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await Poem.deleteMany({});
    const c = new Poem({
        author: '60e37e42add83d3b34339029',
        title: 'Frog and the Nightingale'
    });
    await c.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})