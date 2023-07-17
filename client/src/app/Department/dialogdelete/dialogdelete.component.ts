import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressServiceService } from 'src/app/Service/address-service.service';

@Component({
  selector: 'app-dialogdelete',
  templateUrl: './dialogdelete.component.html',
  styleUrls: ['./dialogdelete.component.scss']
})
export class DialogdeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogdeleteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,private Service:AddressServiceService) {}
  ngOnInit(): void {
  
  }
  Delete(){
this.Service.DeleteDepartment(this.data.id).subscribe({
  next:Response=>{console.log(Response)}
})
  }
}
