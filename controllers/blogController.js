const Blog = require('../models/blog');

//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', {title:'All Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_details = (req, res) => {
    //to extract that id
    const id = req.params.id;
    //retrieve doc from DB
    Blog.findById(id)
    .then((result) => {
        //render the details page so we can create a view
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title : 'Create a new blog'});
}

const blog_create_post = (req, res) => {
    //cretae instance of blog and attach the data in it
    const blog = new Blog(req.body);
    //save that instance also the method is asynchronous
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_delete = (req, res) => {
    //to extract that id
    const id = req.params.id;
    //retrieve doc from DB
    Blog.findByIdAndDelete(id)
    .then((result) => {
        //send back some json to frontend(browser)
        //req is ajax so no redirect.therefore now this json data will have redirect property
        res.json({ redirect:'/blogs' })
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}