const express = require('express');
const hbs  = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine','hbs');
app.use(express.static(__dirname + "/public"));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + "\n",(err)=>{
        if(err){
            console.log(err.message)
        };
    })

next()
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// next();
// });



app.get('/',(req,res)=>{
    res.render('home.hbs',{
    pageTitle: 'Welcome',
    welcomeText:'This is a page for the udemy node.js tutorial by sanjay',
    currYear: new Date().getFullYear()
});
   
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle: 'About Page',
    currYear: new Date().getFullYear()
});
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
    pageTitle: 'Projects',
    projectText:'This is a page for all the list of my projects',
    currYear: new Date().getFullYear()
});
   
});

app.get('/bad',(req,res)=>{
res.send({
    errorMessage: 'Unable to process request'
});
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});