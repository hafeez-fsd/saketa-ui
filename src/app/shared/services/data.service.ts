import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnChanges{
employees:Employee[] = [
  {
    id:1,
    firstName: 'Anthony',
    lastName: 'Morris',
    dept: 'IT',
    role: 'SharePoint Head',
    officePlace: 'India'
  },

  {
    id:2,
    firstName: 'Helen',
    lastName: 'Zimmerman',
    dept: 'IT',
    role: 'Operations Manager',
    officePlace: 'India'
  },
  {
    id:3,
    firstName: 'Jonathan',
    lastName: 'Smith',
    dept: 'IT',
    role: 'Product Engineer',
    officePlace: 'Seattle'
  },
  
  {
    id:4,
    firstName: 'Tami',
    lastName: 'Hopkins',
    dept: 'IT',
    role: 'Lead Engineer - .Net',
    officePlace: 'India'
  },
  {
    id:5,
    firstName: 'Franklin',
    lastName: 'Humark',
    dept: 'IT',
    role: 'Network Engineer',
    officePlace: 'Seattle'
  },
  {
    id:6,
    firstName: 'Angela',
    lastName: 'Bailey',
    dept: 'HR',
    role: 'Talent Magnet Jr.',
    officePlace: 'India'
  },
  {
    id:7,
    firstName: 'Robert',
    lastName: 'Mitchell',
    dept: 'IT',
    role: 'Software Engineer',
    officePlace: 'Seattle'
  },
  {
    id:8,
    firstName: 'Olivia',
    lastName: 'Watson',
    dept: 'UX',
    role: 'UI Designer',
    officePlace: 'India'
  },
  {
    id:9,
    firstName: 'Hafeez',
    lastName: 'Shaik',
    dept: 'PE',
    role: 'Intern',
    officePlace: 'India'
  },
  {
    id:10,
    firstName: 'Manogna',
    lastName: 'Katakam',
    dept: 'PE',
    role: 'Intern',
    officePlace: 'India'
  },

  {
    id:11,
    firstName: 'Uma',
    lastName: 'Chunduri',
    dept: 'HR',
    role: 'Executive',
    officePlace: 'India'
  },
  {
    id:12,
    firstName: 'Suresh',
    lastName: 'Ventrapati',
    dept: 'PE' ,
    role: 'Associate Architect',
    officePlace: 'India'
  }
];

departments = [
  {name:'HR',  count: 0},
  {name:'IT',  count: 0},
  {name:'UX',  count: 0},
  {name:'PE',  count: 0}
];

officeLocations =[
  {name:'India', count:0},
  {name: 'Seattle', count:0}
];

filteredData=this.employees;



getEmployee(id: number): Employee{
  return <Employee>this.employees.find(e => e.id==id);
}

getEmployees(){
  return this.employees;
}

addEmployee(emp:Employee){
  const obj = this.employees.at(-1);
  if(obj){
    emp.id= obj.id+1;
    this.employees.push(emp);
  }
}

deleteEmployee(id:number){
  const index = this.employees.findIndex(e => e.id==id);
  this.employees.splice(index, 1);
}

updateEmployee(id: number, emp: Employee){
  const index = this.employees.findIndex(e => e.id==id);
  this.employees[index] = emp;
}

getCountsByDept(){
  this.departments.forEach(d => {
    d.count = this.employees.filter(e => e.dept == d.name).length;
  });

  return this.departments;
}

getCountsByLocation(){
  this.officeLocations.forEach(l => {
    l.count = this.employees.filter(e => e.officePlace == l.name).length;
  });

  return this.officeLocations;
}

sidebarDept?:any='';
sidebarOffice?:any='';
alphabetKey?:any='';
searchKeyword?:any='';
filterTop:any='';

ngOnChanges(changes: SimpleChanges): void {
  
  
}

filterData(){
  let filteredData=this.employees.filter(e=>e.firstName.toLowerCase().startsWith(this.alphabetKey.toLowerCase())
  && (
    (e.firstName.toLowerCase().includes(this.searchKeyword.toLowerCase()))||
    (e.lastName.toLowerCase().includes(this.searchKeyword.toLowerCase()))||
    (e.dept.toLowerCase().includes(this.searchKeyword.toLowerCase()))||
    (e.role.toLowerCase().includes(this.searchKeyword.toLowerCase())) ||
    (e.officePlace.toLowerCase().includes(this.searchKeyword.toLowerCase()))
  )

  && (

    e.dept.toLowerCase().includes(this.sidebarDept.toLowerCase())
  )

  && (

    e.officePlace.toLowerCase().includes(this.sidebarOffice.toLowerCase())
  )

  // && (
    
    // e.toLowerCase().includes(this.sidebarOffice.toLowerCase())
    // e[this.filterTop as keyof object].toLowerCase().includes(this.sidebarOffice.toLowerCase())
  // )
    
  );
  
  this.filteredData=filteredData;
  console.log(this.filteredData);

  // return filteredData;

}




}



