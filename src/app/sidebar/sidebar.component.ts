import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Department } from './models/department';
import { OfficeLocation } from './models/officeLocation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  departments!:Department[];
  officeLocations!:OfficeLocation[];

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
      this.departments = this.dataService.getCountsByDept();
      this.officeLocations = this.dataService.getCountsByLocation();
  }
}



