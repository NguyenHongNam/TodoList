import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http : HttpClient) {
    this.serviceURL = "https://localhost:44369/"
  }

  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.serviceURL+'api/Task',task);
  }

  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL+ 'api/Task');
  }

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'api/Task'+task.TaskId);
  }

  editTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.serviceURL+'api/Task'+task.TaskId,task);
  }

}