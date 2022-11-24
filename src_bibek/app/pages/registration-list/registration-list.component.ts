import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/service/registration.service';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from 'src/app/service/config.service';
import { CUSTOMERS_LIST } from '../tableHeader';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  limit = 50;
  offset = 0;
  searchName = "";
  searchTextCustName = "";
  searchTextCustType = "";
  searchTextCustPhone = "";
  searchTextCustBusinessName = "";
  searchCustPartyCode = "";
  searchCustVisitDate = "";
  customerList: any = [];
  isdisable: boolean = false;
  isPrevious: boolean = false;
  customerId = "";
  customerTypeList: any = [];
  selectedVal: number = 50;
  downloadBasePath = this.config.IMAGE_PATH + '/';
  downloadPath = "";
  tableHeader: any = [];


  public pageList: Array<any> = [
    { name: '50', value: '50' },
    { name: '100', value: '100' },
    { name: '150', value: '150' },
    { name: '200', value: '250' }
  ]

  kanbanViewFlag: boolean = false;
  permissionData: any;
  authUserData: any;

  @ViewChild('deletemodal') deleteModal: any;
  @ViewChild('downloadFile') downloadFile: any;

  constructor(private modalService: NgbModal, private registration: RegistrationService, private common: CommonService, private router: Router, private notifier: NotifierService, private config: ConfigService) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllCustomerType();
    this.tableHeader = CUSTOMERS_LIST;
    this.common.Subject.subscribe((res: any) => {
      this.getAllCustomers();
    })
    let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
      this.getPermissionData()
  }

  getPermissionData() {
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        // console.log(data)
        if (data.name == "Customers") {
          this.permissionData = data;
          console.log("Branding Permission Dta:", this.permissionData);
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






  addNew() {
    this.registration.customerUpdateFlag = false;
    this.registration.customerId = "";

    this.modalService.open(RegistrationModalComponent, { size: 'lg' })

  }

  getAllCustomers() {
    const data = {
      limit: this.limit,
      offset: this.offset.toString(),
      userType: this.common.getUserType(),
      searchName: this.searchName,
      searchTextCustName: this.searchTextCustName,
      searchTextCustType: "",
      contactTypeId: this.searchTextCustType,
      searchTextCustPhone: this.searchTextCustPhone,
      searchTextCustBusinessName: this.searchTextCustBusinessName,
      searchCustPartyCode: this.searchCustPartyCode,
      searchCustVisitDate: this.searchCustVisitDate
    };
    //console.log("For Get All Customer request>>>>>>>", data);
    this.registration.getAllCustomer(data).subscribe((res: any) => {
      //console.log("Customer List>>>>>>>>Res", res);
      if (res.success) {
        this.customerList = [];
        if (res.response.data.length == 0) {
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
        } else {
          this.customerList = res.response.data;
          this.isdisable = res.response.data.length < this.limit ? true : false;
        }
      }
    })
  }

  getAllCustomerType() {
    this.registration.getAllCustomerType({}).subscribe((res: any) => {
      if (res.success) {
        this.customerTypeList = res.response;
        //console.log("Cus List>>>>>", this.customerTypeList);
      }
    })
  }

  //----------------- For Column  Search---------------//

  nameSearch(event: any) {
    if (event.target.value.length >= 3) {
      this.searchTextCustName = event.target.value;
      this.getAllCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchTextCustName = "";
      this.getAllCustomers();
    }
  }

  customerTypeSearch(event: any) {
    if (event.target.value == "0") {
      this.searchTextCustType = "";
      this.customerList = [];
      this.getAllCustomers();
    }
    if (event.target.value != "0") {
      this.searchTextCustType = event.target.value;
      this.customerList = [];
      this.getAllCustomers();
    }
  }

  phoneSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchTextCustPhone = event.target.value;
      this.getAllCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchTextCustPhone = "";
      this.getAllCustomers();
    }
  }
  businessName(event: any) {
    if (event.target.value.length >= 2) {
      this.searchTextCustBusinessName = event.target.value;
      this.getAllCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchTextCustBusinessName = "";
      this.getAllCustomers();
    }
  }
  partyCode(event: any) {
    if (event.target.value.length >= 2) {
      this.searchCustPartyCode = event.target.value;
      this.getAllCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchCustPartyCode = "";
      this.getAllCustomers();
    }
  }
  visitDate(event: any) {
    if (event.target.value.length >= 2) {
      this.searchCustVisitDate = event.target.value;
      this.getAllCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchCustVisitDate = "";
      this.getAllCustomers();
    }
  }

  //----------------- End Column Search---------------//

  closeModal() {
    this.modalService.dismissAll();
  }

  routeDetailsPage(id: any) {
    this.router.navigate(['/pages/registration-details/' + id]);
  }

  edit(item: any) {
    this.registration.customerUpdateFlag = true;
    this.customerId = item.customerId;
    this.registration.customerId = item.customerId;

    this.modalService.open(RegistrationModalComponent, { size: 'lg' });
  }
  remove(id: any) {
    this.modalService.open(this.deleteModal, { centered: true, size: 'sm' })
    this.customerId = id;
  }
  delete() {
    const data = {
      customerId: this.customerId,
      statusTyp: "delete",
      status: ""
    };
    this.registration.statusChange(data).subscribe((res: any) => {
      if (res.success) {
        this.getAllCustomers();
        this.closeModal();
        this.notifier.notify('success', res.message);
      }
    })
  }



  //------------- For Pagination------------//


  changepagelimit(e: any) {

    this.limit = Number(e.target.value);
    this.getAllCustomers();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllCustomers();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllCustomers();
  }
  downloadData(type: any) {
    this.modalService.open(this.downloadFile, { centered: true, size: 'sm' });
    const data = {
      limit: this.limit,
      offset: this.offset.toString(),
      searchTextCustName: this.searchTextCustName,
      searchTextCustType: this.searchTextCustType,
      searchTextCustPhone: this.searchTextCustPhone,
      searchTextCustBusinessName: this.searchTextCustBusinessName,
      searchCustPartyCode: this.searchCustPartyCode,
      searchCustVisitDate: this.searchCustVisitDate
    };
    this.registration.downloadFile(data).subscribe((res: any) => {
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

  //------------------ Global Filter ---------------//

  globalSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.getAllCustomers();
    }
    else {
      this.searchName = "";
      this.getAllCustomers();
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

}
