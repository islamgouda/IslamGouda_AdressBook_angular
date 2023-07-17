import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from 'src/app/Auth/LogIn/log-in-dialog/log-in-dialog.component';
import { AddressServiceService } from 'src/app/Service/address-service.service';
import { AuthenticationService } from 'src/app/Service/authentication.service';
import { DialogContentExampleDialogComponent } from 'src/app/popup/dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  constructor(
    private addressService:AddressServiceService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog){
  }
  hasAccount:any;
  ngOnInit(): void {
    this.hasAccount=this.authenticationService.userValue;
   // throw new Error('Method not implemented.');
  }
   
  openLogInDialog(){
    const dialogRef = this.dialog.open(LogInDialogComponent,);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //this.getDepartments();
    this.hasAccount=this.authenticationService.userValue;
  }
  openLogOutDialog(){
    this.authenticationService.logout();
    this.hasAccount=this.authenticationService.userValue;
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //this.getAddressBooks();
  }
}
