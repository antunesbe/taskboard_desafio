import { CanActivate }                        from '@angular/router';
import { NgModule }                           from '@angular/core';
import { RouterModule, Routes }               from '@angular/router';

import { BoardComponent }                     from './board/board.component';
import { TaskFormComponent }            from './task-form/task-form.component';

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
        path: 'new-task', 
        component: TaskFormComponent
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
