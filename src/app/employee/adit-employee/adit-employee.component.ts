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


  constructor(private dataService: DataService){

  }

  submitForm(aditForm:any, submitEvent:any){
    // submitEvent.preventDefault();
    alert();
    console.log(aditForm);
    console.log("submitForm() invoked");
    this.dataService.addEmployee(this.employee);
    this.saveEvent.emit(true);
    // console.log(aditForm);
    this.clear(aditForm);
  }

  loadData(){
    this.employee = this.dataService.getEmployee(this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.id){
        this.loadData();
      }
  }

  aditForm:any;
  clear(aditForm:any){
    aditForm=this.aditForm;
    this.employee= {
      id: 0,
      image:'',
      firstName:'',
      lastName:'',
      dept:'',
      role:'',
      officePlace:''
    };

    // aditForm.reset();

  }

  callClear(){
    this.clear(this.aditForm);
  }
  



}
