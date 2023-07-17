import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressServiceService } from 'src/app/Service/address-service.service';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.scss']
})
export class LogInDialogComponent implements OnInit{
  CreateLogInForm:FormGroup= {} as FormGroup;
  //AddressBook:AddressBook ={} as AddressBook;
 // Department:Department={}as Department;
 
  progress: number | undefined;
  message: string | undefined;
  constructor( public dialogRef: MatDialogRef<LogInDialogComponent>,
   // @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private service:AddressServiceService,
    private authservice:AuthenticationService
    ){
  }

  ngOnInit(): void {
    
    this.CreateLogInForm = this.fb.group(
      {
        email:['',[Validators.required]],
        password:['',[Validators.required]],
       
 });
 
 
    
    //this.CreateAddressForm.patchValue(this.AddressBook);
  }

  submit(){
   if(this.CreateLogInForm.valid){ 
    this.authservice.login(
      this.CreateLogInForm.value['email'],
      this.CreateLogInForm.value['password']
      ) ; 
   }
     
   
   }
 
 
}
