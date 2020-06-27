const http = require('http');
//sending html file as response
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //console.log('request made');
    //console.log(req.url, req.method);

    //lodash
    const num = _.random(0, 24);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();

    //switching bw html response pages
    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            //setting response header for redirection
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //set header content type
        //text response
    // res.setHeader('Content.Type', 'text/plain');

    // res.write('hello, ninjas');
    // res.end();

        //html response

    res.setHeader('Content.Type', 'text/html');
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<p>hello, ninjas</p>');
    // res.write('<p>hello again, ninjas</p>');
    // res.end();

    //send html file
    //fs.readFile('./views/index.html', (err, data) => {
    //while routing paths
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            // res.write(data);
            // res.end();

            //we are sending it once so we can omit that write func and add in end.
            //if we are sending multiple datas then use 'write' one after another
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});