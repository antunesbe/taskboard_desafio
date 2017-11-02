var Task = require('../models/task.model.js');

exports.create = function(req, res) {
    if(!req.body.content) {
        res.status(400).send({message: "Tarefa não pode estar vazia"});
    }
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        attachments: req.body.attachments,
        priority: req.body.priority,
        owner: req.body.owner
    });

    task.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Não foi possível salvar a tarefa. Tente novamente"});
        } else {
            console.log(data);
            res.status(200).send(data);
        }
    });
};

exports.findAll = function(req, res) {
    Task.find((err,tasks)=>{
        if(err){
            res.status(500).send({message: "Não foi possível buscar as tarefas. Tente novamente"});
        }else{
            res.status(200).send(tasks);
        }
    })
};

exports.findOne = function(req, res) {
    Task.findById(req.params.taskId, (err,tasks)=>{
        if(err){
            res.status(500).send({message: "Não foi possível recuperar a tarefa. Tente novamente"});
        }else{
            res.status(200).send(tasks);
        }
    })
};

exports.update = function(req, res) {
    console.log(req.body);
    Task.findByIdAndUpdate(req.params.taskId, req.body.task,(err,tasks)=>{
        if(err){
            console.log(err);
            res.status(500).send({message: "Não foi possível atualizar a tarefa. Tente novamente"});
        }else{
            console.log(tasks);
            res.status(200).send(tasks);
        }
    })
};

exports.delete = function(req, res) {
    Task.findByIdAndRemove(req.params.taskId,(err,data)=>{
        if(err){
            res.status(500).send({message: "Não foi possível deletar a tarefa. Tente novamente"});
        }else{
            console.log(data);
            res.status(200).send({message: 'Tarefa deletada com sucesso'});
        }
    })
};