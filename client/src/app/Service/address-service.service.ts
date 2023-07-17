import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressBook } from '../shared/models/AddressBook';
import { Job } from '../shared/models/Job';
import { Department } from '../shared/models/Department';
import { Observable } from 'rxjs';
import { LogIn } from '../shared/models/LogIn';
import { PageResultList, paginatorFilters } from '../shared/models/paging';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  constructor(private http:HttpClient) { }

  baseUrl="https://localhost:7051/api/"
  getAddressBooks(){
    
   return this.http.get<AddressBook[]>(environment.apiUrl+"Address")
  }

  getAddressBooksPag(data: paginatorFilters): Observable<PageResultList<AddressBook>> {
    const options = { params: { data: JSON.stringify(data) } };
    return this.http.get<PageResultList<AddressBook>>(environment.apiUrl+"Address/GetAllPage", options);
  }
  getAdressById(Id:string):Observable<any>{
    return this.http.get<AddressBook>(environment.apiUrl+"Address/GetById?Id="+Id);
  }
  getJobs(){
    return this.http.get<Job[]>(environment.apiUrl+"Job")
  }
  getDepartments(){
    return this.http.get<Department[]>(environment.apiUrl+"Department")
  }
  getDepartmentbyId(id:number){
    return this.http.get<Department>(environment.apiUrl+"Department/GetById?Id="+id);
  }
  getDepartmentById(Id:string):Observable<any>{
    return this.http.get<Department>(environment.apiUrl+"Department/GetById?Id="+Id);
  }
 getExcel()//:Observable<any>
{
  return this.http.get(environment.apiUrl+"Address/UploadStudentData",{ responseType: 'blob' })
 // return this._http.get(`${environment.apiUrl}Classes/DownloadClassImportTemplate`, { responseType: 'blob' });
}
  //post

  postAddress(AddressBook:AddressBook):Observable<any>{
    console.log(AddressBook);
   return this.http.post<any>(environment.apiUrl+"Address",AddressBook);
  }
  postDepartment(Department:Department):Observable<any>{
   // console.log(Department);
   return this.http.post<any>(environment.apiUrl+"Department",Department);
  }
  uploadImage(file:File):Observable<any>{
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    return this.http.post<any>(environment.apiUrl+"Files",file);
  }
LogIn(LogIn:LogIn):Observable<any>{
  return this.http.post<any>(environment.apiUrl+"Auth/LogIn",LogIn);
}
  //put
  putAddress(AddressBook:AddressBook):Observable<any>{
   return this.http.put<any>(environment.apiUrl+"Address",AddressBook);
  }
  putDepartment(Department:Department):Observable<any>{
    // console.log(Department);
    return this.http.put<any>(environment.apiUrl+"Department",Department);
   }

  //delete
  DeleteAddress(id:string):Observable<any>{
    
   return this.http.delete<any>(environment.apiUrl+"Address?Id="+id);
  }
  DeleteDepartment(id:string):Observable<any>{
    
    return this.http.delete<any>(environment.apiUrl+"Department?Id="+id);
   }

}
