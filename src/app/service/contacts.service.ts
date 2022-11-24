import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  API_ROOT = this.configService.API_ROOT;
  contactModalFlag:boolean =false;
  contactDetailForUpdate:any =[];

  constructor(private configService:ConfigService,private http:HttpClient) { }
  addContacts(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/addContactDetails',data,httpOptions);
  }
  getContactsList(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/getAllContacts',data,httpOptions);
  }
  deleteContacts(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/deleteContactData',data,httpOptions);
  }
  getContactsLandingData(data: any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/getLandingData',data,httpOptions);
  }
  getContactDetails(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/getContactDetails',data,httpOptions);
  }
  uploadFile(data:any){
    return this.http.post(this.API_ROOT + 'v1/imageupload',data);
  }
  changeContactStatus(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/changeContactStatus',data,httpOptions);
  }
  getAllActivities(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/getContactAllActivity',data,httpOptions);
  }
  updateContactActivity(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/updateContactActivityStatus',data,httpOptions);
  }
  updateContact(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/updateContactDetails',data,httpOptions);
  }

  getAllUsers(data:any){
    return this.http.post(this.API_ROOT + 'v2/leadsManagement/getAllUser',data,httpOptions);
  }
  
  addContactActivity(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/addContactActivity',data,httpOptions);
  }
  //--------------lead----------

  getAllLeadSource(){
    return this.http.get(this.API_ROOT + 'v1/leadSource/getAllDataMst');
  }
  getAllLeadType(){
    return this.http.get(this.API_ROOT + 'v1/leadSourceType/getAllData');
  }
  getLeadSourceNameByLeadSourceType(data:any){
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/getLeadSourc',data,httpOptions);
  }
  getAllUser(){
    return this.http.get(this.API_ROOT + 'v1/leadsManagement/getAllUser');
  }
  getAllProducts(data:any){
    console.log("product data",data);
    return this.http.post(this.API_ROOT + 'v1/mstProduct/getAllData',data,httpOptions);
  }

  //-----------Opportunaty---------------//
  getAllContactPersonName(data:any){
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/allExitingUser',data,httpOptions);
  }
  getAllSalesStage(){
    return this.http.get(this.API_ROOT + 'v1/mstSalesStage/getAllData');
  }

  //-----------Approve Contact-----------------//
  getContactsListAll(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/getAllContacts_All',data,httpOptions);
  }
  giveApprove(data:any){
    return this.http.post(this.API_ROOT + '/v1/contactManage/approvedContact',data,httpOptions);
  }

  //------------ For Bulk Upload------------------//

  uploadFileForBulk(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/uploadContactExcel',data);
  }
  bulkContactInsert(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/contactExcelRead',data);
  }

  fileDownload(data:any){
    return this.http.post(this.API_ROOT + 'v1/contactManage/download',data)
  }
}
