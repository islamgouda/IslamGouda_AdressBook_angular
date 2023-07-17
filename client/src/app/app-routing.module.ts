import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './AddressBook/address-book/address-book.component';
import { DepartmentComponent } from './Department/department/department.component';
import { JobComponent } from './Job/job/job.component';
import { LogInDialogComponent } from './Auth/LogIn/log-in-dialog/log-in-dialog.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
 
  {path:'Address',component:AddressBookComponent, canActivate: [AuthGuard]},
  {path:'Department',component:DepartmentComponent, canActivate: [AuthGuard]},
  {path:'Job',component:JobComponent, canActivate: [AuthGuard]},
  //{path:"LogIn",component:LogInDialogComponent},
  {path:'',component:HomeComponent},
   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
