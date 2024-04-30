import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { StudentsService } from '../service/students.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../model/student.model';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
[x: string]: any;

displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'birthDate'];
dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  constructor(private studentService: StudentsService){}

  ngOnInit() {
  }

  loadAllStudents(){
    this.studentService.getDataStudents().subscribe(
      res =>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }


}



