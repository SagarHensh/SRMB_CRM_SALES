import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';
import { CommonService } from 'src/app/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
@Component({
  selector: 'app-approve-customer',
  templateUrl: './approve-customer.component.html',
  styleUrls: ['./approve-customer.component.css']
})
export class ApproveCustomerComponent implements OnInit {

  @ViewChild('approveModalDesign') approveModal:any;
  limit = 10;
  offset = 0;
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
  selectedVal: number = 10;

  approveText = "";

  public pageList: Array<any> = [
    { name: '10', value: '10' },
    { name: '15', value: '15' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '50', value: '50' }
  ]


  constructor(private registration:RegistrationService,private common:CommonService,private modalService:NgbModal,private notifier:NotifierService,private router:Router) { }

  ngOnInit(): void {
    this.getAllPendingCustomers();
  }

  getAllPendingCustomers() {
    const data = {
      limit: this.limit,
      offset: this.offset.toString(),
      userType: this.common.getUserType(),
      searchTextCustName: this.searchTextCustName,
      searchTextCustType: this.searchTextCustType,
      searchTextCustPhone: this.searchTextCustPhone,
      searchTextCustBusinessName: this.searchTextCustBusinessName,
      searchCustPartyCode: this.searchCustPartyCode,
      searchCustVisitDate: this.searchCustVisitDate
    };
    console.log("For Get All Customer request>>>>>>>", data);
    this.registration.getAllPendingCustomers(data).subscribe((res: any) => {
      console.log("Customer List>>>>>>>>Res", res);
      if (res.success) {
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
        console.log("Cus List>>>>>", this.customerTypeList);
      }
    })
  }

  //----------------- For Column  Search---------------//

  nameSearch(event: any) {
    if (event.target.value.length >= 3) {
      this.searchTextCustName = event.target.value;
      this.getAllPendingCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchTextCustName = "";
      this.getAllPendingCustomers();
    }
  }

  customerTypeSearch(event: any) {
    if (event.target.value == "0") {
      this.searchTextCustType = "";
      this.customerList = [];
      this.getAllPendingCustomers();
    }
    if (event.target.value != "0") {
      this.searchTextCustType = event.target.value;
      this.customerList = [];
      this.getAllPendingCustomers();
    }
  }

  phoneSearch(event: any) {
    if (event.target.value.length >= 3) {
      this.searchTextCustPhone = event.target.value;
      this.getAllPendingCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchTextCustPhone = "";
      this.getAllPendingCustomers();
    }
  }
  businessName(event: any) {
    if (event.target.value.length >= 3) {
      this.searchTextCustBusinessName = event.target.value;
      this.getAllPendingCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchTextCustBusinessName = "";
      this.getAllPendingCustomers();
    }
  }
  partyCode(event: any) {
    if (event.target.value.length >= 3) {
      this.searchCustPartyCode = event.target.value;
      this.getAllPendingCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchCustPartyCode = "";
      this.getAllPendingCustomers();
    }
  }
  visitDate(event: any) {
    if (event.target.value.length >= 2) {
      this.searchCustVisitDate = event.target.value;
      this.getAllPendingCustomers();
    }
    if (event.target.value.length == 0) {
      this.searchCustVisitDate = "";
      this.getAllPendingCustomers();
    }
  }

  //----------------- End Column Search---------------//

  closeModal() {
    this.modalService.dismissAll();
  }

  approveModalFunc(id:any){
    this.customerId = id;
    this.modalService.open(this.approveModal,{centered:true,size:'sm'});
  }

  sendApprove(){
    if(this.approveText == ""){
      this.notifier.notify('error',"Please enter remark");
      return;
    }
    const data ={
      customerId:this.customerId,
      approvedRemarks:this.approveText
    };
    console.log("Request for approve customer>>>>>>",data);
    this.registration.approveRegistration(data).subscribe((res:any)=>{
      if(res.success){
        this.getAllPendingCustomers();
        this.closeModal();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })
  }

  routeDetailsPage(id:any){
    this.router.navigate(['/pages/registration-details' +id]);
  }



  // routeDetailsPage(id: any) {
  //   this.router.navigate(['/pages/registration-details/' + id]);
  // }

  // edit(item: any) {
  //   this.registration.customerUpdateFlag = true;
  //   this.customerId = item.customerId;
  //   this.registration.customerId = item.customerId;

  //   this.modalService.open(RegistrationModalComponent, { size: 'lg' });
  // }
  // remove(id: any) {
  //   this.modalService.open(this.deleteModal, { centered: true, size: 'sm' })
  //   this.customerId = id;
  // }


  delete() {
    const data = {
      customerId: this.customerId,
      statusTyp: "delete",
      status: ""
    };
    this.registration.statusChange(data).subscribe((res: any) => {
      if (res.success) {
        this.getAllPendingCustomers();
        this.closeModal();
        this.notifier.notify('success', res.message);
      }
    })
  }



  //------------- For Pagination------------//


  changepagelimit(e: any) {

    this.limit = Number(e.target.value);
    this.getAllPendingCustomers();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllPendingCustomers();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllPendingCustomers();
  }


}
