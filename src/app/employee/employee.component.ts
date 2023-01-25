import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/services/data.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  empId:number = 0;
  alphabets=['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  employees:any=[];
  icons= [
    { icon: 'fa-solid fa-square-phone', title: 'Call'},
    { icon: 'fa-solid fa-envelope', title: 'Message'},
    { icon: 'fa-solid fa-comment', title: 'Chat'},
    { icon: 'fa-solid fa-star', title: 'Star'},
    { icon: 'fa-solid fa-heart', title: 'Heart'},

  ];
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loadData();
  }

  constructor(private dataService:DataService){
  }

  onSave(){
    this.loadData();
  }

  loadData(){
    this.employees=this.dataService.employees;

  }

  
  

}


