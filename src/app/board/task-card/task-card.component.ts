import { AuthService } from './../../shared/auth.service';
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
  @Output() changed = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private authService: AuthService
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

  public changeStatus = (task: Task) =>{
    if(task.status =='todo'){
      task.status = 'done';
      task.developed_by = this.authService.getLoggedEmail();
    }else{
      task.status = 'todo';
      task.developed_by = null;
    }
    
    this.taskService.updateTask(task)
          .subscribe(res=>{
            this.changed.next(task);
          }, error=>{
            console.error(error);
          })
  }
}
