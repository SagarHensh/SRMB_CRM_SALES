import { Component, OnInit, ViewChild } from '@angular/core';
import {OrganizationsModalComponent} from '../organizations-modal/organizations-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {OrgApiService} from "../../service/org-api.service";
import {CommonService} from "../../service/common.service";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-approve-organization',
  templateUrl: './approve-organization.component.html',
  styleUrls: ['./approve-organization.component.css']
})
export class ApproveOrganizationComponent implements OnInit {

  @ViewChild('deletemodal') deletemodal: any;
  @ViewChild('approveModalDesign')approveModal: any;
    id = 1;
    limit=10;
    offset=0;
    searchTextOrgName="";
    searchTextOwnerName="";
    searchTextContactType="";
    searchTextState="";
    searchTextPhone="";
    userType="" as any;
    orgList:any=[];
    organizationId='' as any;
    selectedVal : number = 10;
    approveText="";

    public pageList: Array<any> = [
      { name: '10', value: '10' },
      { name: '15', value: '15' },
      { name: '20', value: '20' },
      { name: '30', value: '30' },
      { name: '50', value: '50' }
    ]
  
    isdisable: boolean = false;
    isPrevious: boolean = true;

    constructor(private ngModelService: NgbModal, private router: Router, private orgApi: OrgApiService,
                private common: CommonService,private notifier:NotifierService) {
    }

    ngOnInit(): void {
        this.common.Subject.subscribe((data:any)=>{
            this.getOrganizationList();
        })
        this.getLandingData();
        this.getOrganizationList();
        
    }

    approveModalFunc(item:any): any {
      this.organizationId=item;
      this.ngModelService.open(this.approveModal, { centered: true });
      setTimeout(() => {
        const elem = document.getElementsByClassName('modal');
        if (elem) {
          elem[0].classList.add('addContactModal')
        }
      }, 200);
    }

    sendApprove(): any{
      if(this.approveText == ""){
        this.notifier.notify('error', 'Please Enter a Remark');
        return false;
      }
      var param ={
        "organizationId": this.organizationId,
        "userId": this.common.getuserId(),
        "activeremark": this.approveText
      }
      this.orgApi.giveApprove(param).subscribe((res : any) =>{
        if(res.success == true){
          this.getOrganizationList();
          this.notifier.notify('success', 'Contact Approved Successfully');
          this.approveText = "";
        }
      })
      this.modalClose();
    }

    getOrganizationList(){
        const userType = this.common.getUserType();
        const data={
            limit:this.limit,
            offset:String(this.offset),
            searchTextOrgName:this.searchTextOrgName,
            searchTextOwnerName:this.searchTextOwnerName,
            searchTextContactType:this.searchTextContactType,
            searchTextState:this.searchTextState,
            searchTextPhone:this.searchTextPhone,
            userType:userType
        };
        this.orgApi.getOrganizationAll(data).subscribe((res:any)=>{
            if(res.success){
                if (res.response.length == 0) {
                    this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    this.isdisable = true;
                } else {
                    this.orgList = res.response.data;
                    this.isdisable = res.response.length < this.limit ? true : false;
                }
                //this.orgList = res.response.data;
               // console.log(">>>>>>>>>orgList>>>>>>>>>>>>>",this.orgList);

            }
        })
    }

    getLandingData(): void {
        const data = {
            clientId: this.common.getClientId()
        };
        this.orgApi.landingData(data).subscribe((res: any) => {
            if (res.success) {
                this.common.countryList = res.response.countryList;
                this.common.userList = res.response.userList;
                this.common.contactTypeList = res.response.contactTypeList;
                this.common.productList = res.response.productList;
            }
        });
    }

    addNew() {
        this.orgApi.modalFlag = false;
        this.ngModelService.open(OrganizationsModalComponent, {centered: true, size: 'xl'});
        // setTimeout(() => {
        const elem = document.getElementsByClassName('modal');
        if (elem) {
            elem[0].classList.add('addContactModal')
        }
        // }, 200);
    }

    editNew() {
        this.ngModelService.open(OrganizationsModalComponent, {centered: true, size: 'xl'});
        // setTimeout(() => {
        const elem = document.getElementsByClassName('modal');
        if (elem) {
            elem[0].classList.add('addContactModal')
        }
        // }, 200);
    }

    detailsPage(item:any) {
        this.id = item;
        this.router.navigate(['/pages/organizations-details/' + this.id])
    }

    edit(item:any) {
        this.orgApi.modalFlag = true;
        this.orgApi.updateData = item;
        this.editNew();
    }

    deleteOpenModal(orgId:any): void {
        this.organizationId = orgId;
        this.ngModelService.open(this.deletemodal, {centered: true, size: 'sm'})
    }

    deleteOrg() {
        const data ={
            organizationId:this.organizationId
        };
        this.orgApi.deleteOrg(data).subscribe((res:any)=>{
            if(res.success){
                this.getOrganizationList();
                this.modalClose();
                this.notifier.notify('success',res.message);
            } else{
                this.notifier.notify('error',res.message);
            }
        })
    }

    modalClose(): void {
        this.ngModelService.dismissAll()
    }

    changepagelimit(e: any) {

        this.limit = Number(e.target.value);
        this.getOrganizationList();

    }

    previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getOrganizationList();
        if (this.offset <= 0) {
          this.isPrevious = true;
        }
    
      }
      next() {
    
        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getOrganizationList();
    
      }

}
