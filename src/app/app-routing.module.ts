import { CanActivate }                        from '@angular/router';
import { NgModule }                           from '@angular/core';
import { RouterModule, Routes }               from '@angular/router';

import { BoardComponent }                     from './board/board.component';
import { TaskFormComponent }                  from './task-form/task-form.component';
import { TaskResolver }                       from './task-form/task-form.resolver';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/board', 
        pathMatch: 'full'
    },
    { 
        path: 'board', 
        component: BoardComponent
    },
    { 
        path: 'task-form/:id', 
        component: TaskFormComponent,
        resolve: {
            task: TaskResolver
        }
    },
        // {   
        //     path: 'scholarship-form/:id', 
        //     component: ScholarshipFormComponent,
        //     resolve: {
        //         scholarship: ScholarshipResolver
        //     },
        //     canActivate: [AuthGuard]
        // },
    { path: '**', redirectTo: '/board', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
