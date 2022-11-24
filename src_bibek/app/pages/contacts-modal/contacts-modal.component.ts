import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from 'src/app/service/contacts.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.component.html',
  styleUrls: ['./contacts-modal.component.css']
})
export class ContactsModalComponent implements OnInit {
  UPLOAD_IMAGE_BASE_PATH = this.commonService.imagePath;
  firstName = "" as any;
  lastname = "" as any;
  title = "" as any;
  contactType = "" as any;
  statusType: any = "";
  address = "" as any;
  contactPhoneNumber: any = [{ item: "" }];
  contactEmail: any = [{ item: "" }];

  addContactPhoneHide: boolean = false;
  addContactEmailHide: boolean = false;
  addOrgPhoneHide: boolean = false;
  addOrgEmailHide: boolean = false;

  orgPhoneNumbers: any = [{ item: "" }];
  orgEmailId: any = [{ item: "" }];
  showImg: boolean = false;

  country = "" as any;
  state = "" as any;
  city = "" as any;
  zone = "" as any;
  geoLocation = "" as any;
  latitude = "" as any;
  longitude = "" as any;
  businessType: any = "";
  organizationFlag: boolean = false;
  orgName = "" as any;
  orgPhone = "" as any;
  orgemail = "" as any;
  orgAddress = "" as any;
  orgCountry = "" as any;
  orgState = "" as any;
  orgcity = "" as any;
  orgZone = "" as any;
  orgGeoLocation = "" as any;
  orgLatitude = "" as any;
  orgLongitude = "" as any;
  anualRevenue = "" as any;
  noOfEmp = "" as any;
  description = "" as any;
  contactProfilePic = "" as any;
  occasionId = "" as any;
  date = "" as any;
  occasionReminder = '' as any;
  occasionYrlyRepet = '' as any;
  fileUpload = '' as any;
  imageSrc = "";
  counter: number = 0;
  contactsLandingLists: any = [];
  contactsTypeList: any = [];
  occassionList: any = [];
  platformList: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];

  //--------------
  orgStateList: any = [];
  orgCityList: any = [];
  orgZoneList: any = [];

  fileUploadStatus: boolean = false;
  orgPhoneNumber: any = [];
  orgEmail: any = [];
  phone: any = [];
  email_id: any = [];
  contactModalFlag: boolean = false;
  contactId: any;
  contactData: any = []
  orgId: any;

  platformDetails = [
    {
      platformId: "",
      platformUrl: ""

    }
  ]

  occasionDetails = [
    {
      occasionId: "",
      occasionDate: "",
      occasionReminder: false,
      occasionYrlyRepet: false
    }
  ]

  productDetails = [
    {
      productId: "",
      productDescription: "",
      competitorType: ""

    }
  ]


  constructor(private modalService: NgbModal, private contactsService: ContactsService, private notifier: NotifierService, private commonService: CommonService, private rest: RestService) { }

  ngOnInit(): void {

    //--------------picture-----------------//
    this.fileUploadStatus = false;
    //-----------------------------------//

    this.getContactsLandingData();
    this.contactModalFlag = this.contactsService.contactModalFlag;
    if (this.contactModalFlag) {
      this.fileUploadStatus = true;
      if (this.contactsService.contactDetailForUpdate.length == 1) {
        this.contactId = this.contactsService.contactDetailForUpdate[0].contactId;
        this.contactDetails();
      } else {
        this.contactId = this.contactsService.contactDetailForUpdate.contactId;
        this.contactDetails();
      }
    }

  }

  modalClose(): void {
    this.modalService.dismissAll()
  }


  saveNext(): void {

    // if(this.counter !=null){
    if (this.counter == 0) {

      if (this.businessType.toString() == "" || this.businessType == null) {

        this.notifier.notify('error', "Please select contact bussiness type");
        return;
      }
      if (this.firstName == "" || this.firstName == null) {
        this.notifier.notify('error', "Please enter first name");
        return;
      }
      if (this.lastname == "" || this.lastname == null) {
        this.notifier.notify('error', "Please enter last name");
        return;
      }

      for (let obj of this.contactPhoneNumber) {
        if (obj.item == "" || obj.item == null) {
          this.notifier.notify('error', "Please enter phone number");
          return;
        }

        if (obj.item != "") {
          if (this.commonService.phoneNumberFormat(obj.item) == false) {
            this.notifier.notify('error', "Please enter  valid phone number");
            return;
          }
        }
      }

      if (this.contactPhoneNumber.length > 1) {
        if (Number(this.contactPhoneNumber[0].item) == Number(this.contactPhoneNumber[1].item)) {
          this.notifier.notify('error', "Alternate phone number must be different");
          return;
        }
      }
      // for (let obj of this.contactEmail) {
      //   if (obj.item == "" || obj.item == null) {
      //     this.notifier.notify('error', "Please enter email id");
      //     return;
      //   }
      //   if (obj.item != "") {
      //     if (this.commonService.mailFormatCheck(obj.item) == false) {
      //       this.notifier.notify('error', "Please enter valid email id");
      //       return;
      //     }

      //   }
      // }

      if (this.contactEmail.length > 1) {
        if (this.contactEmail[0].item == this.contactEmail[1].item) {
          this.notifier.notify('error', "Alternate Email must be different");
          return;
        }
      }
      if (this.title == "" || this.title == null) {
        this.notifier.notify('error', "Please enter title");
        return;
      }
      if (this.contactType == "" || this.contactType == null) {
        this.notifier.notify('error', "Please select contact type");
        return;
      }

      if (this.statusType === "") {
        this.notifier.notify('error', "Please select status type");
        return;
      }
    }

    if (this.counter == 1) {
      if (this.address == "" || this.address == null) {
        this.notifier.notify('error', "Please enter address");
        return;
      }
      if (this.country == "" || this.country == null) {
        this.notifier.notify('error', "Please select country");
        return;
      }

      if (this.state == "" || this.state == null) {
        this.notifier.notify('error', "Please select state");
        return;
      }
      if (this.city == "" || this.city == null) {
        this.notifier.notify('error', "Please select city");
        return;
      }
      if (this.zone == "" || this.zone == null) {
        this.notifier.notify('error', "Please select zone");
        return;
      }
      if (this.geoLocation == "" || this.geoLocation == null) {
        this.notifier.notify('error', "Please enter geolocation");
        return;
      }
      if (this.latitude == "" || this.latitude == null) {
        this.notifier.notify('error', "Please enter latitude");
        return;
      }
      if (this.longitude == "" || this.longitude == null) {
        this.notifier.notify('error', "Please enter longitude");
        return;
      }
    }

    if (this.counter == 2) {

      if (this.businessType == "1") {
        if (this.orgName == "" || this.orgName == null) {
          this.notifier.notify('error', "Please enter organization name");
          return;
        }
        for (let obj of this.orgPhoneNumbers) {
          if (obj.item == "" || obj.item == null) {
            this.notifier.notify('error', "Please enter phone number");
            return;
          }
          if (obj.item != "") {
            if (this.commonService.phoneNumberFormat(obj.item) == false) {
              this.notifier.notify('error', "Please enter  valid phone number");
              return;
            }
          }
        }

        if (this.orgPhoneNumbers.length > 1) {
          if (Number(this.orgPhoneNumbers[0].item) == Number(this.orgPhoneNumbers[1].item)) {
            this.notifier.notify('error', "Alternate phone number must be different");
            return;
          }
        }
        // for (let obj of this.orgEmailId) {
        //   if (obj.item == "" || obj.item == null) {
        //     this.notifier.notify('error', "Please enter email id");
        //     return;
        //   }
        //   if (obj.item != "") {
        //     if (this.commonService.mailFormatCheck(obj.item) == false) {
        //       this.notifier.notify('error', "Please enter valid email id");
        //       return;
        //     }
        //   }
        // }

        if (this.orgEmailId.length > 1) {
          if (this.orgEmailId[0].item == this.orgEmailId[1].item) {
            this.notifier.notify('error', "Alternate Email must be different");
            return;
          }
        }

        if (this.orgAddress == "" || this.orgAddress == null) {
          this.notifier.notify('error', "Please enter organization address");
          return;
        }
        if (this.orgCountry == "" || this.orgCountry == null) {
          this.notifier.notify('error', "Please select organization country");
          return;
        }
        if (this.orgState == "" || this.orgState == null) {
          this.notifier.notify('error', "Please select organization state");
          return;
        }
        if (this.orgcity == "" || this.orgcity == null) {
          this.notifier.notify('error', "Please select organization city");
          return;
        }
        if (this.orgZone == "" || this.orgZone == null) {
          this.notifier.notify('error', "Please select organization zone");
          return;
        }
        if (this.orgGeoLocation == "" || this.orgGeoLocation == null) {
          this.notifier.notify('error', "Please enter organization geolocation");
          return;
        }
        if (this.orgLatitude == "" || this.orgLatitude == null) {
          this.notifier.notify('error', "Please enter organization lattitude");
          return;
        }
        if (this.orgLongitude == "" || this.orgLongitude == null) {
          this.notifier.notify('error', "Please enter organization longitude");
          return;
        }
        if (this.anualRevenue == "" || this.anualRevenue == null) {
          this.notifier.notify('error', "Please enter organization revenue");
          return;
        }
        // if (this.noOfEmp == "") {
        //   this.notifier.notify('error', "Please enter organization number of employee");
        //   return;
        // }
      }
    }

    if (this.counter == 3) {
      //console.log("Occasion Details>>>>>>>>>>>>>>>>", this.occasionDetails);
      for (let obj of this.occasionDetails) {
        if (obj.occasionId == "" || obj.occasionId == null) {
          this.notifier.notify('error', "Please select occasion name");
          return;
        }
        if (obj.occasionDate == "" || obj.occasionDate == null) {
          this.notifier.notify('error', "Please select occasion date");
          return;
        }
      }
    }

    if (this.counter == 4) {
      if (this.description == "" || this.description == null) {
        this.notifier.notify('error', "Please enter description");
        return;
      }
      if (this.description != "") {
        if (this.description.length > 350) {
          this.notifier.notify('error', "Please enter description within 350 characters");
          return;
        }
      }
    }

    //console.log("previous>>>>>>>>>>>>>>>>>>>>>")
    //if (this.counter != null) {
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
    // }
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
  submit() {

    if (this.fileUpload == "" || this.fileUpload == null) {
      this.notifier.notify('error', "Please upload image");
      return;
    }
    for (let obj of this.platformDetails) {
      if (obj.platformId == "" || obj.platformId == null) {
        this.notifier.notify('error', "Please select platform");
        return;
      }
      if (obj.platformUrl == "" || obj.platformUrl == null) {
        this.notifier.notify('error', "Please select platform url");
        return;
      }
    }

    const recoredId = Math.floor((Math.random() * 10000000) + 1);

    //------------------ For Previous Logic-------------------//

    // const userType = this.commonService.getUserType();
    // if (userType == 2) {
    //   this.assignToId = this.commonService.getuserId();
    //   this.permissionIndiVisual = this.commonService.getuserId();

    // }

    this.phone = [];
    this.email_id = [];
    this.orgPhoneNumber = [];
    this.orgEmail = [];

    for (let i = 0; i < this.contactPhoneNumber.length; i++) {
      this.phone.push(this.contactPhoneNumber[i].item);
    }
    for (let i = 0; i < this.contactEmail.length; i++) {
      this.email_id.push(this.contactEmail[i].item);
    }
    for (let i = 0; i < this.orgPhoneNumbers.length; i++) {
      this.orgPhoneNumber.push(this.orgPhoneNumbers[i].item);
    }
    for (let i = 0; i < this.orgEmailId.length; i++) {
      this.orgEmail.push(this.orgEmailId[i].item);
    }

    const data = {
      bussinessType: this.businessType.toString(),
      firstName: this.firstName,
      lastName: this.lastname,
      phoneNumber: this.phone,
      email: this.email_id,
      title: this.title,
      contactTypeId: this.contactType,
      status: this.statusType,
      address: this.address,
      countryId: this.country,
      stateId: this.state,
      districtId: this.city,
      zoneId: this.zone,
      geoLocation: this.geoLocation,
      lattitude: this.latitude,
      longitude: this.longitude,
      orgName: this.orgName,
      orgPhoneNumber: this.orgPhoneNumber,
      orgEmail: this.orgEmail,
      orgAddress: this.orgAddress,
      orgCountryId: this.orgCountry,
      orgStateId: this.orgState,
      orgDistrictId: this.orgcity,
      orgZoneId: this.orgZone,
      orgGeoLocation: this.orgGeoLocation,
      orgLattitude: this.orgLatitude,
      orgLongitude: this.orgLongitude,
      orgAnualRevenue: this.anualRevenue,
      orgNumberOfEmployee: this.noOfEmp,
      enevtArr: this.occasionDetails,
      platformArr: this.platformDetails,
      description: this.description,
      profilePic: this.fileUpload,
      recordId: recoredId,
      product: this.productDetails
    };
    // console.log("Submit Data>>>>>>>>>>", data);
    this.contactsService.addContacts(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.commonService.Subject.next(data);
        this.modalClose();
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  update() {

    this.phone = [];
    this.email_id = [];
    this.orgPhoneNumber = [];
    this.orgEmail = [];

    for (let i = 0; i < this.contactPhoneNumber.length; i++) {
      this.phone.push(this.contactPhoneNumber[i].item);
    }
    for (let i = 0; i < this.contactEmail.length; i++) {
      this.email_id.push(this.contactEmail[i].item);
    }
    for (let i = 0; i < this.orgPhoneNumbers.length; i++) {
      this.orgPhoneNumber.push(this.orgPhoneNumbers[i].item);
    }
    for (let i = 0; i < this.orgEmailId.length; i++) {
      this.orgEmail.push(this.orgEmailId[i].item);
    }

    const data = {

      bussinessType: this.businessType.toString(),
      firstName: this.firstName,
      lastName: this.lastname,
      phoneNumber: this.phone,
      email: this.email_id,
      title: this.title,
      contactTypeId: this.contactType,
      status: this.statusType,
      address: this.address,
      countryId: this.country,
      stateId: this.state,
      districtId: this.city,
      zoneId: this.zone,
      geoLocation: this.geoLocation,
      lattitude: this.latitude,
      longitude: this.longitude,
      orgName: this.orgName,
      orgPhoneNumber: this.orgPhoneNumber,
      orgEmail: this.orgEmail,
      orgAddress: this.orgAddress,
      orgCountryId: this.orgCountry,
      orgStateId: this.orgState,
      orgDistrictId: this.orgcity,
      orgZoneId: this.orgZone,
      orgGeoLocation: this.orgGeoLocation,
      orgLattitude: this.orgLatitude,
      orgLongitude: this.orgLongitude,
      orgAnualRevenue: this.anualRevenue,
      orgNumberOfEmployee: this.noOfEmp,
      enevtArr: this.occasionDetails,
      platformArr: this.platformDetails,
      description: this.description,
      profilePic: this.fileUpload,
      contactId: this.contactId,
      orgId: this.orgId
    };
    // console.log("update data>>>>>>>", data);
    this.contactsService.updateContact(data).subscribe((res: any) => {
      if (res.success) {
        this.modalClose();
        this.commonService.Subject.next(data);
        //console.log(">>>>>>>>Subject Next>>>>>>>>", data);
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }

  getContactsLandingData() {
    this.contactsService.getContactsLandingData({}).subscribe((res: any) => {
      if (res.success) {
        this.contactsTypeList = res.response.contactTypData;
        this.occassionList = res.response.occassionData;
        this.platformList = res.response.platformData;
        this.countryList = res.response.countryData;
        //console.log("contact type list>>>>>>>",this.contactsTypeList);
      }
    })
  }

  getStatesByselectCountry() {
    const data = {
      countryId: this.country
    };
    this.rest.getStatesByCountryId(data).subscribe((res: any) => {
      if (res.success) {
        this.stateList = res.response;
      }
    })
  }
  getCityByselectState() {
    const data = {
      stateId: this.state
    };
    this.rest.getCityByStateId(data).subscribe((res: any) => {
      if (res.success) {
        this.cityList = res.response;
      }
    })
  }
  getZoneselectCity() {
    const data = {
      cityId: this.city
    };
    this.rest.getZoneByCityId(data).subscribe((res: any) => {
      if (res.success) {
        this.zoneList = res.response;
      }
    })
  }

  getOrgStatesByselectCountry() {
    const data = {
      countryId: this.orgCountry
    };
    this.rest.getStatesByCountryId(data).subscribe((res: any) => {
      if (res.success) {
        this.orgStateList = res.response;
        //console.log("OrgState List>>>>>>>>", this.orgStateList);
      }
    })
  }
  getOrgCityByselectState() {
    const data = {
      stateId: this.orgState
    };
    this.rest.getCityByStateId(data).subscribe((res: any) => {
      if (res.success) {
        this.orgCityList = res.response;
        //console.log("orgCity list", this.orgStateList);
      }
    })
  }
  getOrgZoneselectCity() {
    const data = {
      cityId: this.orgcity
    };
    this.rest.getZoneByCityId(data).subscribe((res: any) => {
      if (res.success) {
        this.orgZoneList = res.response;
        //console.log("Org Zone list>>>>>>>", this.orgZoneList);
      }
    })
  }

  addPhone() {
    this.contactPhoneNumber.push({
      item: ""
    })
  }
  addEmail() {
    this.contactEmail.push({
      item: ""
    })
  }
  addOrgPhone() {
    this.orgPhoneNumbers.push({
      item: ""
    })

  }
  addOrgEmail() {
    this.orgEmailId.push({
      item: ""
    })
  }

  addPlatform() {

    this.platformDetails.push({
      platformId: "",
      platformUrl: ""

    })
  }
  addOccasion() {
    this.occasionDetails.push({
      occasionId: "",
      occasionDate: "",
      occasionReminder: false,
      occasionYrlyRepet: false
    })

  }

  //---------------------For Oppertunanty ----------------------//
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
  //-----------------------------------//
  contactDetails() {
    const data = {
      contactId: this.contactId
    };
    this.commonService.spinnerShow();
    this.contactsService.getContactDetails(data).subscribe((res: any) => {
      this.commonService.spinnerHide();
      if (res.success) {
        this.contactData = res.response;
        console.log("Fetch contactData>>>>>>>>>>>>", this.contactData);
        for (let item of this.contactData) {
          this.businessType = Number(item.businessType);
          this.firstName = item.contactFirstName;
          this.lastname = item.contactLastName;
          if (item.contactPhone != null && item.contactPhone != "") {
            if (item.contactPhone.includes(",")) {
              this.contactPhoneNumber = [];
              for (const p of item.contactPhone.split(',')) {
                this.contactPhoneNumber.push({ item: p });
              }
            } else {
              this.contactPhoneNumber = [];
              this.contactPhoneNumber.push({ item: item.contactPhone });
            }
          } else {
            this.contactPhoneNumber = [{ item: "" }];
          }

          if (item.contactEmail != null && item.contactEmail != "") {
            if (item.contactEmail.includes(",")) {
              this.contactEmail = [];
              for (const e of item.contactEmail.split(',')) {
                this.contactEmail.push({ item: e });
              }
            } else {
              this.contactEmail = [];
              this.contactEmail.push({ item: item.contactEmail });
            }
          } else {
            this.contactEmail = [{ item: "" }];
          }


          this.title = item.contactTitle;
          this.contactType = Number(item.contactTypeId);
          this.statusType = Number(item.contactStatus);
          this.address = item.contactAddress;
          this.country = item.contactCountryId;
          this.getStatesByselectCountry();
          this.state = item.contactStateId;
          this.getCityByselectState();
          this.city = item.contactDistrictId;
          this.getZoneselectCity();
          this.zone = item.contactZoneId;
          this.geoLocation = item.contactGeolocation;
          this.latitude = item.contactLattitude;
          this.longitude = item.contactLongitude;

          if (this.businessType == 1) {
            this.organizationFlag = true;
            this.orgName = item.organization[0].orgName;
            if (item.organization[0].orgPhone != null && item.organization[0].orgPhone != "") {
              if (item.organization[0].orgPhone.includes(",")) {
                this.orgPhoneNumbers = [];
                for (const orgphone of item.organization[0].orgPhone.split(',')) {
                  this.orgPhoneNumbers.push({ item: orgphone });
                }
              } else {
                this.orgPhoneNumbers = [];
                this.orgPhoneNumbers.push({ item: item.organization[0].orgPhone });
              }
            } else {
              this.orgPhoneNumbers = [{ item: "" }];
            }

            if (item.organization[0].orgEmail != null && item.organization[0].orgEmail != "") {
              if (item.organization[0].orgEmail.includes(",")) {
                this.orgEmailId = [];
                for (const orgemail of item.organization[0].orgEmail.split(',')) {
                  this.orgEmailId.push({ item: orgemail })
                }
              } else {
                this.orgEmailId = [];
                this.orgEmailId.push({ item: item.organization[0].orgEmail });
              }
            } else {
              this.orgEmailId = [{ item: "" }];
            }

            this.orgAddress = item.organization[0].orgAddress;
            this.orgCountry = item.organization[0].orgCountryId;
            this.getOrgStatesByselectCountry();
            this.orgState = item.organization[0].orgStateId;
            this.getOrgCityByselectState();
            this.orgcity = item.organization[0].orgCityId;
            this.getOrgZoneselectCity();
            this.orgZone = item.organization[0].orgZoneId;
            this.orgGeoLocation = item.organization[0].orgGeoLocation;
            this.orgLatitude = item.organization[0].orgLattitude;
            this.orgLongitude = item.organization[0].orgLongitude;
            this.anualRevenue = item.organization[0].orgAnualRevenue;
            this.noOfEmp = item.organization[0].orgNumberOfEmployee;
          }
          // console.log("eventArray length>>>>", item.enevtArr.length);
          if (item.enevtArr.length > 0) {
            this.occasionDetails = [];
            for (let date of item.enevtArr) {
              // console.log(">>>>>>>>>>>>>>>>", date.occasionReminder);
              if (date.occasionReminder == 1) {
                date.occasionReminder = true;
              } else {
                date.occasionReminder = false;
              }
              if (date.occasionYrlyRepet == 1) {
                date.occasionYrlyRepet = true;
              } else {
                date.occasionYrlyRepet = false;
              }
              date.occasionDate = this.commonService.formatDate(date.occationDate);
              this.occasionDetails.push({ "occasionId": date.occasionId, "occasionDate": date.occasionDate, "occasionReminder": date.occasionReminder, "occasionYrlyRepet": date.occasionYrlyRepet })
            }
          } else {
            this.occasionDetails = [];
            this.occasionDetails.push({ "occasionId": "", "occasionDate": "", "occasionReminder": false, "occasionYrlyRepet": false });
          }

          if (item.contactPrflPic) {
            this.fileUploadStatus = true;
            this.fileUpload = item.contactPrflPic;
            this.imageSrc = this.UPLOAD_IMAGE_BASE_PATH + item.contactPrflPic;
            //console.log("img src>>>>>>>", this.imageSrc);
          } else {
            this.imageSrc = this.UPLOAD_IMAGE_BASE_PATH + item.contactPrflPic;
            //console.log("Not upload image>>>>", this.imageSrc);
            this.fileUploadStatus = false;
          }

          if (item.platformArr.length > 0) {
            this.platformDetails = [];
            for (let obj of item.platformArr) {
              this.platformDetails.push({ "platformId": obj.platformId, "platformUrl": obj.platformUrl });
            }
          } else {
            this.platformDetails = [];
            this.platformDetails.push({ "platformId": "", "platformUrl": "" });
          }

          this.description = item.contactDescription;

          this.orgId = item.organizationId;
          this.contactId = item.contactId;
        }
      }
    })

  }



  getPermissionData(permissionType: any) {

  }

  removePlatform(index: any) {
    this.platformDetails.splice(index, 1);
  }
  removeOccasion(index: any) {
    this.occasionDetails.splice(index, 1);
    // console.log("Occasion>>>>>>>>>>", this.occasionDetails);
  }

  removeEmail(index: any) {
    this.orgEmailId.splice(index, 1);
    this.addOrgEmailHide = false;
  }
  removePhoneNumber(index: any) {
    this.orgPhoneNumbers.splice(index, 1);
    this.addOrgPhoneHide = false;
  }
  removeemail(index: any) {
    this.contactEmail.splice(index, 1);
    this.addContactEmailHide = false;
  }
  removePhone(index: any) {
    this.contactPhoneNumber.splice(index, 1);
    this.addContactPhoneHide = false;
  }

  businessTypeFun() {
    //console.log("Bussiness type>>>>>", this.businessType);
    if (this.businessType == 1) {
      this.organizationFlag = true;
    } else {
      this.organizationFlag = false;
    }
  }

  uploadFile() {
    const banner = document.getElementById('upload') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const fileData = new FormData();
        fileData.append('file', file[0]);
        this.contactsService.uploadFile(fileData).subscribe((res: any) => {
          if (res.success) {
            this.fileUploadStatus = true;
            this.fileUpload = res.response.fileName;
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }
        })
      }
    }
  }

}
