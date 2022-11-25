import { Injectable } from '@angular/core';
import { ConfigService } from './service/config.service';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  API_ROOT = this.configService.API_ROOT;


  constructor(private configService:ConfigService,private http:HttpClient) { }
  getStatesByCountryId(data:any){
    return this.http.post(this.API_ROOT + 'v1/state/getState',data,httpOptions);
  }
  getCityByStateId(data:any){
    return this.http.post(this.API_ROOT + 'v1/city/getCity',data,httpOptions);
  }
  getZoneByCityId(data:any){
    return this.http.post(this.API_ROOT + 'v1/zone/getZone',data,httpOptions);
  }
  insertData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/addRole',data,httpOptions);
  }
  getAllRoleData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getRoleListings',data,httpOptions);
  }
  getEditRoleData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getRoleListings',data,httpOptions);
  }
  editData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/updateRole',data,httpOptions);
  }
  deleteData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/deleteRole',data,httpOptions);
  }
  permissionDataFetch(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getpermissionForRolesDetails',data,httpOptions);
  }
  getAllRoleListData(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/getRolesDropdown',data,httpOptions);
  }
  saveRoleList(data:any){
    return this.http.post(this.API_ROOT + 'v1/userRolePermission/updatePermissionForRolesDetails',data,httpOptions);
  }

  //--------------Enquery---------------//

  getEntityDataFromApi(data:any){
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/landingPageSelections',data,httpOptions);
  }

  getStateDataFromApi(data:any){
    return this.http.post(this.API_ROOT + 'v1/state/getState',data,httpOptions);
  }

  getDistrictDataFromApi(data:any){
    return this.http.post(this.API_ROOT + 'v1/city/getCity',data,httpOptions);
  }

  getZoneDataFromApi(data:any){
    return this.http.post(this.API_ROOT + 'v1/zone/getZone',data,httpOptions);
  }

  getAssignedEmployeeListFromApi(data:any){
    return this.http.post(this.API_ROOT + 'v3/enqueryManagement/getSelectedUsrs',data,httpOptions);
  }

  sendDataFoInsertEnquery(data:any){
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/addInternalEnquiry',data,httpOptions);
  }

  getEnqueryDataFromApi(data:any){
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/getEnqueryListV1',data,httpOptions);
  }

  getAllOrganization(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/allExitingOrganization', data, httpOptions);
  }
  

  getAllOrganizationDetails(data : any): any {
    return this.http.post(this.API_ROOT + 'v1/org/getOrganizationDetails', data, httpOptions);
  }

  getEnqueryDataForEdit(data:any) : any {
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/getInternalEnquiryByenquiryId',data,httpOptions);
  }

  sendDataForEdit(data:any){
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/editInternalEnquiry',data,httpOptions);
  }

  getAssignedEmloyee(data:any) : any {
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/getAssignEmployeeByenqId',data,httpOptions);
  }

  assignUpate(data:any) : any {
    return this.http.post(this.API_ROOT + 'v1/enqueryManagement/updateAssignEmployeeByenqId',data,httpOptions);
  }

  

//--------------------------- Delete Enquiry-------------------------//

deleteEnquiry(data:any){
  return this.http.post(this.API_ROOT + 'v1/enqueryManagement/deleteInternalEnquiry',data,httpOptions);
}

//----------------------------- Download Enquiry -------------------//

downloadFile(data:any){
  return this.http.post(this.API_ROOT + 'v1/enqueryManagement/exportEnquiry',data,httpOptions);
}

ownerRecordsUpdate(data:any){
  return this.http.post(this.API_ROOT + 'v1/enqueryManagement/changeOwner',data,httpOptions)
}

updateEnqueryApprovalStatus(data: any): any {
  return this.http.post(this.API_ROOT + 'v1/enqueryManagement/approveInternalEnquiry', data, httpOptions);
}


//**********************************************************************to fetch employee type list***************************************************/

getEmployeeType(data: any):any{
  return this.http.post(this.API_ROOT + 'v1/mstDesignation/getAllDesignations', data, httpOptions);
}
  
}
