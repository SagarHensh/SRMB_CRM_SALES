import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import {ConfigService} from './config.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class TaskmodalService {
  API_ROOT = this.configService.API_ROOT;

  constructor(private http:HttpClient,private configService:ConfigService) { }

  assignUserList(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/taskLandingData',data,httpOptions);
  }
  createTask(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/add',data,httpOptions);
  }
  getTaskManagementList(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/listData',data,httpOptions);
  }
  deleteTask(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/deleteTask',data,httpOptions);
  }
  getTaskDetails(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/getTaskDetails',data,httpOptions);
  }
  update(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/updateTask',data,httpOptions);
  }

  // getPriorityList(){
  //   return this.http.get(this.API_ROOT + 'v1/mstPriority/getAllData');
  // }

  getPriorityList(data:any){
    return this.http.post(this.API_ROOT + 'v2/mstPriority/getAllData',data,httpOptions);
  }

  changePriority(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/changePriority',data,httpOptions);
  }
  markComplete(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/addRemarks',data,httpOptions);
  }

  //-----------------For Bulk Upload---------------//

  uploadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/uploadTask',data);
  }

  bulkTaskInsert(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/readtask',data,httpOptions);
  }

  //-------------------------- For Export----------------//

  downloadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/download',data);
  }
  employeeList(data:any){
    return this.http.post(this.API_ROOT + 'v1/org/landingData',data,httpOptions);
  }

  updateAssignedEmpUser(data:any){
    return this.http.post(this.API_ROOT + 'v1/taskManagement/changeTaskAssignUser',data,httpOptions);
  }
}
