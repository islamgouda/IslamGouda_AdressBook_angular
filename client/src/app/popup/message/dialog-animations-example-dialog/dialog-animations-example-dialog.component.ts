import { Component,Inject, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MatDialogModule,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AddressServiceService } from 'src/app/Service/address-service.service';

@Component({
  selector: 'app-dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrls: ['./dialog-animations-example-dialog.component.scss']
})
export class DialogAnimationsExampleDialogComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,private Service:AddressServiceService) {}
  ngOnInit(): void {
  
  }
  Delete(){
this.Service.DeleteAddress(this.data.id).subscribe({
  next:Response=>{console.log(Response)}
})
  }
}
