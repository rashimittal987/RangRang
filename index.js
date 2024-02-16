const express = require('express');
const app = express();

const session = require('express-session');
const cookieparser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const userrouter = require('./userrouter');


const loginpath = path.join(__dirname, '/website/login.html')
    //console.log(loginpath);
app.use(express.static('website'));
app.use(express.urlencoded({ extended: false }));



app.use('/users', checkcred, userrouter);
const oneday = 1000 * 60 * 60 * 24;
app.use(cookieparser());
app.use(session({
    saveUninitialized: true,
    resave: false,
    sercet: 'guighgk#6ofiyhl.',
    cookie: {
        maxAge: oneday
    }
}))



app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/website/sign-up.html'));
})


app.post('/login', (req, res) => {
    fs.readFile('./website/user.JSON', 'utf-8', (err, data) => {
        if (err) throw err;
        const content = JSON.parse(data);
        //console.log(data);
        const resultarr = content.Users.filter((val) => {
            return (val.username === req.body.username && val.password === req.body.password && val.role === req.boby.role);
        })
        if (resultarr.length > 0) {
            //res.send("Dashboard");
            req.session.username = req.body.username;
            req.session.role = req.body.role;
            res.redirect('/website/home.html');
        } else {
            res.redirect('/website/Signup');

        }
    })
})

app.get('/home.html', (req, res) => {
    if (req.session.username)
        res.redirect('/users/home.html');
    else
        res.redirect('/login');
})


app.get('/sign-up', (req, res) => {
    res.send(path.join(__dirname, '/website/sign-up.html'))
})



//if (req.session.name == true) {
//
//  req.session.dis
//} else {
//  respond.redirect
//}
function checkcred(req, res, next) {
    if (req.session.username)
        next();
    else
        res.redirect('/login');
}
app.use(express.static('website'));

app.listen(3000, () => {
    console.log("Server started...");
})