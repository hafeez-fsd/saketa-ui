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

  getCountsByDept() {
    this.getEmployees().subscribe((res) => {
      this.employees = res;
    });
    
    this.departments.forEach((d) => {
      d.count = this.employees.filter((e: Employee) => e.dept == d.name).length;
    });
    return this.departments;
  }

  getCountsByLocation() {
    this.getEmployees().subscribe((res) => {
      this.employees = res;
    });
    this.officeLocations.forEach((l) => {
      l.count = this.employees.filter(
        (e: Employee) => e.officePlace == l.name
      ).length;
    });
    return this.officeLocations;
  }

  
}



















//   filterData() {
  //     let filteredData: any;

  //     if (this.filterTop == '') {
  //       filteredData = this.employees.filter(
  //         (e) =>  e.firstName.toLowerCase().startsWith(this.alphabetKey.toLowerCase()) &&
  //           (e.firstName.toLowerCase().includes(this.searchKeyword) ||
  //             e.lastName.toLowerCase().includes(this.searchKeyword) ||
  //             e.dept.toLowerCase().includes(this.searchKeyword) ||
  //             e.role.toLowerCase().includes(this.searchKeyword) ||
  //             e.officePlace.toLowerCase().includes(this.searchKeyword)) &&
  //           e.dept.toLowerCase().includes(this.sidebarDept) &&
  //           e.officePlace.toLowerCase().includes(this.sidebarOffice)

  //       );
  //     } else {
  //       filteredData = this.employees.filter(
  //         (e) =>
  //           e.firstName.toLowerCase().startsWith(this.alphabetKey) &&
  //           this.searchAndFilter(e) &&
  //           e.dept.toLowerCase().includes(this.sidebarDept) &&
  //           e.officePlace.toLowerCase().includes(this.sidebarOffice)
  //       );
  //     }

  //     return filteredData;
  //   }

  //   searchAndFilter(e: any) {
  //     let bool: boolean=false;
  //     bool = e[this.filterTop as string].toLowerCase().includes(this.searchKeyword.toLowerCase());

  //     if (bool == true) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  //   getFilteredData() {
  //     return this.filterData();
  //   }

// let prop='name'
//   emp[prom]

