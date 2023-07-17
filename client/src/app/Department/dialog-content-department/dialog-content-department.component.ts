import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressServiceService } from 'src/app/Service/address-service.service';
import { Department } from 'src/app/shared/models/Department';

@Component({
  selector: 'app-dialog-content-department',
  templateUrl: './dialog-content-department.component.html',
  styleUrls: ['./dialog-content-department.component.scss']
})
export class DialogContentDepartmentComponent {
  CreateDepartMentForm:FormGroup= {} as FormGroup;
  //AddressBook:AddressBook ={} as AddressBook;
  Department:Department={}as Department;
 
  progress: number | undefined;
  message: string | undefined;
  constructor( public dialogRef: MatDialogRef<DialogContentDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,private service:AddressServiceService,
    ){
  }
 
  //@Input("Id") Id:string | undefined;
  ngOnInit(): void {
    
    if(this.data?.id!=undefined)
    {
      this.service.getDepartmentbyId(this.data.id).subscribe({
        next:Response=>{
          this.Department=Response;

          this.CreateDepartMentForm.patchValue(this.Department);
         // this.CreateAddressForm.get('dateOfBirth')?.setValue(this.datepipe.transform(this.AddressBook.dateOfBirth,"yyyy-MM-dd"));
          //datepipe
          
          
        }
      })
    }

    this.CreateDepartMentForm = this.fb.group(
      {
        id:[this.Department==undefined?null:this.Department.id],
        name:[this.Department.name,[Validators.required]],
       
 });
 
 
    
    //this.CreateAddressForm.patchValue(this.AddressBook);
  }

  submit(){
    if(!this.Department.id)
    {
     var c=this.CreateDepartMentForm.value;
     console.log("Editttttttttttttttttt");
     console.log(c);
     this.service.putDepartment(c).subscribe({
       next:Response=>{console.log(Response)}
     })
    }else
    {
     var c=this.CreateDepartMentForm.value;
     console.log(c);
     this.service.postDepartment(c).subscribe({
       next:Response=>{console.log(Response)}
     })
    } 
     
    
   }
 
}
