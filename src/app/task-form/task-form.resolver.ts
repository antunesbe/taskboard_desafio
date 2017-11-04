import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { 
		Router, 
		Resolve, 
		RouterStateSnapshot,
		ActivatedRouteSnapshot
		} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Task } from './../shared/task.model';
import { TaskService } from './../shared/task.service';


@Injectable()
export class TaskResolver implements Resolve<Task> {
	constructor(
		private taskService: TaskService,
		private router: Router
	) { }

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {

		let id = route.params['id'];

		if (id === 'new') {
			return new Task();
		}

		return this.taskService.getTask(id)
			.map(task => task as Task )
			.catch((error: any) => {
				this.router.navigate(['/board']);
				return Observable.throw(null);
			});

	}
}
