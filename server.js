const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/api/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

require('./server/api/routes/task.route.js')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

