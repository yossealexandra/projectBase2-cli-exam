import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private urlPaginadoStudents = 'http://localhost:8000/student';
  constructor(private httpClient: HttpClient) { }

  getDataStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.urlPaginadoStudents);
  }
}
