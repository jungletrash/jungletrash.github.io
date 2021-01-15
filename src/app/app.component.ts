import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public datepipe: DatePipe,
    private service: TodoService
  ) { }
  title = 'front-end';

  ngOnInit() {
    this.listarTodos();
  }

  todos: Todo[] = [];
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  listarTodos() {
    this.service.listar().subscribe(todoList => {
      this.todos = todoList;
    });
  }

  submit() {
    //console.log(this.form.value);
    const todo: Todo = { ...this.form.value }
    this.service
      .salvar(todo)
      .subscribe(savedTodo => {
        console.log(savedTodo);
        this.todos.push(savedTodo);
        this.form.reset();
      });
  }

  delete(todo: Todo) {
    this.service.deletar(todo.id).subscribe({
      next: (response) => {
        this.listarTodos();
      }
    });
  }

  done(todo: Todo) {
    this.service.marcarComoConcluido(todo.id).subscribe({
      next: (todoAtualizado) => {
        todo.done = todoAtualizado.done;
        todo.doneDate = todoAtualizado.doneDate;
        //this.listarTodos();
      }
    });
  }

}
