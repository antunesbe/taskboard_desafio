taskRoutes = (app) => {
    var task = require('../controllers/task.controller.js');
    let prefix = '/api'
    
    app.get(prefix+'/tasks', task.findAll);
    app.get(prefix+'/tasks/:taskId', task.findOne);
    app.post(prefix+'/tasks', task.create);
    app.put(prefix+'/tasks/:noteId', task.update);
    app.delete(prefix+'/tasks/:noteId', task.delete);
}

module.exports = taskRoutes;