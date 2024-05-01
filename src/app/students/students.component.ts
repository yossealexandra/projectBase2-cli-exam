import { Component, ViewChild, OnInit } from '@angular/core';
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

displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'birthDate'];
dataSource = new MatTableDataSource<Student>([]);
clickedRows = new Set<Student>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  constructor(private studentService: StudentsService){}

  ngOnInit() {
    this.loadAllStudents();
    this.loadFilterPredicate();
  }

  loadAllStudents(){
    this.studentService.getDataStudents().subscribe(
      res =>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  loadFilterPredicate() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.id.toString().includes(filter) 
      || data.firstName.toLowerCase().includes(filter) 
      || data.lastName.toLowerCase().includes(filter) 
      || data.email.toLowerCase().includes(filter) 
      || data.gender.toLowerCase().includes(filter)
      || data.birthDate.toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filters = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filters.trim().toLowerCase();
  }



}



