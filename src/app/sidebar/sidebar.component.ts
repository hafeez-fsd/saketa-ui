import { Component, OnInit } from '@angular/core';
import { AditEmployeeComponent } from '../employee/adit-employee/adit-employee.component';
import { ConfigService } from '../shared/services/config.service';
import { Employee } from '../shared/models/employee';
import { DataService } from '../shared/services/data.service';
import { Department } from '../shared/models/department';
import { OfficeLocation } from '../shared/models/officeLocation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
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
      employees = res;
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

  collectSidebarDept(sidebarDept: any) {
    this.dataService.sidebarDept = sidebarDept;
  }

  collectSidebarOfficeLocation(sidebarOfficeLocation: any) {
    this.dataService.sidebarOffice = sidebarOfficeLocation;
  }
}
