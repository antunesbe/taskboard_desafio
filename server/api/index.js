const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const task = require('./routes/task.route.js');

mongoose.connect("mongodb://admin:admin@ds241875.mlab.com:41875/taskboardvoxus", { useMongoClient: true });
let db = mongoose.connection;

db.on('error', error=>{
    console.log('Erro ao conectar com banco de dados: ', error);
});

db.once('open', function() {
  console.log("Conectado ao banco de dados!");
});
   

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.use('/tasks', task);

module.exports = router;