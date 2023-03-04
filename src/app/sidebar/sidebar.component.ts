import { Component, OnInit } from '@angular/core';
import { AditEmployeeComponent } from '../employee/adit-employee/adit-employee.component';
import { ConfigService } from '../shared/services/config.service';
import { Employee } from '../shared/models/employee';
import { DataService } from '../shared/services/data.service';
import { Department } from '../shared/models/department';
import { OfficeLocation } from '../shared/models/officeLocation';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  selectedIndexDept:number=-1;
  selectedIndexOfficePlace:number=-1;
  departments: Department[] = [
    { name: 'HR', count: 0 },
    { name: 'IT', count: 0 },
    { name: 'UX', count: 0 },
    { name: 'PE', count: 0 },
  ];

  officeLocations: OfficeLocation[] = [
    { name: 'India', count: 0 },
    { name: 'Seattle', count: 0 },
  ];

  isDeptFilterActive:boolean[]=[false,false,false,false];
  isOfficePlaceFilterActive:boolean[]=[false,false];

  sidebarFilters=[
    //0 for dept
    {
      type:'dept',
      value:''
    }, 

    //1 for officePlace
    {
      type:'officePlace',
      value:''
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    ConfigService.empSave.subscribe(res => {
      if(res){
        this.loadData();
      }
    })
    this.loadData();
    
  }

  loadData() {
    let employees: Employee[];
    this.dataService.getEmployees().subscribe((res) => {
      employees = res.data;
      this.departments.forEach((d) => {
        d.count = employees.filter(
          (e: Employee) => e.dept == d.name
        ).length;
      });

      this.officeLocations.forEach((l) => {
        l.count = employees.filter(
          (e: Employee) => e.officePlace == l.name
        ).length;
      });

    });
  }

  

  collectSidebarDept(sidebarDept: any, index:any) {
    this.selectedIndexDept=this.selectedIndexDept==index?-1:index;
    if(this.selectedIndexDept!=-1){
      this.sidebarFilters[0].value=sidebarDept;
      ConfigService.sidefilterChanged.emit(this.sidebarFilters);
    }
    else{
      this.sidebarFilters[1].value='';
      ConfigService.sidefilterChanged.emit(false);

    }

   
  }

  collectSidebarOfficeLocation(sidebarOfficePlace: any, index:any) {
    this.selectedIndexOfficePlace=this.selectedIndexOfficePlace==index?-1:index;
    if(this.selectedIndexOfficePlace!=-1){
      this.sidebarFilters[1].value=sidebarOfficePlace;
      ConfigService.sidefilterChanged.emit(this.sidebarFilters);
    }
    else{
      this.sidebarFilters[1].value='';
      ConfigService.sidefilterChanged.emit(false);
    }

  }
}
