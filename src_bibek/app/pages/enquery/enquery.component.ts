import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { RestService } from 'src/app/rest.service';
import { ConfigService } from 'src/app/service/config.service';
import { ENQUIRIE_LIST } from '../tableHeader';
@Component({
  selector: 'app-enquery',
  templateUrl: './enquery.component.html',
  styleUrls: ['./enquery.component.css']
})
export class EnqueryComponent implements OnInit {
  limit: number = 50;
  offset: number = 0;
  isDisabled: boolean = true;
  enquiryModalFlag: boolean = false;
  //existingBusiness: boolean = false;
  businessNameFlag: boolean = false;
  enquiry_Source = "" as any;
  enquiry_Type = "" as any;
  ownerFirstName = "";
  ownerLastName = "";
  ownerPhnNo = [{ item: "" }];
  ownerEmail = [{ item: "" }];
  businessType: any;
  allOrganizationArray: any = [];
  buisnessName = "";
  buisnessAddress = "";
  buisnessPhone = [{ item: "" }];
  buisnessEmail = [{ item: "" }];
  buisnessEmailArray: any = [];
  address = "";
  city_Village = "";
  pinCode = "";
  notes = "";
  assignedDate = "";
  assignDueDate = "";

  country = "" as any;
  state = "" as any;
  district = "" as any;
  zone = "" as any;
  assignedEmployee_DataList: any = [];
  employeeType = "" as any;
  assignedEmployee = "" as any;
  organizationId = "" as any;
  enquiry_SourceList: any = [];
  country_DataList: any = [];
  state_DataList: any = [];
  district_DataList: any = [];
  zone_DataList: any = [];
  enquiry_TypeList: any = [];
  employee_TypeList: any = [];
  enqueryData: any = [];
  selectedVal: number = 50;
  isdisable: boolean = false;
  isPrevious: boolean = true;
  enqueryId = "" as any;
  public pageList: Array<any> = [
    { name: '50', value: '50' },
    { name: '100', value: '100' },
    { name: '150', value: '150' },
    { name: '200', value: '250' }
  ]

  kanbanViewFlag: boolean = false;
  headerButtonCounter: number = 0;
  tableHeader: any = [];

  //------------- Export -------------//

  downloadPath = "";
  downloadBasePath = this.config.IMAGE_PATH + '/';


  //--------------------- For Filter---------------------//

  searchName = "";
  enquirySourceText = "";
  enquiryTypeText = "";
  ownerNameText = "";
  ownPhoneNoText = "";
  ownEmailText = "";
  businessNameText = "";

  permissionData: any
  authUserData: any
  selectedStatus="" as any;

  approvedStatus: any = [
    {
      id: 0,
      name: "Not seen"
    }, {
      id: 1,
      name: "Approve"
    },
    {
      id:2,
      name: "false"
    }
  ];
  statusRemarks: any;

  @ViewChild('addEnqueryDesign') addEnqueryModal: any;
  @ViewChild('deletemodal') deletemodal: any;
  @ViewChild('bulkUpload') bulkEnquery: any;
  @ViewChild('downloadFile') downloadFile: any;
  @ViewChild('ownerRecords') ownerRecords: any;
  @ViewChild('approval') approvalmodal: any;
  
  @ViewChild('assign') assign: any;



  constructor(private modalService: NgbModal, private common: CommonService, private rest: RestService, private notifier: NotifierService, private config: ConfigService) { }

  ngOnInit(): void {
    this.getEmployeeeType();
    this.getEnqueryLandingData();
    this.getEnqueryList();
    this.getOrganizationList();
    // this.getAssignedEmployeeData()
    this.tableHeader = ENQUIRIE_LIST;
    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);

    this.getPermissionData();
  }

  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Enquiry") {
          this.permissionData = data;
          // console.log("Branding Permission Dta:", this.permissionData);
        }
      })
    }
  }

  changeTableView(event: any, pos: any) {
    this.tableHeader.map((data: any, i: any) => {
      if (i == pos) {
        if (event.target.checked) {
          data.isView = true;
        } else {
          data.isView = false;
        }
      }
    })
  }

  approved(vst: any) {
    let str: any = ""

    if (vst == 1) {
      str = "Approved"
    }
    else {
      str = "Not Approved"
    }
    return str;
  }

  // assignedEmp(vst: any) {
  //   let str: any = ""

  //   if (vst == 1) {
  //     str = "Approved"
  //   }
  //   else {
  //     str = "Not Approved"
  //   }
  //   return str;
  // }


  editEnq(eId: any) {
    this.enquiryModalFlag = true;
    //this.isDisabled = true;
    this.enqueryId = eId;
    this.modalService.open(this.addEnqueryModal, { centered: true });
    this.common.spinnerShow();
    this.fetchData(eId);
    this.isDisabled = true;
  }

  getEmployeeeType():any{
    const param = {
      "clientId"    : this.common.getClientId(),
      "userId"      : this.common.getuserId()
    }
    this.rest.getEmployeeType(param).subscribe((res:any) =>{
      if(res.success == true){
        this.employee_TypeList = res.response;
      }
    })
  }

  getDesignationId(designationId:any):any{
    this.getAssignedEmployeeData(designationId);
  }

  getAssignedEmployeeData(designationId:any):any{
    var param = {
      "userId": this.common.getuserId(),
      "clientId": this.common.getClientId(),
      "countryId": this.country,
      "stateId": this.state,
      "zoneId": this.zone,
      // "designationId": designationId
    }
    this.rest.getAssignedEmployeeListFromApi(param).subscribe((res: any) => {
      if (res.success == true) {
        this.assignedEmployee_DataList = res.response;
      }
    })
  }

    approvalStatu="" as any

  employeeAssigned(eId:any,approval:any,t:any):any{
    // console.log([t])
    this.approvalStatu = approval;

    // console.log("Approval staTUS >>",this.approvalStatu);
    
    this.enquiryModalFlag = true;
    this.enqueryId = eId;
    this.modalService.open(this.assign, { centered: true });
    // this.fetchData(eId); // added by myself
    // console.log("Eid >>",eId);

    this.isDisabled = true;
    const param = {
      "clientId"    : this.common.getClientId(),
      "userId"      : this.common.getuserId(),
      "userType"    : this.common.getUserType(),
      "enquiryId"   : eId,
    };
    this.rest.getAssignedEmloyee(param).subscribe((res: any) => {
      if (res.success) {
        // console.log("assigned emp response>>",res)
        this.common.spinnerHide();
        this.employeeType       = res.response[0].designationId;
        this.getAssignedEmployeeData(this.employeeType);
        this.assignedEmployee   = Number(res.response[0].assignTo);
        // console.log("assigend to>>>",this.assignedEmployee);
        // console.log("assign date console>>",res.response[0].assignDate);
        
        //.......following code for only assign date .......................//
        if(res.response[0].assignDate!=null){
        this.assignedDate       = this.common.getDateFormatNew3(res.response[0].assignDate).split(" ")[0];
        }else{
          this.assignedDate   = ""
        }
        // this.getAssignedEmployeeData(res.response[0].assignTo);
        
        // console.log("date",this.assignedDate);
        //..........assignedDueDate in below.....//
        
        if(res.response[0].assignDueDate!=null){
          this.assignDueDate       = this.common.getDateFormatNew3(res.response[0].assignDueDate).split(" ")[0];
          }else{
            this.assignDueDate   = ""
          }
          this.getAssignedEmployeeData(res.response[0].assignDueDate);
        
        console.log("assigned due date",this.assignDueDate);
      }
    })
  }

  //.........................................////........................................

  fetchData(eId:any):any{
    let param = {
      "clientId"    : this.common.getClientId(),
      "userId"      : this.common.getuserId(),
      "userType"    : this.common.getUserType(),
      "enquiryId"   : eId
    }
    this.rest.getEnqueryDataForEdit(param).subscribe((res: any) => {
      if (res.success) {
        var fetchEnqueryData = [];
        fetchEnqueryData = res.response;
        // var pinCode=[]
        // pinCode= res.response.pinCode
        // console.log("pincode displayed>>", pinCode);        
        // let businessIdGetter = res.response.businessType
        // console.log("FetchEnqueryData bussiness is :",businessIdGetter);
        this.common.spinnerHide();
        //console.log("Fetch Enquery Data by particular Enquery Id>>>>>", enqueryData);
        // this.enqueryId = fetchEnqueryData[0].enqueryId;
        this.enquiry_Source = fetchEnqueryData[0].enquerySourceId;
        this.enquiry_Type = fetchEnqueryData[0].enquerySourceTypeId;
        this.ownerFirstName = fetchEnqueryData[0].ownerFirstName;
        this.ownerLastName = fetchEnqueryData[0].ownerLastName;
        if (fetchEnqueryData[0].ownerPhone != null && fetchEnqueryData[0].ownerPhone != "") {
          if (fetchEnqueryData[0].ownerPhone.includes(",")) {
            this.ownerPhnNo = [];
            for (let obj of fetchEnqueryData[0].ownerPhone.split(",")) {
              this.ownerPhnNo.push({ item: obj });
            }
          } else {
            this.ownerPhnNo = [];
            this.ownerPhnNo.push({ item: fetchEnqueryData[0].ownerPhone });
          }
        } else {
          this.ownerPhnNo = [{ item: "" }];
        }
        if (fetchEnqueryData[0].ownerPhone != null && fetchEnqueryData[0].ownerPhone != "") {
          if (fetchEnqueryData[0].ownerPhone.includes(",")) {
            this.ownerPhnNo = [];
            for (let obj of this.enqueryData[0].ownerPhone.split(",")) {
              this.ownerPhnNo.push({ item: obj });
            }
          } else {
            this.ownerPhnNo = [];
            this.ownerPhnNo.push({ item: fetchEnqueryData[0].ownerPhone });
          }
        } else {
          this.ownerPhnNo = [{ item: "" }];
        }
        // console.log("owner Phone Numbers>>",this.ownerPhnNo);        
        if (fetchEnqueryData[0].ownerEmail != null && fetchEnqueryData[0].ownerEmail != "") {
          if (fetchEnqueryData[0].ownerEmail.includes(",")) {
            this.ownerEmail = [];
            for (let obj of fetchEnqueryData[0].ownerEmail.split(",")) {
              this.ownerEmail.push({ item: obj });
            }
          } else {
            this.ownerEmail = [];
            this.ownerEmail.push({ item: fetchEnqueryData[0].ownerEmail });
          }
        } else {
          this.ownerEmail = [{ item: "" }];
        }
        this.businessType = fetchEnqueryData[0].businessType;
        if (this.businessType == "Existing" || this.businessType == "1")  {
          // this.organizationId = Number(this.businessType);
          // console.log("bussiness Id", fetchEnqueryData[0].businessId);
          this.organizationId = fetchEnqueryData[0].businessId;
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
          this.organizationId = fetchEnqueryData[0].businessId;
        }
        
        // this.organizationId = fetchEnqueryData[0].businessId;
        this.buisnessName = fetchEnqueryData[0].businessName;
        this.buisnessAddress = fetchEnqueryData[0].businessAddress;

        if (fetchEnqueryData[0].businessPhone != null && fetchEnqueryData[0].businessPhone != "") {
          if (fetchEnqueryData[0].businessPhone.includes(",")) {
            this.buisnessPhone = [];
            for (let obj of fetchEnqueryData[0].businessPhone.split(",")) {
              this.buisnessPhone.push({ item: obj });
            }
          } else {
            this.buisnessPhone = [];
            this.buisnessPhone.push({ item: fetchEnqueryData[0].businessPhone });
          }
        } else {
          this.buisnessPhone = [{ item: "" }];
        }

        if (fetchEnqueryData[0].businessEmail != null && fetchEnqueryData[0].businessEmail != "") {
          if (fetchEnqueryData[0].businessEmail.includes(",")) {
            this.buisnessEmail = [];
            for (let obj of fetchEnqueryData[0].businessEmail.split(",")) {
              this.buisnessEmail.push({ item: obj });
            }
          } else {
            this.buisnessEmail = [];
            this.buisnessEmail.push({ item: fetchEnqueryData[0].businessEmail });
          }
        } else {
          this.buisnessEmail = [{ item: "" }];
        }

        this.address = fetchEnqueryData[0].address;
        this.country = fetchEnqueryData[0].countryId;
        this.state = fetchEnqueryData[0].stateId;
        this.getStateData();
        this.getDistrictData();
        this.district = fetchEnqueryData[0].cityId;
        this.getZoneData();
        this.zone = fetchEnqueryData[0].zoneId;
        this.city_Village = fetchEnqueryData[0].cityVillage;
        this.pinCode = fetchEnqueryData[0].pinCode;
        this.notes = fetchEnqueryData[0].notes;
        this.employeeType = Number(fetchEnqueryData[0].designationId);
        this.getDesignationId(fetchEnqueryData[0].designationId);
        this.assignedEmployee = Number(fetchEnqueryData[0].assignTo);
        if(fetchEnqueryData[0].assignDate == null ){
          this.assignedDate = "";
          // this
        } else {
          this.assignedDate = this.common.getDateFormatNew3(fetchEnqueryData[0].assignDate).split(" ")[0];
        }
      }
    })
  }

  //,,...........approval Status Enquery.................//

  updateApprovalStatus() {  
        
        if (this.selectedStatus == '' || this.selectedStatus == null) {
          this.notifier.notify('error', 'Please Select Approval Status');
          return;
        }
        if (this.statusRemarks== '' || this.statusRemarks == null) {
          this.notifier.notify('error', 'Please Select Remarks');
          return;
        }
    
    let req = {
    "clientId" : this.common.getClientId(),
    "userId" : this.common.getuserId(),
    "enquiryId" : this.enqueryId,
    "approvedStatus" : this.selectedStatus.toString(),
    "approvedRemark" : this.statusRemarks
    }
    // console.log("update Approval status params>>",req);
      this.rest.updateEnqueryApprovalStatus(req).subscribe((res: any) => {
      // console.log("Update Approval Status: ", res);
       if (res.success) {
        this.getEnqueryList();
        this.closeModal();
        this.notifier.notify("success", res.message);
    
      } else {
        // this.notifier.notify("error", res.message);
        this.notifier.notify("error", "Please select Remarks");

      }
    })
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  //------------------ Add enquery---------------------//

  createEnquery() {

    if (this.enquiry_Source == '' || this.enquiry_Source == null) {
      this.notifier.notify('error', 'Please Select Enquiry Source');
      return;
    }
    if (this.enquiry_Type == '' || this.enquiry_Type == null) {
      this.notifier.notify('error', 'Please Select Enquiry Type');
      return;
    }
   
    if (this.ownerFirstName == '' || this.ownerFirstName == null) {
      this.notifier.notify('error', 'Please enter owner first name');
      return;
    } 


    if (this.ownerFirstName != '' || this.ownerFirstName != null) {
      var c = 0
      for (var i=0; i<this.ownerFirstName.length;i++){
        if(this.ownerFirstName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.ownerFirstName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
            // console.log("ok",this.ownerFirstName[i].charCodeAt(0));
          }
          // console.log("i is printed", this.ownerFirstName[i]);
        }
      }
    // if(this.ownerFirstName.trim() !== ' '){
    //   this.notifier.notify('error', 'field have white space');
    //   return;
    // }
    if (this.ownerLastName == '' || this.ownerLastName == null) {
      this.notifier.notify('error', 'Please enter owner last name');
      return;
    }
    if (this.ownerLastName != '' || this.ownerLastName != null) {
      var c = 0
      for (var i=0; i<this.ownerLastName.length;i++){
        if(this.ownerLastName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.ownerLastName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
          }
        }
      }
    // if(this.ownerLastName.trim() !== '   '){
    //   this.notifier.notify('error', 'field have white space');
    // }

    for (let obj of this.ownerPhnNo) {
      if (obj.item == '' || obj.item == null) {
        this.notifier.notify('error', 'Please Enter Owner Phone No');
        return;
      }
    }
    if (this.ownerPhnNo.length > 1) {
      if (this.ownerPhnNo[0].item == this.ownerPhnNo[1].item) {
        this.notifier.notify('error', 'Alternate Phone Number Must be different');
        return;
      }
    }
    // for (let obj of this.ownerEmail) {
    //   if (obj.item == '' || obj.item == null) {
    //     this.notifier.notify('error', 'Please Enter Owner email');
    //     return;
    //   }
    // }
    for (let obj of this.ownerEmail) {
      if (obj.item != "") {
        if (this.common.mailFormatCheck(obj.item) == false) {
          this.notifier.notify('error', 'Please Enter valid Owner email');
          return;
        }
      }
    }

    if (this.ownerEmail.length > 1) {
      if (this.ownerEmail[0].item == this.ownerEmail[1].item) {
        this.notifier.notify('error', 'Alternate Email Must be different');
        return;
      }
    }
    
    // if (this.address == '' || this.address == null) {
    //   this.notifier.notify('error', 'Please Enter Address');
    //   return;
    // }
    // if(this.address.trim() !== '   '){
    //   this.notifier.notify('error', 'field have white space');
    // }
    if (this.buisnessName == '' || this.buisnessName == null) {
      this.notifier.notify('error', 'Please Enter Business Name');
      return;
    } 
    // if(this.buisnessName.trim() !== '   '){
    //   this.notifier.notify('error', 'field have white space');
    // }

    // if (this.buisnessAddress == '' || this.buisnessAddress == null) {
    //   this.notifier.notify('error', 'Please Enter Business Address');
    //   return;
    // }
    // if(this.buisnessAddress.trim() !== '   '){
    //   this.notifier.notify('error', 'field have white space');
    // }

    // for (let obj of this.buisnessPhone) {
    //   if (obj.item == '' || obj.item == null) {
    //     this.notifier.notify('error', 'Please Enter Business Phone No');
    //     return;
    //   }
    // }

    if (this.buisnessPhone.length > 1) {
      if (this.buisnessPhone[0].item == this.buisnessPhone[1].item) {
        this.notifier.notify('error', 'Alternate Business Phone Number Must be different');
        return;
      }
    }
    // for (let obj of this.buisnessEmail) {
    //   if (obj.item == '' || obj.item == null) {
    //     this.notifier.notify('error', 'Please Enter Business email');
    //     return;
    //   }
    // }
    for (let obj of this.buisnessEmail) {
      if (obj.item != "") {
        if (this.common.mailFormatCheck(obj.item) == false) {
          this.notifier.notify('error', 'Please Enter valid Business email');
          return;
        }
      }
    }

    if (this.buisnessEmail.length > 1) {
      if (this.buisnessEmail[0].item == this.buisnessEmail[1].item) {
        this.notifier.notify('error', 'Alternate Business Email Must be different');
        return;
      }
    }
    if (this.country == '' || this.country == null) {
      this.notifier.notify('error', 'Please Select Country');
      return;
    }
    if (this.state == '' || this.state == null) {
      this.notifier.notify('error', 'Please Select State');
      return;
    }
    if (this.district == '' || this.district == null) {
      this.notifier.notify('error', 'Please Select District');
      return;
    }
    if (this.zone == '' || this.zone == null) {
      this.notifier.notify('error', 'Please Select Zone');
      return;
    }
    // if (this.pinCode == '' || this.pinCode == null) {
    //   this.notifier.notify('error', 'Please Enter Pincode');
    //   return;
    // }
    // if (this.employeeType == '' || this.employeeType == null) {
    //   this.notifier.notify('error', 'Please select employee type');
    //   return;
    // }
    // if (this.assignedEmployee == '' || this.assignedEmployee == null) {
    //   this.notifier.notify('error', 'Please select assign employee');
    //   return;
    // }
    // if (this.assignedDate == '' || this.assignedDate == null) {
    //   this.notifier.notify('error', 'Please choose assigned date');
    //   return;
    // }

    var ownerPhoneList = [];
    for (let obj of this.ownerPhnNo) {
      ownerPhoneList.push(obj.item);
    }
    var ownerEmailList = [];
    for (let obj of this.ownerEmail) {
      ownerEmailList.push(obj.item);
    }
    var buisnessPhoneList = [];
    for (let obj of this.buisnessPhone) {
      buisnessPhoneList.push(obj.item);
    }
    var buisnessEmailList = [];
    for (let obj of this.buisnessEmail) {
      buisnessEmailList.push(obj.item);
    }
    var param = {
      "clientId": this.common.getClientId(),
      "userId": this.common.getuserId(),
      "userType": this.common.getUserType(),
      "enquiryTypeId": this.enquiry_Type,
      "enquirySourceId": this.enquiry_Source,
      "ownerFirstName": this.ownerFirstName,
      "ownerLastName": this.ownerLastName,
      "ownerPhone": ownerPhoneList,
      "ownerEmail": ownerEmailList,
      "businessName": this.buisnessName,
      "businessPhone": buisnessPhoneList,
      "businessEmail": buisnessEmailList,
      "businessAddress": this.buisnessAddress,
      "address": this.address,
      "countryId": this.country,
      "stateId": this.state,
      "designationId": this.employeeType,
      "districtId": this.district,
      "cityVillage": this.city_Village,
      "zoneId": this.zone,
      "pincode": this.pinCode,
      "notes": this.notes,
      "employeeTypeId": this.employeeType,
      "assignTo": this.assignedEmployee,
      "assignDate": this.assignedDate,
      "businessId": this.organizationId.toString(),
      // "businessId":"1",

      "businessType": this.businessType.toString(),
      "lattitude": "22.5726",
      "longitude": "88.3639",

      "createdBy": this.common.getuserId(),
      "enquiryPage": "crm"
    };
    // console.log("Request data for enquery Create>>>>>>>", param);
    this.rest.sendDataFoInsertEnquery(param).subscribe((res: any) => {
      // console.log("enquery res for updated>>>>>", res);
      if (res.success == true) {
        this.getEnqueryList();
        this.modalClose();
        this.notifier.notify('success', res.message);
        this.enquiry_Source = "";
        this.enquiry_Type = "";
        this.ownerFirstName = "";
        this.ownerLastName = "";
        this.ownerPhnNo = [{ item: "" }];
        this.ownerEmail = [{ item: "" }];
        this.buisnessName = "";
        this.buisnessAddress = "";
        this.buisnessEmail = [{ item: "" }];
        this.address = "";
        this.country = "";
        this.state = "";
        this.district = "";
        this.city_Village = "";
        this.zone = "";
        this.pinCode = "";
        this.notes = "";
        this.employeeType = "";
        this.assignedEmployee = "";
        this.assignedDate = "";
        this.organizationId = "";
        this.businessType = 0;

      }
    })
  }

  //------------------ Update enquery---------------------//

  editEnquery() {

    if (this.enquiry_Source == '' || this.enquiry_Source == null) {
      this.notifier.notify('error', 'Please Select Enquiry Source');
      return;
    }
    if (this.enquiry_Type == '' || this.enquiry_Type == null) {
      this.notifier.notify('error', 'Please Select Enquiry Type');
      return;
    }
    if (this.ownerFirstName == '' || this.ownerFirstName == null) {
      this.notifier.notify('error', 'Please enter owner first name');
      return;
    }
    if (this.ownerFirstName != '' || this.ownerFirstName != null) {
      var c = 0
      for (var i=0; i<this.ownerFirstName.length;i++){
        if(this.ownerFirstName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.ownerFirstName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
          }
        }
      }
  
    if (this.ownerLastName == '' || this.ownerLastName == null) {
      this.notifier.notify('error', 'Please enter owner last name');
      return;
    }
    if (this.ownerLastName != '' || this.ownerLastName != null) {
      var c = 0
      for (var i=0; i<this.ownerLastName.length;i++){
        if(this.ownerLastName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.ownerLastName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
          }
        }
      }

    for (let obj of this.ownerPhnNo) {
      if (obj.item == '' || obj.item == null) {
        this.notifier.notify('error', 'Please Enter Owner Phone No');
        return;
      }
    }
    for (let obj of this.ownerEmail) {
      if (obj.item != "") {
        if (this.common.mailFormatCheck(obj.item) == false) {
          this.notifier.notify('error', 'Please Enter valid Owner email');
          return;
        }
      }
    }

    // if (this.address == '' || this.address == null) {
    //   this.notifier.notify('error', 'Please Enter Address');
    //   return;
    // }
    if (this.buisnessName == '' || this.buisnessName == null) {
      this.notifier.notify('error', 'Please Enter Business Name');
      return;
    }
    // if (this.buisnessAddress == '' || this.buisnessAddress == null) {
    //   this.notifier.notify('error', 'Please Enter Business Address');
    //   return;
    // }

    // for (let obj of this.buisnessPhone) {
    //   if (obj.item == '' || obj.item == null) {
    //     this.notifier.notify('error', 'Please Enter Business Phone No');
    //     return;
    //   }
    // }

    for (let obj of this.buisnessEmail) {
      if (obj.item != "") {
        if (this.common.mailFormatCheck(obj.item) == false) {
          this.notifier.notify('error', 'Please Enter valid Business email');
          return;
        }
      }
    }

    if (this.country == '' || this.country == null) {
      this.notifier.notify('error', 'Please Select Country');
      return;
    }
    if (this.state == '' || this.state == null) {
      this.notifier.notify('error', 'Please Select State');
      return;
    }
    if (this.district == '' || this.district == null) {
      this.notifier.notify('error', 'Please Select District');
      return;
    }
    if (this.zone == '' || this.zone == null) {
      this.notifier.notify('error', 'Please Select Zone');
      return;
    }
    // if (this.pinCode == '' || this.pinCode == null) {
    //   this.notifier.notify('error', 'Please Enter Pincode');
    //   return;
    // }
    // if (this.employeeType == '' || this.employeeType == null) {
    //   this.notifier.notify('error', 'Please select employee type');
    //   return;
    // }
    // if (this.assignedEmployee == '' || this.assignedEmployee == null) {
    //   this.notifier.notify('error', 'Please select assign employee');
    //   return;
    // }
    // if (this.assignedDate == '' || this.assignedDate == null) {
    //   this.notifier.notify('error', 'Please choose assigned date');
    //   return;
    // }

    var ownerPhoneList = [];
    for (let obj of this.ownerPhnNo) {
      ownerPhoneList.push(obj.item);
    }
    var ownerEmailList = [];
    for (let obj of this.ownerEmail) {
      ownerEmailList.push(obj.item);
    }
    var buisnessPhoneList = [];
    for (let obj of this.buisnessPhone) {
      buisnessPhoneList.push(obj.item);
    }
    var buisnessEmailList = [];
    for (let obj of this.buisnessEmail) {
      buisnessEmailList.push(obj.item);
    }

    var param = {
      "clientId": String(this.common.getClientId()),
      "userId": this.common.getuserId(),
      "userType": Number(this.common.getUserType()),
      "enquiryId": this.enqueryId,
      "enquirySourceTypeId": this.enquiry_Type,
      "enquirySourceId": this.enquiry_Source,
      "ownerFirstName": this.ownerFirstName,
      "ownerLastName": this.ownerLastName,
      "ownerPhone": ownerPhoneList,
      "ownerEmail": ownerEmailList,
      "businessName": this.buisnessName,
      "businessPhone": buisnessPhoneList,
      "businessEmail": buisnessEmailList,
      "businessAddress": this.buisnessAddress,
      "address": this.address,
      "countryId": this.country,
      "stateId": this.state,
      "districtId": this.district,
      "cityVillage": this.city_Village,
      "zoneId": this.zone,
      "pincode": this.pinCode,
      "notes": this.notes,
      "employeeTypeId": this.employeeType,
      "assignTo": this.assignedEmployee,
      "assignDate": this.assignedDate,
      "businessId": this.organizationId.toString(),

      "businessType": this.businessType.toString(),
      "lattitude": "22.5726",
      "longitude": "88.3639",
      "createdBy": this.common.getuserId(),
      "designationId": this.employeeType// add this new 
    };
    // console.log("Request data params for update enquiry>>>>>", param);
    this.rest.sendDataForEdit(param).subscribe((res: any) => {
      // console.log("updated resposne>>>", res);

      if (res.success) {
        this.getEnqueryList();
        this.modalClose();
        this.notifier.notify('success', 'Enquery Updated Successfully');
      }
    })
  }

  approvalStatus(data: any) {
    // alert("working");
    this.enqueryId = data;
    this.selectedStatus = this.selectedStatus;
    this.statusRemarks = data.CRMapprovedRemarks;
    this.modalService.open(this.approvalmodal, { centered: true, size: 'sm' });

  }
  modalClose() {
    this.modalService.dismissAll();
  }

  openEnqueryAddModal() {
    this.isDisabled = true;
    this.enquiry_Source = "";
    this.enquiry_Type = "";
    this.ownerFirstName = "";
    this.ownerLastName = "";
    this.ownerPhnNo = [{ item: "" }];
    this.ownerEmail = [{ item: "" }];
    this.buisnessName = "";
    this.buisnessAddress = "";
    this.buisnessEmail = [{ item: "" }];
    this.address = "";
    this.country = "";
    this.state = "";
    this.district = "";
    this.city_Village = "";
    this.zone = "";
    this.pinCode = "";
    this.notes = "";
    this.employeeType = "";
    this.assignedEmployee = "";
    this.assignedDate = "";
    this.organizationId = "";
    this.businessType = 0;
    this.enquiryModalFlag = false;
    this.modalService.open(this.addEnqueryModal, { centered: true });
  }

  getEnqueryLandingData(): any {
    var param = {
      "userId": this.common.getuserId(),
      "clientId": this.common.getClientId()
    };
    this.rest.getEntityDataFromApi(param).subscribe((res: any) => {
      // console.log("employee type response",res);

      if (res.success == true) {
        this.enquiry_SourceList = res.response.enquirySource;
        this.enquiry_TypeList = res.response.enquiryType;
        this.country_DataList = res.response.countryData;
        // this.employee_TypeList = res.response.employeeType;

      }
      // console.log("Employee type select box>>>", this.employee_TypeList)
    })
  }

  getCountryId() {
    this.getStateData();
  }

  getStateData(): any {
    var param = {
      "countryId": this.country
    };
    this.rest.getStateDataFromApi(param).subscribe((res: any) => {
      if (res.success == true) {
        this.state_DataList = res.response;
      }
    })
  }

  getStateId() {
    this.getDistrictData();
  }

  getDistrictData(): any {
    var param = {
      "stateId": this.state
    };
    this.rest.getDistrictDataFromApi(param).subscribe((res: any) => {
      if (res.success == true) {
        this.district_DataList = res.response;
      }
    })
  }

  getCityId() {
    this.getZoneData();
  }

  getZoneData(): any {
    var param = {
      "clientId": this.common.getClientId(),
      "cityId": this.district
    }
    this.rest.getZoneDataFromApi(param).subscribe((res: any) => {
      if (res.success == true) {
        this.zone_DataList = res.response;
      }
    })
  }



  //---------------- Add or Remove Owner Phone number and Email-------------------//


  addOwnerphone() {
    this.ownerPhnNo.push({ item: "" });
  }
  removeOwnerPhone(index: any) {
    this.ownerPhnNo.splice(index, 1);
  }
  addOwnerEmail() {
    this.ownerEmail.push({ item: "" });
  }
  removeOwnerEmail(index: any) {
    this.ownerEmail.splice(index, 1);
  }

  //---------------- Add or Remove Business Phone number and Email-------------------//

  addBuisnessPhone() {
    this.buisnessPhone.push({ item: "" });
  }
  removeBuisnessPhone(index: any) {
    this.buisnessPhone.splice(index, 1);
  }

  addBuisnessEmail() {
    this.buisnessEmail.push({ item: "" });
  }
  removeBuisnessEmail(index: any) {
    this.buisnessEmail.splice(index, 1);
  }
  changepagelimit(e: any) {
    this.limit = Number(e.target.value);
    this.getEnqueryList();
  }
  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getEnqueryList();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }
  }
  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getEnqueryList();
  }
  getEnqueryList(): any {
    var param = {
      "userId": this.common.getuserId(),
      "clientId": this.common.getClientId(),
      "userType": this.common.getUserType(),
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "searchName": this.searchName,
      "enquirySourceText": this.enquirySourceText,
      "enquiryTypeText": this.enquiryTypeText,
      "ownerNameText": this.ownerNameText,
      "ownPhoneNoText": this.ownPhoneNoText,
      "ownEmailText": this.ownEmailText,
      "businessNameText": this.businessNameText,
      "countryId": this.country,
      "stateId": this.state,
      "designationId": this.employeeType //this i put
    };
    this.rest.getEnqueryDataFromApi(param).subscribe((res: any) => {
      // console.log("Enquery res>>>>>>>>>>>",JSON.stringify(res));
      if (res.success == true) {
        this.enqueryData = res.response.data;
        //....this is my approval code....//
        this.selectedStatus=res.response.data.approvedStatus;
        this.statusRemarks=res.response.data.approvedRemark;
        for (let a = 0; a < this.enqueryData.length; a++) {
          if(this.enqueryData[a].assignDate != null){
            this.enqueryData[a].assignDate = this.common.getDateFormat(this.enqueryData[a].assignDate);
          }

          if(this.enqueryData[a].assignDueDate != null){
            this.enqueryData[a].assignDueDate = this.common.getDateFormat(this.enqueryData[a].assignDueDate);
          }
        }
      } else {
        this.enqueryData = [];
      }
    })
  }
  selectExistingBuisness() {
    if (this.businessType == 'Existing') {
      this.isDisabled = false;
      this.businessNameFlag = true;
      this.getOrganizationList();
    } else {
      this.businessNameFlag = false;
      this.isDisabled = true;
      this.buisnessName = "";
      this.buisnessAddress = "";
      this.buisnessPhone = [{ item: "" }];
      this.buisnessEmail = [{ item: "" }];
      // this.address = "";
      this.country = "";
      this.state = "";
      this.district = "";
      this.city_Village = "";
      this.zone = "";
      this.pinCode = "";

    }
  }
  getOrganizationList
    (): any {
    let param = {
      "userId": this.common.getuserId(),
      "usertypeId": this.common.getUserType()
    };
    this.rest.getAllOrganization(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.allOrganizationArray = res.response;
      }
    });
  }
  getOrganizationId(): any {
    this.city_Village = "";
    this.pinCode = "";
    this.notes = "";
    this.employeeType = "";
    this.assignedEmployee = "";
    this.assignedDate = "";
    this.getOrganizationListDetails();
  }
  getOrganizationListDetails(): any {
    var param = {
      "organizationId": this.organizationId
    };
    this.rest.getAllOrganizationDetails(param).subscribe((res: any) => {
      //console.log("Res org>>>>>>", res);
      if (res.success == true) {
        let organizationDetails = res.response;
        //console.log("------------------------>", organizationDetails);
        this.buisnessName = organizationDetails[0].orgName;
        this.buisnessAddress = organizationDetails[0].orgAddress;
        if (organizationDetails[0].orgEmail != null && organizationDetails[0].orgEmail != "") {
          if (organizationDetails[0].orgEmail.includes(",")) {
            this.buisnessEmail = [];
            for (let obj of organizationDetails[0].orgEmail.split(",")) {
              this.buisnessEmail = [{ item: obj }];
            }
          } else {
            this.buisnessEmail = [];
            this.buisnessEmail = [{ item: organizationDetails[0].orgEmail }];
          }
        } else {
          this.buisnessEmail = [{ item: "" }];
        }
        if (organizationDetails[0].orgPhone != null && organizationDetails[0].orgPhone != "") {
          if (organizationDetails[0].orgPhone.includes(",")) {
            this.buisnessPhone = [];
            for (let obj of organizationDetails[0].orgPhone.split(",")) {
              this.buisnessPhone = [{ item: obj }];
            }
          } else {
            this.buisnessPhone = [];
            this.buisnessPhone = [{ item: organizationDetails[0].orgPhone }];
          }
        } else {
          this.buisnessPhone = [{ item: "" }];
        }
        this.country = organizationDetails[0].orgCountryId;
        this.getStateData();
        this.state = organizationDetails[0].orgStateId;
        this.getDistrictData();
        this.district = organizationDetails[0].orgCityId;
        this.getZoneData();
        this.zone = organizationDetails[0].orgZoneId;

      }
    })
  }

  //----------------------------- Enquery Delete-------------------//
  
  remove(id:any){
    this.enqueryId = id;
    this.modalService.open(this.deletemodal,{centered:true,size:"sm"});
  }

  delete(){
    const data = {
      enquiryId: this.enqueryId
    };
    this.rest.deleteEnquiry(data).subscribe((res:any)=>{
      if(res.success){
        this.modalClose();
        this.notifier.notify('success',res.message);
        this.getEnqueryList();

      }
    })
  }

  //-------------------------------  For Filter-------------------------------//

  // searchByEnquirySource({target: {value}} :any):any {
  //   if(value.length == 0){
  //     this.getEnqueryList();
  //   }else {
  //     const param = {
  //       "companyId"         : this.common.getClientId(),
  //       "enquirySourceText" : value,
  //       "limit": this.limit.toString(),
  //       "offset": this.offset.toString(),
  
        
  //     }
  //     this.rest.getEnqueryDataFromApi(param).subscribe((res: any) => { 
  //       if(res.success == true){
  //         this.enqueryData = res.response;
  //       }
  //     })
  //   }
  // }
  searchByEnquirySource(event: any) {
    if (event.target.value.length >= 2) {
      this.enquirySourceText = event.target.value;
      this.getEnqueryList();
    } else {
      this.enquirySourceText = "";
      this.getEnqueryList();
    }
  }

  searchByEnquiryType(event: any) {
    if (event.target.value.length >= 2) {
      this.enquiryTypeText = event.target.value;
      this.getEnqueryList();
    } else {
      this.enquiryTypeText = "";
      this.getEnqueryList();
    }
  }

  searchByOwnerName(event: any) {
    if (event.target.value.length >= 2) {
      this.ownerNameText = event.target.value;
      this.getEnqueryList();
    } else {
      this.ownerNameText = "";
      this.getEnqueryList();
    }
  }

  searchByOwnerPhoneNo(event: any) {
    if (event.target.value.length >= 2) {
      this.ownPhoneNoText = event.target.value;
      this.getEnqueryList();
    } else {
      this.ownPhoneNoText = "";
      this.getEnqueryList();
    }
  }

  searchByOwnerEmail(event: any) {
    if (event.target.value.length >= 2) {
      this.ownEmailText = event.target.value;
      this.getEnqueryList();
    } else {
      this.ownEmailText = "";
      this.getEnqueryList();
    }
  }

  searchByBusinessName(event: any) {
    if (event.target.value.length >= 1) {
      this.businessNameText = event.target.value;
      this.getEnqueryList();
    } else {
      this.businessNameText = "";
      this.getEnqueryList();
    }
  }

  //----------------- Global Filter -------------------//

  globalSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.getEnqueryList();
    } else {
      this.searchName = "";
      this.getEnqueryList();
    }
  }

  //---------------- For Bulk Upload ------------

  multipleUpload() {
    this.modalService.open(this.bulkEnquery, { centered: true });
  }

  sampleDownload() {
    window.open(this.common.downloadPath + 'enquiry.xlsx')
  }

  uploadFile() {

  }

  bulkInsert() {

  }

  //------------------- For Export ---------------------//

  downloadData(type: any) {
    this.modalService.open(this.downloadFile, { centered: true, size: 'sm' });
    var data = {
      "userId": this.common.getuserId(),
      "clientId": this.common.getClientId(),
      "userType": this.common.getUserType(),
      "limit": this.limit.toString(),
      "offset": this.offset.toString(),
      "searchName": this.searchName,
      "enquirySourceText": this.enquirySourceText,
      "enquiryTypeText": this.enquiryTypeText,
      "ownerNameText": this.ownerNameText,
      "ownPhoneNoText": this.ownPhoneNoText,
      "ownEmailText": this.ownEmailText,
      "businessNameText": this.businessNameText
    };
    this.rest.downloadFile(data).subscribe((res: any) => {
      // console.log("Res>>>>>>>>>>>", res);
      if (res.success) {
        if (type == "1") {
          this.downloadPath = this.downloadBasePath + res.response.path.dir + res.response.excelPath;
        }
        if (type == "2") {
          this.downloadPath = this.downloadBasePath + res.response.path.dir + res.response.path.file;
        }
      }
    })
  }


  fileDownload() {
    // console.log("downloadPath??????????????????", this.downloadPath);
    this.modalClose();
    window.open(this.downloadPath);
  }

  //------------------------- KanbanView----------------//

  KanbanView() {
    this.kanbanViewFlag = true;
    var tb: any = document.getElementById("switchGrid");
    tb.classList.toggle("switchActivegrid");
    var tbX: any = document.getElementById('switchList');
    tbX.classList.remove("switchActiveList");
  }

  listView() {
    this.kanbanViewFlag = false;
    var tb: any = document.getElementById("switchList");
    tb.classList.toggle("switchActiveList");
    var tbX: any = document.getElementById('switchGrid');
    tbX.classList.remove("switchActivegrid");
  }


  //-------------------  Header Hide----------------------//

  hideHeaderButton() {
    this.headerButtonCounter += 1;
    // console.log("headerButtonCounter>>>>>>>>>>>",this.headerButtonCounter);
  }
  //------------------------ Owner Record Update ----------------------------//

  changeRecordOwner(eId: any) {
      this.enqueryId =eId
    // console.log("Change Record Owner>>>>>>>>",data);
    const data={
      "clientId"    : this.common.getClientId(),
      "userId"      : this.common.getuserId(),
      "userType"    : this.common.getUserType(),
      "enquiryId"   : eId
    }
    
       this.rest.getEnqueryDataForEdit(data).subscribe((res: any) => {
       console.log("change owner record>>",res);
        this.ownerFirstName = res.response[0].ownerFirstName
        this.ownerLastName = res.response[0].ownerLastName
        
        if (res.response[0].ownerPhone != null && res.response[0].ownerPhone != "") {
          if (res.response[0].ownerPhone.includes(",")) {
            this.ownerPhnNo = [];
            for (let obj of res.response[0].ownerPhone.split(",")) {
              this.ownerPhnNo.push({ item: obj });
            }
          } else {
            this.ownerPhnNo = [];
            this.ownerPhnNo.push({ item: res.response[0].ownerPhone });
          }
        } else {
          this.ownerPhnNo = [{ item: "" }];
        }
        if (res.response[0].ownerEmail != null && res.response[0].ownerEmail != "") {
          if (res.response[0].ownerEmail.includes(",")) {
            this.ownerEmail = [];
            for (let obj of res.response[0].ownerEmail.split(",")) {
              this.ownerEmail.push({ item: obj });
            }
          } else {
            this.ownerEmail = [];
            this.ownerEmail.push({ item: res.response[0].ownerEmail });
          }
        } else {
          this.ownerEmail = [{ item: "" }];
        }

      
    })


    // this.enqueryId = data.enqueryId;
    // this.ownerFirstName = data.ownerFirstName;
    // this.ownerLastName = data.ownerLastName;    
    // if (data.ownerPhone != null && data.ownerPhone != "") {
    //   if (data.ownerPhoneNo.includes(",")) {
    //     this.ownerPhnNo = [];
    //     for (let obj of data.ownerPhoneNo.split(",")) {
    //       this.ownerPhnNo.push({ item: obj });
    //     }
    //   } else {
    //     this.ownerPhnNo = [];
    //     this.ownerPhnNo.push({ item: data.ownerPhone });
    //   }
    // } else {
    //   this.ownerPhnNo = [{ item: "" }];
    // }
    
    
    // if (data.ownerEmail != null && data.ownerEmail != "") {
    //   if (data.ownerEmail.includes(",")) {
    //     this.ownerEmail = [];
    //     for (let obj of data.ownerEmail.split(",")) {
    //       this.ownerEmail.push({ item: obj });
    //     }
    //   } else {
    //     this.ownerEmail = [];
    //     this.ownerEmail.push({ item: data.ownerEmail });
    //   }
    // } else {
    //   this.ownerEmail = [{ item: "" }];
    // }
    this.modalService.open(this.ownerRecords, { size: 'md' });
  }
  ownerRecordUpdate() {
    if (this.ownerFirstName == '' || this.ownerFirstName == null) {
      this.notifier.notify('error', 'Please enter owner first name');
      return;
    } 
    if (this.ownerFirstName != '' || this.ownerFirstName != null) {
      var c = 0
      for (var i=0; i<this.ownerFirstName.length;i++){
        if(this.ownerFirstName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.ownerFirstName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
          }
        }
      }
    if (this.ownerLastName== '' || this.ownerLastName == null) {
      this.notifier.notify('error', 'Please enter owner last name');
      return;
    }
    if (this.ownerLastName != '' || this.ownerLastName != null) {
      var c = 0
      for (var i=0; i<this.ownerLastName.length;i++){
        if(this.ownerLastName[0].charCodeAt(0)==32)
        {
          this.notifier.notify('error', 'Not allowed white space');
          return;
        }
        
          if(this.ownerLastName[i].charCodeAt(0)==32 ){
            c=c+1;
            
             if (c>1){
              this.notifier.notify('error', 'not allowed white space');
              return ;
             }
          }
        }
      }

    // if(this.ownerLastName.trim() !== ' '){
    //   this.notifier.notify('error', 'field have white space');

    // }

    for (let obj of this.ownerPhnNo) {
      if (obj.item == '' || obj.item == null) {
        this.notifier.notify('error', 'Please Enter Owner Phone No');
        return;
      }
    }
    for (let obj of this.ownerPhnNo) {
      if (obj.item != "") {
        if (this.common.phoneNumberFormat(obj.item) == false) {
          this.notifier.notify('error', 'Please Enter valid phone number');
          return;
        }
      }
    }
    if (this.ownerPhnNo.length > 1) {
      if (this.ownerPhnNo[0].item == this.ownerPhnNo[1].item) {
        this.notifier.notify('error', 'Alternate Phone Number Must be different');
        return;
      }
    }
    for (let obj of this.ownerEmail) {
      if (obj.item == '' || obj.item == null) {
        this.notifier.notify('error', 'Please Enter Owner  Email');
        return;
      }
    }
    for (let obj of this.ownerEmail) {
      if (obj.item != "") {
        if (this.common.mailFormatCheck(obj.item) == false) {
          this.notifier.notify('error', 'Please Enter valid Owner email');
          return;
        }
      }
    }

    if (this.ownerEmail.length > 1) {
      if (this.ownerEmail[0].item == this.ownerEmail[1].item) {
        this.notifier.notify('error', 'Alternate Email Must be different');
        return;
      }
    }

    var ownerPhoneList = [];
    for (let obj of this.ownerPhnNo) {
      ownerPhoneList.push(obj.item);
    }
    var ownerEmailList = [];
    for (let obj of this.ownerEmail) {
      ownerEmailList.push(obj.item);
    }

    const data = {
      enqueryId: this.enqueryId,
      ownerFirstName: this.ownerFirstName,
      ownerLastName: this.ownerLastName,
      ownerPhone: ownerPhoneList,
      ownerEmail: ownerEmailList
    };
    //console.log("Request Data For Owner Record Update",data);
    this.rest.ownerRecordsUpdate(data).subscribe((res: any) => {

      console.log("onwer records update resposne>>>>",res);
      
      if (res.success) {
        this.getEnqueryList();
        this.notifier.notify('success', res.message);
        this.modalClose();
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }


  assignEmployeUpdate() {

    
      const data = {
      enquiryId: this.enqueryId,
      ownerFirstName: this.ownerFirstName,
      ownerLastName: this.ownerLastName,
      // designationId: this.employeeType,
      assignTo: this.assignedEmployee,
      assignDate: this.assignedDate,
      assignDueDate: this.assignDueDate,


     };
    //console.log("Request Data For Owner Record Update",data);
      this.rest.assignUpate(data).subscribe((res: any) => {

      console.log("onwer records update resposne>>>>",res);
      
      if (res.success) {

        
        this.getEnqueryList();
        this.notifier.notify('success', res.message);
        this.modalClose();
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }
    // white(data:any){
    //   var pattern = /\s/g;
    //   var alert = this.ownerFirstName
    //     var isSpace = pattern.test(data);
    //     if(isSpace){
    //         alert.this.notifier.notify('error', "cant use White Space");
    //     }else{
    //       this.ownerFirstName="";
    //     }
    // }
    space(event:any){
      console.log("1st log",event);
      console.log("2nd log",event.target.selectionStart);

      if (this.ownerFirstName == '' || this.ownerFirstName == null) {
        // this.notifier.notify('error', 'Please enter owner first name');
        // return; 
        if(event.charCode === 32){
          console.log("working");
          
          this.notifier.notify('error', "sorry no space here");
          // event.preventtDefault();
          return ;
          // alert("please write firstname")
        }
      }
      
    }

}

