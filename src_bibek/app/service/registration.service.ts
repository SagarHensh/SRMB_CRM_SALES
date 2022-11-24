import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import {ConfigService} from './config.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient,private configService:ConfigService) { }

  API_ROOT = this.configService.API_ROOT;
  customerUpdateFlag:boolean = false;
  customerId = "";

  // --------------------CRM Access Api-------------------------//

  crmAccess(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/checkCompanyCRM',data,httpOptions);
  }

  // ----------------- Onload Api----------------//
  
  getAllExistingCustomers(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/getExsistingContactList',data,httpOptions);
  }
  getContactDetails(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/getExsistingContactData',data,httpOptions);
  }
  getAllCustomerType(data:any){
    return this.http.post(this.API_ROOT + 'v1/mstContactType/getContactTypes',data,httpOptions);

  }
  getAllCountry(){
    return this.http.get(this.API_ROOT + 'v1/country/getCountry');
  }
  getStateById(data:any){
    return this.http.post(this.API_ROOT + 'v1/state/getState',data,httpOptions);
  }
  getCity(data:any){
    return this.http.post(this.API_ROOT + 'v1/city/getCity',data,httpOptions);
  }
  getZone(data:any){
    return this.http.post(this.API_ROOT + 'v1/zone/getZone',data,httpOptions);
  }
  getProductList(data:any){
    return this.http.post(this.API_ROOT + 'v1/mstProduct/getAllData',data,httpOptions);
  }
  getUserList(){
    return this.http.get(this.API_ROOT + 'v1/leadsManagement/getAllUser');
  }

  uploadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/imageupload',data);
  }

  //---------------- End Onload Api----------------//

  //--------------------Add Customer Or Update--------------//

  uploadDoc(data:any){
    return this.http.post(this.API_ROOT + 'v1/userFileUpload',data);
  }
  addCustomer(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/addNewRegCustomer',data,httpOptions);
  }

  updateCustomer(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/updateNewRegCustomer',data,httpOptions);
  }


  //-------------Customer Approve----------------//

  getAllPendingCustomers(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/getlistOfNotApprvdCustomers',data,httpOptions);
  }

  approveRegistration(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/doApprveCustomer',data,httpOptions);
  }
  //-------------------- End Add Customer Or Update--------------//




  //----------------- For Customer Lists----------------------//

  getAllCustomer(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/getlistOfNewRegCustomers',data,httpOptions);
  }


  getCustomerDetailsById(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/getDetailsNewRegCustomer',data,httpOptions);
  }
  statusChange(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/changeOfCustomerStatus',data,httpOptions);
  }

  downloadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/customerManagement/download',data);
  }


  getAllExistingList(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/getExsistingContactList',data,httpOptions);
  }
  


}
