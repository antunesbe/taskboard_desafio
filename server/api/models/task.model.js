var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  title: String,
  description: String,
  attachments: [],
  priority: Number,
  owner: String,
  created_at:Date,
  updated_at: Date
});

taskSchema.methods.changeStatus = (status) => {
    this.status = status;
};

taskSchema.pre('save', (next) => {
  var currentDate = new Date();

  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;