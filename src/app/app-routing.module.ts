import { CanActivate }                        from '@angular/router';
import { NgModule }                           from '@angular/core';
import { RouterModule, Routes }               from '@angular/router';

import { BoardComponent }                     from './board/board.component';
import { TaskFormComponent }                  from './task-form/task-form.component';
import { LoginComponent }                     from './login/login.component';
import { TaskResolver }                       from './task-form/task-form.resolver';
import { AuthGuard }                          from './shared/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/board', 
        pathMatch: 'full'
    },
    { 
        path: 'board', 
        component: BoardComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'task-form/:id', 
        component: TaskFormComponent,
        resolve: {
            task: TaskResolver
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: '**', redirectTo: '/board', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
