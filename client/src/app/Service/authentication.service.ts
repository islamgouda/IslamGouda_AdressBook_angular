import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
 import { AddressServiceService } from "./address-service.service";
import { LogIn, User } from "../shared/models/LogIn";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    baseUrl="https://localhost:7051/api/"
    constructor(
        private router: Router,
        private http: HttpClient,
        private addressServiceService:AddressServiceService
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
   const login:LogIn= {email:username,password:password}
   return this.addressServiceService.LogIn(login).subscribe({
    next:(value) =>{
        debugger
        localStorage.setItem('user', JSON.stringify(value));
                this.userSubject.next(value);
                this.router.navigate(['/Address']);
    },
   }); 
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}