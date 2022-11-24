import { AbstractType, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from "../../service/common.service";
import { OrgApiService } from 'src/app/service/org-api.service';
import { NotifierService } from 'angular-notifier';
import { RestService } from 'src/app/rest.service';
import { ContactsService } from 'src/app/service/contacts.service';
@Component({
    selector: 'app-organizations-modal',
    templateUrl: './organizations-modal.component.html',
    styleUrls: ['./organizations-modal.component.css']
})
export class OrganizationsModalComponent implements OnInit {

    counter: number = 0;
    orgName = '';
    phone: any = [{ item: '' }];
    email: any = [{ item: '' }];
    orgPhone: any = [{ item: '' }];
    orgEmail: any = [{ item: '' }];
    orgDesc = "" as any;
    revenue = "" as any;
    noOfEmp = "" as any;
    assignTO = 0;
    // assignToFlag: boolean = false;
    //annualRevenue = "" as any;
    //  numberOfEmp = "" as any;
    assignToId = "" as any;
    fName = "" as any;
    lName = "" as any;
    ownPhone = "" as any;
    ownEmail = "" as any;
    address = "" as any;
    country = "" as any;
    state = "" as any;
    district = "" as any;
    zone = "" as any;
    geoLocation = "" as any;
    latitude = "" as any;
    longitude = "" as any;
    orgAddress = "" as any;
    orgCountry = "" as any;
    orgState = "" as any;
    orgCity = "" as any;
    orgZone = "" as any;
    orgGeoLoc = "" as any;
    orgLatitude = "" as any;
    orgLongitude = "" as any;
    description = "" as any;
    // productId = "" as any;
    // productVal = "" as any;
    // competitorType = "" as any;
    permissionTo = ""
    contactType = "" as any;
    visibilityPermision = "" as any;
    // visibilityPermision: any = 2;
    visibilityPersionFlag: boolean = false;
    modalStatusFlag: boolean = false;
    contactId = "" as any;
    contactClientId = "" as any;
    orgId = "" as any;
    orgClientId = "" as any;
    //------------------------
    stateId = "" as any;

    //------------------
    stateList: any = [];
    cityList: any = [];
    zoneList: any = [];
    orgStateList: any = [];
    orgCityList: any = [];
    orgZoneList: any = [];
    contactTypeList: any = [];
    productList: any = [];
    userList: any = [];
    countryList: any = [];
    orgPhoneList: any = [];
    orgEmailList: any = [];
    contactPhoneList: any = [];
    contactEmailList: any = [];
    orgDetails: any = [];

    constructor(private ngModelService: NgbModal, private common: CommonService, private orgApiService: OrgApiService, private notifierService: NotifierService, private rest: RestService, private contactsService: ContactsService) {
    }

    ngOnInit(): void {

        this.modalStatusFlag = this.orgApiService.modalFlag;
        if (this.modalStatusFlag) {

            //console.log("orgId value>>>>>>>>>", this.orgApiService.updateData.organizationId);

            if (this.orgApiService.updateData.length > 0) {
                this.getOrgDetailsByOrgId(this.orgApiService.updateData[0].organizationId)
            }
            this.getOrgDetailsByOrgId(this.orgApiService.updateData.organizationId)
        }

        this.contactTypeList = this.common.contactTypeList;
        this.productList = this.common.productList;
        this.userList = this.common.userList;
        this.countryList = this.common.countryList;
    }

    modalClose(): void {
        this.ngModelService.dismissAll();
    }

    saveNext(): void {

        //  if (this.counter != null) {
        if (this.counter == 0) {
            if (this.orgName == "") {
                this.notifierService.notify('error', "Please enter organization name");
                return;
            }
            for (let obj of this.orgPhone) {

                // console.log("obj>>>>>>>>>>>",obj)
                if (obj.item == "") {
                    this.notifierService.notify('error', "Please enter phone number");
                    return;
                }
                if (obj.item != "") {
                    if (this.common.phoneNumberFormat(obj.item) == false) {
                        this.notifierService.notify('error', "Please enter valid phone number");
                        return;
                    }
                }

            }

            if (this.orgPhone.length > 1) {
                if (Number(this.orgPhone[0].item) == Number(this.orgPhone[1].item)) {
                    this.notifierService.notify('error', "Alternate phone number must be different");
                    return;
                }
            }

            for (let obj of this.orgEmail) {
                if (obj.item == "" || obj.item == null) {
                    // this.notifierService.notify('error', "Please enter email id");
                    // return;
                if (obj.item != "") {
                    //console.log("Email>>>>>>>>>>>",obj.item);
                    //console.log("format check>>>>>>>",this.common.mailFormatCheck(obj.item));
                    if (this.common.mailFormatCheck(obj.item) == false) {
                        this.notifierService.notify('error', "Please enter valid mail id");
                        return;
                    }
                }
            }

          


         
             
                // else {
                //     this.notifierService.notify('error', "Add new Email must be field");

                // }
         


            if (this.orgEmail.length > 1) {
                // if (this.orgEmail[0].item !== obj.item) {
                if (this.orgEmail[0].item && this.orgEmail[1].item == "") {

                    this.notifierService.notify('error', "Pleaase add email");
                    var addmail= this.orgEmail[1]
                }
                else{
                    if (this.orgEmail[0].item == this.orgEmail[1].item) {
                        this.notifierService.notify('error', "Alternate Email must be different");
                        return;
                    }
                }
               
            }
        }

            // if (this.orgEmail.length > 1) {
            //     if (this.orgEmail[0].item == this.orgEmail[1].item) {
            //         this.notifierService.notify('error', "please enter email id");
            //         return;
            //     }
            // }
        //     if (this.orgEmail.length > 1) {
        //     if (this.orgEmail[0].item == this.orgEmail[1].item) {
        //         this.notifierService.notify('error', "please Match enter email id");
        //         return;
        //     }
        // }


            if (this.orgDesc == "" || this.orgDesc == null) {
                this.notifierService.notify('error', "Please enter organization description");
                return;
            }
            if (this.orgDesc != "") {
                if (this.orgDesc.length > 350) {
                    this.notifierService.notify('error', "Please enter organization description within 350 characters");
                    return;
                }
            }
            if (this.revenue == "" || this.revenue == null) {
                this.notifierService.notify('error', "Please enter annual revenue");
                return;
            }
            if (this.noOfEmp == "" || this.noOfEmp == null) {
                this.notifierService.notify('error', "Please enter number of employee");
                return;
            }
            if (this.common.getUserType() != 2) {
                if (this.assignToId == "") {
                    this.notifierService.notify('error', "Please select user");
                    return;
                }
            }
        }

        if (this.counter == 1) {
            if (this.contactType == "" || this.contactType == null) {
                this.notifierService.notify('error', "Please select contact type");
                return;
            }

            if (this.fName == "" || this.fName == null) {
                this.notifierService.notify('error', "Please enter first name");
                return;
            }
            if (this.lName == "" || this.lName == null) {
                this.notifierService.notify('error', "Please enter last name");
                return;
            }
            for (let obj of this.phone) {
                if (obj.item == "" || obj.item == null) {
                    this.notifierService.notify('error', "Please enter phone number");
                    return;
                }
                if (obj.item != "") {
                    if (this.common.phoneNumberFormat(obj.item) == false) {
                        this.notifierService.notify('error', "Please enter valid phone number");
                        return;
                    }
                }

            }

            if (this.phone.length > 1) {
                if (Number(this.phone[0].item) == Number(this.phone[1].item)) {
                    this.notifierService.notify('error', "Alternate phone number must be different");
                    return;
                }
            }
            // emailValidation Take away 
            // for (let obj of this.email) {
            //     if (obj.item == "" || obj.item == null) {
            //         this.notifierService.notify('error', "Please enter email id");
            //         return;
            //     }
            //     if (obj.item != "") {
            //         if (this.common.mailFormatCheck(obj.item) == false) {
            //             this.notifierService.notify('error', "Please enter valid email id");
            //             return;
            //         }
            //     }
            // }
            if (this.email.length > 1) {
                if (this.email[0].item == this.email[1].item) {
                    this.notifierService.notify('error', "Alternate Email must be different");
                    return;
                }
            }
            if (this.address == "" || this.address == null) {
                this.notifierService.notify('error', "Please enter address");
                return;
            }
            if (this.country == "" || this.country == null) {
                this.notifierService.notify('error', "Please select country");
                return;
            }
            if (this.state == "" || this.state == null) {
                this.notifierService.notify('error', "Please select state");
                return;
            }
            if (this.district == "" || this.district == null) {
                this.notifierService.notify('error', "Please select district");
                return;
            }
            if (this.zone == "" || this.zone == null) {
                this.notifierService.notify('error', "Please select zone");
                return;
            }
            if (this.geoLocation == "" || this.geoLocation == null) {
                this.notifierService.notify('error', "Please enter contact geo location");
                return;
            }
            if (this.latitude == "" || this.latitude == null) {
                this.notifierService.notify('error', "Please enter latitude");
                return;
            }
            if (this.longitude == "" || this.longitude == null) {
                this.notifierService.notify('error', "Please enter longitude");
                return;
            }
        }
        if (this.counter == 2) {
            if (this.orgAddress == "" || this.orgAddress == null) {
                this.notifierService.notify('error', "Please enter organization address");
                return;
            }
            if (this.orgCountry == "" || this.orgCountry == null) {
                this.notifierService.notify('error', "Please select organization country");
                return;
            }
            if (this.orgState == "" || this.orgState == null) {
                this.notifierService.notify('error', "Please select organization state");
                return;
            }
            if (this.orgCity == "" || this.orgCity == null) {
                this.notifierService.notify('error', "Please select organization district/city");
                return;
            }
            if (this.orgZone == "" || this.orgZone == null) {
                this.notifierService.notify('error', "Please select organization zone");
                return;
            }
            if (this.orgGeoLoc == "" || this.orgGeoLoc == null) {
                this.notifierService.notify('error', "Please enter organization geolocation");
                return;
            }
            if (this.orgLatitude == "" || this.orgLatitude == null) {
                this.notifierService.notify('error', "Please enter lattitude");
                return;
            }
            if (this.orgLongitude == "" || this.orgLongitude == null) {
                this.notifierService.notify('error', "Please enter longitude");
                return;
            }

        }
        if (this.counter == 3) {
            if (this.description == "" || this.description == null) {
                this.notifierService.notify('error', "Please enter description");
                return;
            }
            if (this.description != "") {
                if (this.description.length > 350) {
                    this.notifierService.notify('error', "Please enter description within 350 characters");
                    return;
                }
            }
        }
        if (this.counter == 4) {
            for (let obj of this.productDetails) {
                if (obj.productId == "" || obj.productId == null) {
                    this.notifierService.notify('error', "Please select product");
                    return;
                }
                if (obj.productDescription == "" || obj.productDescription == null) {
                    this.notifierService.notify('error', "Please enter product description");
                    return;
                }
                if (obj.productDescription != "") {
                    if (obj.productDescription.length > 350) {
                        this.notifierService.notify('error', "Please enter product description within 350 characters");
                        return;
                    }
                }
                if (obj.competitorType == "" || obj.competitorType == null) {
                    this.notifierService.notify('error', "Please choose currently using");
                    return;
                }
            }
        }

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
        //  }
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

        const recoredId = Math.floor((Math.random() * 10000000) + 1);

        if (this.visibilityPermision == "" || this.visibilityPermision == null) {
            this.notifierService.notify('error', "Please choose visibility permission");
            return;
        }
        if (this.visibilityPermision == 4) {
            if (this.permissionTo == "" || this.permissionTo == null) {
                this.notifierService.notify('error', "Please select user");
                return;
            }
        }
        
        this.contactEmailList = [];
        this.contactPhoneList = [];
        this.orgPhoneList = [];
        this.orgEmailList = [];

        for (let i = 0; i < this.orgPhone.length; i++) {
            this.orgPhoneList.push(this.orgPhone[i].item);
        }
        for (let i = 0; i < this.orgEmail.length; i++) {
            this.orgEmailList.push(this.orgEmail[i].item);
        }
        for (let i = 0; i < this.phone.length; i++) {
            this.contactPhoneList.push(this.phone[i].item);
        }
        for (let i = 0; i < this.email.length; i++) {
            this.contactEmailList.push(this.email[i].item);
        }

        const data = {
            orgName: this.orgName,
            orgPhoneNumber: this.orgPhoneList,
            orgEmail: this.orgEmailList,
            orgDescription: this.orgDesc,
            anualRevenue: this.revenue,
            orgNumberOfEmployee: this.noOfEmp,
            // assignTo: this.assignTO,
            // assignType: this.assignToId,

            assignType: this.assignTO.toString(),
            assignTo: this.assignToId,
            contactTypeId: this.contactType,
            firstName: this.fName,
            lastName: this.lName,
            phoneNumber: this.contactPhoneList,
            email: this.contactEmailList,
            address: this.address,
            countryId: this.country,
            stateId: this.state,
            districtId: this.district,
            zoneId: this.zone,
            geoLocation: this.geoLocation,
            latitude: this.latitude,
            longitude: this.longitude,
            orgAddress: this.orgAddress,
            orgCountryId: this.orgCountry,
            orgStateId: this.orgState,
            orgDistrictId: this.orgCity,
            orgZoneId: this.orgZone,
            orgGeoLocation: this.orgGeoLoc,
            orgLattitude: this.orgLatitude,
            orgLongitude: this.orgLongitude,
            description: this.description,
            productArr: this.productDetails,
            permissionType: this.visibilityPermision,
            permissionTo: this.permissionTo,

            //--------------- For Lead----------------------//
            recordId: recoredId,
        };
        //console.log("Submitted data>>>>>>>>>>", data);
        this.orgApiService.addOrganization(data).subscribe((res: any) => {
            if (res.success) {
                this.common.Subject.next(data);
                this.modalClose();
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })
    }

    update() {

        this.contactEmailList = [];
        this.contactPhoneList = [];
        this.orgPhoneList = [];
        this.orgEmailList = [];

        for (let i = 0; i < this.orgPhone.length; i++) {
            this.orgPhoneList.push(this.orgPhone[i].item);
        }
        for (let i = 0; i < this.orgEmail.length; i++) {
            this.orgEmailList.push(this.orgEmail[i].item);
        }
        for (let i = 0; i < this.phone.length; i++) {
            this.contactPhoneList.push(this.phone[i].item);
        }
        for (let i = 0; i < this.email.length; i++) {
            this.contactEmailList.push(this.email[i].item);
        }

        const data = {

            contactId: this.contactId,
            contactClientId: this.contactClientId,
            permissionType: this.visibilityPermision,
            permissionTo: this.permissionTo,
            firstName: this.fName,
            lastName: this.lName,
            phoneNumber: this.contactPhoneList,
            email: this.contactEmailList,
            address: this.address,
            countryId: this.country,
            stateId: this.state,
            districtId: this.district,
            zoneId: this.zone,
            geoLocation: this.geoLocation,
            latitude: this.latitude,
            longitude: this.longitude,
            organizationId: this.orgId,
            orgName: this.orgName,
            orgPhoneNumber: this.orgPhoneList,
            orgEmail: this.orgEmailList,
            orgDescription: this.orgDesc,
            anualRevenue: this.revenue,
            orgNumberOfEmployee: this.noOfEmp,
            // assignTo: userType,
            // assignType: this.assignToId,
            assignType: this.assignTO.toString(),
            assignTo: this.assignToId,
            contactTypeId: this.contactType,
            orgAddress: this.orgAddress,
            orgCountryId: this.orgCountry,
            orgStateId: this.orgState,
            orgDistrictId: this.orgCity,
            orgZoneId: this.orgZone,
            orgGeoLocation: this.orgGeoLoc,
            orgLattitude: this.orgLatitude,
            orgLongitude: this.orgLongitude,
            description: this.description,
            competitors: this.productDetails,



        };
        //console.log("Update data>>>>>>>>>>", data);
        this.orgApiService.updateOrganization(data).subscribe((res: any) => {
            if (res.success) {
                this.common.Subject.next(data);
                this.modalClose();
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })
    }

    getOrgDetailsByOrgId(orgId: any) {

        const data = {
            organizationId: orgId
        };
        this.common.spinnerShow();
        //console.log("get Details by orgId>>>>>>", data);
        this.orgApiService.getOrgDetailsByOrgId(data).subscribe((res: any) => {
            this.common.spinnerHide();
            if (res.success) {
                this.orgDetails = res.response;
                //console.log("Organization Details By Org Id>>>>>>>>>", this.orgDetails);
                for (let item of this.orgDetails) {

                    this.orgName = item.orgName;
                    if (item.orgPhone != null && item.orgPhone != "") {
                        if (item.orgPhone.includes(",")) {
                            this.orgPhone = [];
                            for (let p of item.orgPhone.split(",")) {
                                this.orgPhone.push({ item: p });
                            }
                        } else{
                            this.orgPhone =[];
                            this.orgPhone.push({item:item.orgPhone});
                        }
                    } else{
                        this.orgPhone =[{item:""}];
                    }


                    if (item.orgEmail != null && item.orgEmail != "") {
                        if (item.orgEmail.includes(",")) {
                            this.orgEmail = [];
                            for (let e of item.orgEmail.split(",")) {
                                this.orgEmail.push({ item: e });
                            }
                        } else {
                            this.orgEmail = [];
                            this.orgEmail.push({ item: item.orgEmail });
                        }
                    } else {
                        this.orgEmail = [{ item: "" }];
                    }

                    this.orgDesc = item.orgDescription;
                    this.revenue = item.orgAnualRevenue;
                    this.noOfEmp = item.orgNumberOfEmployee;
                    if (item.assignTo != null || item.assignTo.toString() != 0) {
                        this.assignToId = Number(item.assignTo);
                    } else {
                        this.assignToId = "";
                    }
                    //console.log("this.assignToId>>>>>>>>>>", this.assignToId);
                    this.contactType = Number(item.contactTypeId);

                    this.fName = item.contactFirstName;
                    this.lName = item.contactLastName;
                    this.phone = [];
                    for (let phn of item.contactPhone.split(",")) {
                        this.phone.push({ item: phn });
                    }
                    this.email = [];
                    for (let eml of item.contactEmail.split(",")) {
                        this.email.push({ item: eml });
                    }
                    this.address = item.contactAddress;
                    this.country = item.contactCountryId;
                    this.getStatesByselectCountry();
                    this.state = item.contactStateId;
                    this.getCityByselectState();
                    this.district = item.contactDistrictId;
                    this.getZoneselectCity();
                    this.zone = item.contactZoneId;
                    this.geoLocation = item.contactGeolocation;
                    this.latitude = item.contactLattitude;
                    this.longitude = item.contactLongitude;
                    this.orgAddress = item.orgAddress;
                    this.orgCountry = item.orgCountryId;
                    this.getOrgStatesByselectCountry();
                    this.orgState = item.orgStateId;
                    this.getOrgCityByselectState();
                    this.orgCity = item.orgCityId;
                    this.getOrgZoneselectCity();
                    this.orgZone = item.orgZoneId;
                    this.orgGeoLoc = item.orgGeoLocation;
                    this.orgLatitude = item.orgLattitude;
                    this.orgLongitude = item.orgLongitude;
                    this.description = item.contactDescription;
                    console.log("Length of competitors",item.competitors);
                    if (item.competitors.length > 0) {
                        this.productDetails =[];
                        this.productDetails.push({ productId: item.productId, productDescription: item.productDescription, competitorType: item.competitorType });
                    } else {
                        this.productDetails =[];
                        this.productDetails = [{ productId: "", productDescription: "", competitorType: "" }];
                    }
                    this.contactId = item.contactId;
                    this.contactClientId = item.contactClientId;
                    this.visibilityPermision = Number(item.permissionType);

                    if (this.visibilityPermision == 4) {
                        this.visibilityPersionFlag = true;
                    }

                    this.permissionTo = item.permissionTo;
                    // console.log("this.visibilityPermision>>>>>>>",this.visibilityPermision);
                    this.orgId = item.organizationId;
                    //this.assignToId = item.assignType;


                }
            }
        })
    }

    //--------------Add Org Phone Or Email----------------//

    addOrgPhone() {
        this.orgPhone.push({ item: '' });
    }
    addOrgEmail() {
        this.orgEmail.push({ item: '' });
        
            
        
    }


    //-------------------Add Contact Phone Or Email---------------------//

    addPhone() {
        this.phone.push({ item: '' });
    }

    addEmail() {
        this.email.push({ item: '' });
    }


    //---------------Remove Org Phone Or Email----------------------//

    removeOrgPhone(i: any) {
        this.orgPhone.splice(i, 1);
    }

    removeOrgEmail(i: any) {
        this.orgEmail.splice(i, 1);
    }

    //---------------Remove Contact Phone Or Email----------------------//

    removePhone(i: any) {
        this.phone.splice(i, 1);
    }
    removeEmail(i: any) {
        this.email.splice(i, 1);
    }


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

    removeProduct(i: any) {
        this.productDetails.splice(i, 1);
    }

    getStatesByselectCountry() {
        const data = {
            countryId: this.country
        };
        this.rest.getStatesByCountryId(data).subscribe((res: any) => {
            //console.log("State>>>>>>>>", res);
            if (res.success) {
                this.stateList = res.response;
            }
        })
    }

    getCityByselectState() {
        //console.log("City>>>>>>>", this.state);
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
        //console.log("Zone>>>>>>>", this.district);
        const data = {
            cityId: this.district
        };
        this.rest.getZoneByCityId(data).subscribe((res: any) => {
            if (res.response) {
                this.zoneList = res.response;
            }
        })
    }

    getOrgStatesByselectCountry() {
        //console.log("State>", this.orgCountry);
        const data = {
            countryId: this.orgCountry
        };
        this.rest.getStatesByCountryId(data).subscribe((res: any) => {
            if (res.success) {
                this.orgStateList = res.response;
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
            }
        })
    }
    getOrgZoneselectCity() {
        const data = {
            cityId: this.orgCity
        };
        this.rest.getZoneByCityId(data).subscribe((res: any) => {
            if (res.success) {
                this.orgZoneList = res.response;
            }
        })
    }


    visibilityPermisionFun() {
        if (this.visibilityPermision == 4) {
            this.visibilityPersionFlag = true;
        } else {
            this.visibilityPersionFlag = false;
        }
    }

}
