import { Component, Input, OnInit,Inject, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressBook } from 'src/app/shared/models/AddressBook';
import { AddressServiceService } from 'src/app/Service/address-service.service';
import { Job } from 'src/app/shared/models/Job';
import { Department } from 'src/app/shared/models/Department';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.scss'],
  providers:[DatePipe]
  //standalone: true,
 // imports: [MatDialogModule, MatButtonModule],
 
})


export class DialogContentExampleDialogComponent implements OnInit{
  CreateAddressForm:FormGroup= {} as FormGroup;
  AddressBook:AddressBook ={} as AddressBook;
 Jobs:Job[]=[]
 Departments:Department[]=[]
 file:File={}as File;
  progress: number | undefined;
  message: string | undefined;
  constructor( public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,private service:AddressServiceService,
    private datepipe:DatePipe){
  }
 
  //@Input("Id") Id:string | undefined;
  ngOnInit(): void {
    
    if(this.data?.id!=undefined)
    {
      this.service.getAdressById(this.data.id).subscribe({
        next:Response=>{
          this.AddressBook=Response;

          this.CreateAddressForm.patchValue(this.AddressBook);
          this.CreateAddressForm.get('dateOfBirth')?.setValue(this.datepipe.transform(this.AddressBook.dateOfBirth,"yyyy-MM-dd"));
          //datepipe
          
          console.log(this.AddressBook);
        }
      })
    }

    this.CreateAddressForm = this.fb.group(
      {
        id:[this.AddressBook==undefined?null:this.AddressBook.id],
        fullName:[this.AddressBook.fullName,[Validators.required]],
        password:['',Validators.required],
        jobId:['',Validators.required],
        departmentId:['',[Validators.required]],
        mobileNumber:['',[Validators.required]],
        dateOfBirth:['',[Validators.required]],
         address:['',[Validators.required]],
        email:['',[Validators.required,Validators.
        pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        photo:['',[Validators.required]],
        age:['',[Validators.required]],
 });
 
 
    this.service.getJobs().subscribe({
      next:Response=>{this.Jobs=Response},
      error:err=>console.error()
      
    })
    this.service.getDepartments().subscribe({
      next:Response=>{this.Departments=Response},
      error:err=>console.error()
      
    })
    //this.CreateAddressForm.patchValue(this.AddressBook);
  }
  submit(){
   if(this.AddressBook.id != undefined)
   {
    var c=this.CreateAddressForm.value;
    console.log("Editttttttttttttttttt");
    console.log(c);
    this.service.putAddress(c).subscribe({
      next:Response=>{console.log(Response)}
    })
   }else
   {
    var c=this.CreateAddressForm.value;
    console.log(c);
    this.service.postAddress(c).subscribe({
      next:Response=>{console.log(Response)}
    })
   } 
    
   
  }

  UploadFile(event:any){
    debugger;
    this.file = event.target.files[0];
    this.service.uploadImage(this.file).subscribe({
      next: (event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        
      }
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }
  MaxFileSize:number=1000000
  UploadedFile:any;
  imageName:any;
  imageSrc:any;
  handleFileInput(event: any) {
    //clear existing added files
    this.UploadedFile = '';
    if (event.target.files && event.target.files.length > 0 && event.target.files.length < 6) {
      //user can add upto 1 file
      if (event.target.files[0].size < this.MaxFileSize) {
        // Add file to list of files if file is less then 1 MB
        this.UploadedFile = event.target.files[0];
        let fileReader = new FileReader();
        // Reading data from file to Filereader

        this.imageName = this.UploadedFile.name;
        fileReader.readAsDataURL(this.UploadedFile);
        fileReader.onload = () => {

          this.imageSrc = fileReader.result as string;
          this.CreateAddressForm.patchValue({
            photo: fileReader.result as string
          });
        };
      }
      else {
        alert('File size should be less than 1 MB');
      }

    }
    else {
      alert('Please enter minimum 1 and maximum 5 files');
    }

    console.log('File reader');
  }

}
