import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrgApiService } from 'src/app/service/org-api.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { OrganizationsModalComponent } from '../organizations-modal/organizations-modal.component';

@Component({
  selector: 'app-organizations-details',
  templateUrl: './organizations-details.component.html',
  styleUrls: ['./organizations-details.component.css']
})
export class OrganizationsDetailsComponent implements OnInit {
  @ViewChild('remarksmodal') remarksmodal: any;

  panelOpenState = false;
  orgId = "" as any;
  orgDetails: any = [];
  orgStatusId = "" as any;
  activityType = "" as any;
  //activityFlag:boolean = false;
  activityList: any = [];
  limit = 10;
  offset = 0;

  //-------------Activity---------------//
  allActivityTypeList: any = [];
  assignToList: any = [];
  activityTaskType = "" as any;
  activityDate = "" as any;
  activityUser = "" as any;
  activityDesc = "" as any;
  activityId = "" as any;
  isAdmin: boolean = false;
  activityStatus = "" as any;
  completeStatus = "" as any;
  remarks = "" as any;
  activityListStatus: boolean = false;

  isdisable: boolean = false;
  isPrevious: boolean = true;
  permissionData: any;
  authUserData:any




  constructor(private ngModelService: NgbModal, private activatedRoute: ActivatedRoute, private orgApiService: OrgApiService, private notifierService: NotifierService, private common: CommonService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      console.log("Data>>>>>>>>>>", data);
      if (data) {
        this.orgId = data.id;
        this.getOrgDetailsByOrgId();
        this.upComingActivity();
      }
    })
    let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
        this.getPermissionData()
    this.common.Subject.subscribe((res: any) => {
      this.getOrgDetailsByOrgId();
    })

    // if (this.common.getUserType() != 2) {
    //   this.isAdmin = true;
    // }

    this.getUserList();
    this.getAllActivityType();
  }


  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
        this.authUserData.moduleDetails.map((data: any) => {
            if (data.name == "Organizations") {
                this.permissionData = data;
                // console.log("Branding Permission Dta:", this.permissionData);
            }
        })
    }
}


  getOrgDetailsByOrgId() {
    const data = {
      organizationId: this.orgId
    };
    this.orgApiService.getOrgDetailsByOrgId(data).subscribe((res: any) => {
      if (res.success) {
        this.orgDetails = res.response;

        this.orgApiService.updateData = res.response;
        console.log("OrgDetails>>>>>>>>>>>", this.orgDetails);
      }
    })
  }

  statusChange(status: any) {
    this.orgStatusId = status;

    const data = {
      status: this.orgStatusId.toString(),
      organizationId: this.orgId
    };
    this.orgApiService.changeStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.getOrgDetailsByOrgId();
        this.notifierService.notify('success', res.message);
      } else {
        this.notifierService.notify('error', res.message);
      }
    })
  }

  pastActivity() {
    this.activityListStatus = true;
    this.activityType = "past";
    this.getAllOrgActivity();
  }

  upComingActivity() {
    this.activityListStatus = false;
    this.activityType = "up";
    this.getAllOrgActivity();

  }

  getAllActivityType() {

    this.orgApiService.getAllActivityType().subscribe((res: any) => {
      if (res.success) {
        this.allActivityTypeList = res.response;
        //console.log("Activity Type>>>>>",this.allActivityTypeList);
      }
    })
  }

  getAllOrgActivity() {
    const data = {
      limit: this.limit,
      offset: this.offset,
      organizationId: this.orgId,
      type: this.activityType
    };
    console.log("Request Activity data For Organization::>>> data", data);
    this.orgApiService.getAllActivity(data).subscribe((res: any) => {
      console.log("OrgActivity>>>>>>>", res);
      this.activityList = [];
      if (res.success) {
        if (res.response.activityListData.data.length == 0) {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
        } else {
          this.activityList = res.response.activityListData.data;
          this.isdisable = res.response.activityListData.data.length < this.limit ? true : false;
        }

      }
    })
  }

  getUserList() {
    const data = {
      clientId: this.common.getClientId()
    };
    this.orgApiService.landingData(data).subscribe((res: any) => {
      if (res.success) {
        this.assignToList = res.response.userList;
        //console.log("Activity userlist>>>>>>>>>", this.assignToList);
      }
    })
  }


  addNew() {

    // if (this.common.orgPermissionDetails.addPem != "0") {
    //   this.notifierService.notify("error", "Sorry!!! you have no access for organization add");
    //   return;
    // }
    this.orgApiService.modalFlag = false;
    this.ngModelService.open(OrganizationsModalComponent, { centered: true, size: 'xl' });
    const elem = document.getElementsByClassName('modal');

    if (elem) {
      elem[0].classList.add('addContactModal')
    }
  }

  editNew() {

    // if (this.common.orgPermissionDetails.editPem != "0") {
    //   this.notifierService.notify("error", "Sorry!!! you have no access for organization edit");
    //   return;
    // }
    
    this.orgApiService.modalFlag = true;
    this.ngModelService.open(OrganizationsModalComponent, { centered: true, size: 'xl' });
    const elem = document.getElementsByClassName('modal');

    if (elem) {
      elem[0].classList.add('addContactModal')
    }
  }
  remarksModal(id: any): void {
    this.activityId = id;
    this.ngModelService.open(this.remarksmodal, { centered: true, size: 'sm' })
  }


  edit() {
    this.editNew();

  }
  addContactActivity() {
    if (this.activityTaskType === '' || this.activityTaskType == null) {
      this.notifierService.notify('error', 'Activity type is required');
      return;
    }
    if (this.activityDate === '' || this.activityDate == null) {
      this.notifierService.notify('error', 'Due date is required');
      return;
    }

    // if (this.isAdmin && this.activityUser === '') {
    //   this.notifierService.notify('error', 'Assign user is required.');
    //   return;
    // }

    if (this.activityUser === '' || this.activityUser == null) {
      this.notifierService.notify('error', 'Assign user is required.');
      return;
    }

    if (this.activityDesc === '' || this.activityDesc == null) {
      this.notifierService.notify('error', 'Description is required');
      return;
    }
    const data = {
      organizationId: this.orgId,
      activityTypeId: this.activityTaskType,
      dueDate: this.activityDate,
      //assignTo: this.common.getUserType() == 2 ? this.common.getuserId() : this.activityUser,
      assignTo: this.activityUser,
      description: this.activityDesc,
      createdBy: this.common.getuserId()
    };
    // console.log("Add Org Activity>>>>>>>>>",data);
    this.orgApiService.addOrgActivity(data).subscribe((res: any) => {
      if (res.success) {
        this.getAllOrgActivity();
        this.getOrgDetailsByOrgId();
        this.closeModal();
        this.notifierService.notify('success', res.message);
      } else {
        this.notifierService.notify('error', res.message);
      }
    })
  }

  openAddActivityModal(addActivity: any) {
    this.activityTaskType = "";
    this.activityDate = "";
    this.activityUser = "";
    this.activityDesc = "";
    this.ngModelService.open(addActivity, { centered: true, size: 'md' });

  }

  submitRemarks(value: any) {
    // console.log("Mark as completed>>>>>>>>",value);
    this.completeStatus = "1";
    this.activityStatus = "";
    const data = {
      organizationId: this.orgId,
      activityStatus: this.activityStatus,
      completeStatus: this.completeStatus,
      remark: value,
      activityId: this.activityId
    };
    // console.log("Mark as complete>>>>>>>>>>",data);
    this.orgApiService.updateContactActivity(data).subscribe((res: any) => {
      if (res.success) {
        //this.activityListStatus == false ? this.upComingActivity() : this.pastActivity()
        this.getAllOrgActivity();
        this.closeModal();
        this.notifierService.notify('success', res.message);
      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }
  cancleTask(activityId: any) {
    console.log("Cancle activity id>>>>>>>>>", activityId);
    this.activityStatus = "1";
    this.completeStatus = ""
    this.activityId = activityId;
    const data = {
      organizationId: this.orgId,
      activityStatus: this.activityStatus,
      completeStatus: this.completeStatus,
      remark: this.remarks,
      activityId: this.activityId

    };
    console.log("Cancle task>>>>>>>>>>>", data);
    this.orgApiService.updateContactActivity(data).subscribe((res: any) => {
      if (res.success) {
        this.getAllOrgActivity();
        //this.activityListStatus == false ? this.upComingActivity() : this.pastActivity()
        this.notifierService.notify('success', res.message);
      } else {
        this.notifierService.notify('error', res.message);
      }
    })

  }

  closeModal() {
    this.ngModelService.dismissAll();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllOrgActivity();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllOrgActivity();
  }


}
