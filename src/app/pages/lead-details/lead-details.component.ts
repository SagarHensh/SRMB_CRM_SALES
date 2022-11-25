import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { LeadService } from '../../service/lead.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { LeadModalComponent } from '../lead-modal/lead-modal.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent implements OnInit {
  clientId: any;
  userId: any;
  userType: any;
  counter: number = 0;
  selectContactHide = true;
  existingContact: any;
  contactId = '';
  gender = '';
  firstName = '';
  LastName = '';
  phone = [{ "phoneNo": "" }];
  email = [{ "email": "" }];
  title = '';
  contactTypeArray: any;
  contactType = 2;
  status = 1;
  leadStatusType = "";
  leadSourceArray: any = [];
  leadSource: any;
  leadtype: any;
  assignTo = 0;
  allUser: any = [];
  assignToDropDownHide = true;
  assignToUser: any;
  address: any;
  state: any;
  district: any;
  zone: any;
  geo: any;
  lat: any;
  long: any;
  countryArray: any;
  country: any;
  allStateArray: any;
  allcityArray: any;
  allZoneArray: any;
  // ORGANIZATION START FROM HERE
  selectOrganizationHide = true;
  allOrganizationArray: any;
  organizationId = '';
  organizationName: any;
  ownerName: any;
  username:any;
  visitStatusName ="" as any;
  customerFeedback = "" as any;
  nextFollowUpDate = "" as any;
  convertedStatus = "" as any;
  CRMapprovedStatus = "" as any;
  itemNames = "" as any;
  itemFeedback = "" as any;
  createdAt = "" as any;
  VisitDetails_Array: any = [];


  customerName:any;
  VisitDate:any;
  OrgPhone = [{ "OrgPhone": "" }];
  OrgEmail = [{ "OrgEmail": "" }];
  orgAnualRevenue: any;
  numberOfEmp: any;
  ORGaddress: any;
  ORGcountry: any;
  ORGstate: any;
  ORGdistrict: any;
  ORGzone: any;
  ORG_Long: any;
  ORG_LAT: any;
  ORG_GEO: any;
  // DESCRIPTION START FROM HERE
  description = [{ "desc": "" }];
  // PRODUCT
  getAllProductArray: any = [];
  product: any;
  currentCompetitor = [{ "productName": "", "desc": "", "status": "1", "pageType": '2' }];
  // SOCIAL MEDIA
  getAllPlatForm: any;
  socialMediaLink = [{ 'platform': "", "link": "", "pageType": '2', 'id': "" }];
  // PERMISSION
  permission: any;
  parmissionIndivisualHide = true;
  permissionIndiVisual: any;
  uploadImageRowName: any;
  uploadImage = '';
  leadStatus: any;
  leadStatusName = "" as any;
  nextLeadStatusName = "" as any;
  actionType = 0 /** 0 => add 1=> Update */
  leadId: any;
  /**
   * Lead Details
   */
  userPhoneNo: any;
  userEmail: any;
  currentliUsing: any;
  compititor: any;
  recordId = "";
  userState = "";
  userCity = "";
  userZone = "";
  orgDescription = "";
  authUserData: any;
  permissionData: any;


  // ACTIVITY
  leadType: any;
  leadActivityDate: any;
  leadActivityUser = "";
  leadActivityDesc: any;
  @ViewChild('addActivity') addActivityModel: any;
  allActivityList: any = [];
  leadStatusInt: any;
  @ViewChild('leadStage') leadStageModal: any;
  StageClosingAmount: any;
  stageCloseProbability: any;
  expectedRevenue: any;
  expectedClosingAmount: any;
  stageDuration: any;
  leadStageData: any = [];
  ORGcountryName: any;
  ORGStageName: any;
  ORGCityName: any;
  ORGZoneName: any;
  leadSourceTypename = '';
  leadSourceName = '';
  isOpen = true;
  isBusinessDetails = false;
  isPersonalDetails = true;
  activityMasterArray: any = [];
  leadCreateAt = '';
  userEmailStr = '';
  leadStatuslist: any = [];
  natureList:any = [];
  //-----------past or activity-------------//

  activityListStatus: boolean = false;
  activityType = "" as any;
  limit = 10;
  offset = 0;
  activityList: any = []

  isPrevious: boolean = false;
  isdisable: boolean = false;

  //-------------Lead Pop Up-------------//

  popUpStageId = "" as any;

  popUpUpdateFlag: boolean = false;

  leadModalCounter: number = 0;



  // --------------- --Final Lead Stage Popup-----------------------------//

  @ViewChild('finalLeadStagePopup') leadFinalPopup: any;
  popUpdescription = "";
  salesStageId = "";
  finalLeadStagePopFlag: boolean = false;
  finalDescription = "";
  finalfollowUpdate = "";
  finalLeadstatus = "";
  finalNextStageId = "" as any;
  finalAmount = "";
  finalProbablityWin = "";
  finalExpectedrevenue = "";
  finalExpClosingDate = "";
  finalStgDuration = "";
  finalLostStatus = "";
  finalLostDescription = "";
  convert: boolean = true;
  disqualified: boolean = false;
  converted = "1" as any;
  stageData: any = [];
  stageTable: boolean = false;
  stageSequenceId = "";
  leadStageTableId = "";
  stageIdForUpdate = "";
  tableHide:boolean = false;
  popUpShow:any;
  //leadStagelist:any = [];
  finalLeadStageList:any;
  //totalLeadStageList:any = [];
 // previousNextStageDropdown: boolean = false;
  nextStageDropdownFlag: boolean = false;
  leadConverted = "" as any;

  VisitDetails      : any;
  visitNoteDetails  : any = [];
  isVisitNote       : boolean = true;

  constructor(private route: ActivatedRoute, private common: CommonService, private leadRest: LeadService,
    private modalService: NgbModal, private notifier: NotifierService, private _location: Location,private router:Router) { }

  ngOnInit(): void {
    this.common.addLeadSubject.subscribe((res: any) => {
      this.getLeadDetails();
    })
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId();
    this.leadId = this.route.snapshot.paramMap.get('id');
    this.getLeadDetails();
    this.getAllCountry();
    // this.getLeadSource();
    this.getAllUser();
    this.getAllProduct();
    this.getAllLeadActivitis();
    this.getAllLeadStatus();
    // this.getAllActivity();
    this.upcomingActivity();
    this.getAllLeadNatureStatus();

    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);
    this.getPermissionData();
  }
  ngOnDestroy(): any {
  }
  getAllActivity(): any {
    this.leadRest.getActivityListMaster().subscribe((res: any) => {
      // console.log("get All activity response are",res);
      if ((res.success) && (res.status)) {
        this.activityMasterArray = res.response;   
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
  //.....................turn it off...................//

  // getLeadSource(): any {
  //   let param = {
  //     'clientId': this.clientId
  //   };
  //   this.leadRest.leadSource(param).subscribe((res: any) => {
  //    // console.log("Response of getLeadSource function>>>>>>>>>>>>>", res);
  //     if ((res.success) && (res.status === 200)) {
  //       this.leadSourceArray = res.response;
  //     }
  //   });
  // }

  allStatusList: any = [
    {
      id: 0,
      name: "No"
    }, {
      id: 1,
      name: "Yes"
    }
  ];
  getAllCountry(): any {
    let param = {};
    this.leadRest.getAllCountry(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.countryArray = res.response;
      }
    });
  }
  onCountryChange(countryId: any): any {
    this.getAllstate(countryId);
  }
  getAllstate(countryId: any) {
    let param = {
      countryId: countryId
    };
    this.leadRest.getAllState(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allStateArray = res.response;
      }
    });
  }
  onStateChange(stateId: any): any {
    this.getAllCity(stateId);
  }
  getAllCity(stateId: any): any {
    let param = {
      stateId: stateId
    };
    this.leadRest.getAllCity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allcityArray = res.response;
      }
    });
  }
  onCityChange(cityId: any): any {
    this.getAllZone(cityId);
  }
  getAllZone(cityId: any): any {
    let param = {
      cityId: cityId
    };
    this.leadRest.getAllZone(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allZoneArray = res.response;
      }
    });
  }
  getAllUser() {
    let param = {};
    this.leadRest.getAllUser(param).subscribe((res: any) => {
           
      if ((res.success) && (res.status == 200)) {
        this.allUser = res.response;
      }
      // console.log("get all users>>",this.allUser[0]);
      for(var i=0; i < this.allUser[i].username.length; i++)
      {   this.allUser[i]= this.allUser[i].username;
          // console.log("all users have::>>",this.allUser[i]);
      }
    });
  }
  getAllProduct(): any {
    let param = {
      "clientId": this.clientId
    };
    this.leadRest.getAllProduct(param).subscribe((res: any) => {
      // console.log("get all Product List :::",res);      
      if ((res.success) && (res.status == 200)) {
        this.getAllProductArray = res.response
        //........jr used this for finding length of the array ..........//
        for( var i=0; i < this.getAllProductArray[i].productName.length ; i++)
        {
          this.getAllProductArray[i] = this.getAllProductArray[i]
          // console.log("get all product is >>>>",this.getAllProductArray[i]);
           
        }
      }
    });
  }
  /**
 * GET LEAD DETAILS BY LEAD ID
 */
  getLeadDetails(): any {
    this.common.spinnerShow();
    let parma = {
      "userId": this.userId,
      "usertypeId": this.userType,
      "leadId": this.leadId,
      "userType": this.userType
    };
    //console.log("Request Data For Lead Details By Id>>>>>>>>>>>>",parma);
    this.leadRest.getLeadDetails(parma).subscribe((res: any) => {
      this.common.spinnerHide();
      if ((res.success) && (res.status == 200)) {
       // console.log("Lead Details By Lead Id==================================", res.response);
        this.finalLeadStageList = res.response[0].RemainingStages;
        this.leadConverted = res.response[0].isConverted;
        if(this.leadConverted == 1){
          this.backToPreviousPage();
        }
        this.recordId = res.response[0].recordId;
        this.actionType = 1;
        this.firstName = res.response[0].ContactDetails.firstName;
        this.LastName = res.response[0].ContactDetails.lastName;
        this.userPhoneNo = res.response[0].ContactDetails.phoneNumber;
        this.userState = res.response[0].ContactDetails.stateName;
        this.userCity = res.response[0].ContactDetails.cityName;
        this.userZone = res.response[0].ContactDetails.zoneName;
        this.userEmailStr = res.response[0].ContactDetails.email;
        this.title = res.response[0].ContactDetails.title;
        this.contactType = res.response[0].ContactDetails.contactTypeId;
        this.status = res.response[0].ContactDetails.status;
        this.leadStatusType = res.response[0].leadTypeStatus;
        this.leadStatusInt = res.response[0].leadStatus;
        this.leadCreateAt = this.common.getDateFormatNew1(res.response[0].createdAt);
        //this.leadStatusName = res.response[0].leadStatusName;
        // console.log("lead status name>>>>>", this.leadStatusName);
        this.nextLeadStatusName = res.response[0].nextleadStatusName;
        let documentProgress = document.getElementById('stage_' + res.response[0].leadStatus) as HTMLElement;
        if (documentProgress) {
          documentProgress.classList.add('active');
        }

        if (this.leadSourceArray.length >= 0) {

          for (let i = 0; i < this.leadSourceArray.length; i++) {
            if (this.leadSourceArray[i].id == res.response[0].leadSource) {
              this.leadSource = this.leadSourceArray[i].name;
            }
          }
        }
        this.leadtype = res.response[0].leadType;
        this.assignTo = Number(res.response[0].assignType);
        if (this.assignTo == 0) {
          this.assignToDropDownHide = false;
        }
        for (let a = 0; a < this.allUser.length; a++) {
          if (this.allUser[a].userId == res.response[0].assignTo) {
            this.assignToUser = this.allUser[a].firstName + ' ' + this.allUser[a].lastName;
          }
        }
        // this.assignToUser = res.response[0].assignTo;
        this.leadSourceTypename = res.response[0].leadSourceTypeName;
        this.leadSourceName = res.response[0].leadSourceName;
        this.address = res.response[0].ContactDetails.address;
        this.ORGcountryName = res.response[0].OrgDetails.countryName;
        this.ORGStageName = res.response[0].OrgDetails.stateName;
        this.ORGCityName = res.response[0].OrgDetails.cityName;
        this.ORGZoneName = res.response[0].OrgDetails.zoneName;

        this.country = res.response[0].ContactDetails.countryId;
        this.getAllstate(this.country);
        this.state = String(res.response[0].ContactDetails.stateId);
        this.getAllCity(this.state);
        this.district = res.response[0].ContactDetails.districtId;
        this.getAllZone(this.district);
        this.zone = res.response[0].ContactDetails.zoneId;
        this.geo = res.response[0].ContactDetails.goLocation;
        this.lat = res.response[0].ContactDetails.latitude;
        this.long = res.response[0].ContactDetails.longitude;
        this.organizationName = res.response[0].OrgDetails.organizationName;
        this.ownerName = res.response[0].OrgDetails.ownerName;
        this.OrgPhone = res.response[0].OrgDetails.phone;
        this.OrgEmail = res.response[0].OrgDetails.email;
        this.ORGaddress = res.response[0].OrgDetails.address;
        this.ORGcountry = res.response[0].OrgDetails.countryName;
        this.ORGstate = res.response[0].OrgDetails.stateId;
        // this.getAllCity(this.ORGstate);
        this.ORGdistrict = res.response[0].OrgDetails.cityId;
        // this.getAllZone(this.ORGdistrict);
        //activity status...................................

        if(JSON.stringify(res.response[0].VisitDetails) == '{}'){
          this.VisitDetails = '';
        } else {
          this.isVisitNote = false;
          this.VisitDetails = res.response[0].VisitDetails;
        }
        for(let i= 0; i<= res.response[0].VisitNoteDetails.length; i++){
          res.response[0].VisitNoteDetails[i].createdAt = this.common.getDateFormat(res.response[0].VisitNoteDetails[i].createdAt)
          this.visitNoteDetails = res.response[0].VisitNoteDetails;
        }
        //..............................................
        this.ORGzone = res.response[0].OrgDetails.zoneId;
        this.ORG_GEO = res.response[0].OrgDetails.goLocation;
        this.ORG_LAT = res.response[0].OrgDetails.latitude;
        this.ORG_Long = res.response[0].OrgDetails.longitude;
        this.orgAnualRevenue = res.response[0].OrgDetails.anualRevenue;
        this.numberOfEmp = res.response[0].OrgDetails.numberOfEmployee;
        this.description = [{ "desc": res.response[0].OrgDetails.description }];
        this.orgDescription = res.response[0].OrgDetails.description;
        let currentCompetitor = [];
        //console.log("Competitor>>>>>>>>>>>>>", res.response[0].Competitor.length);
        for (let h = 0; h < res.response[0].Competitor.length; h++) {
          currentCompetitor.push({
            "productName": String(res.response[0].Competitor[h].productName),
            "desc": res.response[0].Competitor[h].description,
            "status": res.response[0].Competitor[h].competitorType,
            "pageType": "2"
          });
        }
        for (let j = 0; j < currentCompetitor.length; j++) {
          for (let i = 0; i < this.getAllProductArray.length; i++) {
            if (this.getAllProductArray[i].productId == currentCompetitor[j].productName) {
              currentCompetitor[j].productName = this.getAllProductArray[i].createdAt;
            }
          }
        }
       // console.log("Current Competitor>>>>>>>>", currentCompetitor);
        let currentliUsing = [];
        let compititor = [];
        for (let k = 0; k < currentCompetitor.length; k++) {
          if (currentCompetitor[k].status == '1') {
            currentliUsing.push(currentCompetitor[k]);
          } else {
            compititor.push(currentCompetitor[k]);
          }
        }
       // console.log('>>>>>>>>>>>>>>>>>>>', currentliUsing);
        this.currentCompetitor = currentliUsing;
        this.compititor = compititor;
        this.uploadImage = this.common.imagePath + res.response[0].profilePic;
        this.uploadImageRowName = res.response[0].profilePic;
        let platFormTemp = [];
        //console.log("Platform array>>>>>>>>>>>>",res.response[0].Platform);
        for (let z = 0; z < res.response[0].Platform.length; z++) {
          platFormTemp.push({
            "platform": res.response[0].Platform[z].platformId,
            "link": res.response[0].Platform[z].link,
            "pageType": "2",
            "id": res.response[0].Platform[z].id
          });
        }
        this.socialMediaLink = platFormTemp;
       // console.log("Social Link Array>>>>>>>>>>>", this.socialMediaLink);
        this.permission = res.response[0].OrgDetails.permissionType;
        if (this.permission == 3) {
          this.parmissionIndivisualHide = false;
        }
        this.permissionIndiVisual = res.response[0].accessId;
      }
    });
  }
  addActivityFunc(): any {
    this.leadType = "";
    this.leadActivityDate = "";
    this.leadActivityDesc = "";
    this.leadActivityUser = "";
    this.modalService.open(this.addActivityModel, { centered: true });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  closeModal(): any {
    this.modalService.dismissAll();
  }
  addLeadActivity(): any {

    if (this.leadType == "" || this.leadType == null) {
      this.notifier.notify('error', "Please select activity type");
      return;
    }
    if (this.leadActivityDate == "" || this.leadActivityDate == null) {
      this.notifier.notify('error', "Please choose activity date");
      return;
    }
    
    if (this.leadActivityUser == "" || this.leadActivityUser == null) {
      this.notifier.notify('error', "Please select user");
      return;
    }
    if (this.leadActivityDesc == "" || this.leadActivityDesc == null) {
      this.notifier.notify('error', "Please enter activity description");
      return;
    }
    // if (this.common.getUserType() == 2) {
    //   if (this.leadActivityUser == "") {
    //     this.notifier.notify('error', "Please select user");
    //     return;
    //   }

    // }


    let param = {
      "userId": this.userId,
      "leadId": this.leadId,
      "clientId": this.clientId,
      "activityTypeId": this.leadType,
      "dueDate": this.leadActivityDate,
      "description": this.leadActivityDesc,
      "assignTo": this.leadActivityUser
    };
    this.leadRest.addLeadActivity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        //this.getAllLeadActivitis();
        this.getLeadallActivity();
        this.getLeadDetails();
        this.closeModal();

      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  getAllLeadActivitis(): any {
    let param = {
      "userId": this.userId,
      "leadId": this.leadId,
      "userType": this.userType,
      // "clientId":this.common.getClientId(),
      // "limit": "10",
      // "offset": "0"
    };
    this.leadRest.getAllActivites(param).subscribe((res: any) => {
      // console.log("get all Activities api >>",res);
      
      if ((res.success) && (res.status == 200)) {
        this.allActivityList = res.response;
        for (let i = 0; i < this.allActivityList.length; i++) {
          this.allActivityList[i].dueDate = this.common.getDateFormat(this.allActivityList[i].dueDate);
        }
      }
    })
  }


  updateLeadStage(): any {
    let param = {
      "stageId": (Number(this.leadStatusInt) + 1),
      "leadId": this.leadId,
      "Amount": this.StageClosingAmount,
      "ExpectedRevenue": this.expectedRevenue,
      "ExpectedClosing": this.expectedClosingAmount,
      "StageDuration": this.stageDuration,
      "Probability": this.stageCloseProbability,
      "modifiedBy": this.userId,
      "description": ''
    };
    this.leadRest.updateLeadStage(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.closeModal();
        this.getAllCountry();
        // this.getLeadSource();
        this.getAllUser();
        this.getAllProduct();
        this.getLeadDetails();
        this.getAllLeadStage();

      }
    });
  }
  getAllLeadStatus() {
    const data = {
      moduleType: "lead"
    };
    this.leadRest.getAllLeadStatus(data).subscribe((res: any) => {
     // console.log("All Lead Status List>>>>>>>>>>>>>>>>>", res);
      if (res.success) {
        this.leadStatuslist = res.response;
       // console.log("lead status>>>>>>", this.leadStatuslist);
        this.popUpShow = this.leadStatuslist[this.leadStatuslist.length -1].salesStageId;

      }
    })
  }
  getAllLeadStage(): any {
    let param = {
      "userId": this.userId,
      "leadId": this.leadId
    };
   // console.log("Lead data>>>>>>>>>>>>", param);
    this.leadRest.getAllStage(param).subscribe((res: any) => {
    //  console.log("Lead stage>>>>>>>>>>>>>>", res);
      if ((res.success) && (res.status == 200)) {
        for (let v = 0; v < res.response.length; v++) {
          res.response[v].ExpectedClosing = this.common.getDateFormat(res.response[v].ExpectedClosing);
          res.response[v].modifiedAt = this.common.getDateFormat(res.response[v].modifiedAt);
        }
        this.leadStageData = res.response;
      }
    })
  }
  addLead(): any {

    // if (this.common.leadPermissionDetails.addPem != "0") {
    //   this.notifier.notify("error", "Sorry!!! you have no access for lead add");
    //   return;
    // }
    this.common.isAdd = true;
    this.leadRest.newOrExisting = false;
    this.modalService.open(LeadModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  cancelTask(activityId: any): any {
    let param = {
      "userId": this.userId,
      "id": activityId
    };
    this.leadRest.cancelLeadActivity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.getLeadallActivity();
      }
    });
  }
  completeActivity(activityId: any) {
    let param = {
      "userId": this.userId,
      "id": activityId
    };
    this.leadRest.updateActivityLog(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.getLeadallActivity();
      }
    });
  }
  backToPreviousPage(): any {
    this._location.back();
  }
  editLead(): any {

    // if (this.common.leadPermissionDetails.editPem != "0") {
    //   this.notifier.notify("error", "Sorry!!! you have no access for lead edit");
    //   return;
    // }
    
    this.common.spinnerShow();
    this.leadRest.newOrExisting = true;
    this.common.isAdd = false;
    this.common.leadId = this.leadId;
    this.modalService.open(LeadModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  toggleDetails(type: any): any {

  }

  //--------------------past or upcomming------------------//


  getLeadallActivity() {
    const data = {
      "userId": this.userId,
      "leadId": this.leadId,
      "userType": this.userType,
      "type": this.activityType,
      "limit": this.limit,
      "offset": this.offset
    };
  //  console.log("lead activity data>>>>>>>>>>", data);
    this.leadRest.getAllActivites(data).subscribe((res: any) => {
   //   console.log(">>>>>>>>>>>>>>>>>lead activity response>>>>>>>>>>", res);
      if (res.success) {
        if (res.response.activityListData.length == 0) {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
        } else {
          this.activityList = res.response.activityListData;
          this.isdisable = res.response.activityListData.length < this.limit ? true : false;
        }

      }
    })
  }

  upcomingActivity() {
    this.activityListStatus = false;
    this.activityType = "up";
    this.activityList = [];
    this.getLeadallActivity();
  }
  pastActivity() {
    this.activityListStatus = true;
    this.activityType = "past";
    this.activityList = [];
    this.getLeadallActivity();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getLeadallActivity();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getLeadallActivity();
  }

  


  //--------------- Show value into Pop Up-----------------------//


  selectOption(type: any) {
    if (type == 0) {
      this.convert = true;
      this.converted = "1";
      this.disqualified = false;
    } else {
      this.convert = false;
      this.disqualified = true;
      this.converted = "2";
    }
  }

  finalStageName(stageSequenceId: any) {
  //  console.log("Lead Status List Length:::::::::::::::::::::::::::",this.leadStatuslist.length);
     if(stageSequenceId == this.leadStatuslist.length){
      this.tableHide = true;
    } else{
      this.tableHide = false;
    }
    this.stageSequenceId = stageSequenceId;
    this.stageTable = true;
    this.fetchStageData();
  }

  fetchStageData(){
    const data = {
      leadId: this.leadId,
      stageSlNo: this.stageSequenceId.toString()
    };
  //  console.log("Request Data For Fetch Stage Data by Lead Id and Sequence id", data);
    this.leadRest.getStageDetails(data).subscribe((res: any) => {
     // console.log("Stage Data For Lead Table >>>>>>>>>>>>>>>>>>>", res);
      this.stageData = [];
      if (res.success) {
        this.stageData = res.response;
       // console.log("Length of stagedata:::::::", this.stageData);
        if (this.stageData.length > 0) {
          this.finalLeadStagePopFlag = true;
        } else {
          this.finalLeadStagePopFlag = false;
        }
      }
    })

  }

  finalLeadStageMarkAsComplete() {
    // this.salesStageId = saleStageId
    this.nextStageDropdownFlag = false;
    this.finalNextStageId = "";
    this.finalDescription = "";
    this.finalfollowUpdate = "";
    this.finalAmount = "";
    this.finalProbablityWin = "";
    this.finalExpectedrevenue = "";
    this.finalExpClosingDate = "";
    this.finalStgDuration = "";
    this.finalLostStatus = "";
    this.finalLostDescription = "";

    this.modalService.open(this.leadFinalPopup, { centered: true });
  }

  finalLeadStageChange() {
   // this.previousNextStageDropdown = true;
    this.nextStageDropdownFlag = true;
    this.finalNextStageId = this.stageData[0].isConverted.toString();
    //this.finalNextStageId = this.stageData[0].stageId;
    this.leadStageTableId = this.stageData[0].id;
    this.stageIdForUpdate = this.stageData[0].stageId;
   // console.log("stageIdForUpdate>>>>>>>>>>",this.stageIdForUpdate);
    this.finalDescription = this.stageData[0].description;
    this.finalfollowUpdate = this.common.getDateFormatNew3(this.stageData[0].followUpDate).split(" ")[0];
   // console.log("Date>>>>>>>>>>>>>>",this.finalfollowUpdate);
    this.finalAmount = this.stageData[0].amount;
    this.finalProbablityWin = this.stageData[0].probOfWin;
    this.finalExpectedrevenue = this.stageData[0].expectedRevenue;
    this.finalExpClosingDate = this.common.getDateFormatNew3(this.stageData[0].expectedClosingDate).split(" ")[0];
    this.finalStgDuration = this.stageData[0].stageDuration;
    this.converted = this.stageData[0].isConverted;
    if(this.converted == "1"){
      this.convert = true;
    } else{
      this.disqualified = true;
    }
    this.finalLostStatus = this.stageData[0].lostReason;
    this.finalLostDescription = this.stageData[0].lostDescription;

    this.modalService.open(this.leadFinalPopup, { centered: true })

  }

  //-------------------- Final Mark as Complete Pop Up Submit --------------------//

  finalLeadStageSubmit() {

    if(this.finalNextStageId == "" || this.finalNextStageId == null){
      this.notifier.notify('error',"Please select next stage");
      return;
    }

    if (this.finalfollowUpdate == "" || this.finalfollowUpdate == null) {
      this.notifier.notify('error', "Please choose follow up date");
      return;
    }
    if (this.finalAmount == "" || this.finalAmount == null) {
      this.notifier.notify('error', "Please enter final amount");
      return;
    }
    if (this.finalExpectedrevenue == "" || this.finalExpectedrevenue == null) {
      this.notifier.notify('error', "Please enter expected revenue");
      return;
    }
    if (this.finalExpClosingDate == "" || this.finalExpClosingDate == null) {
      this.notifier.notify('error', "Please choose expected closing date");
      return;
    }
    if (this.converted === "2") {
      if (this.finalLostStatus == "" || this.finalLostStatus == null) {
        this.notifier.notify('error', "Please select lost status");
        return;
      }
      if (this.finalLostDescription != "") {
        if (this.popUpdescription.length > 250) {
          this.notifier.notify('error', "Please enter description within 100 characters");
          return;
        }
      }
    }

    const data = {
      leadId: this.leadId,
      //stageSlNo: this.leadStatusInt,
      stageId: this.leadStatusInt,
      nxtStageId:this.finalNextStageId,
      description: this.finalDescription === "" ? null : this.finalDescription,
      followUpDate: this.finalfollowUpdate,
      amount: this.finalAmount,
      probOfWin: this.finalProbablityWin === "" ? '0' : this.finalProbablityWin,
      expectedRevenue: this.finalExpectedrevenue,
      expectedClosingDate: this.finalExpClosingDate,
      stageDuration: this.finalStgDuration === "" ? '0' : this.finalStgDuration,
      isConverted: this.converted,
      lostReason: this.finalLostStatus === "" ? null : this.finalLostStatus,
      lostDescription: this.finalLostDescription === "" ? null : this.finalLostDescription
    };
    // console.log("Request Data for Lead Stage Change:::", data);

    this.leadRest.leadMarkAsComplete(data).subscribe((res: any) => {
      if (res.success) {
        this.leadConverted = "";
        this.getLeadDetails();
        this.finalNextStageId = "";
        this.finalDescription = "";
        this.finalfollowUpdate = "";
        this.finalAmount = "";
        this.finalProbablityWin = "";
        this.finalExpectedrevenue = "";
        this.finalExpClosingDate = "";
        this.finalStgDuration = "";
        this.finalLostStatus = "";
        this.finalLostDescription = "";
        this.closeModal();
       // console.log("Lead Converted value>>>>>>>>>>>>>>",this.leadConverted);
        if(this.leadConverted == 1){
         // console.log("Lead Converted  if condition value>>>>>>>>>>>>>>",this.leadConverted);
          this.backToPreviousPage();
          
        }
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }

  //---------------------------- Final Mark as Complete Popup Update ----------------------//

  finalLeadStageUpdate() {

    if(this.finalNextStageId == "" || this.finalNextStageId == null){
      this.notifier.notify('error',"Please select next stage");
      return;
    }

    if (this.finalfollowUpdate == "" || this.finalfollowUpdate == null) {
      this.notifier.notify('error', "Please choose follow up date");
      return;
    }
    if (this.finalAmount == "" || this.finalAmount == null) {
      this.notifier.notify('error', "Please enter final amount");
      return;
    }
    if (this.finalExpectedrevenue == "" || this.finalExpectedrevenue == null) {
      this.notifier.notify('error', "Please enter expected revenue");
      return;
    }
    if (this.finalExpClosingDate == "" || this.finalExpClosingDate == null) {
      this.notifier.notify('error', "Please choose expected closing date");
      return;
    }
    if (this.converted === "2") {
      if (this.finalLostStatus == "" || this.finalLostStatus == null) {
        this.notifier.notify('error', "Please select lost status");
        return;
      }
      if (this.finalLostDescription != "") {
        if (this.popUpdescription.length > 100) {
          this.notifier.notify('error', "Please enter description within 100 characters");
          return;
        }
      }
    }

    const data = {
      leadId: this.leadId,
      //stageSlNo: this.leadStatusInt,
      stageId:this.stageIdForUpdate,
      leadStageTableId:this.leadStageTableId,
      nxtStageId:this.finalNextStageId,
      description: this.finalDescription === "" ? null : this.finalDescription,
      followUpDate: this.finalfollowUpdate,
      amount: this.finalAmount,
      probOfWin: this.finalProbablityWin === "" ? '0' : this.finalProbablityWin.toString(),
      expectedRevenue: this.finalExpectedrevenue,
      expectedClosingDate: this.finalExpClosingDate,
      stageDuration: this.finalStgDuration === "" ? '0' : this.finalStgDuration.toString(),
      isConverted: this.converted,
      lostReason: this.finalLostStatus === "" ? null : this.finalLostStatus,
      lostDescription: this.finalLostDescription === "" ? null : this.finalLostDescription
    };
   // console.log("Data for Lead Stage Mark As Complete:::", data);

    this.leadRest.leadStageUpdate(data).subscribe((res: any) => {
      if (res.success) {
        this.closeModal();
        this.getLeadDetails();
        this.fetchStageData();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }

  getAllLeadNatureStatus(){
    const data = {
      type:"1"
    };
    this.leadRest.getNature(data).subscribe((res:any)=>{
      if(res.success){
        this.natureList = res.response;
      }
    })
  }

  statusChange(statusId:any){
    const data = {
      leadId:this.leadId,
      leadTypeStatus:statusId
    };
    this.leadRest.leadStatusChange(data).subscribe((res:any)=>{
      if(res.success){
        this.getLeadDetails();
        this.notifier.notify("success",res.message);
      } else{
        this.notifier.notify("error",res.message);
      }
    })
      
  }
  getConvertionStatusForHTML(val: any) {
    let str: any = "";
    if (val == 1) {
      str = "No";
    } else {
      str = "YES"
    }
    return str;
  }
  getStatusForHTML(val: any) {
    let str: any = "";
    if (val == 1) {
      str = "Converted";
    } else {
      str = "Not Converted"
    }
    return str;
  }
  getStatusForHTML1(val: any) {
    let str: any = "";
    if (val == null) {
      str = "N/A";
    } else {
      str = " "
    }
    return str;
  }


}
