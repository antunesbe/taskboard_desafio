import { Task } from './../shared/task.model';
import { TaskService } from './../shared/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public taskList: Task[] = [];
  constructor(
    private taskService: TaskService
  ) {

  }

  ngOnInit() {
    this.taskService.getTasks()
          .subscribe(res=>{
            console.log(res);
            this.taskList = res;
          },error=>{
            //TODO ERROR MESSAGE
          })
  }

  public taskDeleted = (event: any) =>{
    console.log(event);
    this.taskList = this.taskList.filter(task =>{
      return task._id != event._id;
    });
  }

  public taskChanged = (event:any) => {

  }

}
