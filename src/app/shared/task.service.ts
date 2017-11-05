import { AuthService } from './auth.service';
import { HttpClientService } from './httpClient.service';
import { AlertService } from './alert.service';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class TaskService {
    constructor(
        private httpClient: HttpClientService,
        private alertService: AlertService,
        private authService: AuthService
    ){ }

    public getTasks = (): Observable<Task[]> => {
        return this.httpClient.get(`/api/tasks`)
            .map(response => {
                console.log(response);
                let tasks: Task[] = response.json();
                console.log(tasks);
                tasks.forEach(task=>{
                    task = new Task(task);
                });
                console.log(tasks);
                return tasks;
            })
            .catch(error =>{
                console.log(error.json());
                this.alertService.error("Falha ao recuperar tarefas", "Tente novamente");
                return Observable.throw(error);
            });
    }

    public getTask = (id: string):Observable<Task> => {
        return this.httpClient.get(`/api/tasks/${id}`)
            .map(response => {
                let task: Task = new Task(response.json());
                return task;
            })
            .catch(error =>{
                console.log(error.json());
                this.alertService.error("Falha ao recuperar tarefa", "Tente novamente");
                return Observable.throw(error);
            });
    }

    public createTask = (task:Task):Observable<Task> => {
        task.owner = this.authService.getLoggedEmail();
        
        return this.httpClient.post(`/api/tasks/`, task)
            .map(response => {
                this.alertService.success("Tarefa criada!");
                return response.json() as Task;
            })
            .catch(error =>{
                console.log(error.json());
                this.alertService.error("Falha ao criar tarefa", "Tente novamente");
                return Observable.throw(error);
            });
    }

    public updateTask = (task:Task):Observable<Task> => {
        return this.httpClient.put(`/api/tasks/${task._id}`,task)
            .map(response => {
                console.log(response.json());
                this.alertService.success("Tarefa atualizada!");
                return response.json() as Task;
            })
            .catch(error =>{
                this.alertService.error("Falha ao atualizar tarefa", "Tente novamente");
                console.log(error.json());
                return Observable.throw(error);
            });
    }

    public deleteTask = (task:Task):Observable<boolean> => {
        console.log("to delete: ", task);
        return this.httpClient.delete(`/api/tasks/${task._id}`)
            .map(response => {
                this.alertService.success("Tarefa excluida!");
                return true;
            })
            .catch(error =>{
                this.alertService.error("Falha ao deletar tarefa", "Tente novamente");
                console.log(error.json());
                return Observable.throw(false);
            });
    }
}
