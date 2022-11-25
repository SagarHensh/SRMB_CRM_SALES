import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadService } from '../../service/lead.service';
import { CommonService } from '../../service/common.service';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
//------------------------//
import { ContactsService } from 'src/app/service/contacts.service';

@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.css']
})
export class LeadModalComponent implements OnInit {
  newOrExisting = this.leadRest.newOrExisting;
  clientId: any;
  userId: any;
  userType: any;
  counter: number = 0;
  selectContactHide = true;
  existingContact: any;
  contactSourceType = "" as any;
  orgSourceType = "" as any;
  contactId = '';
  gender = '';
  firstName = '';
  LastName = '';
  phone = [{ "phoneNo": "" }];
  email = [{ "email": "" }];
  title = '';
  contactTypeArray: any;
  contactType =  "" as any;
  status = 1;
  leadSourceArray: any;
  leadStatusType = "" as any;
  leadSource = '';
  leadtype = '' as any;
  assignTo = 0;
  allUser: any;
  assignToDropDownHide = true;
  assignToUser = "";
  address = '';
  state = '';
  district = '';
  zone = '';
  geo = "";
  lat = '';
  long = '';
  countryArray: any;
  country = '';
  allStateArray: any = [];
  allcityArray: any = [];
  allZoneArray: any = [];
  allOrgStateArray: any = [];
  allOrgcityArray: any = [];
  allOrgZoneArray: any = [];
  natureList:any = [];
  // ORGANIZATION START FROM HERE
  selectOrganizationHide = true;
  allOrganizationArray: any;
  organizationId = '';
  organizationName = '';
  ownerName = '';
  OrgPhone = [{ "OrgPhone": "" }];
  OrgEmail = [{ "OrgEmail": "" }];
  orgAnualRevenue = '';
  numberOfEmp = '';
  ORGaddress = '';
  ORGcountry = '';
  ORGstate = '';
  ORGdistrict = '';
  ORGzone = '';
  ORG_Long = '';
  ORG_LAT = '';
  ORG_GEO = '';
  // DESCRIPTION START FROM HERE
  orgFieldDisabled: boolean = false;
  contactFieldDisabled: boolean = false;
  description = [{ "desc": "" }];
  // PRODUCT
  getAllProductArray: any;
  product: any;
  currentCompetitor = [{ "productTakenType": "", "newProductName": "", "productName": "", "desc": "", "status": "1", "pageType": '2' }];
  // SOCIAL MEDIA
  getAllPlatForm: any;
  socialMediaLink = [{ 'platform': "", "link": "", "pageType": '2', "id": '' }];
  // PERMISSION
  permission = '';
  parmissionIndivisualTypeHide = true;
  parmissionIndivisualHide = true;
  permissionIndiVisual = '' as any;
  uploadImageRowName: any;
  uploadImage = '';
  leadStage = "" as any;
  actionType = 0 /** 0 => add 1=> Update */
  // ***************************************************

  firstNameError = '';
  lastNameError = '';
  isAdd: any;
  leadSourceType: any = [];
  leadSourceList: any;
  leadStatuslist: any = [];
  //-------------- Product Taken Type---------------------//

  productTakenType = "" as any;
  newProductName = "" as any;
  productTypeFlag: boolean = false;
  newProductTakenFlag: boolean = false;
  existingProductTakenFlag: boolean = false;



  //------------------------For oppertunity-----------------//


  opportunityName = "" as any;
  contactPersionName = "" as any;
  opportunityFlag: boolean = false;
  Oppcategory = 0 as any;
  winingValue = 0 as any;
  expectedCloseDate = "" as any;
  ActualCloseDate = "" as any;
  expectedRevenue = "" as any;
  salesStage = "" as any;
  productName = "" as any;
  //permission = "" as any;
  productDesc = "" as any;
  finalValue = "" as any;
  discount = "" as any;
  listValue = "" as any;
  quantity = "" as any;
  productQtn = "" as any;
  productAddress = "" as any;
  //permissionIndiVisual = "" as any;
  contactPersonNameList: any = [];
  salesStageList: any = [];
  productList: any = [];
  //-----------------product calculation---------------------//
  prodQty: number = 0;
  prodListValue: number = 0;
  prodDis: number = 0;

  constructor(private modalService: NgbModal, private leadRest: LeadService, private common: CommonService,
    private notifier: NotifierService, private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.isAdd = this.common.isAdd;
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId();
    if (this.userType != 2) {
      this.assignToDropDownHide = false;
      this.parmissionIndivisualTypeHide = false;
    } else {
      this.assignToUser = this.userId;
      this.permissionIndiVisual = this.userId;
    }
    this.getLeadSourceType();
    this.getContentType();
    this.getAllLeadStatus();
    this.getAllLeadNatureStatus();
    //-------------Oppr----------//
    this.getSalesStage();
    this.getProduct();
    //-------------End-Oppr-------------//
    this.getAllUser();
    this.getAllCountry();
    this.getAllProduct();
    this.getPlatForm();
    if (this.common.isAdd !== true) {
      this.getLeadDetails();
    }
  }
  modalClose(): void {
    this.modalService.dismissAll();
  }
  getLeadSourceType(): any {
    let data = {};
    this.leadRest.getLeadSourceType(data).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.leadSourceType = res.response;
        //console.log("All Lead Source Type>>>>>>>>>>>>",this.leadSourceType);
      }
    })
  }
  contactTakenType(e: any): any {
    if (e == 0) {
      this.contactSourceType = "0";
      this.contactFieldDisabled = true;
      this.selectContactHide = false;
      this.getexistingContacts();
    } if(e == 1) {
      this.contactSourceType = "1";
      this.contactFieldDisabled = false;
      this.selectContactHide = true;

      //------------------- For New Contact---------------//

      this.firstName = "";
      this.LastName = "";
      this.phone = [{ "phoneNo": "" }];
      this.email = [{ "email": "" }];
      this.title = "";
      this.contactType = "";
      this.status = 1;
      this.address = "";
      this.country = "";
      this.getAllstate(this.country);
      this.state = "";
      this.getAllCity(this.state);
      this.district = "";
      this.getAllZone(this.district);
      this.zone = "";
      this.geo = "";
      this.lat = "";
      this.long = "";

    }
  }
  getexistingContacts(): any {
    let param = {
      userId: this.userId,
      usertypeId: this.userType
    };
    this.leadRest.getExistingContact(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.existingContact = res.response;
     }
    //  console.log("GET EXISTING CONTACTS>>>>>>>>>",this.existingContact);

    })
  }
  getContentType(): any {
    let param = {}
    this.leadRest.getContentType(param).subscribe((res: any) => {
    //  console.log("lead contact tyepe list>>>>>>>", res);
      if ((res.success) && (res.status === 200)) {
        this.contactTypeArray = res.response;
      }
      // console.log("get Contact Type List>>>>>",this.contactTypeArray);
      
    });
  }

  //................turn it off.................//
  // getLeadSource(): any {
  //   let param = {
  //     'clientId': this.clientId
  //   };
  //   this.leadRest.leadSource(param).subscribe((res: any) => {
  //     if ((res.success) && (res.status === 200)) {
  //       this.leadSourceArray = res.response;
  //     }
  //   });
  // }
  getAllUser() {
    let param = {};
    this.leadRest.getAllUser(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allUser = res.response;
      }
    });
  }
  getAllCountry(): any {
    let param = {};
    this.leadRest.getAllCountry(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.countryArray = res.response;
      }
    });
  }
  onCountryChange(countryId: any, flag = 0): any {
    if (flag == 0) {
      this.getAllstate(this.country);
    } else {
      this.getAllstate(this.ORGcountry, 1);
    }
  }
  getAllstate(countryId: any, flag = 0) {
    let param = {
      countryId: countryId
    };
    this.leadRest.getAllState(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        if (flag === 0) {
          this.allStateArray = res.response;
          if (this.state !== '') {
            let d = this.state;
            this.state = '';
            setTimeout(() => {
              this.state = d;
              if (this.state !== '') {
                this.getAllCity(this.state, flag);
              }
            }, 20);
          }
        } else {
          this.allOrgStateArray = res.response;
          if (this.ORGstate !== '') {
            let d = this.ORGstate;
            this.ORGstate = '';
            setTimeout(() => {
              this.ORGstate = d;
              if (this.ORGstate !== '') {
                this.getAllCity(this.ORGstate, flag);
              }
            }, 20);
          }
        }
      }
    });
  }
  onStateChange(stateId: any, flag = 0): any {
    if (flag == 0) {
      this.getAllCity(this.state);
    } else {
      this.getAllCity(this.ORGstate, 1);
    }
  }
  getAllCity(stateId: any, flag = 0): any {
    let param = {
      stateId: stateId
    };
    this.leadRest.getAllCity(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {

        if (flag === 0) {
          this.allcityArray = res.response;
          //console.log("state list>>>>>>>>", this.allcityArray);
          if (this.district !== '') {
            let d = this.district;
            this.district = '';
            setTimeout(() => {
              this.district = d;
              if (this.district !== '') {
                this.getAllZone(this.district, flag);
              }
            }, 20);
          }
        } else {
          this.allOrgcityArray = res.response;
          if (this.ORGdistrict !== '') {
            let d = this.ORGdistrict;
            this.ORGdistrict = '';
            setTimeout(() => {
              this.ORGdistrict = d;
              if (this.ORGdistrict !== '') {
                this.getAllZone(this.ORGdistrict, flag);
              }
            }, 20);
          }
        }
      }
    });
  }
  onCityChange(cityId: any, flag = 0): any {
    if (flag == 0) {
      this.getAllZone(this.district);
    } else {
      this.getAllZone(this.ORGdistrict, 1);
    }
  }
  getAllZone(cityId: any, flag = 0): any {
    let param = {
      cityId: cityId
    };
    this.leadRest.getAllZone(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        if (flag === 0) {
          this.allZoneArray = res.response;
          //console.log("zone list>>>>>>>>>", this.allZoneArray);
          if (this.zone !== '') {
            let d = this.zone;
            this.zone = '';
            setTimeout(() => {
              this.zone = d;
            }, 20);
          }
        } else {
          this.allOrgZoneArray = res.response;
          if (this.ORGzone !== '') {
            let d = this.ORGzone;
            this.ORGzone = '';
            setTimeout(() => {
              this.ORGzone = d;
            }, 20);
          }
        }
      }
    });
  }
  /*
   * ORGANIZATION START FROM HERE
   */
  organizationTakenType(type: any): any {
    if (type == 0) {
      this.orgSourceType = "0";
      this.selectOrganizationHide = false;
      this.getAllOrganization();
      this.orgFieldDisabled = true;
    } if(type == 1) {
      this.orgSourceType = "1";
      this.orgFieldDisabled = false;
      this.selectOrganizationHide = true;

      //---------------- For New--------------------//

      this.organizationName = '';
      this.ownerName = '';
      this.OrgPhone = [{ "OrgPhone": "" }];
      this.OrgEmail = [{ "OrgEmail": "" }];
      this.orgAnualRevenue = '';
      this.numberOfEmp = '';
      this.ORGaddress = '';
      this.ORGcountry = '';
      this.ORGstate = '';
      this.ORGdistrict = '';
      this.ORGzone = '';
      this.ORG_Long = '';
      this.ORG_LAT = '';
      this.ORG_GEO = '';
    }
  }
  getAllOrganization(): any {
    let param = {
      userId: this.userId,
      usertypeId: this.userType
    };
    this.leadRest.getAllOrganization(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allOrganizationArray = res.response;
       // console.log("allOrganizationArray>>>>>>>>>>>>>>>", this.allOrganizationArray);

      }
    });
  }
  addBuisnessNewField_phone(): any {
    this.OrgPhone.push({ "OrgPhone": "" });
  }
  removeOrgPhone(i: any) {
    this.OrgPhone.splice(i, 1);
  }
  addBuisnessEmailNewField(): any {
    this.OrgEmail.push({ "OrgEmail": "" });
  }
  removeOrgEmail(i: any) {
    this.OrgEmail.splice(i, 1);
  }
  addDescription(): any {
    this.description.push({ "desc": "" });
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
  addCompititor(): any {
    // this.productTypeFlag = false;
    this.currentCompetitor.push({ "productTakenType": "", "newProductName": "", "productName": "", "desc": "", "status": "1", "pageType": '2' });
  }
  addMediaLink(): any {
    this.socialMediaLink.push({ 'platform': "", "link": "", "pageType": '2', "id": '' });
  }
  removeSocialMediaLink(index: any) {
    this.socialMediaLink.splice(index, 1);
  }
  getPermissionData(parmissionType: any): any {
    if (parmissionType == 3) {
      this.parmissionIndivisualHide = false;
    } else {
      this.parmissionIndivisualHide = true;
    }
  }
  getPlatForm(): any {
    let data = {};
    this.leadRest.getSocialPlatform(data).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.getAllPlatForm = res.response;
      }
    });
  }
  getOrganizationDetails(organizationId: any): any {

   // console.log(">>>>>>>>>>>>>>org>>>>>>>>>>>>>>")
    let param = {
      organizationId: organizationId
    };
    this.leadRest.getAllOrganizationDetails(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        //console.log("res>>>>>>>>",res);
        this.organizationId = organizationId;
        this.ownerName = res.response[0].ownerName;
        this.organizationName = res.response[0].organizationName;
        this.OrgPhone = this.common.phoneSplitORG(res.response[0].phone);
        this.OrgEmail = this.common.emailSplitORG(res.response[0].email);
        this.orgAnualRevenue = res.response[0].anualRevenue;
        this.numberOfEmp = res.response[0].numberOfEmployee;
        this.ORGaddress = res.response[0].address;
        this.ORGcountry = res.response[0].countryId;
        this.getAllstate(this.ORGcountry, 1);
        this.ORGstate = res.response[0].stateId;
        this.getAllCity(this.ORGstate, 1);
        this.ORGdistrict = res.response[0].districtId;
        this.getAllZone(this.ORGdistrict, 1);
        this.ORGzone = res.response[0].zoneId;
        this.ORG_GEO = res.response[0].goLocation;
        this.ORG_LAT = res.response[0].latitude;
        this.ORG_Long = res.response[0].longitude;
      }
    });
  }

  getContactDetails(contactId: any): any {
    let param = {
      contactId: contactId
    };
    this.leadRest.getExistingContactDetails(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.contactId = contactId;
        this.firstName = res.response[0].firstName;
        this.LastName = res.response[0].lastName;
        this.phone = this.common.phoneSplit(res.response[0].phoneNumber);
        this.email = this.common.emailSplit(res.response[0].email);
        this.title = res.response[0].title;
        this.contactType = res.response[0].contactTypeId;
        this.status = res.response[0].status;
        this.address = res.response[0].address;
        this.country = res.response[0].countryId;
        this.getAllstate(this.country);
        this.state = res.response[0].stateId;
        this.getAllCity(this.state);
        this.district = res.response[0].districtId;
        this.getAllZone(this.district);
        this.zone = res.response[0].zoneId;
        this.geo = res.response[0].goLocation;
        this.lat = res.response[0].latitude;
        this.long = res.response[0].longitude;
      }
    })
  }
  addNewFieldForPhone(): any {
    this.phone.push({ "phoneNo": "" });
  }
  removePhone(i: any) {
    this.phone.splice(i, 1);
  }

  addNewEmailField(): any {
    this.email.push({ "email": "" });
  }

  removeEmail(i: any) {
    this.email.splice(i, 1);
  }




  saveNext(): any {
    if (this.counter == 0) {
      if (this.newOrExisting == false) {
        if (this.contactSourceType == "" || this.contactSourceType == null) {
          this.notifier.notify('error', "*Please select contact source");
          return false;
        }
      }
      if (this.firstName == '') {
        this.notifier.notify('error', "*FirstName required");
        return false;
      }
      if (this.LastName == '') {
        this.notifier.notify('error', "*Lastname required");
        return false;
      }
      for (let i = 0; i < this.phone.length; i++) {
        if (this.phone[i].phoneNo == '') {
          this.notifier.notify('error', "*Phone Required");
          return false;
        }
      }
      for (let obj of this.phone) {
        if (obj.phoneNo != "") {
          if (this.common.phoneNumberFormat(obj.phoneNo) == false) {
            this.notifier.notify('error', "Please enter valid phone number");
            return;
          }
        }
      }
      if (this.phone.length > 1) {
        if (Number(this.phone[0].phoneNo) == Number(this.phone[1].phoneNo)) {
          this.notifier.notify('error', "Alternate phone number must be different");
          return;
        }
      }
//......................email validation are turned off..................//
      // for (let a = 0; a < this.email.length; a++) {
      //   if (this.email[a].email == '') {
      //     this.notifier.notify('error', "*Email Required");
      //     return false;
      //   }
      // }
      for (let obj of this.email) {
        if (obj.email != "") {
          if (this.common.mailFormatCheck(obj.email) == false) {
            this.notifier.notify('error', "Please enter valid email");
            return;
          }
        }
      }

      if (this.email.length > 1) {
        if (this.email[0].email == this.email[1].email) {
          this.notifier.notify('error', "Alternate Email must be different");
          return;
        }
      }
      if (this.title == '') {
        this.notifier.notify('error', "*Designation Required");
        return false;
      }
      if (this.contactType == '' || this.contactType == null) {
        this.notifier.notify('error', "*Please Select Contact Type");
        return false;
      }
      if (this.leadStatusType == '') {
        this.notifier.notify('error', "*Lead Status Required");
        return false;
      }
      if (this.leadStage == '') {
        this.notifier.notify('error', "*Lead Stage Required");
        return false;
      }
      if (this.leadtype == '') {
        this.notifier.notify('error', "*Lead Source Type Required");
        return false;
      }
      // if (this.leadSource == '') {
      //   this.notifier.notify('error', "*Lead Source Required");
      //   return false;
      // }
      if (this.assignToUser == '') {
        this.notifier.notify('error', "*Please select assign user");
        return false;
      }
    }
    if (this.counter == 1) {
      if (this.address == '') {
        this.notifier.notify('error', "*Address Required");
        return false;
      }
      if (this.country == '') {
        this.notifier.notify('error', "*Country Required");
        return false;
      }
      if (this.state == '') {
        this.notifier.notify('error', "*State Required");
        return false;
      }
      if (this.district == '') {
        this.notifier.notify('error', "*City Required");
        return false;
      }
      if (this.zone == '') {
        this.notifier.notify('error', "*Zone Required");
        return false;
      }
      if (this.geo == '') {
        this.notifier.notify('error', "*Geo Location Required");
        return false;
      }
      if (this.lat == '') {
        this.notifier.notify('error', "*Latitude Required");
        return false;
      }
      if (this.long == '') {
        this.notifier.notify('error', "*Longitude Required");
        return false;
      }
    }
    if (this.counter == 2) {
      if (this.newOrExisting == false) {
        if (this.orgSourceType == "" || this.orgSourceType == null) {
          this.notifier.notify('error', "*Please select organization taken type");
          return false;
        }
      }
      if (this.organizationName == '') {
        this.notifier.notify('error', "*Organization Name Required");
        return false;
      }
      if (this.ownerName == '') {
        this.notifier.notify('error', "*Owner Name Required");
        return false;
      }
      for (let b = 0; b < this.OrgPhone.length; b++) {
        if (this.OrgPhone[b].OrgPhone == '') {
          this.notifier.notify('error', "*Organization Phone Required");
          return false;
        }
      }

      for (let obj of this.OrgPhone) {
        if (obj.OrgPhone != "") {
          if (this.common.phoneNumberFormat(obj.OrgPhone) == false) {
            this.notifier.notify('error', "Please enter valid organization phone number");
            return;
          }
        }
      }

      if (this.OrgPhone.length > 1) {
        if (Number(this.OrgPhone[0].OrgPhone) == Number(this.OrgPhone[1].OrgPhone)) {
          this.notifier.notify('error', "Alternate phone number must be different");
          return;
        }
      }
// ..........Business Details email validation are turned off.............//
      // for (let c = 0; c < this.OrgEmail.length; c++) {
      //   if (this.OrgEmail[c].OrgEmail == '') {
      //     this.notifier.notify('error', "*Organization Email Required");
      //     return false;
      //   }
      // }

      for (let obj of this.OrgEmail) {
        if (obj.OrgEmail != "") {
          //console.log("org Emailllllllllllll", obj.OrgEmail);
          if (this.common.mailFormatCheck(obj.OrgEmail) == false) {
            this.notifier.notify('error', "Please enter valid organization mail");
            return;
          }
        }
      }

      if (this.OrgEmail.length > 1) {
        if (this.OrgEmail[0].OrgEmail == this.OrgEmail[1].OrgEmail) {
          this.notifier.notify('error', "Alternate Email must be different");
          return;
        }
      }
      if (this.ORGaddress == '') {
        this.notifier.notify('error', "*Organization Address Required");
        return false;
      }
      if (this.ORGcountry == '') {
        this.notifier.notify('error', "*Organization Country Required");
        return false;
      }
      if (this.ORGstate == '') {
        this.notifier.notify('error', "*Organization State Required");
        return false;
      }
      if (this.ORGdistrict == '') {
        this.notifier.notify('error', "*Organization District Required");
        return false;
      }
      if (this.ORGzone == '') {
        this.notifier.notify('error', "*Organization Zone Required");
        return false;
      }
      if (this.ORG_GEO == '') {
        this.notifier.notify('error', "*Organization GEO Location Required");
        return false;
      }
      if (this.ORG_LAT == '' || this.ORG_LAT == null) {
        this.notifier.notify('error', "*Organization Latitude Required");
        return false;
      }
      if (this.ORG_Long == '' || this.ORG_Long == null) {
        this.notifier.notify('error', "*Organization Longitude Required");
        return false;
      }
      if (this.orgAnualRevenue == '' || this.orgAnualRevenue == null) {
        this.notifier.notify('error', "*Organization Anual Revenue Required");
        return false;
      }
      if (this.numberOfEmp == '') {
        this.notifier.notify('error', "*Organization Number Of Employee Required");
        return false;
      }
    }
    if (this.counter == 3) {
      for (let d = 0; d < this.description.length; d++) {
        if (this.description[d].desc == '') {
          this.notifier.notify('error', "*Organization Description Required");
          return false;
        }
        if (this.description[d].desc != '') {
          if (this.description[d].desc.length > 300) {
            this.notifier.notify('error', "*Organization Description within 300 characters");
            return false;
          }
        }
      }
    }
    if (this.counter == 4) {
      for (let e = 0; e < this.currentCompetitor.length; e++) {
        //console.log("Product Array>>>>>>>>>", this.currentCompetitor);

        // if (this.productTakenType == 1) {
        //   console.log("Product New>>>>>>>>>>");
        //   if (this.currentCompetitor[e].newProductName == '') {
        //     this.notifier.notify('error', "*Product Name Required");
        //     return false;
        //   }
        // }


        // if (this.productTakenType == 0) {
        //   if (this.currentCompetitor[e].productName == '') {
        //     this.notifier.notify('error', "*Please Select Product Name");
        //     return false;
        //   }
        // }

        if (this.currentCompetitor[e].productName == '') {
          this.notifier.notify('error', "*Please Select Product Name");
          return false;
        }

        if (this.currentCompetitor[e].desc == '') {
          this.notifier.notify('error', "*Product Description Required");
          return false;
        }
        if (this.currentCompetitor[e].desc != '') {
          if (this.currentCompetitor[e].desc.length > 100) {
            this.notifier.notify('error', "*Product Description within 100 characters");
            return false;
          }
        }
        if (this.currentCompetitor[e].status == '') {
          this.notifier.notify('error', "*Product Status Required");
          return false;
        }
      }
    }


    if (this.counter == 5) {
      if (this.uploadImage == '') {
        this.notifier.notify('error', "*Upload Image Required");
        return false;
      }
      for (let f = 0; f < this.socialMediaLink.length; f++) {
        if (this.socialMediaLink[f].platform == '') {
          this.notifier.notify('error', "*Social Platform Required");
          return false;
        }
        if (this.socialMediaLink[f].link == '') {
          this.notifier.notify('error', "*Social Link Required");
          return false;
        }
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
  upImage(): any {
    //console.log('upload function hit')
    const banner1 = document.getElementById('upload') as HTMLInputElement;
    const file: any = banner1.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const fileData = new FormData();
          fileData.append('file', file[0]);
          this.leadRest.fileUpload(fileData).subscribe((res: any) => {
            if ((res.success) && (res.status == 200)) {
              this.uploadImage = this.common.imagePath + res.response.fileName;
              this.uploadImageRowName = res.response.fileName;
            }
          });
        };
      };
    }
  }
  /**
   * Add Lead
   */
  addLead(): any {
    if (this.permission == '') {
      this.notifier.notify('error', "*Permission Type Required");
      return false;
    }
    if ((this.permission == '3') && (this.permissionIndiVisual == '')) {
      this.notifier.notify('error', "*Please Select a required");
      return false;
    }
    let contactPhone = "";
    let contactEmail = "";
    let orgPhone = "";
    let orgEmail = "";
    for (let i = 0; i < this.phone.length; i++) {
      contactPhone += this.phone[i].phoneNo + ',';
    }
    for (let a = 0; a < this.email.length; a++) {
      contactEmail += this.email[a].email + ',';
    }
    for (let b = 0; b < this.OrgPhone.length; b++) {
      orgPhone += this.OrgPhone[b].OrgPhone + ',';
    }
    for (let c = 0; c < this.OrgEmail.length; c++) {
      orgEmail += this.OrgEmail[c].OrgEmail + ',';
    }
    let recoredId = Math.floor((Math.random() * 10000000) + 1);
    let param = {
      'recordId': recoredId,
      'userId': this.userId,
      'userType': this.userType,
      'clientId': this.clientId,
      'contactId': this.contactId,
      'firstName': this.firstName,
      'lastName': this.LastName,
      'phoneNumber': contactPhone.slice(0, -1),
      'email': contactEmail.slice(0, -1),
      'title': this.title,
      'contactTypeId': this.contactType,
      'leadSourceType': Number(this.leadtype),
      // 'leadSource': Number(this.leadSource),
      'leadType': Number(this.leadtype),
      'status': this.status,
      'leadTypeStatus': this.leadStatusType,
      'leadStatus': this.leadStage,
      'assignType': String(this.assignTo),
      'assignTo': this.assignToUser,
      'address': this.address,
      'countryId': this.country,
      'stateId': this.state,
      'districtId': this.district,
      'cityId': this.district,
      'zoneId': this.zone,
      'goLocation': this.geo,
      'latitude': this.lat,
      'longitude': this.long,
      'organizationId': this.organizationId,
      'organizationName': this.organizationName,
      'ownerName': this.ownerName,
      'orgPhone': orgPhone.slice(0, -1),
      'orgEmail': orgEmail.slice(0, -1),
      'anualRevenue': this.orgAnualRevenue,
      'numberOfEmployee': this.numberOfEmp,
      'orgAddress': this.ORGaddress,
      'orgCountryId': this.ORGcountry,
      'orgStateId': this.ORGstate,
      'orgDistrictId': this.ORGdistrict,
      'orgCityId': this.ORGdistrict,
      'orgZoneId': this.ORGzone,
      'orgGoLocation': this.ORG_GEO,
      'orgLatitude': this.ORG_LAT,
      'orgLongitude': this.ORG_Long,
      'orgDescription': (this.description.length > 0 ? this.description[0].desc : ''),
      'Competitor': this.currentCompetitor,
      'profilePic': this.uploadImageRowName,
      'permissionType': this.permission,
      'permissionIndivisual': this.permissionIndiVisual,
      'platform': this.socialMediaLink,

      //-------------------Oppr----------------------//
      'opportunityName': this.opportunityName,
      'category': this.Oppcategory,
      'probabilityOfWining': this.winingValue,
      'expectedCloseDate': this.expectedCloseDate,
      'ActualCloseDate': this.ActualCloseDate,
      'expectedRevenue': this.expectedRevenue,
      'salseStageId': this.salesStage,
      'productId': this.productName,
      'prodAddress': this.productAddress,
      'productQuantity': this.productQtn,
      'quantityType': this.quantity,
      'listValue': this.listValue,
      'discount': this.discount,
      'finalValue': this.finalValue,
      'productDesc': this.productDesc,
      //'product' : this.productDetails

    };
    if (this.contactId == '') {
      param['contactId'] = '';
    }
    if (this.organizationId == '') {
      param['organizationId'] = '';
    }
    if (this.permission != '3') {
      param['permissionIndivisual'] = this.userId;
    }
    //console.log("Submitted data>>>>>>>>> Lead >>>>>>oppr>>>>>>>>>>", param);
    this.leadRest.addLead(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.notifier.notify('success', res.message);
        this.common.addLeadSubject.next({ 'leadAdd': true });
        this.modalClose();
      }
    });
  }
  /**
   * GET LEAD DETAILS BY LEAD ID
   */
  getLeadDetails(): any {
    let parma = {
      "userId": this.userId,
      "usertypeId": this.userType,
      "leadId": this.common.leadId
    };
    this.leadRest.getLeadDetails(parma).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        //console.log("For update >>>>Fetch data>>>>>>>>>>>>", res.response)
        //console.log('Contact Details>>>>>>>>>>>>>', res.response[0].ContactDetails);
        this.common.spinnerHide();
        if (this.common.isAdd !== true) {
          this.actionType = 1;
          this.firstName = res.response[0].ContactDetails.firstName;
          this.LastName = res.response[0].ContactDetails.lastName;
          let phone = res.response[0].ContactDetails.phoneNumber.split(',');
          let temp = [];
          for (let i = 0; i < phone.length; i++) {
            let obj = { "phoneNo": phone[i] }
            temp.push(obj);
          }
          this.phone = temp;
          let email = res.response[0].ContactDetails.email.split(',');
          let tempEmail = [];
          for (let e = 0; e < email.length; e++) {
            tempEmail.push({ "email": email[e] });
          }
          this.email = tempEmail;
          this.title = res.response[0].ContactDetails.title;
          this.contactType =Number(res.response[0].ContactDetails.contactTypeId);
          this.status = res.response[0].ContactDetails.status;
          this.leadStage = res.response[0].leadStatus;
          //this.leadtype = res.response[0].leadType.toString();
          this.leadtype = res.response[0].leadType;
          //console.log("Lead Source Type>>>>>>>>>>>>>",this.leadtype);
          this.onleadsourceTypeChange(res.response[0].leadType);
          this.leadSource = res.response[0].leadSource;
          //this.leadStatusType = Number(res.response[0].leadTypeStatus);
          this.leadStatusType = Number(res.response[0].leadTypeStatusId);
          //console.log("leadStatusType>>>>>>>>>>>>",this.leadStatusType);
          this.assignTo = Number(res.response[0].assignType);
          if ((this.assignTo == 0) && (this.userType != 2)) {
            this.assignToDropDownHide = false;
          }
          this.assignToUser = res.response[0].assignTo;
          this.address = res.response[0].ContactDetails.address;
          this.country = res.response[0].ContactDetails.countryId;
          this.state = res.response[0].ContactDetails.stateId;
          //this.district = res.response[0].ContactDetails.districtId;
          this.district = res.response[0].ContactDetails.cityId;
          this.getAllstate(this.country);
          this.zone = res.response[0].ContactDetails.zoneId;
          this.geo = res.response[0].ContactDetails.goLocation;
          this.lat = res.response[0].ContactDetails.latitude;
          this.long = res.response[0].ContactDetails.longitude;
          this.organizationName = res.response[0].OrgDetails.organizationName;
          this.ownerName = res.response[0].OrgDetails.ownerName;
          let orgPhone = res.response[0].OrgDetails.phone.split(',');
          let tempOrgPhone = [];
          for (let f = 0; f < orgPhone.length; f++) {
            tempOrgPhone.push({ 'OrgPhone': orgPhone[f] });
          }
          this.OrgPhone = tempOrgPhone;
          let orgEmail = res.response[0].OrgDetails.email.split(',');
          let tempOrgEmail = [];
          for (let g = 0; g < orgEmail.length; g++) {
            tempOrgEmail.push({ 'OrgEmail': orgEmail[g] });
          }
          this.OrgEmail = tempOrgEmail;
          this.ORGaddress = res.response[0].OrgDetails.address;
          this.ORGcountry = res.response[0].OrgDetails.countryId;
          this.getAllstate(this.ORGcountry, 1);
          this.ORGstate = res.response[0].OrgDetails.stateId;
          this.getAllCity(this.ORGstate, 1);
          this.ORGdistrict = res.response[0].OrgDetails.cityId;
          this.getAllZone(this.ORGdistrict, 1);
          //this.getAllstate(this.ORGcountry, 1);
          // this.getAllCity(this.ORGstate);
          // this.getAllZone(this.ORGdistrict);
          this.ORGzone = res.response[0].OrgDetails.zoneId;
          this.ORG_GEO = res.response[0].OrgDetails.goLocation;
          this.ORG_LAT = res.response[0].OrgDetails.latitude;
          this.ORG_Long = res.response[0].OrgDetails.longitude;
          this.orgAnualRevenue = res.response[0].OrgDetails.anualRevenue;
          this.numberOfEmp = res.response[0].OrgDetails.numberOfEmployee;
          this.description = [{ "desc": res.response[0].OrgDetails.description }];
          let currentCompetitor = [];
          for (let h = 0; h < res.response[0].Competitor.length; h++) {
            currentCompetitor.push({
              "productTakenType": res.response[0].Competitor[h].productTakenType,
              "newProductName": String(res.response[0].Competitor[h].productName),
              "productName": String(res.response[0].Competitor[h].productId),
              "desc": res.response[0].Competitor[h].description,
              "status": res.response[0].Competitor[h].competitorType,
              "pageType": "2"
            });
          }
          this.currentCompetitor = currentCompetitor;
          this.uploadImage = this.common.imagePath + res.response[0].profilePic;
          this.uploadImageRowName = res.response[0].profilePic;
          this.socialMediaLink = [];
          let platFormTemp = [];
          for (let z = 0; z < res.response[0].Platform.length; z++) {
            platFormTemp.push({
              "platform": res.response[0].Platform[z].platformId,
              "link": res.response[0].Platform[z].link,
              "pageType": "2",
              "id": res.response[0].Platform[z].id
            });
          }
          this.socialMediaLink = platFormTemp;
          this.permission = res.response[0].OrgDetails.permissionType;
          //console.log("visibility permission>>>>>>>>", this.permission);
          if ((this.permission == '3') && (this.userType != 2)) {
            this.parmissionIndivisualHide = false;
          }
          if (res.response[0].accessId != null) {
            this.permissionIndiVisual = res.response[0].accessId.toString();
          }
          //console.log("permissionIndiVisual>>>>>>>>>>>>", this.permissionIndiVisual);
        }
      }
    });
  }
  // UPDATE LEAD
  updateLead(): any {
    let contactPhone = "";
    let contactEmail = "";
    let orgPhone = "";
    let orgEmail = "";
    for (let i = 0; i < this.phone.length; i++) {
      contactPhone += this.phone[i].phoneNo + ',';
    }
    for (let a = 0; a < this.email.length; a++) {
      contactEmail += this.email[a].email + ',';
    }
    for (let b = 0; b < this.OrgPhone.length; b++) {
      orgPhone += this.OrgPhone[b].OrgPhone + ',';
    }
    for (let c = 0; c < this.OrgEmail.length; c++) {
      orgEmail += this.OrgEmail[c].OrgEmail + ',';
    }
    let param = {
      'leadId': this.common.leadId,
      'userId': this.userId,
      'clientId': this.clientId,
      'contactId': this.contactId,
      'firstName': this.firstName,
      'lastName': this.LastName,
      'phoneNumber': contactPhone.slice(0, -1),
      'email': contactEmail.slice(0, -1),
      'title': this.title,
      'contactTypeId': this.contactType,
      'leadSourceType': Number(this.leadtype),
      'leadSource': Number(this.leadSource),
      'leadType': Number(this.leadtype),
      'status': this.status,
      'leadTypeStatus': this.leadStatusType,
      'leadStatus': this.leadStage,
      'assignType': String(this.assignTo),
      'assignTo': this.assignToUser,
      'address': this.address,
      'countryId': this.country,
      'stateId': this.state,
      'districtId': this.district,
      'cityId': this.district,
      'zoneId': this.zone,
      'goLocation': this.geo,
      'latitude': this.lat,
      'longitude': this.long,
      'organizationId': this.organizationId,
      'organizationName': this.organizationName,
      'ownerName': this.ownerName,
      'orgPhone': orgPhone.slice(0, -1),
      'orgEmail': orgEmail.slice(0, -1),
      'anualRevenue': this.orgAnualRevenue,
      'numberOfEmployee': this.numberOfEmp,
      'orgAddress': this.ORGaddress,
      'orgCountryId': this.ORGcountry,
      'orgStateId': this.ORGstate,
      'orgDistrictId': this.ORGdistrict,
      'orgCityId': this.ORGdistrict,
      'orgZoneId': this.ORGzone,
      'orgGoLocation': this.ORG_GEO,
      'orgLatitude': this.ORG_LAT,
      'orgLongitude': this.ORG_Long,
      'orgDescription': (this.description.length > 0 ? this.description[0].desc : ''),
      'Competitor': this.currentCompetitor,
      'profilePic': this.uploadImageRowName,
      'permissionType': this.permission,
      'permissionIndivisual': this.permissionIndiVisual,
      'platform': this.socialMediaLink,
    };
    if (this.contactId == '') {
      param['contactId'] = '';
    }
    if (this.organizationId == '') {
      param['organizationId'] = '';
    }
    if (this.permission != '3') {
      param['permissionIndivisual'] = '';
    }
   console.log("Data for Lead Update>>>>>>>>>>>", param)
    this.leadRest.updateLead(param).subscribe((res: any) => {

      console.log("lead update response>>>>>>>>>",res);
      
      if (res.success) {
        this.firstName = '';
        this.LastName = '';
        this.phone = [{ "phoneNo": "" }];
        this.email = [{ "email": "" }];
        this.title = '';
        this.contactType = 2;
        this.status = 1;
        this.leadStage = '';
        this.assignTo = 0;
        this.assignToUser = '';
        this.address = '';
        this.country = '';
        this.state = '';
        this.district = '';
        this.zone = '';
        this.geo = '';
        this.lat = '';
        this.long = '';
        this.organizationId = '';
        this.organizationName = '';
        this.ownerName = '';
        this.OrgPhone = [{ "OrgPhone": "" }];
        this.OrgEmail = [{ "OrgEmail": "" }];
        this.orgAnualRevenue = '';
        this.numberOfEmp = '';
        this.ORGaddress = '';
        this.ORGcountry = '';
        this.ORGstate = '';
        this.ORGdistrict = '';
        this.ORGzone = '';
        this.ORG_GEO = '';
        this.ORG_LAT = '';
        this.ORG_Long = '';
        this.description = [{ "desc": "" }];
        this.currentCompetitor = [{ "productTakenType": "", "newProductName": "", "productName": "", "desc": "", "status": "1", "pageType": '2' }];
        this.uploadImageRowName = '';
        this.permission = '';
        this.permissionIndiVisual = '';
        this.socialMediaLink = [{ 'platform': "", "link": "", "pageType": '2', 'id': "" }];
        this.notifier.notify('success', res.message);
        this.common.addLeadSubject.next({ 'leadAdd': true });
        this.modalClose();
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }
  onleadsourceTypeChange(leadSourceTypeId: any) {
    let param = {
      "clientId": this.clientId,
      "leadSrcTypId": leadSourceTypeId
    };
    this.leadRest.getLeadSource(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.leadSourceArray = res.response
      }
    })
  }

  //------------------------For contact type opportunity------------------------//

  selectedContactType() {

    if (this.contactType == 3) {

      //----------------Opportunity value set to blank--------------//

      //this.assignToId = "";
      this.permission = "";
      this.permissionIndiVisual = ""
      //this.permissionIndividualUser = false;

      // for(let obj of this.productDetails){
      //   obj.productId = "";
      //   obj.productDescription = "";
      //   obj.competitorType = "";
      // }

      //----------------------------end-----------------------------//

      if (this.common.getUserType() == 2) {
        // this.assignFlag = false;
        //this.permissionIndividual = false;
      } else {
        // this.assignFlag = true;
        // this.permissionIndividual = true;
      }
      this.opportunityFlag = true;
    } else {
      this.opportunityFlag = false;
    }

  }
  //----------product-----------//
  productDetails = [
    {
      productId: "",
      productDescription: "",
      competitorType: ""

    }
  ]

  addProduct() {
    this.productDetails.push({
      productId: "",
      productDescription: "",
      competitorType: ""
    })

  }
  removeProduct(index: any) {
    this.productDetails.splice(index, 1);
  }

  //-----------------------//
  permissionSelectIndividual() {

  }

  getSalesStage() {
    this.contactsService.getAllSalesStage().subscribe((res: any) => {
      if (res.success) {
        this.salesStageList = res.response;
      }
    })

  }

  getProduct() {
    const data = {
      clientId: this.common.getClientId()
    };
    this.contactsService.getAllProducts(data).subscribe((res: any) => {
      //console.log("product Res>>>>>>", res);
      if (res.success) {
        this.productList = res.response;
       // console.log("product list>>>>>>>", this.productList);
      }
    })
  }

  changeProductQty(event: any) {
    this.discount = "";
    this.finalValue = "";
   // console.log("Product Quantity", event.target.value);
    this.prodQty = Number(event.target.value);
  }
  changeProductListValue(event: any) {
    this.discount = "";
    this.finalValue = "";
   // console.log("Product list value", event.target.value);
    this.prodListValue = Number(event.target.value);

  }
  changeProductDiscount(event: any) {
   // console.log("product discount>>>>>>>>>>>>", this.discount);
    if (this.discount == null) {
      this.finalValue = "";
      return;
    }
   // console.log("Product discount", event.target.value);
    this.prodDis = Number(event.target.value);

    var finalValue = (this.prodQty * this.prodListValue) - ((this.prodQty * this.prodListValue) * (this.prodDis / 100))

   // console.log("Final Value>>>>>>>", finalValue);
    this.finalValue = finalValue;

  }


  //------------------Product Taken Type------------------//

  productTakenTypeFun() {

    // if (type == 1) {
    //   this.newProductTakenFlag = true;
    // } else {
    //   this.newProductTakenFlag = false;
    // }
    // if (type == 0) {
    //   this.existingProductTakenFlag = true;
    // } else {
    //   this.existingProductTakenFlag = false;
    // }
    for (let obj of this.currentCompetitor) {
     // console.log("obj>>>>>>>>>", obj);
      if (obj.productTakenType == "1") {
        this.newProductTakenFlag = true;
      } else {
        this.newProductTakenFlag = false;
      }
      if (obj.productTakenType == "0") {
        this.existingProductTakenFlag = true;
      } else {
        this.existingProductTakenFlag = false;
      }

    }
  }

  newProductType(typeId: any) {
    this.newProductTakenFlag = true;
  }
  existProductType(typeId: any) {
    this.existingProductTakenFlag = true;
  }

  removeProductDetails(i: any) {
    this.currentCompetitor.splice(i, 1);
  }


  getAllLeadStatus() {
    const data = {
      moduleType: "lead"
    };
    this.leadRest.getAllLeadStatus(data).subscribe((res: any) => {
     // console.log("All Lead Status List>>>>>>>>>>>>>>>>>", res);
      if (res.success) {
        this.leadStatuslist = res.response[0];
        this.leadStage = res.response[0].salesStageId;
        // this.leadIniStage = res.response[0];
      //  console.log("lead status>>>>>>", this.leadStatuslist);

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

}
