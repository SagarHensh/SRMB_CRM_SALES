import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import {ConfigService} from './config.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_ROOT = this.configService.API_ROOT;

  constructor(private http:HttpClient,private configService:ConfigService) { }

  // login(data:any): any {
  //   console.log("Service Data>>>>>>>>",data); 
  //   return this.http.post(this.API_ROOT + 'v1/user/login',data,httpOptions);
  // }

  login(data:any): any {
    console.log("Service Data>>>>>>>>",data); 
    return this.http.post(this.API_ROOT + 'v2/user/login',data,httpOptions);
  }

  logOut(data:any){
    return this.http.post(this.API_ROOT + 'v1/user/logout',data,httpOptions);
  }
}
