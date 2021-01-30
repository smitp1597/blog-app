const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//connection to mongoDB
const conn = 'mongodb+srv://smitp1597:smit01051997@nodejs.kjau2.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(conn, {useUnifiedTopology: true, useNewUrlParser: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.set('view engine', 'ejs'); 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
//     const blogs = [
//         {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//         {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//         {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//       ];
//    res.render('index', { title: 'Home', blogs: blogs });
    res.redirect('/blogs')
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
});

//adding new blog to the database and redirecting it to the home page
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
});

//displaying single blog
app.get('/blogs/:id', (req, res) => {
     const id = req.params.id;
    //console.log(id);
    Blog.findById(id)
    .then((result) => {
        res.render('details', {title: 'Blog Details', blog: result});
    })
    .catch((err) => {
        res.render('404', { title: '404' });
    })
});

//delete the single blog
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
        console.log(err);
    })
});

//insert documents to the collection
app.use('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2',
        body: 'more about my new blog 2'
    });

    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//retrieve all documents from the collection
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

//retrieving single blog from the collection
app.get('/single-blog', (req, res) => {
    Blog.findById('60109ce1de0f2610a4137d12')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// app.use((req, res, next) => {
//     console.log('new request made: ');
//     console.log('host: ', req.hostname);
//     console.log('host: ', req.path);
//     console.log('host: ', req.method);
//     next();
// })


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blog/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

//redirects
app.get('/about-us', (req, res) => {
    res.render('about', { title: 'About' });
});

//404 page!
app.use((req, res) => {
    res.render('404', { title: '404' });
});