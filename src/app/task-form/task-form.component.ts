import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validator } from '@angular/forms';

import { TaskService } from './../shared/task.service';
import { Task } from './../shared/task.model';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
	public taskForm: FormGroup;
	public isEditing: boolean;

	constructor( 
		private route: ActivatedRoute,
		private taskService: TaskService,
		private router: Router
	) { 
		
	}

  	ngOnInit() {
		this.route.data.subscribe((data: { task: Task }) => {
			let task = data.task;
			this.isEditing = (task._id)?true:false;
			this.taskForm = new FormGroup({
				_id: new FormControl(task._id),
				title: new FormControl(task.title),
				description: new FormControl(task.description),
				attachments: new FormControl(task.attachments),
				priority: new FormControl(task.priority),
				owner: new FormControl(task.owner),
				status: new FormControl(task.status),
				created_at: new FormControl(task.created_at),
				updated_at: new FormControl(task.updated_at)
			});
		});
	  }
	  
	  public saveTask = () => {
		if(this.taskForm.valid){
			if(this.isEditing){
				this.taskService.updateTask(this.taskForm.value)
					.subscribe(res=>{
						//GO TO LISTA
						this.router.navigateByUrl('/board');
					}, error =>{
						//todo: colocar erro
					})
					
			}else{
				this.taskService.createTask(this.taskForm.value)
					.subscribe(res=>{
						//GO TO LISTA
						this.router.navigateByUrl('/board');
						console.log(res);
					}, error =>{
						//todo: colocar erro
					})
			}
		}
	  }

}
