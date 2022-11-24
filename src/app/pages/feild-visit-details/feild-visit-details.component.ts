import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { AdministrationService } from 'src/app/service/administration.service';
import { LeadService } from '../../service/lead.service';
import { CommonService } from "../../service/common.service";
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from "@angular/router";
import { FIELD_VISIT_LIST } from '../tableHeader';








@Component({
  selector: 'app-feild-visit-details',
  templateUrl: './feild-visit-details.component.html',
  styleUrls: ['./feild-visit-details.component.css']
})
export class FeildVisitDetailsComponent implements OnInit {
  @ViewChild('editDetailsModal') editDetailsModal: any;


  userCId = "" as any;


  taskType = "";
  contactId = "" as any
  contactDetails = ""
  clientId = "" as any
  fieldVisitId = "" as any
  selectedFieldVisitData: any;
  userDetails: any = [];
  contact: any = [];
  imgPath = this.common.imagePath;
  profileImgPath = "";
  fieldVisit: any = [];
  authUserData: any;
  permissionData: any;
  tableHeader: any = [];
  allOpportunityArray: any = [];

  



  selectedStatus: any;

  allStatusList: any = [
    {
      id: 0,
      name: "Not Approve"
    }, {
      id: 1,
      name: "Approve"
    }
  ];
  statusRemarks: any;


  constructor(private modalService: NgbModal, private notifier: NotifierService, private administration: AdministrationService, private leadRest: LeadService,
    private common: CommonService, private config: ConfigService, private activatedroute: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedroute.params.subscribe((data: any) => {
      // console.log("fieldVisitId...>>>>>>>>>>>",data.id);
      this.fieldVisitId = data.id;
      this.getFieldVisitDetailsById()
    this.tableHeader = FIELD_VISIT_LIST;


      let menuItem: any = localStorage.getItem('userdlt');
      this.authUserData = JSON.parse(menuItem);
      this.getPermissionData()

    })

  }


  getPermissionData() {
    // console.log("permission data in Field Visit::", this.authUserData.moduleDetails)
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Field Visit") {
          this.permissionData = data;

          // console.log("Field Visit Permission Data>>>>>>>>>>>>:", this.permissionData);
        }
      })
    }
  }



  // ..........................getAllFieldDetails ...............

  getFieldVisitDetailsById() {
    // this.common.spinnerShow();
    const data = {
      fieldVisitId: this.fieldVisitId,
      

    };
    // console.log("======================data>>>>>>>>>>>>",data);
    this.leadRest.getFieldVisitDetailsById(data).subscribe((res: any) => {

      // console.log("FIELD VISIT ID :::>>>>>>>>>",res);

      // this.common.spinnerHide();

      if (res.success) {
        this.userDetails = res.response.fieldVisitData;
        this.contact = res.response.ContactDetails
        this.fieldVisit = res.response.fieldVisitData



      }
    })

  }
  //.....nt used yet...//

  getAllStatusFieldVisits() {
    this.leadRest.getAllFieldVisitStatus({}).subscribe((res: any) => {
      // console.log("All Status List:", res);
      if ((res.success) && (res.status == 200)) {
        this.allStatusList = res.response.data;
      } else {
        this.allStatusList = [];
      }
    })
  }
  //..................//

  visitStatus(stus: any) {
    let btr: any = ""

    if (stus == 1) {

      btr = "Planned Visited"
    }
    else {
      btr = "Planed Not Visited"
    }
    return btr;
  }
  planVisit(vst: any) {
    let str: any = ""

    if (vst == 1) {
      str = "Visited"
    }
    else {
      str = "Not Visited"
    }
    return str;
  }
  convertionStatus(val: any) {
    let str: any = "";
    if (val == 1) {
      str = "Converted";
    } else {
      str = "Not Converted"
    }
    return str;
  }
  getStatusForHTML(val: any) {
    let str: any = "";
    if (val == 1) {
      str = "Approved";
    } else {
      str = "Not Approved"
    }
    return str;
  }

  //  profile picture.................................//
  showProfileImg(pic: any) {
    let str: any = ""
    if (pic != undefined) {
      str = this.imgPath + pic

    }
    return str;
  }
//.............................................//..........

  addTaskPopUp() {

  }
  closeModal() {
    this.modalService.dismissAll();
  }
  addUserTask() {
    if (this.taskType == "") {
      this.notifier.notify('error', "Please select task type");
      return;
    }

  }
  addNew() {

  }
  

  edit(data: any): void {
    this.selectedFieldVisitData = data;
    this.selectedStatus = data.CRMapprovedStatus;
    this.statusRemarks = data.CRMapprovedRemarks;
    this.modalService.open(this.editDetailsModal, { centered: true, size: 'sm' })
  }

  
  updateApprovalStatus() {

    // console.warn("update status ");
    let req = {
      // userId:this.userId,
      // clientId:this.clientId,
      // fieldVisitId: 8241,
      fieldVisitId: this.fieldVisitId,

      CRMapprovedStatus: this.selectedStatus,
      remarks: this.statusRemarks,
      // userType:this.userType
    }

    this.leadRest.updateFieldVisitApprovalStatus(req).subscribe((res: any) => {
      // console.log("Update Approval Status: ", res);
      if (res.success) {
        this.closeModal();
        this.selectedFieldVisitData = {};
        this.selectedStatus = "";
        this.statusRemarks = "";
        this.getFieldVisitDetailsById();
        

        this.notifier.notify("success", res.message);
      } else {
        this.notifier.notify("error", res.message);
      }
    })
  }

  openStatusUpdateModal(data: any): void {
    this.selectedFieldVisitData = data;
    this.selectedStatus = data.CRMapprovedStatus;
    this.statusRemarks = data.CRMapprovedRemarks;
    // this.modalService.open(this.statusUpdateModal, { centered: true, size: 'sm' })
  
  }

  statusChange(status: any) {
    // console.log("status>>>>>>>>", status);
    const data = {
      fieldVisitId: this.fieldVisitId,
      userCId:this.userCId,
      // fieldVisitId:this.fieldVisitId

      activeStatus: status.toString()
    };
    this.administration.statusChange(data).subscribe((res: any) => {

      if (res.success) {

        this.getFieldVisitDetailsById();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })
  }
  backToList() {
    // console.log("working back to list");
    this.router.navigate(['/pages/field-visit-list']);

  }
  // userId="" as any;
  // userType=" " as any;
  // offset:any;
  // searchName:any;
  // phone:any;
  // visitedBy:any;
  // filterVisitType:any
  // limit:any;
  // visitToName:any
  // allOpportunityArray: any = [];

  // getAllOpportunity(): any {
  //   this.common.spinnerShow();
  //   let param = {
  //     "userId": this.userId,
  //     "usertypeId": this.userType,
  //     "limit": this.limit,
  //     "offset": this.offset.toString(),
  //     globalSearchText: this.searchName,
  //     userName: this.visitToName,
  //     phoneNumber: this.phone,
  //     visitedByName: this.visitedBy,
  //     type: this.filterVisitType
  //   };
  //   // console.log("Request data for field listing params data>>>>",param);

  //   this.leadRest.getAllFieldVisitsList(param).subscribe((res: any) => {
  //     // console.log("Field Visit Res>>>>>>>>>>", res);
  //     this.common.spinnerHide();
  //     if ((res.success) && (res.status == 200)) {
  //       let tempArray = [];
  //       // this.userList=[];
  //       console.log("Response Length:", res.response.length)
  //       for (let i = 0; i < res.response.length; i++) {
  //         if (res.response[i].id != null) {
  //           tempArray.push(res.response[i]);
  //         }
  //       }
  //       console.log("Temp Array::,", tempArray)
  //       this.allOpportunityArray = tempArray;
  //     }
  //   })
  // }


}
