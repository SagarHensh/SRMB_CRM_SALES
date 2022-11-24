import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {TaskModalComponent} from '../task-modal/task-modal.component';
import {TaskmodalService} from 'src/app/service/taskmodal.service';
import {NotifierService} from 'angular-notifier';
import {CommonService} from 'src/app/service/common.service';


@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

    panelOpenState = false;
    taskId = "";
    taskDetails: any;
    priorityList: any;
    newPriority: any;
    priorityFlag: boolean = false;
    permissionData: any;
    authUserData: any;

    constructor(private activatedroute: ActivatedRoute,
                private modalService: NgbModal, private taskModelService: TaskmodalService,
                private notifier: NotifierService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.getPriorityList();
        this.activatedroute.params.subscribe((data: any) => {
            if (data) {
                this.taskId = data.id;
                this.getTaskDetails();
            }
        })
        let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
        
          this.getPermissionData()
        this.commonService.Subject.subscribe((res: any) => {
               // console.log("enter update");
                this.getTaskDetails();
        })
    }
    getPermissionData() {
        if (this.authUserData.moduleDetails.length > 0) {
          this.authUserData.moduleDetails.map((data: any) => {
            // console.log(data)
            if (data.name == "Task") {
              this.permissionData = data;
            //   console.log("Branding Permission Dta:", this.permissionData);
            }
          })
        }
      }

    getTaskDetails() {
        this.commonService.spinnerShow();
        const data = {
            taskId: this.taskId
        }
        this.taskModelService.getTaskDetails(data).subscribe((res: any) => {
            this.commonService.spinnerHide();
            if (res.success) {
                this.taskDetails = res.response;
                //console.log("taskdetails>>>>>>>>>>>>",this.taskDetails);
                this.commonService.taskDetails = res.response;


            }
        })
    }

    getPriorityList() {
        this.taskModelService.getPriorityList({}).subscribe((res: any) => {
            if (res.success) {
                this.priorityList = res.response;
            }
        })
    }

    changePriority(item: any) {
        this.commonService.spinnerShow();
        const data = {
            taskId: this.taskId,
            priorityStatusId: item
        };
        this.taskModelService.changePriority(data).subscribe((res: any) => {
            this.commonService.spinnerHide();
            if (res.success) {
                this.getTaskDetails();
                this.notifier.notify('success', res.message);
            }
        })
    }

    addnew() {

        // if(this.commonService.taskPermissionDetails.addPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for task add");
        //     return;
        // }

        this.commonService.updateTaskFlag = false
        this.modalService.open(TaskModalComponent, {centered: true, size: 'xl'});
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);

    }

    edit() {
        // if(this.commonService.taskPermissionDetails.editPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for task edit");
        //     return;
        // }
        //this.commonService.spinnerShow();
        this.commonService.updateTaskFlag = true;
        // this.getTaskDetails();
        this.editNew();
    }

    editNew() {
        this.modalService.open(TaskModalComponent, {centered: true, size: 'xl'});
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);
    }
}
