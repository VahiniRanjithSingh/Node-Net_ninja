const express = require('express');
//const Blog = require('../models/blog');//not needed here move to blogController.js
const blogController = require('../controllers/blogController');

const router = express.Router();

//router.get('/', (req, res) => {
    // Blog.find().sort({ createdAt: -1 })
    // .then((result) => {
    //     res.render('index', {title:'All Blogs', blogs: result});
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
    
    
//});

//added all kind of above func into blogController.js

router.get('/', blogController.blog_index)
router.post('/', blogController.blog_create_post)
//placing at the top becaz blogs/create where that create is taken as id when plced below and its keep on searching
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)

module.exports = router;