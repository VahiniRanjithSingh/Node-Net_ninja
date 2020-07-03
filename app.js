const express = require ('express');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for request
app.listen(3000);

app.get('/', (req,res) => {
    //res.send('<p>Home Page</p>');
    
    //res.sendFile('./views/index.html', { root: __dirname});

    const blogs = [
        {title: 'first online course', snippet: 'nodeJS is the frst online course'},
        {title: 'blender', snippet: 'blender is a tool used in animation'},
        {title: 'net ninja', snippet: 'net ninja ia an youtube channel, useful learning platform'}
    ];
    res.render('index', {title : 'Home', blogs});
});

app.get('/about', (req,res) => {
    //res.send('<p>About Page</p>');
    
    //res.sendFile('./views/about.html', { root: __dirname});

    res.render('about', {title : 'About'});
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