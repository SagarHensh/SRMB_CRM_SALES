import { Component, OnInit, ViewChild } from '@angular/core';
import { OpportunityModalComponent } from '../opportunity-modal/opportunity-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../service/common.service';
import { LeadService } from '../../service/lead.service';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.css']
})
export class OpportunityDetailsComponent implements OnInit {

  isConverted = "" as any;
  recordId ="";
  opportunityId: any;
  clientId: any;
  userId: any;
  userType: any;
  counter: number = 0;
  allOrganizationArray: any;
  opportunityName: any;
  organizationId: any;
  contactId: any;
  existingContact: any;
  assignToDropDownHide = true;
  // allUser: any;
  allUser: any = [];
  assignTo = 0;
  // assignToUser: any;
  assignToUser = "" as any;
  Oppcategory: any;
  oppStatusType = "";
  oppStatusName = "";
  winingValue = 0;
  expectedCloseDate: any;
  ActualCloseDate: any;
  expectedRevenue: any;
  salesStageArray: any =[];
  salesStage: any;
  nextsalseStageName = "" as any;
  salesStageName: any;
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
  currentCompetitor = [{ "productName": "", "desc": "", "status": "1", "pageType": '3' }];
  permission: any;
  parmissionIndivisualHide = true;
  permissionIndiVisual: any;
  isEdit = false;
  modal1: any;
  authUserData: any;
  permissionData: any

  //------------ Activity----------------//

  isdisable: boolean = false;
  isPrevious: boolean = false;
  limit = 10;
  offset = 0;
  stagePopup: number = 0;

  //---------------sales stage Tables-------------------//

  processingFlag: boolean = false;
  processingValues: any = [];
  needAnalysisFlag: boolean = false;
  needAnalysisValue: any = [];
  decisionMakersFlag: boolean = false;
  decisionMakerValue: any = [];
  proposalFlag: boolean = false;
  proposalValue: any = [];
  negotiationFlag: boolean = false;
  negotiationValue: any = [];
  closedWon: boolean = false;
  closedLost: boolean = false;
  closedValue: any = [];
  natureList:any = [];


  //------------------------Popup Change Flag----------------------//

 UPLOAD_IMAGE_BASE_PATH = this.common.imagePath;

  popupUpdateFlag: boolean = false;

  popUpStageId = "" as any;

  processingUpdateFlag: boolean = false;
  needAnalysisUpdateFlag: boolean = false;
  decisionUpdateFlag: boolean = false;
  proposalUpdateFlag: boolean = false;
  negotiationUpdateFlag: boolean = false;


  //------------------------------Final Opportunity Stage Mark As Complete---------------------//

  @ViewChild('finalOppStageMarkComplete') finalOppStageMarkCom:any;

  imageSrc = "";
  fileUploadStatus: boolean = false;
  fileUpload = "";
  closeOwn: boolean = true;
  closeLost: boolean = false;
  closedwon = "1" as any;
  reasonList: any = [];

  finalAmount = "";
  finalWining = "";
  finalRevenue = "";
  finalExpectedclosing = "";
  finalFollowUpDate = "";
  finalCustomerproposedValue = "";
  finalMutuallyAgreedContactValue = "";
  finalRevisedProposalSent = "";
  fileUploadFlag:boolean = false;
  uploadedFileName = "";
  finalProposalnumber = "";
  finalNewProposalSentDate = "";
  finalNextFollowUp = "";
  finalProposalValues = "";
  //finalProposalNumber = "";
  finalproposalSent = "";
  finalProposalSentFlag:boolean = false;
  finalProposalSentDate = "";
  finalNextFollowUpDate = "";
  finalClosingAmount = "";
  finalClosingDate = "";
  finalClosingDescription = "";
  finalClosingReason = "";
  finalLostClosingDescription = "";
  stageSequenceId = "";
  oppStageData:any = [];
  oppStageUpdateFlag:boolean = false;
  oppStageTable:boolean =false;
  oppTable:boolean = false;
  stageIdForUpdate = "";
  popUpShow:any;
  finalStageList:any;
  nextStage = "";
  //previousStageDropdown: boolean = false;
  nextStageDropdown: boolean = false;
  finalDecisionArr = [
    {
      "decisionMakerName": "",
      "decisionMakerDesignation": "",
      "decisionMakerAuth": ""

    }
  ]

  
//----------------- End-----------------------//

  getAllStageCompleteDetails: any = [];
  ORG_phone = '';
  ORG_name = '';
  contactPersonName = '';
  ORG_Email = '';
  opportunityCreatedAt = '';
  actualProductName = '';
  activityType = '';
  dueDate = '';
  ActivityassignTo = '';
  @ViewChild('addActivity') addActivityModal: any;
  activitydescription = '';
  ActivityassignHide = true;
  allActivityArray: any = [];
  isOpen = true;
  activityMasterArray: any;
  activityListStatus: boolean = false;
  activityTypeData: any = '';
  activityStatus = "";



  constructor(private modalService: NgbModal, private leadRest: LeadService, private common: CommonService,
    private notifier: NotifierService, private route: Router, private router: ActivatedRoute, private _location: Location) {
    this.opportunityId = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.common.addopportunitySubject.subscribe((res: any) => {
      this.getOpportunityById();
    })

    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);
    this.getPermissionData();

    this.getAllOppNatureStatus();
    this.getAllOppStage();
    this.getAllUser();
    this.getAllProduct()
    this.upcomingActivity();

    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId();
    if (this.userType != 2) {
      this.ActivityassignHide = false;
    } else {
      this.ActivityassignHide = true;
    }
    this.getOpportunityById();
    this.getAllActivity();
    this.getReason();
  }
  getAllActivity(): any {
    this.leadRest.getActivityListMaster().subscribe((res: any) => {
      if ((res.success) && (res.status)) {
        this.activityMasterArray = res.response;
        //console.log('zzzzzzzzzzzzz', this.activityMasterArray);
      }
    });
  }

  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Leads") {
          this.permissionData = data;
          // console.log("Branding Permission Dta:", this.permissionData);
        }
      })
    }
  }

  getAllOppStage(): any {
    let data = {
      moduleType:"opportunity"
    };
    this.leadRest.getAllOpportunityStage(data).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.salesStageArray = res.response;
        //console.log("opportunity stage salesStageArray", this.salesStageArray);
        this.popUpShow = this.salesStageArray[this.salesStageArray.length -1].salesStageId;
        //console.log("Popup Show>>>>>>>>>>>",this.popUpShow);
      }
    });
  }
  getOpportunityById(): any {
    this.common.spinnerShow();
    let param = {
      "clientId": this.clientId,
      "userType": this.userType,
      "userId": this.userId,
      "id": this.opportunityId
    };
    this.leadRest.getOpportunityDataById(param).subscribe((res: any) => {

      //console.log(">>>>>>>>>>>>>>>>>>Details>>>>>>>>>>>>>>>>>>>>>res", res);
      this.common.spinnerHide();
      if ((res.success) && (res.status == 200)) {
        this.isEdit = true;
        this.isConverted = res.response[0].isConverted;
        if(this.isConverted == 1){
          this.backToPreviousPage();
        }
        this.finalStageList = res.response[0].RemainingStages;
        //this.totalOppStageList = res.response[0].totalStages;
        this.recordId = res.response[0].recordId;
        this.oppStatusType = res.response[0].opportunityTypeStatus;
        this.oppStatusName = res.response[0].typeStatusName;
        this.opportunityName = res.response[0].opportunityName;
        this.organizationId = res.response[0].organizationId;
        this.contactId = res.response[0].contactId;
        this.assignTo = (res.response[0].assignType == '' ? 0 : res.response[0].assignType);
        this.assignToUser = res.response[0].assignTofirstName + ' ' + res.response[0].assignTolastName;
        this.Oppcategory = Number(res.response[0].category);
        this.winingValue = res.response[0].probabilityOfWining;
        this.expectedCloseDate = this.common.getDateFormat(res.response[0].expectedCloseDate);
        this.ActualCloseDate = this.common.getDateFormat(res.response[0].actualCloseDate);
        this.expectedRevenue = res.response[0].expectedRevenue;
        this.salesStage = res.response[0].salseStageId;
        //console.log("salesStage>>>>>>>>>", this.salesStage);
        this.nextsalseStageName = res.response[0].nextsalseStageName;
        let stageElm = document.getElementById("oppStage_" + this.salesStage) as HTMLElement;
        if (stageElm) {
          stageElm.classList.add('active')
        }
        this.description = res.response[0].description;
        this.salesStageName = res.response[0].salesStageName;
        this.productName = res.response[0].productId;
        this.productAddress = res.response[0].prodAddress;
        this.productQtn = res.response[0].productQuantity;
        this.quantity = res.response[0].quantityType;
        this.listValue = res.response[0].listValue;
        this.discount = res.response[0].discount;
        this.finalValue = res.response[0].finalValue;
        this.productDesc = res.response[0].prodDescription;
        let productArray = res.response[0].Competitor;
        this.ORG_phone = res.response[0].OrgDetails.phone;
        this.ORG_Email = res.response[0].OrgDetails.email;
        this.ORG_name = res.response[0].OrgDetails.organizationName;
        this.contactPersonName = res.response[0].ContactDetails.firstName + ' ' + res.response[0].ContactDetails.lastName;
        this.opportunityCreatedAt = this.common.getDateFormat(res.response[0].createdAt);
        let prodTempArray = [];
        for (let i = 0; i < productArray.length; i++) {
          prodTempArray.push({
            "productName": productArray[i].productName,
            "desc": productArray[i].description,
            "status": productArray[i].competitorType,
            "pageType": '3',
          })
        }
        for (let j = 0; j < prodTempArray.length; j++) {
          for (let i = 0; i < this.getAllProductArray.length; i++) {
            if (this.getAllProductArray[i].productId == prodTempArray[j].productName) {
              prodTempArray[j].productName = this.getAllProductArray[i].createdAt;
            }
          }
        }
        this.currentCompetitor = prodTempArray;
        this.permission = res.response[0].permissionType;
        if (this.permission == 3) {
          this.parmissionIndivisualHide = false;
        }
        this.permissionIndiVisual = res.response[0].accessId;
        //console.log("alluser>>>>>>>>>>>>>>>>>>>>", this.allUser);
        for (let a = 0; a < this.allUser.length; a++) {
          if (this.allUser[a].userId == res.response[0].assignTo) {
            this.assignToUser = this.allUser[a].firstName + ' ' + this.allUser[a].lastName;
          }
        }

        this.actualProductName = res.response[0].productName;
      }
    });
  }
  getAllUser() {
    let param = {};
    this.leadRest.getAllUser(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allUser = res.response;
        //console.log('>>>>>>>>>>', this.allUser);
      }
    });
  }


  modalClose(): void {
    this.modalService.dismissAll();
  }
  getAallStageCompleteDetails(): any {
    let param = {
      "userId": this.userId,
      "opportunityId": this.opportunityId
    };
    this.leadRest.getUpdateStagedetails(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.getAllStageCompleteDetails = res.response;
        for (let i = 0; i < this.getAllStageCompleteDetails.length; i++) {
          this.getAllStageCompleteDetails[i].ExpectedClosing = this.common.getDateFormat(this.getAllStageCompleteDetails[i].ExpectedClosing);
          this.getAllStageCompleteDetails[i].modifiedAt = this.common.getDateFormat(this.getAllStageCompleteDetails[i].modifiedAt);
        }
      }
    });
  }
  getAllProduct(): any {
    let param = {
      "clientId": this.clientId
    };
    this.leadRest.getAllProduct(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.getAllProductArray = res.response
      }
    });
  }
  addActivityFunc(): any {
    this.activityType = "";
    this.dueDate = "";
    this.activitydescription = "";
    this.ActivityassignTo = "";
    this.modalService.open(this.addActivityModal, { centered: true });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  addActivityopp(): any {

    if(this.activityType == ""){
      this.notifier.notify('error',"Please select activity type");
      return;
    }
    if(this.dueDate == ""){
      this.notifier.notify('error',"Please choose due date");
      return;
    }
    if(this.activitydescription == ""){
      this.notifier.notify('error',"Please enter description");
      return;
    }
    if(this.activitydescription != ""){
      if(this.activitydescription.length > 100){
        this.notifier.notify('error',"Please enter description within 100 characters");
      return;
      }
    }
    let param = {
      'userId': this.userId,
      'opportunityId': this.opportunityId,
      'clientId': this.clientId,
      'activityTypeId': this.activityType,
      'dueDate': this.common.getDateFormatNew1(this.dueDate),
      'description': this.activitydescription,
      'assignTo': (this.ActivityassignTo == '' ? this.userId : this.ActivityassignTo)
    };
    this.leadRest.addActivity(param).subscribe((res: any) => {
      this.activityType = '';
      this.dueDate = '';
      this.activitydescription = '';
      if(res.success){
        this.notifier.notify('success', res.message);
        this.modalClose();
        this.getAllActivityLogs();
      } else{
        this.notifier.notify('error',res.message);
      }

    });
  }
  getAllActivityLogs(): any {
    let param = {
      'userId': this.userId,
      'opportunityId': this.opportunityId,
      'type': this.activityTypeData,
      'limit': this.limit,
      'offset': this.offset
    };
    this.leadRest.getAllActivityLog(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        //console.log("opp>res", res);
        if (res.response.activityListData.length == 0) {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
        } else {
          this.allActivityArray = res.response.activityListData;
          this.isdisable = res.response.activityListData.length < this.limit ? true : false;
        }
      }
    });
  }
  cancelActivity(activityId: any): any {
    let param = {
      "userId": this.userId,
      "id": activityId
    };
    this.leadRest.cancelActivity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.getAllActivityLogs();
      }
    })
  }
  completeTusk(activityId: any): any {
    let param = {
      "userId": this.userId,
      "id": activityId
    };
    this.leadRest.conpleteActivity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.getAllActivityLogs();
      }
    })
  }
  backToPreviousPage(): any {
    this._location.back();
  }
  addApportunity(): any {
    this.common.isOpportunityAdd = true;
    this.modalService.open(OpportunityModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      //console.log(elem)
      if (elem) {
        elem[elem.length - 1].classList.add('addContactModal')
      }
    }, 200);
  }

  editOpportunity(): any {
    this.common.isOpportunityAdd = false;
    this.common.opportunatiId = this.opportunityId;
    this.modalService.open(OpportunityModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[elem.length - 1].classList.add('addContactModal')
      }
    }, 200);
  }


  pastActivity() {
    this.activityListStatus = true;
    this.activityTypeData = "past";
    this.allActivityArray = [];
    this.getAllActivityLogs();

  }

  upcomingActivity() {
    this.activityListStatus = false;
    this.activityTypeData = "up";
    this.allActivityArray = [];
    this.getAllActivityLogs();
  }


  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllActivityLogs();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllActivityLogs();
  }


  //-------------get all reason------------------//

  getReason() {
    this.leadRest.getAllReason().subscribe((res: any) => {
      //console.log(">>>>>>>>>>>>>>>>>reason>>>>>>Res>>>>>>>>", res);
      if (res.success) {
        this.reasonList = res.response;
      }
    })
  }
  

  //------------------ Final Closed Own Closed Lost ------------------------//

  selectOption(type: any) {
    if (type == 0) {
      this.closeOwn = true;
      this.closedwon = "1";
      this.closeLost = false;
    } else {
      this.closeOwn = false;
      this.closeLost = true;
      this.closedwon = "2";
    }
  }


  //---------------------  Final  Click Stage Name -----------------------------//

  finalStageName(stageId:any){
    //console.log("stageId>>>>>>>>>>>",stageId);
   // if(stageId == (this.salesStageArray.length - 1)){
    if(stageId == this.salesStageArray[this.salesStageArray.length-1].salesStageId){
      this.oppTable = true;
    }
    else{
      this.oppTable = false;
    }
    this.stageSequenceId = stageId;
    this.fetchStageData();
    this.oppStageTable = true;
  }

  //--------------------  Click Mark This Stage as Complete --------------//

  finalOppStageMarkAsComplete(){
   // this.previousStageDropdown = false;
    this.nextStage = "";
    this.finalAmount = "";
    this.finalWining = "";
    this.finalRevenue = "";
    this.finalExpectedclosing = "";
    this.finalFollowUpDate = "";
    this.finalProposalValues = "";
    this.finalProposalnumber = "";
    this.finalproposalSent = "" as any;
    this.finalProposalSentFlag = false;
    this.fileUpload = "";
    this.finalDecisionArr = [];
    this.fileUploadStatus = false;
    this.finalProposalSentDate = "";
    this.finalNextFollowUpDate = "";
    this.finalCustomerproposedValue = "";
    this.finalMutuallyAgreedContactValue = "";
    this.finalClosingAmount = "";
    this.finalClosingDate = "";
    this.finalClosingDescription = "";
    this.finalClosingReason = "";
    this.finalLostClosingDescription = "";

    this.modalService.open(this.finalOppStageMarkCom,{centered:true})
  }

  finalStageSubmit(){

    //console.log("Proposal Sent???????????????????",this.finalproposalSent);

    if(this.nextStage == "" || this.nextStage == null){
      this.notifier.notify("error","Please select next stage");
      return;
    }
    if(this.finalAmount == "" || this.finalAmount == null){
      this.notifier.notify("error","Please enter amount");
      return;
    }
    if(this.finalWining == "" || this.finalWining == null){
      this.notifier.notify("error","Please enter probability of wining");
      return;
    }
    if(this.finalRevenue == "" || this.finalRevenue ==null){
      this.notifier.notify("error","Please enter expected revenue");
      return;
    }
    if(this.finalExpectedclosing == "" || this.finalExpectedclosing == null){
      this.notifier.notify("error","Please choose expected closing date");
      return;
    }
    // if(this.finalFollowUpDate == ""){
    //   this.notifier.notify("error","Please enter expected revenue");
    //   return;
    // }
    // if(this.finalProposalValues == ""){
    //   this.notifier.notify("error","Please enter proposal value");
    //   return;
    // }
    // if(this.finalProposalNumber == ""){
    //   this.notifier.notify("error","Please enter proposal number");
    //   return;
    // }
    if(this.finalproposalSent === ""){
      this.notifier.notify("error","Please choose proposal sent");
      return;
    }
    // if(this.finalproposalSent == '1'){
    //   if(this.fileUpload == ""){
    //     this.notifier.notify('error',"Please upload file");
    //     return;
    //   }
    //   if(this.finalProposalSentDate == ""){
    //     this.notifier.notify('error',"Please choose final proposal sent date");
    //     return;
    //   }
    //   if(this.finalNextFollowUpDate == ""){
    //     this.notifier.notify('error',"Please choose final proposal next follow up date");
    //     return;
    //   }
    // }
    // if(this.finalCustomerproposedValue == ""){
    //   this.notifier.notify("error","Please enter customer proposed value");
    //   return;
    // }
    
    if(this.finalMutuallyAgreedContactValue == "" || this.finalMutuallyAgreedContactValue == null){
      this.notifier.notify("error","Please enter mutually agreed contact value");
      return;
    }

    const data = {
      nxtStageId:this.nextStage,
      opportunityId: this.opportunityId,
      amount:this.finalAmount === "" ? null : this.finalAmount,
      probOfWin:this.finalWining === "" ? null : this.finalWining,
      //stageSlNo:this.salesStage.toString(),
      stageId:this.salesStage.toString(),
      revenue:this.finalRevenue === "" ? null : this.finalRevenue,
      expectedClosingDate:this.finalExpectedclosing === "" ? null : this.finalExpectedclosing,
      followUpDate:this.finalFollowUpDate === "" ? null : this.finalFollowUpDate,
      //decisionArr:this.finalDecisionArr,
      proposalValue:this.finalProposalValues === "" ? null : this.finalProposalValues,
      proposalNumber:this.finalProposalnumber === "" ? null : this.finalProposalnumber,
      proposalSent:this.finalproposalSent.toString(),
      proposalFile:this.fileUpload,
      proposalSentDate:this.finalProposalSentDate === "" ? null : this.finalProposalSentDate,
      nextFollowUpDate:this.finalNextFollowUpDate === "" ? null : this.finalNextFollowUpDate,
      customerProposedValue:this.finalCustomerproposedValue === "" ? '0' : this.finalCustomerproposedValue,
      mutuallyAgreedContactValue:this.finalMutuallyAgreedContactValue === "" ? '0' : this.finalMutuallyAgreedContactValue,
      closeType:this.closedwon,
      closingAmount:this.finalClosingAmount === "" ? '0' : this.finalClosingAmount,
      closingDate:this.finalClosingDate === "" ? null : this.finalClosingDate,
      description:this.finalClosingDescription,
      closingReason:this.finalClosingReason === "" ? '0' : this.finalClosingReason
      //lostClosingDescription:this.finalLostClosingDescription
    };
    //console.log("Request Data for Opportunity stage complete",data);
    this.leadRest.oppStageComplete(data).subscribe((res:any)=>{
      if(res.success){
        this.getOpportunityById();
        this.nextStage = "";
        this.finalAmount = "";
        this.finalWining = "";
        this.finalRevenue = "";
        this.finalExpectedclosing = "";
        this.finalFollowUpDate = "";
        this.finalProposalValues = "";
        this.finalProposalnumber = "";
        this.finalproposalSent = "" as any;
        this.finalProposalSentFlag = false;
        this.fileUpload = "";
        this.finalDecisionArr = [];
        this.fileUploadStatus = false;
        this.finalProposalSentDate = "";
        this.finalNextFollowUpDate = "";
        this.finalCustomerproposedValue = "";
        this.finalMutuallyAgreedContactValue = "";
        this.finalClosingAmount = "";
        this.finalClosingDate = "";
        this.finalClosingDescription = "";
        this.finalClosingReason = "";
        this.finalLostClosingDescription = "";
        this.modalClose();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })

    
  }


  finalStageChange(){
    this.nextStageDropdown = true;
    //console.log("opp stage data>>>>>>>>>>>>>>>>>>>>>>>>>",this.oppStageData);
    this.nextStage = this.oppStageData[0].nxtStageId;
    //console.log("Fetch next stage id>>",this.nextStage);
    this.stageIdForUpdate = this.oppStageData[0].id;
    this.finalAmount = this.oppStageData[0].amount;
    this.finalWining = this.oppStageData[0].probOfWin;
    this.finalRevenue = this.oppStageData[0].expectedRevenue;
    this.finalExpectedclosing = this.common.getDateFormatNew3(this.oppStageData[0].expectedClosingDate).split(" ")[0];
    this.finalFollowUpDate = this.common.getDateFormatNew3(this.oppStageData[0].followUpDate).split(" ")[0];
    this.finalProposalValues = this.oppStageData[0].proposalValue;
    this.finalProposalnumber = this.oppStageData[0].proposalNumber;
    this.finalproposalSent = this.oppStageData[0].proposalSent;
    if(this.finalproposalSent == "1"){
      this.imageSrc = this.common.imagePath + this.oppStageData[0].uploadedProposalFile;
      this.fileUploadStatus = true;
      //console.log("this img src>>>>>>>>",this.imageSrc);
      this.finalProposalSentFlag = true;
      this.finalProposalSentDate = this.common.getDateFormatNew3(this.oppStageData[0].proposalSentDate).split(" ")[0];
      this.finalNextFollowUpDate = this.common.getDateFormatNew3(this.oppStageData[0].nextFollowUpDate).split(" ")[0];
    }
    this.finalCustomerproposedValue = this.oppStageData[0].proposedValueByCust;
    this.finalMutuallyAgreedContactValue = this.oppStageData[0].mutuaagredContactvAL;
    this.closedwon = this.oppStageData[0].closeType;
    if(this.closedwon == "1"){
      this.closeOwn = true;
      this.finalClosingAmount = this.oppStageData[0].closeAmount;
      this.finalClosingDate = this.common.getDateFormatNew3(this.oppStageData[0].closeDate).split(" ")[0];
      this.finalClosingDescription = this.oppStageData[0].closeDescription;
    }
    else{
      this.closedLost = true;
      this.finalClosingReason = this.oppStageData[0].closeReason;
      this.finalClosingDescription = this.oppStageData[0].closeDescription;
    }


    this.modalService.open(this.finalOppStageMarkCom,{centered:true});
  }


  finalUpdateStage(){

    // if(this.finalAmount == ""){
    //   this.notifier.notify("error","Please enter amount");
    //   return;
    // }

    if(this.nextStage == "" || this.nextStage == null){
      this.notifier.notify("error","Please select next stage");
      return;
    }
    if(this.finalAmount == "" || this.finalAmount == null){
      this.notifier.notify("error","Please enter amount");
      return;
    }
    
    if(this.finalWining == "" || this.finalWining == null){
      this.notifier.notify("error","Please enter probability of wining");
      return;
    }
    if(this.finalRevenue == "" || this.finalRevenue == null){
      this.notifier.notify("error","Please enter expected revenue");
      return;
    }
    if(this.finalExpectedclosing == "" || this.finalExpectedclosing == null){
      this.notifier.notify("error","Please enter expected revenue");
      return;
    }


    // if(this.finalFollowUpDate == ""){
    //   this.notifier.notify("error","Please choose follow up date");
    //   return;
    // }
    // if(this.finalProposalValues == ""){
    //   this.notifier.notify("error","Please enter proposal value");
    //   return;
    // }
    // if(this.finalProposalNumber == ""){
    //   this.notifier.notify("error","Please enter proposal number");
    //   return;
    // }


    if(this.finalproposalSent === ""){
      this.notifier.notify("error","Please choose proposal sent");
      return;
    }


    // if(this.finalproposalSent == '1'){
    //   if(this.fileUpload == ""){
    //     this.notifier.notify('error',"Please upload file");
    //     return;
    //   }
    //   if(this.finalProposalSentDate == ""){
    //     this.notifier.notify('error',"Please choose final proposal sent date");
    //     return;
    //   }
    //   if(this.finalNextFollowUpDate == ""){
    //     this.notifier.notify('error',"Please choose final proposal next follow up date");
    //     return;
    //   }
    // }
    // if(this.finalCustomerproposedValue == ""){
    //   this.notifier.notify("error","Please enter customer proposed value");
    //   return;
    // }


    if(this.finalMutuallyAgreedContactValue == "" || this.finalMutuallyAgreedContactValue == null){
      this.notifier.notify("error","Please enter mutually agreed contact value");
      return;
    }

    const data = {
      nxtStageId:this.nextStage,
      opportunityId: this.opportunityId,
      opportunityStageTableId: Number(this.stageIdForUpdate),
      amount:this.finalAmount === "" ? null : this.finalAmount,
      probOfWin:this.finalWining === "" ? null : this.finalWining,
      stageSlNo:this.salesStage.toString(),
      revenue:this.finalRevenue === "" ? null : this.finalRevenue,
      expectedClosingDate:this.finalExpectedclosing === "" ? null : this.finalExpectedclosing,
      followUpDate:this.finalFollowUpDate === "" ? null : this.finalFollowUpDate,
      decisionArr:this.finalDecisionArr,
      proposalValue:this.finalProposalValues === "" ? null : this.finalProposalValues,
      proposalNumber:this.finalProposalnumber === "" ? null : this.finalProposalnumber,
      proposalSent:this.finalproposalSent.toString(),
      proposalFile:this.fileUpload,
      proposalSentDate:this.finalProposalSentDate === "" ? null : this.finalProposalSentDate,
      nextFollowUpDate:this.finalNextFollowUpDate === "" ? null : this.finalNextFollowUpDate,
      customerProposedValue:this.finalCustomerproposedValue.toString(),
      mutuallyAgreedContactValue:this.finalMutuallyAgreedContactValue === "" ? '0' : this.finalMutuallyAgreedContactValue,
      closeType:this.closedwon,
      closingAmount:this.finalClosingAmount.toString(),
      closingDate:this.finalClosingDate === "" ? null : this.finalClosingDate,
      description:this.finalClosingDescription,
      closingReason:this.finalClosingReason === "" ? '0' : this.finalClosingReason
      //lostClosingDescription:this.finalLostClosingDescription
    };
    //console.log("Request Data for Opportunity stage update",data);
    this.leadRest.oppStageChange(data).subscribe((res:any)=>{
      if(res.success){
        this.getOpportunityById();
        this.fetchStageData();
        this.modalClose();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })

  }

  fetchStageData(){
    const data = {
      opportunityId:this.opportunityId,
      stageSlNo:this.stageSequenceId
    };
    //console.log("Request Data for For fetch",data);
    this.leadRest.oppStageDetails(data).subscribe((res:any)=>{
      if(res.success){
        this.oppStageData = res.response;
        //console.log("opp stage table value>>>>>>>>",this.oppStageData);
        if(this.oppStageData.length > 0){
          this.oppStageUpdateFlag = true;
        } else{
          this.oppStageUpdateFlag = false;
        }
      }
    })
  }

//----------------  Final Pop up --------------------------//

  finalProposalSentChk(){
    //console.log("final proposal sent:::::::::::",this.finalproposalSent);
    if(this.finalproposalSent == "1"){
      this.finalProposalSentFlag = true;
    } else{
      this.finalProposalSentFlag = false;
    }
  }
  finalAddAnalysis() {
    this.finalDecisionArr.push(
      {
        "decisionMakerName": "",
        "decisionMakerDesignation": "",
        "decisionMakerAuth": ""
      })

  }
  finalRemoveDecision(i: any) {
    this.finalDecisionArr.splice(i, 1);

  }

  getAllOppNatureStatus(){
    const data = {
      type:"2"
    };
    this.leadRest.getNature(data).subscribe((res:any)=>{
      if(res.success){
        this.natureList = res.response;
      }
    })
  }

//---------------------- For Status Change----------------------//


  statusChange(statusType:any){
    const data = {
      opportunityId:this.opportunityId,
      opportunityTypeStatus:statusType
    };
    this.leadRest.oppStatusChange(data).subscribe((res:any)=>{
      if(res.success){
        this.getOpportunityById();
        this.modalClose();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })

  }

  uploadFile() {
    const banner = document.getElementById('upload') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      //this.fileUploadStatus = true;
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const fileData = new FormData();
        fileData.append('file', file[0]);
        this.leadRest.uploadFile(fileData).subscribe((res: any) => {
          //console.log("res upload>>>",res);
          if (res.success) {
            this.fileUploadStatus = true;
            this.fileUpload = res.response.fileName;
            this.uploadedFileName = res.response.orgfilename;
            //console.log("File name is:", this.fileUpload);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }
        })
      }
    }
  }
}
