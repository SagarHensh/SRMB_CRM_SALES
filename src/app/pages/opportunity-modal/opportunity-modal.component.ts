import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadService } from '../../service/lead.service';
import { CommonService } from '../../service/common.service';
import { NotifierService } from 'angular-notifier';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-opportunity-modal',
  templateUrl: './opportunity-modal.component.html',
  styleUrls: ['./opportunity-modal.component.css']
})
export class OpportunityModalComponent implements OnInit {
  clientId : any;
  userId : any;
  userType : any;
  counter: number = 0;
  allOrganizationArray: any;
  opportunityName = '';
  organizationId = '';
  contactId = '';
  existingContact: any;
  assignToDropDownHide = true;
  allUser: any;
  assignTo = "0";
  assignToUser = '';
  Oppcategory = 0;
  winingValue = 0;
  expectedCloseDate = '';
  ActualCloseDate = '';
  expectedRevenue = '';
  salesStageArray : any;
  salesStage = '';
  description = '';
  getAllProductArray: any;
  productName = '';
  productAddress = '';
  productQtn = '';
  quantity = '';
  listValue = '';
  discount = '';
  finalValue : any;
  productDesc = '';
  currentCompetitor = [{"productName" : "" , "desc" : "" , "status" : "1" , "pageType" : '3'}];
  permission = '';
  parmissionIndivisualTypeHide = true;
  parmissionIndivisualHide = true;
  permissionIndiVisual = '';
  isEdit= false;
  prodQty : number = 0;
  prodListValue : number = 0;
  prodDis : number = 0;


  constructor(private modalService : NgbModal, private leadRest : LeadService, private common : CommonService,
              private notifier: NotifierService) { 

    // this.salesStageArray = [ {'id' : 0 , "name": "Processing"}, 
    //                     {'id' : 1 , "name": "Needs Analysis"}, 
    //                     {'id' : 2 , "name": "Identify Decision Makers"}, 
    //                     {'id' : 3 , "name": "Proposal"}, 
    //                     {'id' : 4 , "name": "Negotiation"},
    //                     {'id' : 5 , "name": "Closed"}];
  }

  ngOnInit(): void {
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId();
    this.getAllOrganization();
    this.getexistingContacts();
    this.getAllUser();
    this.getAllProduct();
    this.getAllLeadStage();
    if (this.common.opportunatiId > 0) {
      this.getOpportunityById();
    }
    if (this.userType != 2) {
      this.assignToDropDownHide = false;
      this.parmissionIndivisualTypeHide = false;
    } else {
      this.assignToUser = this.userId;
      this.permissionIndiVisual = this.userId;
    }
    this.isEdit= false;
  }
  saveNext(): any {
    if (this.counter == 0) {
      if (this.opportunityName == '') {
        this.notifier.notify('error', "*Opportunity Name Required");
          return false;
      }
      if (this.organizationId == '') {
        this.notifier.notify('error', "*Please Select a Organization");
          return false;
      }
      if (this.contactId == '') {
        this.notifier.notify('error', "*Please Select a Contact Name");
          return false;
      }
      if (this.assignToUser == '') {
        this.notifier.notify('error', "*Assigned User Required");
          return false;
      }
    }
    if (this.counter == 1) {
      if (this.winingValue == 0) {
        this.notifier.notify('error', "*Please Select wining value");
          return false;
      }
      if (this.expectedCloseDate == '') {
        this.notifier.notify('error', "*Please Select Expected Close Date");
          return false;
      }
      if (this.ActualCloseDate == '') {
        this.notifier.notify('error', "*Please Select Actual Close Date");
          return false;
      }
      if (this.expectedRevenue == '') {
        this.notifier.notify('error', "*Please Select Expected revenue");
          return false;
      }
      if (this.salesStage == '') {
        this.notifier.notify('error', "*Please Select Sales Stage");
          return false;
      }
    }
    if (this.counter == 2) {
      if (this.description == '') {
        this.notifier.notify('error', "*Description Required");
          return false;
      }
      if (this.description != '') {
        if(this.description.length > 100){
          this.notifier.notify('error', "*Description within 100 characters");
          return false;
        }
      }
    }
    if (this.counter == 3) {
      if (this.productName == '') {
        this.notifier.notify('error', "*Please Select Product Name");
          return false;
      }
      if (this.productAddress == '') {
        this.notifier.notify('error', "*Please Select Address");
          return false;
      }
      if (this.productQtn == '') {
        this.notifier.notify('error', "*Please Select Product Quantity");
          return false;
      }
      if (this.quantity == '') {
        this.notifier.notify('error', "*Please Select Quantity");
          return false;
      }
      if (this.listValue == '') {
        this.notifier.notify('error', "*Please Select List Value");
          return false;
      }
      if (this.discount == '') {
        this.notifier.notify('error', "*Please Select Discount");
          return false;
      }
      if (this.finalValue == '') {
        this.notifier.notify('error', "*Final Value Required");
          return false;
      }
      if (this.productDesc == '') {
        this.notifier.notify('error', "*Product Description Required");
          return false;
      }
      if (this.productDesc != '') {
        if(this.productDesc.length > 100){
          this.notifier.notify('error', "*Product Description within 100 characters");
          return false;
        }
      }
    }
    if (this.counter == 4) {
      for (let a = 0 ; a < this.currentCompetitor.length; a++) {
        if (this.currentCompetitor[a].productName == '') {
          this.notifier.notify('error', "*Product Name Required");
          return false;
        }
        if (this.currentCompetitor[a].desc == '') {
          this.notifier.notify('error', "*Product Description Required");
          return false;
        }
      }
    }
    if (this.counter == 5) {
      if (this.permission == '') {
        this.notifier.notify('error', "*Permission Required");
          return false;
      }
    }
    if (this.counter != null) {
      const prevElem = document.getElementById('step_' + this.counter);
      const prevElemDtl = document.getElementById('stepDtl_' + this.counter);
      if (prevElem && prevElemDtl) {
        prevElem.className = 'success';
        prevElemDtl.classList.remove('show');
        prevElemDtl.classList.add('hide');
      }
      this.counter += 1;
      const nextElem = document.getElementById('step_' + this.counter);
      const nextElemDtl = document.getElementById('stepDtl_' + this.counter);
      if (nextElem && nextElemDtl) {
        nextElem.className = 'active';
        nextElemDtl.classList.remove('hide');
        nextElemDtl.classList.add('show');
      }
    }
  }

  saveprev(): void {
    if (this.counter != null && this.counter > 0) {
      const nextElem = document.getElementById('step_' + this.counter);
      const nextElemDtl = document.getElementById('stepDtl_' + this.counter);
      if (nextElem && nextElemDtl) {
        nextElem.className = 'success';
        nextElemDtl.classList.remove('show');
        nextElemDtl.classList.add('hide');
      }
      this.counter -= 1;
      const prevElem = document.getElementById('step_' + this.counter);
      const prevElemDtl = document.getElementById('stepDtl_' + this.counter);
      if (prevElem && prevElemDtl) {
        prevElem.className = 'active';
        prevElemDtl.classList.remove('hide');
        prevElemDtl.classList.add('show');
      }
    }
  }
  modalClose(): void {
    this.modalService.dismissAll();
  }
  getAllOrganization(): any {
    let param = {
      userId : this.userId,
      usertypeId : this.userType
    };
    this.leadRest.getAllOrganization(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allOrganizationArray = res.response;
      }
    });
  }
  getexistingContacts(): any {
    let param = {
      userId : this.userId,
      usertypeId : this.userType
    };
    this.leadRest.getExistingContact(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.existingContact = res.response;
      }
    })
  }
  getAllUser() {
    let param = {};
    this.leadRest.getAllUser(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allUser = res.response;
      }
    });
  }
  getAllProduct(): any {
    let param = {
      "clientId" : this.clientId
    };
    this.leadRest.getAllProduct(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.getAllProductArray = res.response
      }
    });
  }
  addCompititor(): any {
    this.currentCompetitor.push({"productName" : "" , "desc" : "" , "status" : "1" , "pageType" : '3'});
  }
  getPermissionData(parmissionType: any): any {
    if(parmissionType == 3) {
      this.parmissionIndivisualHide = false;
    } else {
      this.parmissionIndivisualHide = true;
    }
  }
  getOrganizationName(orgId: any): any {
    let param = {
      "organizationId" : orgId
    };
    this.leadRest.getContactByOrgId(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.contactId = res.response[0].contactId;
      }
    })
  }
  getAllLeadStage(): any {
    let data = {};
    this.leadRest.getAllOpportunityStage(data).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.salesStageArray = res.response;
      }
    });
  }
  addOpportunity(): any {
    
    if (this.permission == '') {
      this.notifier.notify('error', "*Permission Type Required");
      return false;
    }
    if ((this.permission == '3') && (this.permissionIndiVisual == '')) {
      this.notifier.notify('error', "*Permission User Required");
        return false;
    }
    let recoredId = Math.floor((Math.random() * 10000000) + 1);
    let param = {
      'recordId' : recoredId,
      "userId" : this.userId,
      "userType" : this.userType,
      "clientId" : this.clientId,
      "opportunityName" : this.opportunityName,
      "organizationId" : this.organizationId,
      "contactId" : this.contactId,
      "assignTo" :  this.assignToUser,
      "assignType" : this.assignTo,
      "category" : this.Oppcategory,
      "probabilityOfWining" : this.winingValue,
      "expectedCloseDate" : this.expectedCloseDate,
      "ActualCloseDate" : this.ActualCloseDate,
      "expectedRevenue" : this.expectedRevenue,
      "salseStageId" : this.salesStage,
      "description" : this.description,
      "productId" : this.productName,
      "prodAddress" : this.productAddress,
      "productQuantity" : this.productQtn,
      "quantityType" : this.quantity,
      "listValue" : this.listValue,
      "discount" : this.discount,
      "finalValue" : this.finalValue,
      "productDesc" : this.productDesc,
      "product" : this.currentCompetitor,
      "permissionType" : this.permission,
      "permissionIndiVisual" : this.permissionIndiVisual
    };
    if (this.contactId == '') {
      param['contactId'] = '';
    }
    if (this.organizationId == '') {
      param['organizationId'] = '';
    }
    if (this.permission != '3') {
      param['permissionIndiVisual'] = '';
    }
    if (this.permission == '1') {
      param['permissionIndiVisual'] = this.userId;
    }
    this.leadRest.addOpportunity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.opportunityName = '';
        this.organizationId = '';
        this.assignToUser = '';
        this.assignTo = "0";
        this.Oppcategory = 0;
        this.winingValue;
        this.expectedCloseDate = '';
        this.ActualCloseDate = '';
        this.expectedRevenue = '';
        this.salesStage = '';
        this.description = '';
        this.productName = '';
        this.productAddress = '';
        this.productQtn = '';
        this.quantity = '';
        this.listValue = '';
        this.discount = '';
        this.finalValue = '';
        this.productDesc;
        this.currentCompetitor = [{"productName" : "" , "desc" : "" , "status" : "1" , "pageType" : '3'}];
        this.permission;
        this.permissionIndiVisual;
        this.notifier.notify('success', res.message);
        this.modalClose();
        this.common.addopportunitySubject.next({"isAdd": true});
      }
    });
  }
  getOpportunityById(): any {
    if (this.common.isOpportunityAdd == false) {
      this.common.spinnerShow();
      let param = {
        "userId" : this.userId,
        "id" : this.common.opportunatiId
      };
      this.leadRest.getOpportunityDataById(param).subscribe((res: any) => {
        this.common.spinnerHide();
        if ((res.success) && (res.status == 200)) {
          this.isEdit = true;
          this.opportunityName = res.response[0].opportunityName;
          this.organizationId = res.response[0].organizationId;
          this.contactId = res.response[0].contactId;
          this.assignTo = (res.response[0].assignType == '' ? 0 : res.response[0].assignType);
          this.assignToUser = res.response[0].assignTo;
          this.Oppcategory = Number(res.response[0].category);
          this.winingValue = res.response[0].probabilityOfWining;
          this.expectedCloseDate = this.common.getDateFormatNew2(res.response[0].expectedCloseDate);
          this.ActualCloseDate = this.common.getDateFormatNew2(res.response[0].actualCloseDate);
          this.expectedRevenue = res.response[0].expectedRevenue;
          this.salesStage = res.response[0].salseStageId;
          this.description = res.response[0].description;
          this.productName = res.response[0].productId;
          this.productAddress = res.response[0].prodAddress;
          this.productQtn = res.response[0].productQuantity;
          this.quantity = res.response[0].quantityType;
          this.listValue = res.response[0].listValue;
          this.discount = res.response[0].discount;
          this.finalValue = res.response[0].finalValue;
          this.productDesc = res.response[0].prodDescription;
          let productArray = res.response[0].Competitor;
          let prodTempArray = [];
          for (let i = 0; i < productArray.length; i++) {
            prodTempArray.push({
              "productName" : productArray[i].productId,
              "desc" : productArray[i].description,
              "status" : productArray[i].competitorType,
              "pageType" : '3',
            })
          }
          this.currentCompetitor = prodTempArray;
          this.permission = res.response[0].permissionType;
          if ((this.permission == '3') && (this.userType != 2)) {
            this.parmissionIndivisualHide = false;
          }
          this.permissionIndiVisual = res.response[0].accessId;
        }
      });
    }
  }
  updateOpportunity(): any {
    let param = {
      "id" : this.common.opportunatiId,
      "userId" : this.userId,
      "userType" : this.userType,
      "clientId" : this.clientId,
      "opportunityName" : this.opportunityName,
      "organizationId" : this.organizationId,
      "contactId" : this.contactId,
      "assignTo" :  this.assignToUser,
      "assignType" : this.assignTo,
      "category" : this.Oppcategory,
      "probabilityOfWining" : this.winingValue,
      "expectedCloseDate" : this.expectedCloseDate,
      "ActualCloseDate" : this.ActualCloseDate,
      "expectedRevenue" : this.expectedRevenue,
      "salseStageId" : this.salesStage,
      "description" : this.description,
      "productId" : this.productName,
      "prodAddress" : this.productAddress,
      "productQuantity" : this.productQtn,
      "quantityType" : this.quantity,
      "listValue" : this.listValue,
      "discount" : this.discount,
      "finalValue" : this.finalValue,
      "productDesc" : this.productDesc,
      "product" : this.currentCompetitor,
      "permissionType" : this.permission,
      "permissionIndiVisual" : this.permissionIndiVisual
    };
    if (this.contactId == '') {
      param['contactId'] = '';
    }
    if (this.organizationId == '') {
      param['organizationId'] = '';
    }
    if (this.permission != '3') {
      param['permissionIndiVisual'] = '';
    }
    this.leadRest.updateOpportunity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.modalClose();
        this.common.addopportunitySubject.next({"isAdd": true});
      }
    });
  }


changeProductQty(event:any) {
 this.discount = ''; 
 this.finalValue = '';
//console.log("Product Quantity",event.target.value);
this.prodQty = Number(event.target.value);
}
changeProductListValue(event:any){
  this.discount = ''; 
 this.finalValue = '';
//console.log("Product list value",event.target.value);
this.prodListValue = Number(event.target.value);

}
changeProductDiscount(event:any){
 this.finalValue = '';
//console.log("Product discount",event.target.value);
this.prodDis = Number(event.target.value);

var finalValue = (this.prodQty * this.prodListValue) - ((this.prodQty * this.prodListValue) * (this.prodDis / 100) )

//console.log("Final Value>>>>>>>",finalValue);
this.finalValue = finalValue;

}



}
