import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/service/registration.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {
  @ViewChild('addRole') addRoleModal: any;

  crmAccess = "" as any;
  accessType = "";
  isDisabled: boolean = true;
  contactType = "";
  contactTypeExistingFlag: boolean = false;
  contactPerson = "";
  customerType = "";
  custBusinessName = "";
  fName = "";
  lName = "";
  phone: any = [{ item: "" }];
  email: any = [{ item: "" }];
  phoneNumber: any = [];
  emailId: any = [];
  gender = "";
  dob = "";
  title = "";
  address = "";
  residentAddress = "";
  country = "";
  state = "";
  city = "";
  zone = "";
  landmark = "";
  geoLoc = "";
  lattitude = "";
  longitude = "";
  pincode = "";
  customerDesc = "";
  erpDocSubmit = "" as any;
  erpRegDone = "" as any;
  //regBy = "";
  erpFlag: boolean = false;
  erpRegDate = "";
  erpRegBy = "";
  erpRemarks = "";
  yearOfEstd = "";
  visitDate = "";
  godownLoc = "";
  stockArea = "";
  godownCapacity = "";
  partCode = "";
  partCrLimit = "";
  advanced = "";
  appliedCrLimit = "";
  primaryItem = "";
  customerRemark = "";
  firmsStatus = "";
  erpCode = "";
  //-----------------Upload Doc----------------//
  fileUpload = "";
  imgOrgFile = "";
  tradeLicence = "";
  tradeOrgFileName = "";
  gstDoc = "";
  gstOrgDoc = "";
  cancleChequeDoc = "";
  cancleChequeOrgDoc = "";
  aadharDoc = "";
  aadharOrgDoc = "";
  panDoc = "";
  panOrgDoc = "";
  imageSrc = "";
  fileUploadStatus: boolean = false;
  contactDetails: any = [];
  exsistingCustomerName: any = [];
  customerTypeList: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  productList: any = [];
  userList: any = [];
  customerId = "";
  customerUpdateFlag: boolean = false;
  isCRM: boolean = false;
  FirstName = '';
  LastName = '';

  allExistingUser: any = [];
  searchTextCustName=""
  searchName=""
  contactName=""




  constructor(private modalService: NgbModal, private registration: RegistrationService, private notifier: NotifierService, private common: CommonService) { }

  ngOnInit(): void {
    //console.log("IsCRM??????????????????????",localStorage.getItem("hasCRM"));
    if (localStorage.getItem("hasCRM") == "1") {
      this.isCRM = true;
      //console.log("isCRM>>>>>",this.isCRM);
    }
    this.getCustomerList();
    this.getAllCustomerType();
    this.getAllCountry();
    this.getProduct();
    this.getUser();
    this.existingContactList();
    this.customerId = this.registration.customerId;
    this.customerUpdateFlag = this.registration.customerUpdateFlag;
    //console.log("customer id of common>>>>>>>>", this.customerId);
    if (this.customerId) {
      this.fetchData();
    }
  }

  //---------------Onload Api Data-----------//   

  getAllCustomerType() {
    this.registration.getAllCustomerType({}).subscribe((res: any) => {
      if (res.success) {
        this.customerTypeList = res.response;
        //console.log("Cus List>>>>>", this.customerTypeList);
      }
    })
  }

  getAllCountry() {
    this.registration.getAllCountry().subscribe((res: any) => {
      if (res.success) {
        this.countryList = res.response;
        //console.log("country List>>>>>>>", this.countryList);
      }
    })
  }

  getStatesByCountryId() {
    const data = {
      countryId: this.country
    };
    this.registration.getStateById(data).subscribe((res: any) => {
      if (res.success) {
        this.stateList = res.response;
      }
    })

  }

  getCityByStateId() {
    const data = {
      stateId: this.state
    };
    this.registration.getCity(data).subscribe((res: any) => {
      if (res.success) {
        this.cityList = res.response;
      }
    })
  }

  getZoneByCityId() {
    const data = {
      cityId: this.city
    };
    this.registration.getZone(data).subscribe((res: any) => {
      if (res.success) {
        this.zoneList = res.response;
      }
    })

  }
  getProduct() {
    this.registration.getProductList({}).subscribe((res: any) => {
      if (res.success) {
        this.productList = res.response;
        //console.log("Product List>>>>>>>>>", this.productList);
      }
    })
  }

  getUser() {
    this.registration.getUserList().subscribe((res: any) => {
      if (res.success) {
        this.userList = res.response;
        //console.log("userList>>>>>>>", this.userList);
      }
    })
  }

  //---------------End Onload Api------------------//

  //-------------- Add Customer-----------------//

  addCustomer() {
    if (this.customerType == "" || this.customerType == null || this.customerType == undefined) {
      this.notifier.notify('error', "Please select customer type");
      return;
    }
    if (this.fName == "" || this.fName == null || this.fName == undefined) {
      this.notifier.notify('error', "Please enter first name");
      return;
    }
    if (this.lName == "" || this.lName == null || this.lName == undefined) {
      this.notifier.notify('error', "Please enter last name");
      return;
    }
    // if(this.gender == "" || this.gender == null || this.gender == undefined){
    //   this.notifier.notify('error',"Please select gender");
    //   return;
    // }
    // if(this.dob == "" || this.dob == null || this.dob == undefined){
    //   this.notifier.notify('error',"Please choose date of birth");
    //   return;
    // }

    if (this.visitDate == "" || this.visitDate == null) {
      this.notifier.notify('error', "Please choose visit date");
      return;
    }

    if (this.customerDesc == "" || this.customerDesc == null || this.customerDesc == undefined) {
      this.notifier.notify('error', "Please enter description");
      return;
    }

    for (let obj of this.phone) {
      if (obj.item == "" || obj.item == null) {
        this.notifier.notify('error', "Please enter phone number");
        return;
      }
      if (obj.item != "") {
        if (!this.common.phoneNumberFormat(obj.item)) {
          this.notifier.notify('error', "Please enter valid phone number");
          return;
        }
      }
    }

    if (this.phone.length > 1) {
      if (this.phone[0].item == this.phone[1].item) {
        this.notifier.notify("error", "Alternate phone number must be different");
        return;
      }
    }


    for (let obj of this.email) {
      // if(obj.item == ""){
      //   this.notifier.notify('error',"Please enter email");
      //   return;
      // }
      if (obj.item != "") {
        if (!this.common.mailFormatCheck(obj.item)) {
          this.notifier.notify('error', "Please enter valid email id");
          return;
        }
      }
    }

    if (this.email.length > 1) {
      if (this.email[0].item == this.email[1].item) {
        this.notifier.notify("error", "Alternate email must be different");
        return;
      }
    }

    if (this.address == "" || this.address == null || this.address == undefined) {
      this.notifier.notify('error', "Please enter address");
      return;
    }
    if (this.country == "" || this.country == null || this.country == undefined) {
      this.notifier.notify('error', "Please select country");
      return;
    }
    if (this.state == "" || this.state == null || this.state == undefined) {
      this.notifier.notify('error', "Please select state");
      return;
    }
    if (this.city == "" || this.city == null || this.city == undefined) {
      this.notifier.notify('error', "Please select city");
      return;
    }
    if (this.zone == "" || this.zone == null || this.zone == undefined) {
      this.notifier.notify('error', "Please select zone");
      return;
    }
    // if (this.geoLoc == "" || this.geoLoc == null || this.geoLoc == undefined) {
    //   this.notifier.notify('error', "Please enter geolocation");
    //   return;
    // }

    // if (this.lattitude == "" || this.lattitude == null || this.lattitude == undefined) {
    //   this.notifier.notify('error', "Please enter lattitude");
    //   return;
    // }
    // if (this.longitude == "" || this.longitude == null || this.longitude == undefined) {
    //   this.notifier.notify('error', "Please enter longitude");
    //   return;
    // }

    if (this.pincode == "" || this.pincode == null || this.pincode == undefined) {
      this.notifier.notify('error', "Please enter pincode");
      return;
    }


    //------------------------ For ERP--------------------//

    // if (this.erpDocSubmit === "") {
    //   this.notifier.notify('error', "Please choose erp document submit");
    //   return;
    // }
    // if (this.erpRegDone === "") {
    //   this.notifier.notify('error', "Please choose erp registration done");
    //   return;
    // }
    // if (this.erpRegDone == "1") {
    //   if (this.erpRegDate == "") {
    //     this.notifier.notify('error', "Please choose erp registration date");
    //     return;
    //   }
    //   if (this.erpRegBy == "" || this.erpRegBy == null) {
    //     this.notifier.notify('error', "Please select erp registration by");
    //     return;
    //   }
    // }


    // if (this.yearOfEstd == "" || this.yearOfEstd == null) {
    //   this.notifier.notify('error', "Please choose year of estublished");
    //   return;
    // }





    // if(this.partCode == "" || this.partCode == null){
    //   this.notifier.notify('error',"Please enter party code");
    //   return;
    // }
    // if(this.partCrLimit == "" || this.partCrLimit == null){
    //   this.notifier.notify('error',"Please enter party credit limit");
    //   return;
    // }
    // if(this.advanced == ""){
    //   this.notifier.notify('error',"Please enter advanced");
    //   return;
    // }
    // if(this.appliedCrLimit == ""){
    //   this.notifier.notify('error',"Please enter applied credit limit");
    //   return;
    // }


    // if (this.fileUpload == "") {
    //   this.notifier.notify('error', "Please upload profile image");
    //   return;
    // }

    //console.log("ERP Reg Done>>>>>>>>>>", this.erpRegDone);
    this.phoneNumber = [];
    this.emailId = [];
    for (let i = 0; i < this.phone.length; i++) {
      this.phoneNumber.push(this.phone[i].item);
    }
    for (let i = 0; i < this.email.length; i++) {
      this.emailId.push(this.email[i].item);
    }

    const data = {
      contactType: this.contactType.toString(),
      customerTypeId: this.customerType,
      custBusinessName: this.custBusinessName,
      firstName: this.fName,
      lastName: this.lName,
      gender: this.gender,
      dob: this.dob,
      phoneNumber: this.phoneNumber,
      email: this.emailId,
      title: this.title,
      address: this.address,
      residentAddress: this.residentAddress,
      countryId: this.country,
      stateId: this.state,
      cityId: this.city,
      zoneId: this.zone,
      landmark: this.landmark,
      geoLocation: this.geoLoc,
      lattitude: this.lattitude,
      longitude: this.longitude,
      pinCode: this.pincode,
      customerDescription: this.customerDesc,
      firsmStatus: this.firmsStatus,
      erpCode: this.erpCode,

      //----------------------- For ERP----------------//

      //erpDocSubmit: this.erpDocSubmit.toString(),
      //erpRegdone: this.erpRegDone.toString(),
      //erpRegDate: this.erpRegDate === "" ? null : this.erpRegDate,
      //erpRegBy: this.erpRegBy === "" ? '0' : this.erpRegBy,
      //erpRemark: this.erpRemarks === "" ? null : this.erpRemarks,



      yearOfEstd: this.yearOfEstd,
      visitDate: this.visitDate,
      godownLocation: this.godownLoc,
      // stockArea: this.stockArea,
      godownCapacity: this.godownCapacity,
      // partyCode: this.partCode,
      // partyCrLimit: this.partCrLimit,
      advanced: this.advanced,
      appliedCreditLimit: this.appliedCrLimit,
      primaryItemId: this.primaryItem,
      //customerRemarks: this.customerRemark,
      profilePic: this.fileUpload,
      tradeLicenceDoc: this.tradeLicence,
      GSTcertificateDoc: this.gstDoc,
      panCardDoc: this.panDoc,
      aadharCardDoc: this.aadharDoc,
      cancelChequeDoc: this.cancleChequeDoc
    };
    //console.log("Data For Add Customer>>>>>>>>>>>>>", data);
    this.registration.addCustomer(data).subscribe((res: any) => {
      if (res.success) {
        this.common.Subject.next({});
        this.modalClose();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  //----------------- End Add Customer--------------//


  addExsistingCustomer() {
    // this.notifier.notify('success','working')

    if (this.customerType == "" || this.customerType == null || this.customerType == undefined) {
      this.notifier.notify('error', "Please select customer type");
      return;
    }
    if (this.FirstName == "" || this.FirstName == null || this.FirstName == undefined) {
      this.notifier.notify('error', "Please enter first name");
      return;
    }
    if (this.LastName == "" || this.LastName == null || this.LastName == undefined) {
      this.notifier.notify('error', "Please enter last name");
      return;
    }
  }


  //------------------Update Customer----------------//

  updateCustomer() {

    if (this.customerType == "" || this.customerType == null || this.customerType == undefined) {
      this.notifier.notify('error', "Please select customer type");
      return;
    }
    if (this.fName == "" || this.fName == null || this.fName == undefined) {
      this.notifier.notify('error', "Please enter first name");
      return;
    }
    if (this.lName == "" || this.lName == null || this.lName == undefined) {
      this.notifier.notify('error', "Please enter last name");
      return;
    }
    // if(this.gender == "" || this.gender == null || this.gender == undefined){
    //   this.notifier.notify('error',"Please select gender");
    //   return;
    // }
    // if(this.dob == "" || this.dob == null || this.dob == undefined){
    //   this.notifier.notify('error',"Please choose date of birth");
    //   return;
    // }


    if (this.visitDate == "" || this.visitDate == null) {
      this.notifier.notify('error', "Please choose visit date");
      return;
    }
    if (this.customerDesc == "" || this.customerDesc == null || this.customerDesc == undefined) {
      this.notifier.notify('error', "Please enter description");
      return;
    }

    for (let obj of this.phone) {
      if (obj.item == "" || obj.item == null) {
        this.notifier.notify('error', "Please enter phone number");
        return;
      }
      if (obj.item != "") {
        if (!this.common.phoneNumberFormat(obj.item)) {
          this.notifier.notify('error', "Please enter valid phone number");
          return;
        }
      }
    }

    if (this.phone.length > 1) {
      if (this.phone[0].item == this.phone[1].item) {
        this.notifier.notify("error", "Alternate phone number must be different");
        return;
      }
    }


    for (let obj of this.email) {

      // if(obj.item == ""){
      //   this.notifier.notify('error',"Please enter email");
      //   return;
      // }

      if (obj.item != "") {
        if (!this.common.mailFormatCheck(obj.item)) {
          this.notifier.notify('error', "Please enter valide email id");
          return;
        }
      }
    }

    if (this.email.length > 1) {
      if (this.email[0].item == this.email[1].item) {
        this.notifier.notify("error", "Alternate email must be different");
        return;
      }
    }

    if (this.address == "" || this.address == null || this.address == undefined) {
      this.notifier.notify('error', "Please enter address");
      return;
    }
    if (this.country == "" || this.country == null || this.country == undefined) {
      this.notifier.notify('error', "Please select country");
      return;
    }
    if (this.state == "" || this.state == null || this.state == undefined) {
      this.notifier.notify('error', "Please select state");
      return;
    }
    if (this.city == "" || this.city == null || this.city == undefined) {
      this.notifier.notify('error', "Please select city");
      return;
    }
    if (this.zone == "" || this.zone == null || this.zone == undefined) {
      this.notifier.notify('error', "Please select zone");
      return;
    }
    // if (this.geoLoc == "" || this.geoLoc == null || this.geoLoc == undefined) {
    //   this.notifier.notify('error', "Please enter geolocation");
    //   return;
    // }
    // if (this.lattitude == "" || this.lattitude == null || this.lattitude == undefined) {
    //   this.notifier.notify('error', "Please enter lattitude");
    //   return;
    // }
    // if (this.longitude == "" || this.longitude == null || this.longitude == undefined) {
    //   this.notifier.notify('error', "Please enter longitude");
    //   return;
    // }
    if (this.pincode == "" || this.pincode == null || this.pincode == undefined) {
      this.notifier.notify('error', "Please enter pincode");
      return;
    }


    //----------------------- For ERP--------------------//

    // if (this.erpDocSubmit === "") {
    //   this.notifier.notify('error', "Please choose erp document submit");
    //   return;
    // }
    // if (this.erpRegDone === "") {
    //   this.notifier.notify('error', "Please choose erp registration done");
    //   return;
    // }
    // if (this.erpRegDone == "1") {
    //   if (this.erpRegDate == "") {
    //     this.notifier.notify('error', "Please choose erp registration date");
    //     return;
    //   }
    //   if (this.erpRegBy == "" || this.erpRegBy == null) {
    //     this.notifier.notify('error', "Please select erp registration by");
    //     return;
    //   }
    // }


    // if (this.yearOfEstd == "" || this.yearOfEstd == null) {
    //   this.notifier.notify('error', "Please choose year of estublished");
    //   return;
    // }



    // if(this.partCode == "" || this.partCode == null){
    //   this.notifier.notify('error',"Please enter party code");
    //   return;
    // }
    // if(this.partCrLimit == "" || this.partCrLimit == null){
    //   this.notifier.notify('error',"Please enter party credit limit");
    //   return;
    // }
    // if(this.advanced == ""){
    //   this.notifier.notify('error',"Please enter advanced");
    //   return;
    // }
    // if(this.appliedCrLimit == ""){
    //   this.notifier.notify('error',"Please enter applied credit limit");
    //   return;
    // }
    // if (this.fileUpload == "") {
    //   this.notifier.notify('error', "Please upload profile image");
    //   return;
    // }
    //console.log("ERP Reg Done>>>>>>>>>>", this.erpRegDone);

    this.phoneNumber = [];
    this.emailId = [];
    for (let i = 0; i < this.phone.length; i++) {
      this.phoneNumber.push(this.phone[i].item);
    }
    for (let i = 0; i < this.email.length; i++) {
      this.emailId.push(this.email[i].item);
    }

    const data = {
      customerId: this.customerId,
      customerTypeId: this.customerType,
      custBusinessName: this.custBusinessName,
      firstName: this.fName,
      lastName: this.lName,
      gender: this.gender,
      dob: this.dob,
      phoneNumber: this.phoneNumber,
      email: this.emailId,
      title: this.title,
      address: this.address,
      residentAddress: this.residentAddress,
      countryId: this.country,
      stateId: this.state,
      cityId: this.city,
      zoneId: this.zone,
      landmark: this.landmark,
      geoLocation: this.geoLoc,
      lattitude: this.lattitude,
      longitude: this.longitude,
      pinCode: this.pincode,
      customerDescription: this.customerDesc,
      firsmStatus: this.firmsStatus,
      erpCode: this.erpCode,

      //erpDocSubmit: this.erpDocSubmit.toString(),
      //erpRegdone: this.erpRegDone.toString(),
      //erpRegDate: this.erpRegDate === "" ? null : this.erpRegDate,
      //erpRegBy: this.erpRegBy === "" ? '0' : this.erpRegBy,
      //erpRemark: this.erpRemarks === "" ? null : this.erpRemarks,

      yearOfEstd: this.yearOfEstd,
      visitDate: this.visitDate,
      godownLocation: this.godownLoc,
      //stockArea: this.stockArea,
      godownCapacity: this.godownCapacity,
      //partyCode: this.partCode,
      //partyCrLimit: this.partCrLimit,
      advanced: this.advanced,
      appliedCreditLimit: this.appliedCrLimit,
      primaryItemId: this.primaryItem,
      //customerRemarks: this.customerRemark,
      profilePic: this.fileUpload,
      tradeLicenceDoc: this.tradeLicence,
      GSTcertificateDoc: this.gstDoc,
      panCardDoc: this.panDoc,
      aadharCardDoc: this.aadharDoc,
      cancelChequeDoc: this.cancleChequeDoc
    };
    // console.log("Data For Update Customer>>>>>>>>>>>>>", data);
    this.registration.updateCustomer(data).subscribe((res: any) => {
      if (res.success) {
        this.common.Subject.next({});
        this.modalClose();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  //------------------- End Update Customer---------------------//


  //----- For Add Multiple Phone Number Or Email ------------//
  addPhone() {
    this.phone.push({ "item": "" })
  }


  addEmail() {
    this.email.push({ "item": "" });
  }


  removePhone(index: any) {
    this.phone.splice(index, 1);

  }

  removeEmail(index: any) {
    this.email.splice(index, 1);
  }

  //---------------------End -----------------------//


  erpRegDoneFun() {
    if (this.erpRegDone == "1") {
      this.erpFlag = true;
    } else {
      this.erpFlag = false;
      this.erpRegDate = "";
      this.erpRegBy = "";
    }
  }

  //---------------Fetch Data---------------//

  fetchData() {
    const data = {
      customerId: this.customerId
    };
    this.registration.getCustomerDetailsById(data).subscribe((res: any) => {
      //console.log("Customer Details>>>>>>>>", res);
      if (res.success) {
        this.customerType = res.response[0].contactTypeId;
        this.custBusinessName = res.response[0].custBusinessName;
        this.fName = res.response[0].firstName;
        this.lName = res.response[0].lastName;
        this.gender = res.response[0].gender;
        this.dob = this.common.getDateFormatNew3(res.response[0].dob).split(" ")[0];
        this.phone = [];
        for (let obj of res.response[0].phoneNumber.split(",")) {
          this.phone.push({ item: obj })
        }
        this.email = [];
        for (let obj of res.response[0].email.split(",")) {
          this.email.push({ item: obj })
        }
        this.title = res.response[0].title;
        this.address = res.response[0].address;
        this.residentAddress = res.response[0].residentAddress;
        this.country = res.response[0].countryId;
        this.getStatesByCountryId();
        this.state = res.response[0].stateId;
        this.getCityByStateId();
        this.city = res.response[0].cityId;
        this.getZoneByCityId();
        this.zone = res.response[0].zoneId;
        this.landmark = res.response[0].landmark;
        this.geoLoc = res.response[0].geoLocation;
        this.lattitude = res.response[0].latitude;
        this.longitude = res.response[0].longitude;
        this.pincode = res.response[0].pincode;
        this.customerDesc = res.response[0].description;

        //------------- Start Radio Button-----------//

        // this.erpDocSubmit = res.response[0].erpDocSubmited;
        // this.erpRegDone = res.response[0].erpRegdone;
        // if (this.erpRegDone == "1") {
        //   this.erpFlag = true;
        //   this.erpRegDate = this.common.getDateFormatNew3(res.response[0].erpRegOn).split(" ")[0];
        //   this.erpRegBy = res.response[0].erpRegDoneBy;
        //   this.erpRemarks = res.response[0].erpEntryRemarks;
        // }

        //------------------End---------------------//

        this.yearOfEstd = this.common.getDateFormatNew3(res.response[0].yrOfEstablmnt).split(" ")[0];
        this.visitDate = this.common.getDateFormatNew3(res.response[0].visitDate).split(" ")[0];
        this.godownLoc = res.response[0].godownLocation;
        //this.stockArea = res.response[0].covstockyrd_sqrmtr;
        this.godownCapacity = res.response[0].godowncapacity_mt;
        //this.partCode = res.response[0].partyCode;
        //this.partCrLimit = res.response[0].propcrlimit;
        this.advanced = res.response[0].advance;
        this.appliedCrLimit = res.response[0].appliedCreditlimit;
        this.primaryItem = res.response[0].primaryitem;
        //this.customerRemark = res.response[0].remarks;
        this.firmsStatus = res.response[0].firmstatus;
        this.erpCode = res.response[0].ERPCode;
        this.fileUpload = res.response[0].profilePic;

        if (res.response[0].profilePic) {
          this.fileUploadStatus = true;
          this.imageSrc = this.common.imagePath + res.response[0].profilePic;
          //console.log("imgsrc>", this.imageSrc);
        } else {
          this.fileUploadStatus = false;
        }

        if (res.response[0].profilePic) {
          this.imgOrgFile = res.response[0].profilePic.split("/")[2];
        } else {
          this.imgOrgFile = "";
        }
        if (res.response[0].tradeLicenceDoc) {
          this.tradeOrgFileName = res.response[0].tradeLicenceDoc.split("/")[2];
        } else {
          this.tradeOrgFileName = "";
        }
        if (res.response[0].GSTcertificateDoc) {
          this.gstOrgDoc = res.response[0].GSTcertificateDoc.split("/")[2];
        } else {
          this.gstOrgDoc = "";
        }
        if (res.response[0].panCardDoc) {
          this.panOrgDoc = res.response[0].panCardDoc.split("/")[2];
        } else {
          this.panOrgDoc = "";
        }
        if (res.response[0].aadharCardDoc) {
          this.aadharOrgDoc = res.response[0].aadharCardDoc.split("/")[2];
        } else {
          this.aadharOrgDoc = "";
        }
        if (res.response[0].cancelChequeDoc) {
          this.cancleChequeOrgDoc = res.response[0].cancelChequeDoc.split("/")[2];
        } else {
          this.cancleChequeOrgDoc = "";
        }

      }
    })
  }

  // res.response[0].


  getCustomerList() {
    // this.registration.getAllExistingCustomers({}).subscribe((res: any) => {
    //  // console.log("Customers List>>>>>>>>res", res);
    //   if (res.success) {
    //     this.exsistingCustomerName = res.response;
    //    // console.log("customer list of existing>", this.exsistingCustomerName);
    //   }
    // })
  }

  contactTypeFun() {
    if (this.contactType == "1") {
      this.contactTypeExistingFlag = true;
      // this.modalService.open(this.addRoleModal, { centered: true, size: 'ml'});

      // this.modalService.open(RegistrationModalComponent, { size: 'lg' }) this is the new existing modal
      // this.getCustomerList();
    } else {
      this.contactTypeExistingFlag = false;
      this.customerType = "";
      this.fName = "";
      this.lName = "";
      this.gender = "";
      this.dob = "";
      this.title = "";
      this.visitDate = "";
      this.customerDesc = "";
      this.phone = [{ item: "" }];
      this.email = [{ item: "" }];
      this.address = "";
      this.residentAddress = "";
      this.country = "";
      this.state = "";
      this.city = "";
      this.zone = "";
      this.landmark = "";
      this.geoLoc = "";
      this.lattitude = "";
      this.longitude = "";
      this.pincode = "";
    }

  }



  keyword = 'name';
  data = [
    {
      // id: 1,
      name: 'Georgia'
    },
    {
      //  id: 2,
      name: 'Usa'
    },
    {
      //  id: 3,
      name: 'England'
    }
  ];
  selectEvent(item: any) {
    // do something with selected item
    console.log("Selected Existing Customer:", item);
    this.contactPerson = item.id;
    this.getDetailsByContactId();
  }

  onChangeSearch(val: string) {
  //  this.contactPerson= val.contactId;
    // console.log("Search Value:", val);
        // this.nameSearch(val)
        // console.log("onChangeSearch>>>:" ,this.nameSearch(val));
   
        // let reqData={
        //   searchName:this.contactName }
      
        //   if (event.target.value.length >= 3) {
        //     reqData = event.target.value;
        //   this.existingContactList()
      
        //   }
        //   if (event.target.value.length == 0) {
        //     // this.searchName = "";
           
        //   this.existingContactList()
      
        //   }
    
  }

  // searchName=''
  // contactName=''

  // nameSearch(event: any) {
  //   if (event.target.value.length >= 3) {
  //     this.contactName = event.target.value;
  //     this.existingContactList();


  //     console.log("search Text Name:", this.contactName);
      
  //   }
  //   if (event.target.value.length == 0) {
  //     this.contactName = "";
  //     this.existingContactList();
  //     console.log("search Text Name:", this.contactName);


  //   }
  // }

  nameSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.existingContactList();
    }
    else {
      this.searchName = "";
      this.existingContactList();
    }
  }


  onFocused(e: any) {

  }

  existingContactTypeFun() {
    this.getDetailsByContactId();
  }


  existingContactList() {


    let reqData = {
      searchName: ""
    }
    this.registration.getAllExistingList(reqData).subscribe((res: any) => {
      console.log("GetExistingCustomerApi Response:", res)
      if (res.success) {
        res.response.map((ex: any) => {
          this.allExistingUser.push({
            id: ex.contactId,
            name: ex.contactName
          })
        })
        this.exsistingCustomerName = res.response;
        console.log("Existing Contact List>>>>>", this.exsistingCustomerName);
      }
    })



  }



  modalClose() {
    this.modalService.dismissAll();

  }

  getDetailsByContactId() {
    const data = {
      contactId: this.contactPerson
    };
    this.registration.getContactDetails(data).subscribe((res: any) => {
      //console.log(">>>>>>>contact Details>>>>>>>>>", res);
      if (res.success) {
        this.contactDetails = res.response;
        this.fName = res.response[0].contactFirstName;
        this.lName = res.response[0].contactLastName;
        this.customerType = res.response[0].contactTypeId;
        this.address = res.response[0].contactAddress;
        this.country = res.response[0].contactCountryId;
        this.getStatesByCountryId();
        this.state = res.response[0].contactStateId;
        this.getCityByStateId();
        this.city = res.response[0].contactDistrictId;
        this.getZoneByCityId();
        this.zone = res.response[0].contactZoneId;
        this.title = res.response[0].contactTitle;
        this.imageSrc = this.common.imagePath + res.response[0].contactPrflPic;
        if (this.imageSrc) {
          this.fileUploadStatus = true;
        }
        //console.log("image path",this.imageSrc);
        this.lattitude = res.response[0].contactLattitude;
        this.longitude = res.response[0].contactLongitude;
        this.geoLoc = res.response[0].contactGeolocation;
        this.customerDesc = res.response[0].contactDescription;
        this.email = [];
        for (const e of res.response[0].contactEmail.split(",")) {
          this.email.push({ item: e });
        }
        this.phone = [];
        for (const p of res.response[0].contactPhone.split(",")) {
          this.phone.push({ item: p })
        }

      }
    })
  }

  //------- For CRM Access-----------------//

  isCrmAccess() {
    // console.log("crm Access>>>>>>>", this.crmAccess);
    if (this.crmAccess == true) {
      this.accessType = "CRM";
      this.accessCRM();
    } else {
      this.accessType = "";
      this.isDisabled = true;
    }
  }

  accessCRM() {
    const data = {
      accessTyp: this.accessType
    };
    this.registration.crmAccess(data).subscribe((res: any) => {
      if (res.success) {
        this.isDisabled = false;
        this.notifier.notify('success', res.message);
      }
    })
  }
  validateDob(): any {
    //console.log("date",new Date());
    //console.log("date iso:>>>>>>>",new Date().toISOString());
    return new Date().toISOString().split("T")[0];
  }

  //-------- For File Upload----------------//

  uploadFile() {
    // console.log("upload?????????????");
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
        // console.log("file name>>>>>>>>", fileData);
        this.registration.uploadFile(fileData).subscribe((res: any) => {
          // console.log("res>>>>>>>>>>>>>>>>> img",res);
          if (res.success) {
            this.fileUploadStatus = true;
            this.fileUpload = res.response.fileName;
            this.imgOrgFile = res.response.orgfilename;
            // console.log("File name is:", this.fileUpload);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }

  uploadTradeLicence() {
    //console.log("Trade licence function>>>>>>>>>>>>>>>>>>>>>");
    const banner = document.getElementById('uploadTrade') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const fileData = new FormData();
        fileData.append('file', file[0]);
        //console.log("file name>>>>>>>>", fileData);
        this.registration.uploadDoc(fileData).subscribe((res: any) => {
          //console.log("res>>>>>>Trade >>>", res);
          if (res.success) {
            this.tradeLicence = res.response.fileName;
            this.tradeOrgFileName = res.response.orgfilename;
            // console.log("Trade File name is:", this.tradeLicence);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }

  }
  uploadGSTDoc() {
    const banner = document.getElementById('uploadGSTDoc') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const fileData = new FormData();
        fileData.append('file', file[0]);
        //console.log("file name>>>>>>>>", fileData);
        this.registration.uploadDoc(fileData).subscribe((res: any) => {
          //console.log("res>>>>>>Trade >>>", res);
          if (res.success) {
            this.gstDoc = res.response.fileName;
            this.gstOrgDoc = res.response.orgfilename;
            //console.log("GST File name is:", this.gstOrgDoc);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }


  uploadPanDoc() {
    const banner = document.getElementById('uploadPanDoc') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const fileData = new FormData();
        fileData.append('file', file[0]);
        //console.log("file name>>>>>>>>", fileData);
        this.registration.uploadDoc(fileData).subscribe((res: any) => {
          //console.log("res>>>>>>Trade >>>", res);
          if (res.success) {
            this.panDoc = res.response.fileName;
            this.panOrgDoc = res.response.orgfilename;
            //console.log("Pan File name is:", this.panDoc);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }


  uploadAadharDoc() {
    const banner = document.getElementById('uploadAadharDoc') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const fileData = new FormData();
        fileData.append('file', file[0]);
        //console.log("file name>>>>>>>>", fileData);
        this.registration.uploadDoc(fileData).subscribe((res: any) => {
          //console.log("res>>>>>>Trade >>>", res);
          if (res.success) {
            this.aadharDoc = res.response.fileName;
            this.aadharOrgDoc = res.response.orgfilename;
            //console.log("Aadhar File name is:", this.aadharDoc);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }

  }

  uploadCancleChequeDoc() {
    const banner = document.getElementById('uploadCancleChequeDoc') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        const fileData = new FormData();
        fileData.append('file', file[0]);
        //console.log("file name>>>>>>>>", fileData);
        this.registration.uploadDoc(fileData).subscribe((res: any) => {
          //console.log("res>>>>>>>>", res);
          if (res.success) {
            this.cancleChequeDoc = res.response.fileName;
            this.cancleChequeOrgDoc = res.response.orgfilename;
            // console.log("Cancle cheque File name is:", this.cancleChequeDoc);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }
}
