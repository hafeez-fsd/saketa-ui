import {
  Component,
  OnInit,
} from '@angular/core';
import { Constants } from '../shared/constants';
import { Employee } from '../shared/models/employee';
import { ConfigService } from '../shared/services/config.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  empId: number = 0;
  alphabets = Constants.alphabets;

  icons = [
    { icon: 'fa-solid fa-square-phone', title: 'Call' },
    { icon: 'fa-solid fa-envelope', title: 'Message' },
    { icon: 'fa-solid fa-comment', title: 'Chat' },
    { icon: 'fa-solid fa-star', title: 'Star' },
    { icon: 'fa-solid fa-heart', title: 'Heart' },
  ];

  aditEvent:any;
  clearClicked=false;
  rawData:Employee[]=[];
  filteredData:Employee[]=[];

  alphabetKey?: any = '';
  searchKeyword?: any = '';
  filterTop?: any = 'defaultValue';
  sideFilters?:any;
  selectedAlphabet:any=-1;

  ngOnInit(): void {
    this.loadData();    
    ConfigService.sidefilterChanged.subscribe(sideFilters => {
      console.log("received filter from side comp: ", sideFilters);
      this.applySideFilters(sideFilters);
    });

  }

  constructor(private dataService: DataService) {}

  onSave() {
    this.loadData();
  }

  loadData() {
    this.dataService.getEmployees().subscribe(data => {
      this.rawData=data;
      this.filteredData = this.rawData;
    });
  }

  collectAlphabet(alphabet: any, index:any) {
    this.alphabetKey = alphabet;
    this.alphabetFilter(index);
  }
  collectKeyword(keywordSearchEvent: any) {
    
    this.searchKeyword = keywordSearchEvent.value;
    this.searchAndFilters();
  }

  collectFilterTop(filterTopEvent: any) {
    this.filterTop = filterTopEvent.target.value;
    this.searchAndFilters();
  }

  deleteEmp(id:any){
   let isConfirm =  confirm(`Do you want to delete this employee?`);
   if(isConfirm){
    this.dataService.deleteEmployee(id).subscribe(emp=> {
      ConfigService.empSave.next(true);
      this.loadData();
    });
   }
    
  }


  applySideFilters(filters: any){
    console.log("received filter inside function: ", filters);
    console.log("Before Filtering: ", this.filteredData);
    if(filters!=false){
      filters.forEach((f:any, index:number) => {
        // console.log(typeof f.value);
        
        if(f.value!='' && index==0){
          let prop = f.type as keyof Employee;
          this.filteredData=this.rawData.filter(emp => emp[prop]==f.value)
        }
        if(f.value!='' && index==1){
          let prop = f.type as keyof Employee;
          this.filteredData=this.rawData.filter(emp => emp[prop]==f.value)
        }
      });
      console.log("After Filtering: ", this.filteredData);
    }
    else{
      // this.loadData();
      this.filteredData=this.rawData;
      console.log("On unselecting filters: ", this.filteredData);
    }

    
  }


  searchAndFilters(){
    
    if(this.filterTop=='defaultValue'){
      this.filteredData=this.rawData.filter(emp=>
          emp['firstName']?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          emp['lastName']?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          emp['dept']?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          emp['role']?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          emp['officePlace']?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
    else{
      let property=this.filterTop as keyof Employee;
      this.filteredData=this.rawData.filter(emp=> emp[property]?.toString().toLowerCase().includes(this.searchKeyword.toLowerCase()));
    }
  
  }

  alphabetFilter(index:any){
    this.selectedAlphabet=this.selectedAlphabet==index?-1:index;
    if(this.selectedAlphabet!=-1){
      this.filteredData=this.rawData.filter(emp=> emp.firstName.toLowerCase().startsWith(this.alphabetKey.toLowerCase()));
    }
    else{
      this.filteredData=this.rawData;
    }

    // if(this.alphabetKey!=''){
      
    // }
  }

  clearSearchAndFilterTop(searchKeywordInput: any,filterTop: any){
    this.clearClicked=true;
    searchKeywordInput.value="";
    filterTop.value="";
    this.showAllCards();
  }

  showAllCards(){
    this.clearClicked=false;
    this.loadData();
  }
}
