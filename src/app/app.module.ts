import { ReactiveFormsModule }          from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';

import { AppRoutingModule }             from './app-routing.module';


import { AppComponent }                 from './app.component';
import { BoardComponent }               from './board/board.component';
import { TaskFormComponent }            from './task-form/task-form.component';
import { TaskCardComponent }            from './board/task-card/task-card.component';
import { LoginComponent }               from './login/login.component';

//SERVICES
import { HttpClientService }            from './shared/httpClient.service';
import { TaskService }                  from './shared/task.service';
import { TaskResolver }                 from './task-form/task-form.resolver';
import { AlertService }                 from './shared/alert.service';
import { AuthService }                  from './shared/auth.service';
import { AuthGuard }                    from './shared/auth.guard';

//PLUGINS
import { ToastrModule }  from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskFormComponent,
    TaskCardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    TaskService,
    HttpClientService,
    TaskResolver,
    AlertService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
