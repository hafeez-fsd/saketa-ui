export class Employee{
    id:number=0;
    image?:string='../../../assets/images/default-emp-img.webp';
    firstName='';
    lastName='';
    dept='';
    role='';
    officePlace='';
    
    constructor(image:any, firstName:any, lastName:any, dept:any, role:any, officePlace:any ){
        this.image=image;
        this.firstName=firstName;
        this.lastName=lastName;
        this.dept=dept;
        this.role=role;
        this.officePlace=officePlace;
    }

}