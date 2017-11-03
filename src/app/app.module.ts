import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';

import { AppRoutingModule }             from './app-routing.module';

import { AppComponent }                 from './app.component';
import { BoardComponent }               from './board/board.component';
import { TaskFormComponent }            from './task-form/task-form.component';
import { TaskCardComponent }            from './board/task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskFormComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
