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
    this.loadAllStudents();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.id.toString().includes(filter) 
      || data.firstName.toLowerCase().includes(filter) 
      || data.lastName.toLowerCase().includes(filter) 
      || data.email.toLowerCase().includes(filter) 
      || data.gender.toLowerCase().includes(filter)
      || data.birthDate.toLowerCase().includes(filter);
    };
  }

  loadAllStudents(){
    this.studentService.getDataStudents().subscribe(
      res =>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  applyFilterNOusage(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  applyFilter(event: Event) {
    const filters = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filters.trim().toLowerCase();
  }


}



