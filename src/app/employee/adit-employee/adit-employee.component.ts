import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  submitForm(aditForm:NgForm){
    if(this.employee.id){
      // update the data
      this.dataService.updateEmployee(this.employee.id, this.employee).subscribe(
        res => {
          console.log('--res', res);
          aditForm.form.reset();
        },
        err=>{
          console.log('--err', err);
        }
      );
    }
    else{
      this.dataService.addEmployee(this.employee).subscribe(
        res => {
          console.log('--res', res);
          aditForm.form.reset();
        },
        err=>{
          console.log('--err', err);
        }
      );
    }
    
    this.saveEvent.emit(true);
    this.clear(aditForm);
  }

  loadData(){
    this.dataService.getEmployee(this.id).subscribe(emp=>{
      this.employee=emp;
    });
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
