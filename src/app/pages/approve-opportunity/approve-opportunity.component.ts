import { Component, OnInit, ViewChild } from '@angular/core';
import { OpportunityModalComponent } from '../opportunity-modal/opportunity-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../service/common.service';
import { LeadService } from '../../service/lead.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-opportunity',
  templateUrl: './approve-opportunity.component.html',
  styleUrls: ['./approve-opportunity.component.css']
})
export class ApproveOpportunityComponent implements OnInit {

  @ViewChild('deletemodal') deleteModal:any;
  @ViewChild('approveModalDesign')approveModal: any;
  clientId : any;
  userId : any;
  userType : any;
  counter: number = 0;
  allOrganizationArray: any;
  opportunityName: any;
  organizationId: any;
  contactId: any;
  existingContact: any;
  assignToDropDownHide = true;
  allUser: any;
  assignTo = 0;
  assignToUser: any;
  Oppcategory: any;
  winingValue = 0;
  expectedCloseDate: any;
  ActualCloseDate: any;
  expectedRevenue: any;
  salesStageArray : any;
  salesStage: any;
  description: any;
  getAllProductArray: any;
  productName: any;
  productAddress: any;
  productQtn: any;
  quantity: any;
  listValue: any;
  discount: any;
  finalValue: any;
  productDesc: any;
  limit: number = 10;
  offset: number = 0;
  currentCompetitor = [{"productName" : "" , "desc" : "" , "status" : "1" , "pageType" : '3'}];
  permission: any;
  parmissionIndivisualHide = true;
  permissionIndiVisual: any;
  allOpportunityArray: any = [];
  selectedVal: number = 10;
  isdisable: boolean = false;
  isPrevious: boolean = true;
  deleteOppId = "" as any;
  approveText="";
  opportunityId:any;

   public pageList: Array<any> = [
        {name: '10', value: '10'},
        {name: '15', value: '15'},
        {name: '20', value: '20'},
        {name: '30', value: '30'},
        {name: '50', value: '50'}
    ]

  constructor(private modalService : NgbModal, private leadRest : LeadService, private common : CommonService,
    private notifier: NotifierService , private route : Router) {
      this.getAllLeadStage();
      this.common.addopportunitySubject.subscribe(() => {
        this.getAllOpportunity();
      });
    }

  ngOnInit(): void {
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId();
    this.getAllOpportunity();
  }

  modalClose(): void {
    this.modalService.dismissAll()
  }

  approveModalFunc(item:any): any {
    this.opportunityId=item;
    this.modalService.open(this.approveModal, { centered: true });
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
      "opportunityId": this.opportunityId,
      "userId": this.common.getuserId(),
      "approveRemark": this.approveText
    }
    this.leadRest.giveOpportunityApprove(param).subscribe((res : any) =>{
      if(res.success == true){
        this.getAllOpportunity();
        this.notifier.notify('success', 'Contact Approved Successfully');
        this.approveText = "";
      }
    })
    this.modalClose();
  }
  addApportunity(): any {
    this.common.isOpportunityAdd = true;
    this.modalService.open(OpportunityModalComponent , {centered: true, size: 'xl'});
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  getAllOpportunity(): any {
    this.common.spinnerShow();
    let param = {
      "userId" : this.userId,
      "usertypeId" : this.userType,
      "limit": this.limit,
      "offset":String(this.offset) 
    };
    this.leadRest.getOpportunityAll(param).subscribe((res: any) => {
      this.common.spinnerHide();
      if ((res.success) && (res.status == 200)) {
        let tempArray = [];
        for (let i = 0; i < res.response.length; i++) {
          if (res.response[i].id != null) {
            tempArray.push(res.response[i]);
          }
        }
        this.allOpportunityArray = tempArray;
        // for (let i = 0; i < this.allOpportunityArray.length; i++) {
        //   this.allOpportunityArray[i].parcentage = Math.round((this.allOpportunityArray[i].stageCount * 100) / this.salesStageArray.length);
        // }
      }
    })
  }

   changepagelimit(e: any) {

        this.limit = Number(e.target.value);
        this.getAllOpportunity();

    }

      previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getAllOpportunity();
        if (this.offset <= 0) {
            this.isPrevious = true;
        }

    }

    next() {
        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getAllOpportunity();
    }


  getAllLeadStage(): any {
    let data = {};
    this.leadRest.getAllOpportunityStage(data).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.salesStageArray = res.response;
      }
    });
  }
  editOpportunity(opportunityId: any): any {
    this.common.isOpportunityAdd = false;
    this.common.opportunatiId = opportunityId;
    this.modalService.open(OpportunityModalComponent , {centered: true, size: 'xl'});
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  deleteOpportunity(opportunityId: any): any {
    this.deleteOpenModal();
    this.deleteOppId = opportunityId;

  }
  goToDetailsPage(opportunityId: any): any {
    this.route.navigate(['pages/opportunity-details/' + opportunityId]);
  }

  deleteOpenModal(): void {
    this.modalService.open(this.deleteModal, {centered: true, size: 'sm'})
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  delete(){
    let param = {
      "id" : this.deleteOppId,
      "userId" : this.userId
    };
    this.leadRest.deleteOpportunity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.getAllOpportunity();
        this.closeModal();
        this.notifier.notify('success', res.message);
      } else{
        this.notifier.notify('error', res.message);
      }
    })
  }

}
