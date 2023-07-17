import { Component, OnInit } from '@angular/core';
import { LogInDialogComponent } from '../Auth/LogIn/log-in-dialog/log-in-dialog.component';
import { AddressServiceService } from '../Service/address-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private addressService:AddressServiceService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog){
    }
  ngOnInit(): void {
    debugger
    const user = this.authenticationService.userValue;
     debugger
    if(!user){
      this.openLogInDialog();
    } else{

    }
  }
  openLogInDialog(){
    const dialogRef = this.dialog.open(LogInDialogComponent,);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    //this.getDepartments();
  }
}
