var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  title: String,
  description: String,
  attachments: [],
  priority: Number,
  owner: String,
  status: String,
  created_at: Date,
  updated_at: Date
});


var Task = mongoose.model('Task', taskSchema);

module.exports = Task;