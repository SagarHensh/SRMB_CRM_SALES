import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministrationService } from 'src/app/service/administration.service';
import { CommonService } from 'src/app/service/common.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userCId = "" as any;
  userDetails:any =[];
  imgPath = this.common.imagePath;
  profileImgPath = "";
  //--------------- Add Task-------------------//

  @ViewChild('addActivity') addTask:any;
  @ViewChild('remarksmodal') remarkPopup:any;
  taskType = "";
  dueDate = "";
  description = "";
  isAdmin:boolean = false;
  assignTouserId = "" as any;
  activityType = "up";
  taskCategoryList:any = [];
  userNames:any = [];
  userUpdateFlag:boolean = false;

  limit = 10;
  offset = 0;
  searchTypeText = "";
  searchDateText = "";
  searchAssignUserText = "";
  activityList:any =[];
  activityTypeStatus:boolean = false;
  activityStatus = "" as any;
  completeStatus = "" as any;
  remark = "" as any;
  activityId = ""  as any;


  selectedVal: number = 10;
  public pageList: Array<any> = [
      {name: '10', value: '10'},
      {name: '15', value: '15'},
      {name: '20', value: '20'},
      {name: '30', value: '30'},
      {name: '50', value: '50'}
  ]
  isdisable: boolean = false;
  isPrevious: boolean = true;
  authUserData: any;
  permissionData: any;




  constructor(private activateRoute:ActivatedRoute,private administration:AdministrationService,private common:CommonService,private modalService:NgbModal,private notifier:NotifierService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((res:any)=>{
      //console.log("Url Id>>>>>>>>>",res);
      this.userCId = res.id;
    })
    this.getUserDetailsByUserCId();
    console.log("get all uset details by User If>>>>>>>>>>>>",this.getUserDetailsByUserCId);
    
    this.getAllActivities();
    this.getTaskCategory();
    this.getUser();

    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);

    this.getPermissionData();

    this.common.Subject.subscribe((res:any)=>{
      this.getUserDetailsByUserCId();
    })
    
  }
  

  getPermissionData() {
    console.log("User Details permission data::", this.authUserData.moduleDetails)
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Employee") {
          this.permissionData = data;
          
          console.log("Employee Permission Dta:", this.permissionData);
        }
      })
    }
  }

  getUserDetailsByUserCId(){
    const data = {
      userCId:this.userCId
    };
    this.administration.getUserDetailsByUserCId(data).subscribe((res:any)=>{
      if(res.success){

        // console.log("GET USER DETAILS BY CID>>>>", res);
        
        this.userDetails = res.response;
        this.administration.userDetailsParticularId = res.response;
        this.profileImgPath = this.imgPath + this.userDetails[0].profileImgUrl;
        console.log("User Dedtails Res getUserDetailsByUserCId>>>>>>>>>>>>>>",this.userDetails);
      }
    })
  }

  addNew(){
    this.administration.userUpdateFlag = false;
    this.modalService.open(UserCreateComponent,{centered:true})
  }
  addTaskPopUp(){
    this.modalService.open(this.addTask,{centered:true})
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  addUserTask(){
    if(this.taskType == ""){
      this.notifier.notify('error',"Please select task type");
      return;
    }
    if(this.dueDate == ""){
      this.notifier.notify('error',"Please choose due date");
      return;
    }
    if(this.description == ""){
      this.notifier.notify('error',"Please enter description");
      return;
    }
    if(this.description != ""){
      if(this.description.length > 250){
        this.notifier.notify('error',"Please enter description within 250 characters");
        return;
      }
    }
    if(this.assignTouserId == ""){
      this.notifier.notify('error',"Please select user");
      return;
    }

    const data ={
      userCId:this.userCId,
      dueDate:this.dueDate,
      assignTo:this.assignTouserId,
      description:this.description,
      activityTypeId:this.taskType
    };
    this.taskType = "";
    this.dueDate = "";
    this.description = "";
    this.assignTouserId = "";
    //console.log("Data for add task>>>>>>>>",data);
    this.administration.addActivity(data).subscribe((res:any)=>{
      if(res.success){
        this.getAllActivities();
        this.closeModal();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })

  }
  getTaskCategory(){
    this.administration.getTaskCategory({}).subscribe((res:any)=>{
      //console.log("Task Type List",res)
      if(res.success){
        this.taskCategoryList = res.response;
      }
    })
  }
  getUser(){
    this.administration.getUser({}).subscribe((res:any)=>{
      //console.log("user names>>>>>>>>",res);
      if(res.success){
        this.userNames = res.response;
      }
    })
  }

  statusChange(status:any){
    //console.log("status>>>>>>>>",status);
    const data ={
      userCId:this.userCId,
      activeStatus:status.toString()
    };
    this.administration.statusChange(data).subscribe((res:any)=>{
      if(res.success){
        this.getUserDetailsByUserCId();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })
  }

  upcommingActivity(){
    this.activityTypeStatus = false;
    this.searchAssignUserText = "";
    this.searchDateText = "";
    this.searchTypeText = "";
    this.activityType = 'up'
    this.activityList = [];
    this.getAllActivities();
  }
  pastActivity(){
    this.activityTypeStatus = true;
    this.searchAssignUserText = "";
    this.searchDateText = "";
    this.searchTypeText = "";
    this.activityType = 'past'
    this.activityList =[];
    this.getAllActivities();
  }

  getAllActivities(){
    const data ={
      userCId:this.userCId,
      limit:this.limit,
      offset:this.offset,
      type:this.activityType,
      searchTypeText:this.searchTypeText,
      searchDateText:this.searchDateText,
      searchAssignUserText:this.searchAssignUserText
    };
    //console.log("Get All activites>>>>>>>>>>>>",data);
    this.administration.getAllActivities(data).subscribe((res:any)=>{
      //console.log("Activity res>>>>>>>>>>>>>>",res);
      if(res.success){
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
  searchByTaskCategoryType(event:any){
    //console.log("search by word>>>>>>>>>>>",event.target.value);
    this.searchTypeText = event.target.value;
    if(event.target.value.length >= 2){
      this.getAllActivities();
    }
    if(event.target.value.length == 0){
      this.searchTypeText = "";
      this.getAllActivities();
    }
  }
  searchByDateType(event:any){
    //console.log("search by date>>>>>>>>>>>",event.target.value);
    this.searchDateText = event.target.value;
    if(event.target.value.length >= 2){
      this.getAllActivities();
    }
    if(event.target.value.length == 0){
      this.searchDateText = "";
      this.getAllActivities();
    }
  }
  searchByAssignTo(event:any){
    //console.log("assign to",event.target.value);
    if(event.target.value.length >= 2){
      this.searchAssignUserText = event.target.value;
      this.getAllActivities();
    }
    if(event.target.value.length == 0){
      this.searchAssignUserText = "";
      this.getAllActivities();
    }
  }
  //-------------Task cancle or remarks----------------//

  cancleTask(activityid:any){
    //console.log("activity id>>>>>>>",activityid);
    this.activityStatus = "1";
    this.completeStatus = "";
    const data ={
      userCId:this.userCId,
      activityId:activityid,
      activityStatus:this.activityStatus,
      completeStatus:this.completeStatus,
      remark:this.remark
    }
    //console.log("cancle data>>>>>>>>>",data);
    this.administration.cancleTask(data).subscribe((res:any)=>{
      if(res.success){
        this.getAllActivities();
        this.notifier.notify("success",res.message);
      } else{
        this.notifier.notify("error",res.message);
      }
    })
  }
  remarksModal(activityid:any){
    //console.log("Activity id>>>>>>>>>>",activityid);
    this.activityId = activityid;
    this.modalService.open(this.remarkPopup,{centered:true,size:'sm'});
  }

  submitRemarks(remarks:any){
    //console.log("remarks>>>>>>",remarks);
    this.remark = remarks;
    this.completeStatus = "1";
    this.activityStatus = "";

    const data ={
      userCId:this.userCId,
      activityId:this.activityId,
      activityStatus:this.activityStatus,
      completeStatus:this.completeStatus,
      remark:this.remark
    };
   // console.log("For remarks data>>>>>>>",data);
    this.administration.markAsComplete(data).subscribe((res:any)=>{
      if(res.success){
        this.getAllActivities();
        this.closeModal();
        this.notifier.notify('success',res.message);
      } else{
        this.notifier.notify('error',res.message);
      }
    })

  }

  edit(){
    //this.userUpdateFlag = true;
    this.administration.userUpdateFlag = true;
    this.modalService.open(UserCreateComponent,{centered:true})
  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getAllActivities();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getAllActivities();
  }


}
