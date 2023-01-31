import { HttpClient } from '@angular/common/http';
import { DoCheck, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private url: string = "../../../assets/data/data.json";
  employees:any;
  constructor(private   http:HttpClient){
    // http.get(this.url).subscribe(data=>this.employees=data);
  }
  
  
  
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

  // filteredData=this.employees;
 
  // getEmployee(id: number): Employee {
  //   return <Employee>this.employees.find((e) => e.id == id);
  // }

  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url);
  }

  // getEmployees(){
  //   return this.employees;
  // }

  // addEmployee(emp: Employee) {
    
  //   const obj = this.employees.at(-1);
  //   if (obj) {
  //     emp.id = obj.id + 1;
  //     this.employees.push(emp);
  //   }
  // }

  // deleteEmployee(id: number) {
  //   const index = this.employees.findIndex((e) => e.id == id);
  //   this.employees.splice(index, 1);
  // }

  // updateEmployee(id: number, emp: Employee) {
  //   const index = this.employees.findIndex((e) => e.id == id);
  //   this.employees[index] = emp;
  // }

  // getCountsByDept() {
  //   this.departments.forEach((d) => {
  //     d.count = this.employees.filter((e) => e.dept == d.name).length;
  //   });

  //   return this.departments;
  // }

  // getCountsByLocation() {
  //   this.officeLocations.forEach((l) => {
  //     l.count = this.employees.filter((e) => e.officePlace == l.name).length;
  //   });

  //   return this.officeLocations;
  // }

  sidebarDept?: any = '';
  sidebarOffice?: any = '';
  alphabetKey?: any = '';
  searchKeyword?: any = '';
  filterTop?: any = '';

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
}
