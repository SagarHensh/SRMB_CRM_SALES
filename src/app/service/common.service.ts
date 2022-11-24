import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


// import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    Subject = new Subject<any>();
    chartLoaderSub = new Subject<any>();
    taskDetails: any;
    updateTaskFlag: boolean = false;
    getTaskList: any;
    contactModalFlag: boolean = false;
    imagePath: any;
    leadId: any;
    opportunatiId: any;
    addLeadSubject = new Subject<any>();
    addopportunitySubject = new Subject<any>();
    countryList: any = [];
    userList: any = [];
    contactTypeList = [];
    productList = [];
    isAdd = false;
    isOpportunityAdd = false;
    contactsTypeList: any = [];
    occassionList: any = [];
    platformList: any = [];
    activityTypeList: any = [];
    orgPermissionDetails: any = [];
    contactPermissionDetails: any = [];
    taskPermissionDetails: any = [];
    leadPermissionDetails: any = [];
    oppPermissionDetails: any = [];
    empPermissionDetails: any = [];
    customerPermissionDetails: any = [];
    enquiryPermissionDetails: any = [];
    calenderPermissionDetails: any = [];
    //-------------- For Bulk Upload Sample path ----------//

    downloadPath = "http://3.7.173.54/sampleFile/"

    // UPLOAD_IMAGE_BASE_PATH = 'http://3.7.173.54:8290/api/'

    constructor(private config: ConfigService, private spinner: NgxSpinnerService) {
        this.imagePath = config.IMAGE_PATH;
    }

    getToken() {
        // const token = sessionStorage.getItem('token');
        const token = localStorage.getItem('token');
        // console.log("token===================",token);
        //return token ? token : null
        return token ? token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjEiLCJ1c2VyVHlwZUlkIjoiMSIsInJlcXRpbWUiOjE2NTMzMTI2MzM4MDZ9LCJpYXQiOjE2NTMzMTI2MzN9.MjXLcad-PzFFd9_-KnI0xrSdjOKBsakP9Hyw0dpxZJo"
    }

    // decryptResponse(resp: any): any {
    //   try {
    //     const bytes = CryptoJS.AES.decrypt(resp, this.config.SECRECT); // Decrypt the encripted crypto token in byteCode from api
    //     const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //     console.log("decrept>>>>>>>>>>>>",decryptedData);
    //     return decryptedData;
    //   } catch (e) {
    //     // console.log(e);
    //   }
    // }

    // encryptRequest(resp: any): any {
    //   try {
    //     const ciphertext = CryptoJS.AES.encrypt(
    //       resp,
    //       this.config.LOCAL_SECRECT
    //     ).toString(); // Encrypt the jwt token in Crypto
    //     return ciphertext;
    //   } catch (e) {
    //     // console.log(e);
    //   }
    // }


    getuserId() {
        const userId = localStorage.getItem('userId');
        if (userId) {
            return JSON.parse(userId)
        } else {
            return null;
        }
    }

    getClientId() {
        const clientId = localStorage.getItem('clientId');
        if (clientId) {
            return JSON.parse(clientId)
        } else {
            return null;
        }
    }

    getUserType() {
        const userType = localStorage.getItem('userType');
        if (userType) {
            return JSON.parse(userType)
        } else {
            return null;
        }
    }



    mailFormatCheck(mail: any) {
        const mailFormat = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (mailFormat.test(mail)) {
            return true;
        } else {
            return false;
        }
    }

    phoneNumberFormat(phoneNo: any) {
        const phoneNo_format = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (phoneNo_format.test(phoneNo)) {
            return true;
        } else {
            return false;
        }
    }

    // convertDate(date:any){
    //   const date1 = NewDate(date)
    // }

    formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    spinnerShow() {
        this.spinner.show();
    }

    spinnerHide() {
        this.spinner.hide();
    }

    phoneSplit(phone: any) {
        let phoneArray = phone.split(',');
        let tempArray = [];
        for (let i = 0; i < phoneArray.length; i++) {
            tempArray.push({ "phoneNo": phoneArray[i] });
        }
        return tempArray;
    }

    emailSplit(email: any) {
        let emailArray = email.split(',');
        let tempArray = [];
        for (let i = 0; i < emailArray.length; i++) {
            tempArray.push({ "email": emailArray[i] });
        }
        return tempArray;
    }


    phoneSplitORG(phone: any) {
        let phoneArray = phone.split(',');
        let tempArray = [];
        for (let i = 0; i < phoneArray.length; i++) {
            tempArray.push({ "OrgPhone": phoneArray[i] });
        }
        return tempArray;
    }

    emailSplitORG(email: any) {
        let emailArray = email.split(',');
        let tempArray = [];
        for (let i = 0; i < emailArray.length; i++) {
            tempArray.push({ "OrgEmail": emailArray[i] });
        }
        return tempArray;
    }

    getDateFormat(newDate: any): any {
        let date = new Date(newDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + '/' + month + '/' + year;
    }
    getDateFormatNew(newDate: any): any {
        let date = new Date(newDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + '-' + month + '-' + year;
    }

    getDateFormatNew1(newDate: any): any {
        let date = new Date(newDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        // return day + '/' + month + '/' + year;
        return year + '/' + month + '/' + day;
    }

    getDateFormatNew2(newDate: any): any {
        console.log('>>>>>>>>>>>>>', newDate);
        let date = new Date(newDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let actualMonth;
        if (month < 10) {
            actualMonth = '0' + month;
        } else {
            actualMonth = month;
        }
        let actualDate;
        let day = date.getDate();
        if (day < 10) {
            actualDate = '0' + day;
        } else {
            actualDate = day;
        }
        // return day + '/' + month + '/' + year;
        return year + '-' + actualMonth + '-' + actualDate;
    }
    getDateFormatNew3(newDate: any): any {
        console.log('>>>>>>>>>>>>>', newDate);
        let date = new Date(newDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let actualMonth;
        if (month < 10) {
            actualMonth = '0' + month;
        } else {
            actualMonth = month;
        }
        let actualDate;
        let day = date.getDate();
        if (day < 10) {
            actualDate = '0' + day;
        } else {
            actualDate = day;
        }
        // return day + '/' + month + '/' + year;
        return year + '-' + actualMonth + '-' + actualDate + ' ' + hour + ':' + min + ':' + sec;
    }


    //---------------------------- CRM Menu Header -------------------------//

    enquiryHeader = [
        {
            title: "Sl No.",
            isView: true
        },
        {
            title: "Enquiry Source",
            isView: true
        },
        {
            title: "Enquiry Type",
            isView: true
        },
        {
            title: "Owner Name",
            isView: true
        },
        {
            title: "Owner Phone No",
            isView: true
        },
        {
            title: "Owner Email",
            isView: true
        },
        {
            title: "Business Name",
            isView: true
        },
        {
            title: "Business Phone No",
            isView: true
        },
        {
            title: "Business Email",
            isView: true
        },
        {
            title: "Business Address",
            isView: true
        },
        {
            title: "Address",
            isView: true
        },
        {
            title: "Country",
            isView: true
        },
        {
            title: "State",
            isView: true
        },
        {
            title: "District",
            isView: true
        },
        {
            title: "City/Village",
            isView: true
        },
        {
            title: "Zone",
            isView: true
        },
        {
            title: "Pincode",
            isView: true
        },
        {
            title: "Notes",
            isView: true
        },
        {
            title: "Employee Type",
            isView: true
        },
        {
            title: "Assigned Employee",
            isView: true
        },
        {
            title: "Assigned Date",
            isView: true
        },
        {
            title: "Action",
            isView: true
        }
    ];

}
