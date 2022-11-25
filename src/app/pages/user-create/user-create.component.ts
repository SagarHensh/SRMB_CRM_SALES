import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/service/administration.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  //------------ For Create New User -----------//

  fName = "";
  lName = "";
  gender = "" as any;
  dob = "";
  joinDate = "";
  phone = [{ "item": "" }];
  phoneNumArr: any = [];
  email = "" as any;
  designation = "" as any;
  role = "" as any;
  //reportingPerson = "" as any;
  address = "" as any;
  country = "" as any;
  state = "" as any;
  city = "" as any;
  // zone = "" as any;
  // geoloc = "";
  // lattitude = "";
  // longitude = "";
  remarks = "";
  allowEmployee: boolean = false;
  allowEmployeeValue = "0" as any;
  password = "" as any;
  allowEmployeeFlag: boolean = false;
  userUpdateFlag: boolean = false;

  designationList: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  zoneList: any = [];
  roleList: any = [];

  imageSrc = "";
  orgFileName = "";
  fileUploadStatus: boolean = false;
  fileUpload = "";
  searchByUserName = "";
  searchByUserPhone = "";
  searchByUserRole = "";
  searchByUserDesignation = "";
  searchByUserEmail = "";
  limit = 10;
  offset = 0;
  userList: any = [];
  userDetailsById: any = [];
  uId = "" as any;

  constructor(private administration: AdministrationService, private notifier: NotifierService, private common: CommonService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDesignation();
    this.getCountry();
    this.getRole();
    this.userUpdateFlag = this.administration.userUpdateFlag;
    this.userDetailsById = this.administration.userDetailsParticularId;
    //console.log("user Details>>>>>>>>>>>>>>>>>>>",this.userDetailsById);
    //console.log("length of userDetail>>>>>>>>>",this.userDetailsById.length);
    if (this.userDetailsById.length > 0) {
      this.uId = this.userDetailsById[0].userCId;
      //this.getDetailsById();
    }
    if (!this.userDetailsById.length) {
      this.uId = this.userDetailsById;
    }
    if (this.userUpdateFlag) {
      this.getDetailsById();
    }

  }

  createNewUser() {

    if (this.allowEmployeeValue == "1") {
      if (this.role == "" || this.role == null) {
        this.notifier.notify('error', "Please select role");
        return;
      }
      if (this.password == "" || this.password == null) {
        this.notifier.notify('error', "Please enter password");
        return;
      }
    }
    if (this.fName == "" || this.fName == null) {
      this.notifier.notify('error', "Please enter first name");
      return;
    }
    if (this.fName != '' || this.fName != null) {
      var c = 0
      for (var i=0; i<this.fName.length;i++){
        if(this.fName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.fName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
          }
        }
      }
    if (this.lName == "" || this.lName == null) {
      this.notifier.notify('error', "Please enter last name");
      return;
    }
    if (this.lName != '' || this.lName==null){
      var counter = 0 
      for( var i=0; i<this.lName.length;i++){
        if(this.lName[0].charCodeAt(0)==32){
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        if(this.lName[i].charCodeAt(0)==32){
          counter = counter +1;
            if(counter > 1){
              this.notifier.notify('error', 'Not allowed white space');
              return;
            }
        }
      }
    }
    if (this.gender == "" || this.gender == null) {
      this.notifier.notify('error', "Please choose gender");
      return;
    }
    if (this.dob == "" || this.dob == null) {
      this.notifier.notify('error', "Please choose date of birth");
      return;
    }
    if (this.joinDate == "" || this.joinDate == null) {
      this.notifier.notify('error', "Please choose date of joinning");
      return;
    }
    for (let obj of this.phone) {
      if (obj.item == "" || obj.item == null) {
        this.notifier.notify('error', "Please enter phone number");
        return;
      }
      if (obj.item != "") {
        if (this.common.phoneNumberFormat(obj.item) == false) {
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

    // if (this.email == "" || this.email == null) {
    //   this.notifier.notify('error', "Please enter email id");
    //   return;
    // }
    if (this.email != "") {
      if (this.common.mailFormatCheck(this.email) == false) {
        this.notifier.notify('error', "Please enter valid mail id");
        return;
      }
    }

    if (this.designation == "" || this.designation == null) {
      this.notifier.notify('error', "Please select designation");
      return;
    }

    if (this.address == "" || this.address == null) {
      this.notifier.notify('error', "Please enter address");
      return;
    }
      // if (this.address == "" || this.address == null)
      // {

      // }

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
    // if (this.zone == "") {
    //   this.notifier.notify('error', "Please select zone");
    //   return;
    // }
    // if (this.geoloc == "") {
    //   this.notifier.notify('error', "Please enter geo location");
    //   return;
    // }
    // if (this.lattitude == "" || this.lattitude == null) {
    //   this.notifier.notify('error', "Please enter lattitude");
    //   return;
    // }
    // if (this.longitude == "" || this.longitude == null) {
    //   this.notifier.notify('error', "Please enter longitude");
    //   return;
    // }
    // if (this.remarks == "") {
    //   this.notifier.notify('error', "Please enter remarks");
    //   return;
    // }
    if (this.fileUpload == "" || this.fileUpload == null) {
      this.notifier.notify('error', "Please upload profile image");
      return;
    }

    for (let i = 0; i < this.phone.length; i++) {
      this.phoneNumArr.push(this.phone[i].item)
    }

    const data = {
      firstName: this.fName,
      lastName: this.lName,
      phoneNumber: this.phoneNumArr,
      email: this.email,
      address: this.address,
      designationId: this.designation,
      countryId: this.country,
      stateId: this.state,
      districtId: this.city,
      //zoneId: this.zone,
      profileImgUrl: this.fileUpload,
      dob: this.dob,
      gender: this.gender,
      dateOfJoin: this.joinDate,
      // geoLocation:this.geoloc,
      // lattitude:this.lattitude,
      // longitude:this.longitude,
      remark: this.remarks,
      userEmpPermit: this.allowEmployeeValue.toString(),
      roleId: this.role,
      password: this.password

    };
    //console.log("Request Data for Employee Add>>>>>>>", data);

    this.administration.createNewUser(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.common.Subject.next(data);
        this.modalClose();
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  addPhone() {
    this.phone.push({ "item": "" })
  }
  removePhone(index: any) {
    this.phone.splice(index, 1);
  }

  allowEmployeeUser() {
    if (!this.allowEmployee) {
      this.allowEmployeeFlag = false;
      this.allowEmployeeValue = "0";
    }
    if (this.allowEmployee) {
      this.userPermission();
      this.allowEmployeeFlag = true;
      this.allowEmployeeValue = "1";
    }
  }

  userPermission() {
    const data = {
      userEmpPermit: this.allowEmployeeValue
    };
    this.administration.getUserPermission(data).subscribe((res: any) => {
      //console.log("Number of user>>>>>>>>",res);
      if (!res.success) {
        this.notifier.notify('error', res.message);
      }
    })
  }

  //------------------ Dropdown Api--------------------//

  getDesignation() {
    this.administration.getDesignation({}).subscribe((res: any) => {
      //console.log("Designation list>>>>>>>", res);
      if (res.success) {
        this.designationList = res.response;
      }
    })
  }
  getCountry() {
    this.administration.getCountry().subscribe((res: any) => {
      //console.log("country List>>>>>>>>", res);
      if (res.success) {
        this.countryList = res.response;
      }
    })
  }

  getStatesByCountryId() {
    const data = {
      countryId: this.country
    };
    this.administration.getState(data).subscribe((res: any) => {
      if (res.success) {
        this.stateList = res.response;
      }
    })
  }

  getCityByStateId() {
    const data = {
      stateId: this.state
    };
    this.administration.getCity(data).subscribe((res: any) => {
      if (res.success) {
        this.cityList = res.response;
      }
    })
  }
  getZoneByCityId() {
    const data = {
      cityId: this.city
    };
    this.administration.getZone(data).subscribe((res: any) => {
      if (res.success) {
        this.zoneList = res.response;
      }
    })
  }

  getRole() {
    this.administration.getRole({}).subscribe((res: any) => {
      //console.log("role list>>>>>>>>",res);
      if (res.success) {
        this.roleList = res.response.data;
      }
    })
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
        this.administration.uploadFile(fileData).subscribe((res: any) => {
          if (res.success) {
            this.fileUploadStatus = true;
            this.fileUpload = res.response.fileName;
            this.orgFileName = res.response.orgfilename;
            //console.log("File name is:", this.fileUpload);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }
  }

  modalClose() {
    this.modalService.dismissAll();
  }

  //----------------Fetch Data---For update-----------//
  getDetailsById() {
    const data = {
      userCId: this.uId
    };
    //console.log("userId>>>>>>>>>>>>>>>>>",data);
    this.administration.getUserDetailsByUserCId(data).subscribe((res: any) => {
      //console.log("Employee Details Fetch into modal>>>>>>>>", res);
      this.role = Number(res.response[0].roleId);
      // this.fName = res.response[0].userName.split(" ")[0];
      // this.lName = res.response[0].userName.split(" ")[1];
      this.fName = res.response[0].firstName;
      this.lName = res.response[0].lastName;
      this.gender = res.response[0].gender;
      this.dob = this.common.getDateFormatNew3(res.response[0].dob).split(" ")[0];
      this.joinDate = this.common.getDateFormatNew3(res.response[0].dateOfJoining).split(" ")[0];
      this.phone = [];
      for (let p of res.response[0].phone.split(",")) {
        this.phone.push({ item: p })
      }
      this.email = res.response[0].email;
      this.designation = res.response[0].designationId;
      this.address = res.response[0].address;
      this.country = res.response[0].countryId;
      this.getStatesByCountryId();
      this.state = res.response[0].stateId;
      this.getCityByStateId();
      this.city = res.response[0].cityId;
      this.remarks = res.response[0].remark;
      this.fileUpload = res.response[0].profileImgUrl;
      this.fileUploadStatus = true;
      this.imageSrc = this.common.imagePath + res.response[0].profileImgUrl;
      this.allowEmployeeValue = Number(res.response[0].userPermission);
      this.orgFileName = res.response[0].profileImgUrl.split("/")[2];
      //this.allowEmployeeValue = res.response[0].userEmpPermit;
      //console.log("------------------allowEmployeeValue-----------",this.allowEmployeeValue);
      if (this.allowEmployeeValue == "1") {
        this.allowEmployee = true;
        this.allowEmployeeFlag = true;
        this.role = res.response[0].roleId.toString();
        this.password = res.response[0].password;
      }

      //console.log("Fileupload>>>>>>>>>",this.fileUpload);

    })
  }

  //----------------------------update user-----------------------//

  updateUser() {

    // if(this.common.getUserType() == 2){
    //   this.notifier.notify('error',"Only admin can update");
    //   return;
    // }

    this.phoneNumArr = [];
    if (this.allowEmployeeValue == "1") {
      if (this.role == "" || this.role == null) {
        this.notifier.notify('error', "Please select role");
        return;
      }
      if (this.password == "" || this.password == null) {
        this.notifier.notify('error', "Please enter password");
        return;
      }
    }
    if (this.fName == "" || this.fName == null) {
      this.notifier.notify('error', "Please enter first name");
      return;
    }
    if (this.lName == "" || this.lName == null) {
      this.notifier.notify('error', "Please enter last name");
      return;
    }
    if (this.gender == "" || this.gender == null) {
      this.notifier.notify('error', "Please choose gender");
      return;
    }
    if (this.dob == "" || this.dob == null) {
      this.notifier.notify('error', "Please choose date of birth");
      return;
    }
    if (this.joinDate == "" || this.joinDate == null) {
      this.notifier.notify('error', "Please choose date of joinning");
      return;
    }
    for (let obj of this.phone) {
      if (obj.item == "" || obj.item == null) {
        this.notifier.notify('error', "Please enter phone number");
        return;
      }
      if (obj.item != "") {
        if (this.common.phoneNumberFormat(obj.item) == false) {
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

    // if (this.email == "" || this.email == null) {
    //   this.notifier.notify('error', "Please enter email id");
    //   return;
    // }

    if (this.email != "") {
      if (this.common.mailFormatCheck(this.email) == false) {
        this.notifier.notify('error', "Please enter valid mail id");
        return;
      }
    }
    if (this.designation == "" || this.designation == null) {
      this.notifier.notify('error', "Please select designation");
      return;
    }

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
    // if (this.zone == "") {
    //   this.notifier.notify('error', "Please select zone");
    //   return;
    // }
    // if (this.geoloc == "") {
    //   this.notifier.notify('error', "Please enter geo location");
    //   return;
    // }
    // if (this.lattitude == "" || this.lattitude == null) {
    //   this.notifier.notify('error', "Please enter lattitude");
    //   return;
    // }
    // if (this.longitude == "" || this.longitude == null) {
    //   this.notifier.notify('error', "Please enter longitude");
    //   return;
    // }

    if (this.remarks != "") {
      if (this.remarks.length > 50) {
        this.notifier.notify('error', "Please enter remarks within 50 characters");
        return;
      }
    }
    if (this.fileUpload == "") {
      this.notifier.notify('error', "Please upload profile image");
      return;
    }

    for (let i = 0; i < this.phone.length; i++) {
      this.phoneNumArr.push(this.phone[i].item)
    }

    const data = {
      firstName: this.fName,
      lastName: this.lName,
      phoneNumber: this.phoneNumArr,
      email: this.email,
      address: this.address,
      designationId: this.designation,
      countryId: this.country,
      stateId: this.state,
      districtId: this.city,
      //zoneId: this.zone,
      profileImgUrl: this.fileUpload,
      dob: this.dob,
      gender: this.gender,
      dateOfJoin: this.joinDate,
      // geoLocation:this.geoloc,
      // lattitude:this.lattitude,
      // longitude:this.longitude,
      remark: this.remarks,
      userEmpPermit: this.allowEmployeeValue.toString(),
      roleId: this.role,
      password: this.password,
      userCId: this.uId

    };
    //console.log("Request Data for update>>>>>>>", data);

    this.administration.updateUser(data).subscribe((res: any) => {
      if (res.success) {
        this.notifier.notify('success', res.message);
        this.common.Subject.next(data);
        this.modalClose();
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }

  // remarksLimit(event:any){
  //   console.log("value>>>>>>",event.target.value);
  //   if(this.remarks.length > 50){
  //     this.notifier.notify('error',"Please enter remarks within fifty characters")
  //     return;
  //   }
  // }

  validateDOB() {
    return new Date().toISOString().split("T")[0];
  }


}
