import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DoCheck, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = 'http://localhost:3000';
  endPoint: string = '/employees';
  url: string = `${this.baseUrl}${this.endPoint}`;

  sidebarDept?: any = '';
  sidebarOffice?: any = '';
  alphabetKey?: any = '';
  searchKeyword?: any = '';
  filterTop?: any = '';

  employees: any;
  constructor(private http: HttpClient) {}

  //Header parameter that is to be passed in the 'post' req within 'headerOptions' (written below this)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //Methods for CRUD Operations

  //Create
  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp, this.httpOptions);
  }

  //Read
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  //Update
  updateEmployee(id: number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, emp, this.httpOptions);
  }

  //Delete
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }

}  