import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http'
import { CoreModule } from './core/core.module';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddressBookComponent } from './AddressBook/address-book/address-book.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogContentExampleDialogComponent } from './popup/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DialogAnimationsExampleDialogComponent } from './popup/message/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { DepartmentComponent } from './Department/department/department.component';
import { JobComponent } from './Job/job/job.component';
import { DialogContentDepartmentComponent } from './Department/dialog-content-department/dialog-content-department.component';
import { DialogdeleteComponent } from './Department/dialogdelete/dialogdelete.component';
import { LogInDialogComponent } from './Auth/LogIn/log-in-dialog/log-in-dialog.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    DialogContentExampleDialogComponent,
    DialogAnimationsExampleDialogComponent,
    DepartmentComponent,
    JobComponent,
    DialogContentDepartmentComponent,
    DialogdeleteComponent,
    LogInDialogComponent,
    HomeComponent,
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
