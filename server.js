const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/api/index');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./server/config/config.json');

const social = require('./server/config/passport')(app,passport);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})
app.use(checkAuthorization);

require('./server/api/routes/task.route.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

function checkAuthorization (req, res, next) {
    console.log("teste");
    const token = req.headers['authorization'];

    if(!token){
        res.redirect('/login');
    }else{
        jwt.verify(token, config.secret, (err,decoded)=>{
            if(err){
                res.redirect('/login');
            }else{
                next();
            }
        })
    }
 }
 