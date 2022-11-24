import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { NotifierService } from 'angular-notifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})
export class RegistrationDetailsComponent implements OnInit {
  customerId = "";
  customerDetails:any = [];
  profImage= "";
  profileImageStatus:boolean = false;
  permissionData: any;
  authUserData: any;
  
  constructor(private registration:RegistrationService,private activatedRoute:ActivatedRoute,private notifier:NotifierService,private common:CommonService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this.customerId = res.id;
    })
    this.getCustDetailsById();
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
          // console.log("Branding Permission Dta:", this.permissionData);
        }
      })
    }
  }


  getCustDetailsById(){
    const data ={
      customerId:this.customerId
    };
    this.registration.getCustomerDetailsById(data).subscribe((res:any)=>{
      //console.log("customer details>>>>>>",res);
      if(res.success){
        this.customerDetails = res.response[0];
        this.profImage = this.common.imagePath + res.response[0].profilePic;
        if(this.profImage){
          this.profileImageStatus = true;
        }

        //console.log("Customer Details>>>>>>>",this.customerDetails);
      }
    })
  }

  statusChange(status:any){
    const data ={
      customerId:this.customerId,
      statusTyp:"statusChange",
      status:status.toString()
    };
    this.registration.statusChange(data).subscribe((res:any)=>{
      if(res.success){
        this.getCustDetailsById();
        this.notifier.notify('success',res.message);
      }
    })
  }
  addNew(){
    this.registration.customerUpdateFlag = false;
    this.registration.customerId = "";
    this.modalService.open(RegistrationModalComponent,{size:'lg'});
  }
  editNew(){
    this.registration.customerUpdateFlag = true;
    this.registration.customerId = this.customerId;
    this.modalService.open(RegistrationModalComponent,{size:'lg'});
  }

}
