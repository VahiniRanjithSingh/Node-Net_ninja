const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

//models
const Blog = mongoose.model('blog', blogSchema);
//here the frst arg is the name which is ver important becoz the model will pluralize the name ie. 'blogs' and will search for 'blogs' collection...2nd arg is the schema name to be wrapped by the model

//exporting the model so that we can use the model anywhere in proj
module.exports = Blog;