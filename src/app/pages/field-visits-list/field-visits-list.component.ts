import { Component, OnInit, ViewChild } from '@angular/core';
import { OpportunityModalComponent } from '../opportunity-modal/opportunity-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../service/common.service';
import { LeadService } from '../../service/lead.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';
import { FIELD_VISIT_LIST } from '../tableHeader';

@Component({
  selector: 'app-field-visits-list',
  templateUrl: './field-visits-list.component.html',
  styleUrls: ['./field-visits-list.component.css']
})
export class FieldVisitsListComponent implements OnInit {

  @ViewChild('statusUpdateModal') statusUpdateModal: any;
  @ViewChild('downloadFile') downloadFile: any;
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
  allUser: any;
  assignTo = 0;
  assignToUser: any;
  Oppcategory: any;
  winingValue = 0;
  expectedCloseDate: any;
  ActualCloseDate: any;
  expectedRevenue: any;
  salesStageArray: any;
  salesStage: any;
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
  limit: number = 50;
  offset: number = 0;
  currentCompetitor = [{ "productName": "", "desc": "", "status": "1", "pageType": '3' }];
  permission: any;
  parmissionIndivisualHide = true;
  permissionIndiVisual: any;
  allOpportunityArray: any = [];
  selectedVal: number = 50;
  isdisable: boolean = false;
  isPrevious: boolean = true;
  deleteOppId = "" as any;


  //--------------For Filter-----------------//
  searchName = "";
  oppName = "";
  visitedBy = "";
  contactPerson = "";
  phone = "";
  organization = "";
  userNameTo = "";
  visitToName = "";
  userList: any = [];
  searchByUserRole = "";
  filterVisitTypeArr: any = [];
  clientid = "";
  filterVisitType: any;





  public pageList: Array<any> = [
    { name: '50', value: '50' },
    { name: '100', value: '100' },
    { name: '150', value: '150' },
    { name: '200', value: '250' }
  ]
  tableHeader: any = [];

  //-------------------For Export----------//

  downloadPath = "";
  downloadBasePath = this.config.IMAGE_PATH + '/';
  kanbanViewFlag: boolean = false;

  permissionData: any;
  authUserData: any;

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

  selectedFieldVisitData: any;

  constructor(private modalService: NgbModal, private leadRest: LeadService, private common: CommonService,
    private notifier: NotifierService, private route: Router, private config: ConfigService, private router: Router) {
    this.common.addopportunitySubject.subscribe(() => {
      this.getAllOpportunity();
    });
  }

  ngOnInit(): void {
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId();
    this.getAllOpportunity();
    this.tableHeader = FIELD_VISIT_LIST;
    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);

    this.getPermissionData();
    // this.getAllStatusFieldVisits();
    this.getRole();

  }


  userDetails(id: any) {
    this.router.navigate(['pages/feild-visit-details/' + id]);

  }
  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        // console.log(data)
        if (data.name == "Opportunity") {
          this.permissionData = data;
          // console.log("Permission Dta:", this.permissionData);
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

  addApportunity(): any {
    this.common.isOpportunityAdd = true;
    this.modalService.open(OpportunityModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  getAllOpportunity(): any {
    this.common.spinnerShow();
    let param = {
      "userId": this.userId,
      "usertypeId": this.userType,
      "limit": this.limit,
      "offset": this.offset.toString(),
      globalSearchText: this.searchName,
      userName: this.visitToName,
      phoneNumber: this.phone,
      visitedByName: this.visitedBy,
      type: this.filterVisitType
    };
    // console.log("Request data for field listing params data>>>>",param);

    this.leadRest.getAllFieldVisitsList(param).subscribe((res: any) => {
      // console.log("Field Visit Res>>>>>>>>>>", res);
      this.common.spinnerHide();
      if ((res.success) && (res.status == 200)) {
        let tempArray = [];
        // this.userList=[];
        // console.log("Response Length:", res.response.length)
        for (let i = 0; i < res.response.length; i++) {
          if (res.response[i].id != null) {
            tempArray.push(res.response[i]);
          }
        }
        // console.log("Temp Array::,", tempArray)
        this.allOpportunityArray = tempArray;
      }
    })
  }

  // userDetails(id: any) {
  //   this.router.navigate(['pages/user-details/' + id]);

  // }

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

  changepagelimit(e: any) {

    this.limit = Number(e.target.value);
    this.getAllOpportunity();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllOpportunity();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllOpportunity();
  }
  editOpportunity(opportunityId: any): any {
    this.common.isOpportunityAdd = false;
    this.common.opportunatiId = opportunityId;
    this.modalService.open(OpportunityModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  goToDetailsPage(opportunityId: any): any {
    this.route.navigate(['pages/opportunity-details/' + opportunityId]);
  }

  openStatusUpdateModal(data: any): void {
    this.selectedFieldVisitData = data;
    this.selectedStatus = data.CRMapprovedStatus;
    this.statusRemarks = data.CRMapprovedRemarks;
    this.modalService.open(this.statusUpdateModal, { centered: true, size: 'sm' })
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  // delete() {
  //   let param = {
  //     "id": this.deleteOppId,
  //     "userId": this.userId
  //   };
  //   this.leadRest.deleteOpportunity(param).subscribe((res: any) => {
  //     if ((res.success) && (res.status == 200)) {
  //       this.getAllOpportunity();
  //       this.closeModal();
  //       this.notifier.notify('success', res.message);
  //     } else {
  //       this.notifier.notify('error', res.message);
  //     }
  //   })
  // }
  //--------------------- For Filter------------------//


  // search  by name on table header searching 




  searchByVisit(event: any) {
    if (event.target.value.length >= 3) {
      this.visitedBy = event.target.value;
      this.getAllOpportunity();
    }
    if (event.target.value.length == 0) {
      this.visitedBy = "";
      this.getAllOpportunity();
    }
  }

  searchByContactPerson(event: any) {
    // if (event.target.value.length >= 3) {
    //   this.contactPerson = event.target.value;
    //   this.getAllOpportunity();
    // }
    // if (event.target.value.length == 0) {
    //   this.contactPerson = "";
    //   this.getAllOpportunity();
    // }
  }

  searchByPhone(event: any) {
    if (event.target.value.length >= 3) {
      this.phone = event.target.value;
      this.getAllOpportunity();
    }
    if (event.target.value.length == 0) {
      this.phone = "";
      this.getAllOpportunity();
    }
  }

  searchByType(event: any) {
    // if (event.target.value.length >= 3) {
    //   this.organization = event.target.value;
    //   this.getAllOpportunity();
    // }
    // if (event.target.value.length == 0) {
    //   this.organization = "";
    //   this.getAllOpportunity();
    // }
  }
  getRole() {
    this.leadRest.getVisitType({}).subscribe((res: any) => {
      // console.log(" get Visited Type list REspoNSe>>>>>>>>", res);
      if (res.error == 0) {
        this.filterVisitTypeArr = res.data.visitorList;
      }
      // console.log("RoleLIstALL data",this.filterVisitType);

    })
  }

  searchByVisitType(e: any) {
    this.getAllOpportunity();
  }
  //------------------------For Export---------------------//

  downloadData(type: any) {
    this.modalService.open(this.downloadFile, { centered: true, size: 'sm' });
    const data = {
      "userId": this.userId,
      "usertypeId": this.userType,
      "limit": this.limit,
      "offset": this.offset
    };
    this.leadRest.downloadFileOpp(data).subscribe((res: any) => {
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
    this.closeModal();
    window.open(this.downloadPath);
  }

  //---------------- Global Filter -------------------//

  globalSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.getAllOpportunity();
    } else {
      this.searchName = "";
      this.getAllOpportunity();
    }
  }

  //.........................Visit to Filter...................//

  searchByOppName(event: any) {
    if (event.target.value.length >= 2) {
      this.visitToName = event.target.value;
      this.getAllOpportunity();
    }
    if (event.target.value.length == 0) {
      this.visitToName = "";
      this.getAllOpportunity();
    }
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

  getOpportunityStatus(val: any) {
    let str: any = "";
    if (val == 1) {
      str = "Warm";
    } else if (val == 2) {
      str = "Cold";
    } else if (val == 3) {
      str = "Hot";
    } else {
      str = "N/A"
    }
    return str;
  }

  updateApprovalStatus() {
    let req = {
      fieldVisitId: this.selectedFieldVisitData.id,
      CRMapprovedStatus: this.selectedStatus,
      remarks: this.statusRemarks
    }

    this.leadRest.updateFieldVisitApprovalStatus(req).subscribe((res: any) => {
      // console.log("Update Approval Status: ", res);
      if (res.success) {
        this.closeModal();
        this.selectedFieldVisitData = {};
        this.selectedStatus = "";
        this.statusRemarks = "";
        this.getAllOpportunity();
        this.notifier.notify("success", res.message);
      } else {
        this.notifier.notify("error", res.message);
      }
    })
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

  getConvertionStatusForHTML(val: any) {
    let str: any = "";
    if (val == 1) {
      str = "Converted";
    } else {
      str = "Not Converted"
    }
    return str;
  }

}
