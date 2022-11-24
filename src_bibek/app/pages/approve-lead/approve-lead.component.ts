import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadModalComponent } from '../lead-modal/lead-modal.component';
import { LeadService } from '../../service/lead.service';
import { CommonService } from '../../service/common.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-approve-lead',
  templateUrl: './approve-lead.component.html',
  styleUrls: ['./approve-lead.component.css']
})
export class ApproveLeadComponent implements OnInit {

  @ViewChild('deletemodal') deleteModal:any;
  @ViewChild('approveModalDesign')approveModal: any;

  limit: number = 10;
  offset: number = 0;
  userId: any;
  userType: any;
  clientId: any;
  allLeadArray: any = [];
  selectedVal: number = 10;
  deleteLeadId = "" as any;
  approveText="";
  leadId: any;

  public pageList: Array<any> = [
      {name: '10', value: '10'},
      {name: '15', value: '15'},
      {name: '20', value: '20'},
      {name: '30', value: '30'},
      {name: '50', value: '50'}
  ]

  isdisable: boolean = false;
  isPrevious: boolean = true;
  constructor(private ngModelService:NgbModal,private leadRest : LeadService, private common : CommonService,
              private notifier: NotifierService, private router: Router, private _location: Location) {
      
      this.common.addLeadSubject.subscribe((res) => {
        this.getAllLead();
      });
      // this.commonService.Subject.subscribe((res:any)=>{
      //   this.getTaskManagementList();
  
      // })
  }

  ngOnInit(): void {
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId()
    this.getAllLead();
  }

  modalClose(): void {
    this.ngModelService.dismissAll()
  }

  approveModalFunc(item:any): any {
    this.leadId=item;
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
      "leadId": this.leadId,
      "userId": this.common.getuserId(),
      "approvedRemark": this.approveText
    }
    this.leadRest.giveApprove(param).subscribe((res : any) =>{
      if(res.success == true){
        this.getAllLead();
        this.notifier.notify('success', 'Contact Approved Successfully');
        this.approveText = "";
      }
    })    
    this.modalClose();    
  }
  getAllLead(): any {
    this.common.spinnerShow();
    let param  = {
      'userId' : this.userId,
      'usertypeId' : this.userType,
      'limit' : this.limit,
      'offset':String(this.offset)
    };
    this.leadRest.getLeadListAll(param).subscribe((res: any) => {
      this.common.spinnerHide();
      if ((res.success) && (res.status == 200)) {
        if (res.response.length == 0) {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
      } else {
        this.allLeadArray = res.response;
        // console.log("lead>>>>>>>>>>>>",this.allLeadArray)
        this.isdisable = res.response.length < this.limit ? true : false;
      }
        
      }
    });
  }
  addLead() : any {
    this.common.isAdd = true;
    this.ngModelService.open(LeadModalComponent , {centered: true, size: 'xl'});
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  gotoDetailsPage(leadId: any): any {
    this.router.navigate(['pages/lead-details/' + leadId]);
  }
  editLead(leadId : any): any {
    this.common.spinnerShow();
    this.common.isAdd = false;
    this.ngModelService.open(LeadModalComponent , {centered: true, size: 'xl'});
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
    this.common.leadId = leadId;
  }
  deleteLead(leadId: any): any {
    this.deleteOpenModal();
    this.deleteLeadId = leadId;
  }

  changepagelimit(e: any) {

    this.limit = Number(e.target.value);
    this.getAllLead();

}

previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllLead();
    if (this.offset <= 0) {
        this.isPrevious = true;
    }

}

next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllLead();
}
deleteOpenModal(): void {
  this.ngModelService.open(this.deleteModal, {centered: true, size: 'sm'})
}
closeModal(){
  this.ngModelService.dismissAll();
}

delete(){
  let param = {
    "userId" : this.userId,
    "leadId" : this.deleteLeadId
  };
  this.leadRest.deleteLead(param).subscribe((res:any) => {
    if ((res.success) && (res.status == 200)) {
      this.getAllLead();
      this.closeModal();
      this.notifier.notify('success',res.message);
    } else{
      this.notifier.notify('error',res.message);
    }
  });
}

}
