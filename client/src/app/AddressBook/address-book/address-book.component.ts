import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddressServiceService } from 'src/app/Service/address-service.service';
import { AddressBook } from 'src/app/shared/models/AddressBook';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogContentExampleDialogComponent } from 'src/app/popup/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { DialogAnimationsExampleDialogComponent } from 'src/app/popup/message/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { paginatorFilters } from 'src/app/shared/models/paging';
@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],

})
export class AddressBookComponent implements OnInit{
constructor(private addressService:AddressServiceService,private dialog: MatDialog){
}
pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 100];
  ViewSearchForm = false;
  SchoolSearchName!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

displayedColumns: string[] = ['id', 'fullName', 'jobName', 'departmentName','mobileNumber','dateOfBirth'
,'address','email','photo','password','age','Edit','Delete'];
dataSource :any;
address:AddressBook[]=[];
  ngOnInit(): void {
    debugger
    this.getAddressBooks();
    this.loadData({ page: this.currentPage, pageSize: this.pageSize, data: null });
  }
getAddressBooks(){
  this.addressService.getAddressBooks().subscribe({
    next:Response=>{
      console.log(Response);
      this.address=Response;
     
      this.dataSource=new MatTableDataSource<AddressBook>(this.address);
      this.dataSource.paginator = this.paginator;
    }
  })
}
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.getAddressBooks();
  }

  DispalyEdit(num:string)
  {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent,
      { data:{id:num}});
    //dialogRef.id=num;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.getAddressBooks();
  }

  Delete(num:string){
this.openDeleteDialog('0ms', '0ms',num);
  }
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,num:string): void {
    this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{id:num}
    });
  }
  GetExcel(){
    this.addressService.getExcel().subscribe(
      {
        next: (response: Blob) => {
          if (response && response.size > 0) {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            //this._toastrMessageHelperService.HandleSuccess("file successfully uploaded");
          } else {
           // this._toastrMessageHelperService.HandleError("Please Select File Againe");
          }
        },
        error: (error) => {
         // this._toastrMessageHelperService.HandleError({ error: true, status: 50, message: "Please Select File Correct Againe" });
        },
        complete: () => {
           
        }
      });
  }

  
  SearchInSchool() {
    const classSearchForm: paginatorFilters = {
      pageSize: this.pageSize,
      page: this.currentPage,
      data: {
        Name: (this.SchoolSearchName && this.SchoolSearchName.trim()) ?? "",
      }
    }
    this.loadData(classSearchForm);
  }
  loadData(data: paginatorFilters) {
    
    this.addressService.getAddressBooksPag(data).subscribe(res => {
      this.dataSource = res.data;
      
      this.paginator.length = res.totalCount;
    });
  }
  ViewSearchFormClick() {
    this.ViewSearchForm = !this.ViewSearchForm;
    this.SchoolSearchName = "";
  }
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData({ page: Number(event.pageIndex), pageSize: Number(event.pageSize), data: null });
  }

}

