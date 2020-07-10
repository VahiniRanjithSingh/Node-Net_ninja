const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://vahini:Azhage*1402@nodejs.aha0u.mongodb.net/NodeJS?retryWrites=true&w=majority' ;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
//.then((result) => console.log('connected to db'))
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for request
//app.listen(3000);-inside 'then' in connecting to db

//middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('In the next middleware');
//     next();
// });

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); //for accepting the data in the form
app.use(morgan('dev'));

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('5f06283383317852e811ad82')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })

// //for retriving all blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

//routes
app.get('/', (req,res) => {
    //res.send('<p>Home Page</p>');
    
    //res.sendFile('./views/index.html', { root: __dirname});

    // 
    
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    //res.send('<p>About Page</p>');
    
    //res.sendFile('./views/about.html', { root: __dirname});

    res.render('about', {title : 'About'});
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', {title:'All Blogs', blogs: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/blogs', (req, res) => {
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
});

app.get('/blogs/:id', (req, res) => {
    //to extract that id
    const id = req.params.id;
    //retrieve doc from DB
    Blog.findById(id)
    .then((result) => {
        //render the details page so we can create a view
        res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
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
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title : 'Create a new blog'});
});

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

//404 page
//use is not scoped to any particular url..here it should be at the bottom that indicates no match with any URL
app.use((req, res) => {
    //res.sendFile('./views/404.html', { root: __dirname});
    
    //res.status(404).sendFile('./views/404.html', { root: __dirname});    

    res.status(404).render('404', {title : '404'});
});