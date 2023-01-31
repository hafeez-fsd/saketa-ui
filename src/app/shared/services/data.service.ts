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

  departments = [
    { name: 'HR', count: 0 },
    { name: 'IT', count: 0 },
    { name: 'UX', count: 0 },
    { name: 'PE', count: 0 },
  ];

  officeLocations = [
    { name: 'India', count: 0 },
    { name: 'Seattle', count: 0 },
  ];

  sidebarDept?: any = '';
  sidebarOffice?: any = '';
  alphabetKey?: any = '';
  searchKeyword?: any = '';
  filterTop?: any = '';

  employees: any;
  constructor(private http: HttpClient) {}

  //Methods for adding data

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp, this.httpOptions);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  updateEmployee(id: number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, emp, this.httpOptions);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }

}  