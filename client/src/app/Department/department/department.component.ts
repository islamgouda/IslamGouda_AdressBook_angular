import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddressServiceService } from 'src/app/Service/address-service.service';
import { AddressBook } from 'src/app/shared/models/AddressBook';
import { Department } from 'src/app/shared/models/Department';
import { DialogContentDepartmentComponent } from '../dialog-content-department/dialog-content-department.component';
import { DialogAnimationsExampleDialogComponent } from 'src/app/popup/message/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { DialogdeleteComponent } from '../dialogdelete/dialogdelete.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  constructor(private addressService:AddressServiceService,private dialog: MatDialog){
  }
  displayedColumns: string[] = [ 'id','job','Edit','Delete'];
dataSource :any;
Departments:Department[]=[]
  @ViewChild(MatPaginator)
  paginator: MatPaginator  | undefined;
  ngOnInit(): void {
    this.getDepartments();
    
  }

  getDepartments(){
    this.addressService.getDepartments().subscribe({
      next:Response=>{
        console.log(Response);
        this.Departments=Response;
       
        this.dataSource=new MatTableDataSource<Department>(this.Departments);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogContentDepartmentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.getDepartments();
  }

  DispalyEdit(num:any){

    const dialogRef = this.dialog.open(DialogContentDepartmentComponent,
      { data:{id:num}});
    //dialogRef.id=num;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.getDepartments();
  }
  Delete(num:any){
    this.openDeleteDialog('0ms', '0ms',num);
  }
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,num:string): void {
    this.dialog.open(DialogdeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{id:num}
    });
    this.getDepartments();
  }
  
}
