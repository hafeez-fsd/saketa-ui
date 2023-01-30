import { DoCheck, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class DataService{
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

// filteredData=this.employees;



getEmployee(id: number): Employee{
  return <Employee>this.employees.find(e => e.id==id);
}

getEmployees(){
  return this.employees;
}

addEmployee(emp:Employee){
  const obj = this.employees.at(-1);
  console.log('prev emp length: '+ this.employees.length);
  if(obj){
    emp.id= obj.id+1;
    this.employees.push(emp);
    console.log('present emp length: '+ this.employees.length);
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
filterTop?:any='';

// ngOnChanges(){
  // console.log(this.filterTop);
  // console.log(this.employees[this.filterTop as keyof Object]);

// }



filterData(){
  // console.log("search keyword: "+this.searchKeyword, "filter Top: "+this.filterTop);
  
  let filteredData:any=this.employees;

  if(this.filterTop==''){

    filteredData=this.employees.filter(e=>
      //alphabet button
      e.firstName.toLowerCase().startsWith(this.alphabetKey.toLowerCase()) &&

      (  
        (e.firstName.toLowerCase().includes(this.searchKeyword.toLowerCase()))||
        (e.lastName.toLowerCase().includes(this.searchKeyword.toLowerCase()))||
        (e.dept.toLowerCase().includes(this.searchKeyword.toLowerCase()))||
        (e.role.toLowerCase().includes(this.searchKeyword.toLowerCase())) ||
        (e.officePlace.toLowerCase().includes(this.searchKeyword.toLowerCase())) 
      ) && 
  
      (
        e.dept.toLowerCase().includes(this.sidebarDept.toLowerCase())
      ) &&
    
      (
        e.officePlace.toLowerCase().includes(this.sidebarOffice.toLowerCase())
      ) 
  
    );

  } else {

    filteredData=this.employees.filter(e=>
      //alphabet button
      e.firstName.toLowerCase().startsWith(this.alphabetKey.toLowerCase()) &&

      (  
        this.searchAndFilter(e)
      ) && 
  
      (
        e.dept.toLowerCase().includes(this.sidebarDept.toLowerCase())
      ) &&
    
      (
        e.officePlace.toLowerCase().includes(this.sidebarOffice.toLowerCase())
      ) 
      
  
    );

  }
  
  // console.log(this.employees[this.filterTop as keyof Object]);
  // console.log(filteredData);
  return filteredData;

}

searchAndFilter(e:any){
  let bool:boolean;  
  // console.log(e.dept);
  bool= e[this.filterTop].toLowerCase().includes(this.searchKeyword.toLowerCase());

  if(bool==true){
    // console.log("searchAndFilter() returned True");
    return true;
  }
  else {
    // console.log("searchAndFilter() returned False");
    return false;
  }
}

getFilteredData(){
  return this.filterData();
}






}



