import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'content-type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  userDetailsParticularId:any = [];

  userUpdateFlag:boolean = false;

  API_ROOT = this.configService.API_ROOT;
  constructor(private http:HttpClient, private configService:ConfigService) { }

  getDesignation(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getDesignationDropdown',data,httpOptions);
  }

  getCountry(){
    return this.http.get(this.API_ROOT + 'v1/country/getCountry');
  }

  getState(data:any){
    return this.http.post(this.API_ROOT + 'v1/state/getState',data,httpOptions);
  }

  getCity(data:any){
    return this.http.post(this.API_ROOT + 'v1/city/getCity',data,httpOptions);
  }
  getZone(data:any){
    return this.http.post(this.API_ROOT + 'v1/zone/getZone',data,httpOptions);
  }
  getRole(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getRolesDropdown',data,httpOptions);
  }
  uploadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/imageupload',data);
  }

  //-------For Create New user-----------------//


  getUserList(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getNormalUserList',data,httpOptions);
  }
  createNewUser(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/addEmpUser',data,httpOptions);
  }

  getUserDetailsByUserCId(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getUserDetails',data,httpOptions);
  }

  // getTaskCategory(data:any){
  //   return this.http.get(this.API_ROOT + 'v1/taskCategory/getAllData');
  // }

  getTaskCategory(data:any){
    return this.http.post(this.API_ROOT + 'v2/taskCategory/getAllData',data,httpOptions);
  }

  // getUser(){
  //   return this.http.get(this.API_ROOT + 'v1/leadsManagement/getAllUser');
  // }

  getUser(data:any){
    return this.http.post(this.API_ROOT + 'v2/leadsManagement/getAllUser',data,httpOptions);
  }
  
  deleteUser(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/userDeleteStatus',data,httpOptions);
  }
  statusChange(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/changeUserStatus',data,httpOptions);
  }
  addActivity(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/addUserActivity',data,httpOptions);
  }
  getAllActivities(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getUserAllActivity',data,httpOptions);
  }
  cancleTask(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/updateUserActivityStatus',data,httpOptions);
  }
  markAsComplete(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/updateUserActivityStatus',data,httpOptions);
  }

  getUserPermission(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/linsensedUserCheck',data,httpOptions);
  }
  updateUser(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/updateEmpUser',data,httpOptions);
  }

  downloadData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/download',data);
  }
}
