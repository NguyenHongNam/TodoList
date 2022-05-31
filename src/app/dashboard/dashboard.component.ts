import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  addTaskDetail: string = '';
  editTaskValue : string = '';
  editTaskDetail: string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.editTaskDetail = '';
    this.addTaskValue = '';
    this.addTaskDetail = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.TaskName = this.addTaskValue;
    this.taskObj.TaskDetail = this.addTaskDetail;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
      this.addTaskDetail='';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.TaskName = this.editTaskValue;
    this.taskObj.TaskDetail = this.editTaskDetail;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.TaskName;
  }
}