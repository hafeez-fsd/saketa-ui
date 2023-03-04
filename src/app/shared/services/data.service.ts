import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DoCheck, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { APIResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = 'https://localhost:7112/api';
  endPoint: string = '/employee';
  url: string = `${this.baseUrl}${this.endPoint}`;
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
  addEmployee(emp: Employee): Observable<APIResponse<Employee>> {
    return this.http.post<APIResponse<Employee>>(this.url, emp, this.httpOptions);
  }

  //Read
  getEmployees(): Observable<APIResponse<Employee[]>> {
    return this.http.get<APIResponse<Employee[]>>(`${this.url}`);
  }

  getEmployee(id: number): Observable<APIResponse<Employee>> {
    return this.http.get<APIResponse<Employee>>(`${this.url}/${id}`);
  }

  //Update
  updateEmployee(id: number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, emp, this.httpOptions);
  }

  //Delete
  deleteEmployee(id: number): Observable<APIResponse<Employee>> {
    return this.http.delete<APIResponse<Employee>>(`${this.url}/${id}`);
  }

}  