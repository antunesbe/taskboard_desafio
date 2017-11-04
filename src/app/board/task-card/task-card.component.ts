import { TaskService } from './../../shared/task.service';
import { Task } from './../../shared/task.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task:Task;
  @Output() deleted = new EventEmitter();

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  public deleteTask = (task:Task) => {
    this.taskService.deleteTask(task)
          .subscribe(res=>{
            this.deleted.next(task);
          },error=>{
            console.error(error);
          });
  }
}
