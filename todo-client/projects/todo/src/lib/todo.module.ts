import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { TodoHomeComponent } from './todo-home/todo-home.component';



@NgModule({
  declarations: [TodoComponent, TodoHomeComponent],
  imports: [
  ],
  exports: [TodoComponent]
})
export class TodoModule { }
