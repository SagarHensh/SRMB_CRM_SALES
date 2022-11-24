import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})
export class OrgApiService {
    API_ROOT = this.configService.API_ROOT;
    modalFlag:boolean = false;
    updateData:any=[];

    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    landingData(data: any){
        return this.http.post(this.API_ROOT + 'v1/org/landingData', data, httpOptions);
    }
    addOrganization(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/addOrganizationDetails',data,httpOptions);
    }
    updateOrganization(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/updateOrganizationDetails',data,httpOptions);
    }
    getOrgList(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/getOrganizationList',data,httpOptions);
    }
    deleteOrg(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/deleteOrganizationDetails',data,httpOptions);
    }
    getOrgDetailsByOrgId(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/getOrganizationDetails',data,httpOptions);
    }
    changeStatus(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/updateOrganizationStatus',data,httpOptions);
    }
    getAllActivity(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/getOrganizationAllActivity',data,httpOptions);
    }
    addOrgActivity(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/addOrganizationActivity',data,httpOptions);
    }
    getAllActivityType(){
        return this.http.get(this.API_ROOT +'v1/mstActivity/getAllData');
    }
    updateContactActivity(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/updateOrganizationActivityStatus',data,httpOptions);
    }

    //------------Approve Organization---------------//
    getOrganizationAll(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/getOrganizationList_All',data,httpOptions);
    }
    giveApprove(data:any){
    return this.http.post(this.API_ROOT + 'v1/org/activeOrganization',data,httpOptions);
    }

    //------------------- For Bulk Upload--------------------//

    uploadFileForBulk(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/uploadOrganizationExcel',data);
    }

    bulkOrganizationInsert(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/organizationExcelRead',data);
    }

    //---------------------- For Export--------------------//

    downloadFile(data:any){
        return this.http.post(this.API_ROOT + 'v1/org/download',data);
    }
}
