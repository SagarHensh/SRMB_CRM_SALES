import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadModalComponent } from '../lead-modal/lead-modal.component';
import { LeadService } from '../../service/lead.service';
import { CommonService } from '../../service/common.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfigService } from 'src/app/service/config.service';
import { LEAD_LIST } from '../tableHeader';

@Component({
  selector: 'app-leadlist',
  templateUrl: './leadlist.component.html',
  styleUrls: ['./leadlist.component.css']
})
export class LeadlistComponent implements OnInit {

  @ViewChild('deletemodal') deleteModal: any;
  @ViewChild('bulkUpload') bulkTask: any;
  @ViewChild('downloadFile') downloadFile: any;


  headerButtonCounter:number =0;
  limit: number = 50;
  offset: number = 0;
  userId: any;
  userType: any;
  clientId: any;
  allLeadArray: any = [];
  natureList: any = [];
  selectedVal: number = 50;
  deleteLeadId = "" as any;
  searchName = "";
  contactName = "";
  orgName = "";
  title = "";
  phone = "";
  email = "";
  leadStatus = "";
  owner = "";
  kanbanViewFlag: boolean = false;

  //---------------- For Bulk Inser-----------//

  bulkFile = "";
  uploadBulkFile = "";
  bulkFileName = "";


  //-------------- For Export----------------//

  downloadPath = "";
  downloadBasePath = this.config.IMAGE_PATH + '/';

  public pageList: Array<any> = [
    { name: '50', value: '50' },
    { name: '100', value: '100' },
    { name: '150', value: '150' },
    { name: '200', value: '250' }
  ]

  isdisable: boolean = false;
  isPrevious: boolean = true;
  tableHeader: any = [];

  authUserData: any;
  permissionData: any;
  allOpportunityArray: any = [];


  constructor(private ngModelService: NgbModal, private leadRest: LeadService, private common: CommonService,
    private notifier: NotifierService, private router: Router, private _location: Location, private config: ConfigService) {

    this.common.addLeadSubject.subscribe((res) => {
      this.getAllLead();
    });
    this.common.addopportunitySubject.subscribe(() => {
      this.getAllOpportunity();
    });

    // this.commonService.Subject.subscribe((res:any)=>{
    //   this.getTaskManagementList();

    // })
  }

  ngOnInit(): void {
    this.userId = this.common.getuserId();
    this.userType = this.common.getUserType();
    this.clientId = this.common.getClientId()
    this.getAllLead();
    this.getAllLeadNatureStatus();
    this.tableHeader = LEAD_LIST ;
    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);
    this.getPermissionData();
    this.getAllOpportunity();
  }

  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Leads") {
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

  hideHeaderButton(){    
    this.headerButtonCounter +=1;
    // console.log("headerButtonCounter>>>>>>>>>>>",this.headerButtonCounter);
  }

  getAllOpportunity(): any {
    // this.common.spinnerShow();
    let param = {
      "userId": this.userId,
      "usertypeId": this.userType,
      "limit": this.limit,
      "offset": this.offset.toString(),
      "globalSearchText": this.searchName,
      // "oppName": this.oppName,
      // "expectedValue": this.expectedValue,
      // "contactPerson": this.contactPerson,
      // "phone": this.phone,
      // "organization": this.organization
    };
    this.leadRest.getAllFieldVisitsList(param).subscribe((res: any) => {
      // console.log("Field Visit Res>>>>>>>>>>", res);
      if ((res.success) && (res.status == 200)) {
        let tempArray = [];
        for (let i = 0; i < res.response.length; i++) {
          if (res.response[i].id != null) {
            tempArray.push(res.response[i]);
          }
        }
        this.allOpportunityArray = tempArray;
        // this.common.spinnerHide();
      }
    })
  }

  getAllLead(): any {
    //this.common.spinnerShow();
    let param = {
      'limit': this.limit,
      'offset': this.offset.toString(),
      'searchName': this.searchName,
      'contactName': this.contactName,
      'orgName': this.orgName,
      'title': this.title,
      'phone': this.phone,
      'email': this.email,
      'leadStatus': this.leadStatus,
      'owner': this.owner
    };
    //console.log("Request for lead list>>>>>>>",param);
    this.leadRest.getAllLeadList(param).subscribe((res: any) => {
      //  console.log("All Leads List:::::::::::::::-",res);
      //this.common.spinnerHide();
      if ((res.success) && (res.status == 200)) {
        this.allLeadArray = [];
        if (res.response.data.length == 0) {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
        } else {
          this.allLeadArray = res.response.data;
          // console.log("lead>>>>>>>>>>>>",this.allLeadArray)
          this.isdisable = res.response.data.length < this.limit ? true : false;
        }

      }
    });
  }
  addLead(): any {

    // if (this.common.leadPermissionDetails.addPem != "0") {
    //   this.notifier.notify("error", "Sorry!!! you have no access for lead add");
    //   return;
    // }

    this.common.isAdd = true;
    this.leadRest.newOrExisting = false;
    this.ngModelService.open(LeadModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }
  gotoDetailsPage(leadId: any): any {
    this.router.navigate(['pages/lead-details/' + leadId]);
  }
  editLead(leadId: any): any {

    // if (this.common.leadPermissionDetails.editPem != "0") {
    //   this.notifier.notify("error", "Sorry!!! you have no access for lead edit");
    //   return;
    // }
    this.common.spinnerShow();
    this.common.isAdd = false;
    this.leadRest.newOrExisting = true;
    this.ngModelService.open(LeadModalComponent, { centered: true, size: 'xl' });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
    this.common.leadId = leadId;
  }
  deleteLead(leadId: any): any {

    // if (this.common.leadPermissionDetails.deletePem != "0") {
    //   this.notifier.notify("error", "Sorry!!! you have no access for lead delete");
    //   return;
    // }

    this.deleteOpenModal();
    this.deleteLeadId = leadId;
  }

  changepagelimit(e: any) {

    this.limit = Number(e.target.value);
    this.getAllLead();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllLead();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllLead();
  }
  deleteOpenModal(): void {
    this.ngModelService.open(this.deleteModal, { centered: true, size: 'sm' })
  }
  closeModal() {
    this.ngModelService.dismissAll();
  }

  delete() {
    let param = {
      "userId": this.userId,
      "leadId": this.deleteLeadId
    };
    this.leadRest.deleteLead(param).subscribe((res: any) => {
      if ((res.success) && (res.status == 200)) {
        this.getAllLead();
        this.closeModal();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    });
  }

  getAllLeadNatureStatus() {
    const data = {
      type: "1"
    };
    this.leadRest.getNature(data).subscribe((res: any) => {
      if (res.success) {
        // console.log("Nature List>>>>>",res);
        this.natureList = res.response;
      }
    })
  }

  //----------------------------- Filter-----------------------//


  searchByName(event: any) {
    if (event.target.value.length >= 3) {
      this.contactName = event.target.value;
      this.getAllLead();
    }
    if (event.target.value.length == 0) {
      this.contactName = "";
      this.getAllLead();
    }
  }

  searchByOrganization(event: any) {
    if (event.target.value.length >= 3) {
      this.orgName = event.target.value;
      this.getAllLead();
    }
    if (event.target.value.length == 0) {
      this.orgName = "";
      this.getAllLead();
    }
  }

  searchByTitle(event: any) {
    if (event.target.value.length >= 3) {
      this.title = event.target.value;
      this.getAllLead();
    }
    if (event.target.value.length == 0) {
      this.title = "";
      this.getAllLead();
    }
  }

  searchByPhone(event: any) {
    if (event.target.value.length >= 3) {
      this.phone = event.target.value;
      this.getAllLead();
    }
    if (event.target.value.length == 0) {
      this.phone = "";
      this.getAllLead();
    }
  }

  searchByEmail(event: any) {
    if (event.target.value.length >= 3) {
      this.email = event.target.value;
      this.getAllLead();
    }
    if (event.target.value.length == 0) {
      this.email = "";
      this.getAllLead();
    }
  }

  searchByLeadStatus(event: any) {
    if (event.target.value == "") {
      this.leadStatus = "";
      this.getAllLead();
    }
    if (event.target.value != "") {
      this.leadStatus = event.target.value;
      //console.log("Lead Status list>>>>>>>>>>>",event.target.value);
      this.getAllLead();
    }
  }

  searchByLeadOwner(event: any) {
    if (event.target.value.length >= 3) {
      this.owner = event.target.value;
      this.getAllLead();
    }
    if (event.target.value.length == 0) {
      this.owner = "";
      this.getAllLead();
    }
  }

  //--------------For Bulk Upload----------------//

  multipleUpload() {
    this.ngModelService.open(this.bulkTask, { centered: true });
  }
  sampleDownload() {
    window.open(this.common.downloadPath + 'leads.xlsx');
  }
  uploadFile() {
    const banner = document.getElementById('upload') as HTMLInputElement;
    const file: any = banner.files;
    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.bulkFile = reader.result as string;
        //  console.log("bulkFile>>>>>>>>", this.bulkFile);
        const fileData = new FormData();
        fileData.append('file', file[0]);
        this.leadRest.uploadFileForBulk(fileData).subscribe((res: any) => {
          // console.log("File upload res>>>>>>>>", res);
          if (res.success) {
            this.bulkFileName = res.response.orgfilename;
            this.uploadBulkFile = res.response.fileName;
            // console.log("Upload Bulk File upload>>>>>>>>>>>", this.uploadBulkFile);
            this.notifier.notify('success', res.message);
          } else {
            this.notifier.notify('error', res.message);
          }

        })
      }
    }

  }

  bulkInsert() {
    const data = {
      fileName: this.uploadBulkFile
    };
    //console.log("Request for Bulk Upload for Task",data);
    this.leadRest.bulkLeadInsert(data).subscribe((res: any) => {
      //console.log("Bulk Insert >>>>>>", res);
      if (res.success) {
        this.getAllLead();
        this.closeModal();
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }

  downloadData(type: any) {
    this.ngModelService.open(this.downloadFile, { centered: true, size: 'sm' });
    const data = {
      'limit': this.limit,
      'offset': this.offset.toString(),
      'contactName': this.contactName,
      'orgName': this.orgName,
      'title': this.title,
      'phone': this.phone,
      'email': this.email,
      'leadStatus': this.leadStatus,
      'owner': this.owner
    };
    this.leadRest.downloadFile(data).subscribe((res: any) => {
      // console.log("Res>>>>>>>>>>>",res);
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
    // console.log("downloadPath??????????????????",this.downloadPath);
    this.closeModal();
    window.open(this.downloadPath);
  }

  //----------------- Global Search ----------------------//

  globalSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.getAllLead();
    } else {
      this.searchName = "";
      this.getAllLead();
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

  changeLeadImage(data: any) {

  }

  convertLead(leadId: any) {
    this.router.navigate(['pages/lead-details/' + leadId]);
    this.kanbanViewFlag = true;
  }
  addActivity(leadId: any) {
    this.router.navigate(['pages/lead-details/' + leadId]);
    this.kanbanViewFlag = true;
  }

}

