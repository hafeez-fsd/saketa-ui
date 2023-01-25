import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-adit-employee',
  templateUrl: './adit-employee.component.html',
  styleUrls: ['./adit-employee.component.scss']
})
export class AditEmployeeComponent implements OnChanges {
  @Output() saveEvent = new EventEmitter();
  @Input() id:number = 0;
  employee:Employee = {
    id: 0,
    image:'',
    firstName:'',
    lastName:'',
    dept:'',
    role:'',
    officePlace:''
  };

  submitForm(aditForm:any, submitEvent:any){
    submitEvent.preventDefault();
    // console.log(this.employee);
    this.dataService.addEmployee(this.employee);
    this.saveEvent.emit(true);
    this.clear();
  }

  constructor(private dataService: DataService){

  }

  loadData(){
    this.employee = this.dataService.getEmployee(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.id){
        this.loadData();
      }
  }

  clear(){
    this.employee= {
      id: 0,
      image:'',
      firstName:'',
      lastName:'',
      dept:'',
      role:'',
      officePlace:''
    };
  }
  



}
