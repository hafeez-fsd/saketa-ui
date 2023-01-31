import {
  AfterContentInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter } from 'rxjs';
import { ConfigService } from '../shared/config.service';
import { DataService } from '../shared/services/data.service';
import { AditEmployeeComponent } from './adit-employee/adit-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  empId: number = 0;
  alphabets = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  employees: any = [];
  icons = [
    { icon: 'fa-solid fa-square-phone', title: 'Call' },
    { icon: 'fa-solid fa-envelope', title: 'Message' },
    { icon: 'fa-solid fa-comment', title: 'Chat' },
    { icon: 'fa-solid fa-star', title: 'Star' },
    { icon: 'fa-solid fa-heart', title: 'Heart' },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  constructor(private dataService: DataService) {}

  aditEvent:any;

  onSave() {
    // alert();
    this.loadData();
  }

  loadData() {
    this.dataService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
  collectAlphabet(alphabet: any) {
    this.dataService.alphabetKey = alphabet;
  }
  collectKeyword(keywordSearchEvent: any) {
    this.dataService.searchKeyword = keywordSearchEvent.value;
  }

  collectFilterTop(filterTopEvent: any) {
    this.dataService.filterTop = filterTopEvent.target.value;
  }

  deleteEmp(id:any){
   let isConfirm =  confirm(`Do you want to delete this employee?`);
   if(isConfirm){
    this.dataService.deleteEmployee(id).subscribe(emp=> {
      console.log(emp);
      ConfigService.empSave.next(true);
      this.loadData();
    });
   }
    
  }

  clearClicked=false;
  clearSearchAndFilterTop(searchKeywordInput: any,filterTop: any){
    this.clearClicked=true;
    searchKeywordInput.value="";
    filterTop.value="";
  }

  showAllCards(){
    this.employees=this.dataService.employees;
    this.clearClicked=false;
  }
}
