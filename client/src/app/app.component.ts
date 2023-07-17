import { Component, OnInit } from '@angular/core';
import {HttpClient} from'@angular/common/http'
import { pagination } from './shared/models/paging';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}
  products:any[]=[]
  ngOnInit(): void {
     //  debugger
    /*this.HttpClient.get<Job>("https://localhost:7051/api/Product/GetAll?pageSize=50").subscribe({
      next:(response)=>{this.products=response.data
      //console.log(this.products)
    },
      error:error=>console.log(error),
      complete:()=>console.log("requestCompleted")

    })*/
    
  }
}
