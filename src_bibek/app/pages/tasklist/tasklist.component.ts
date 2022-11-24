import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskmodalService } from 'src/app/service/taskmodal.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/service/config.service';
import { TASK_LIST } from '../tableHeader';


@Component({
    selector: 'app-tasklist',
    templateUrl: './tasklist.component.html',
    styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit, OnDestroy {
    @ViewChild('deletemodal') deletemodal: any;
    @ViewChild('remarksmodal') remarksmodal: any;
    @ViewChild('bulkUpload') bulkTask: any;
    @ViewChild('downloadFile') downloadFile: any;
    @ViewChild('changeAssignedUser') changeAssgnUser: any;
    limit = 50;
    offset: number = 0;
    searchName = "";
    searchText = '' as any;
    taskName = "";
    dueDate = "";
    assignTo = "";
    contactPerson = "";
    phone = "";
    priority = "";
    bulkFile = "";
    uploadBulkFile = "";
    bulkFileName = "";

    tableHeader: any = [];
    totalTaskManagementList: any = [];
    taskId = '' as any;
    getTaskDetailsList: any;
    remarks = '';
    selectedVal: number = 50;
    editIconFlag: boolean = true;

    public pageList: Array<any> = [
        { name: '50', value: '50' },
        { name: '100', value: '100' },
        { name: '150', value: '150' },
        { name: '200', value: '250' }
    ]

    isdisable: boolean = false;
    isPrevious: boolean = true;
    listSubscrption: any;
    kanbanViewFlag: boolean = false;
    assignToList: any = [];
    assignedEmployeeName = "" as any;

    //----------------For Export---------------//

    downloadPath = "";
    downloadBasePath = this.config.IMAGE_PATH + '/';

    id='' as any

    permissionData: any;
    authUserData: any;

    constructor(private matDialog: MatDialog, private modalService: NgbModal, private taskmodalService: TaskmodalService,
        private notifier: NotifierService, private commonService: CommonService, private router: Router, private http: HttpClient, private config: ConfigService) {
    }

    ngOnInit(): void {
        this.getTaskManagementList();
        this.listSubscrption = this.commonService.Subject.subscribe((res: any) => {
            this.getTaskManagementList();
        });
        this.getUserList();
        this.tableHeader = TASK_LIST;

        let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
        
          this.getPermissionData()
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
    

    ngOnDestroy(): void {
        if (this.listSubscrption) {
            this.listSubscrption.unsubscribe();
        }
    }

    addNew() {

        // if(this.commonService.taskPermissionDetails.addPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for task add");
        //     return;
        // }

        this.commonService.updateTaskFlag = false
        this.modalService.open(TaskModalComponent, { centered: true, size: 'xl' });
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);
    }
   
        




    editNew() {

        // if(this.commonService.taskPermissionDetails.editPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for task edit");
        //     return;
        // }

        this.modalService.open(TaskModalComponent, { centered: true, size: 'xl' });
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')

            }
        }, 200);
    }
    detailsPage(item: any) {
        this.id = item;
        this.router.navigate(['/pages/organizations-details/' + this.id])
    }
    getTaskManagementList() {
        //this.commonService.spinnerShow();
        const data = {
            userType: this.commonService.getUserType(),
            limit: this.limit,
            offset: this.offset.toString(),
            searchName: this.searchName,
            taskName: this.taskName,
            dueDate: this.dueDate,
            assignTo: this.assignTo,
            contactPerson: this.contactPerson,
            phone: this.phone,
            priority: this.priority

        };
        // console.log("Request data for task list>>>>>>>>>>>>>", data);
        this.taskmodalService.getTaskManagementList(data).subscribe((res: any) => {
            // console.log("Res>>>>>>>>", res);
            // this.commonService.spinnerHide()
            if (res.success) {
                this.totalTaskManagementList = [];
                if (res.response.data.length == 0) {
                    this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    this.isdisable = true;
                } else {
                    this.totalTaskManagementList = [];
                    for (let obj of res.response.data) {
                        if (obj.dueDate) {

                            var isShow = this.checkDueDate(obj.dueDate)
                            if (isShow == true) {
                                obj['ishide'] = true;
                                this.totalTaskManagementList.push(obj)
                            } else {
                                obj['ishide'] = false;
                                this.totalTaskManagementList.push(obj)

                            }

                        }

                    }
                    this.isdisable = res.response.data.length < this.limit ? true : false;

                }

            } else {
                this.notifier.notify('error', res.message);
            }
        })
    }

    closeModal() {
        this.modalService.dismissAll();
    }

    remove(item: any) {

        // if(this.commonService.taskPermissionDetails.deletePem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for task delete");
        //     return;
        // }

        this.taskId = item.taskId;
        this.deleteOpenModal();

    }

    getTaskDetails() {

        const data = {
            taskId: this.taskId
        };
        this.commonService.spinnerShow();
        this.taskmodalService.getTaskDetails(data).subscribe((res: any) => {
            if (res.success) {
                this.commonService.taskDetails = res.response;
                this.commonService.spinnerHide();
                this.editNew();
            }
        })
    }

    edit(item: any) {
        this.commonService.updateTaskFlag = true;
        this.taskId = item;
        this.getTaskDetails();
    }

    delete() {
        const data = {
            taskId: this.taskId
        };
        this.taskmodalService.deleteTask(data).subscribe((res: any) => {
            if (res.success) {
                this.notifier.notify('success', res.message);
                this.closeModal();
                this.getTaskManagementList();
            } else {
                this.notifier.notify('error', res.message);
            }
        })
    }

    submitRemarks(remark: any) {
        this.remarks = remark;
        this.markComplete();
        this.closeModal();
    }

    markComplete() {
        const data = {
            taskId: this.taskId,
            remarks: this.remarks
        };
        this.taskmodalService.markComplete(data).subscribe((res: any) => {
            if (res.success) {
                this.notifier.notify('success', res.message);
            } else {
                this.notifier.notify('error', res.message);
            }
        })
    }

    deleteOpenModal(): void {
        this.modalService.open(this.deletemodal, { centered: true, size: 'sm' })
    }

    remarksModal(taskid: any): void {
        this.taskId = taskid;
        this.modalService.open(this.remarksmodal, { centered: true, size: 'sm' })
    }

    detilsPage(item: any) {
        this.taskId = item;
        this.router.navigate(['/pages/task-details/' + this.taskId]);
    }

    checkDueDate(dueDate: any) {
        let currentDate = new Date().toISOString();
        let newFormat = currentDate.split("T");
        let actualCurrentDate = newFormat[0];
        let userType = this.commonService.getUserType();
        if (userType == 0 && dueDate < actualCurrentDate) {
            return true;
        } else {
            return false;
        }
    }


    changepagelimit(e: any) {
        this.limit = Number(e.target.value);
        this.getTaskManagementList();
    }

    previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getTaskManagementList()
        if (this.offset <= 0) {
            this.isPrevious = true;
        }
    }

    next() {
        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getTaskManagementList()
    }

    searchByTaskName(event: any) {
        if (event.target.value.length >= 3) {
            this.taskName = event.target.value;
            this.getTaskManagementList();
        }
        if (event.target.value.length == 0) {
            this.taskName = "";
            this.getTaskManagementList();
        }
    }

    searchByDueDate(event: any) {
        if (event.target.value.length >= 2) {
            this.dueDate = event.target.value;
            this.getTaskManagementList();
        }
        if (event.target.value.length == 0) {
            this.dueDate = "";
            this.getTaskManagementList();
        }
    }

    searchByAssignTo(event: any) {
        if (event.target.value.length >= 3) {
            this.assignTo = event.target.value;
            this.getTaskManagementList();
        }
        if (event.target.value.length == 0) {
            this.assignTo = "";
            this.getTaskManagementList();
        }
    }

    searchByContactPerson(event: any) {
        if (event.target.value.length >= 3) {
            this.contactPerson = event.target.value;
            this.getTaskManagementList();
        }
        if (event.target.value.length == 0) {
            this.contactPerson = "";
            this.getTaskManagementList();
        }
    }

    searchByPhone(event: any) {
        if (event.target.value.length >= 3) {
            this.phone = event.target.value;
            this.getTaskManagementList();
        }
        if (event.target.value.length == 0) {
            this.phone = "";
            this.getTaskManagementList();
        }
    }

    searchByStatus(event: any) {
        if (event.target.value == "1") {
            this.priority = "High";
            this.getTaskManagementList();
        }
        if (event.target.value == "2") {
            this.priority = "Medium";
            this.getTaskManagementList();
        }
        if (event.target.value == "3") {
            this.priority = "Low";
            this.getTaskManagementList();
        }
        if (event.target.value == "0") {
            this.priority = "";
            this.getTaskManagementList();
        }
    }
    //------------------------ For Bulk Upload-----------------------//

    multipleUpload() {
        this.modalService.open(this.bulkTask, { centered: true });
    }
    sampleDownload() {
        window.open(this.commonService.downloadPath + "task.xlsx");
    }


    uploadFile() {
        const banner = document.getElementById('upload') as HTMLInputElement;
        const file: any = banner.files;
        if (file.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = () => {
                this.bulkFile = reader.result as string;
                // console.log("bulkFile>>>>>>>>", this.bulkFile);
                const fileData = new FormData();
                fileData.append('file', file[0]);
                this.taskmodalService.uploadFile(fileData).subscribe((res: any) => {
                    //console.log("File upload res>>>>>>>>", res);
                    if (res.success) {
                        this.bulkFileName = res.response.orgfilename;
                        this.uploadBulkFile = res.response.fileName;
                        //console.log("Upload Bulk File upload>>>>>>>>>>>", this.uploadBulkFile);
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
        this.taskmodalService.bulkTaskInsert(data).subscribe((res: any) => {
            //console.log("Bulk Insert >>>>>>", res);
            if (res.success) {
                this.getTaskManagementList();
                this.closeModal();
                this.notifier.notify('success', res.message);
            } else {
                this.notifier.notify('error', res.message);
            }
        })
    }

    //--------------------For Export------------------//

    downloadData(type: any) {
        this.modalService.open(this.downloadFile, { centered: true, size: 'sm' });
        const data = {
            userType: this.commonService.getUserType(),
            limit: this.limit,
            offset: this.offset.toString(),
            taskName: this.taskName,
            dueDate: this.dueDate,
            assignTo: this.assignTo,
            contactPerson: this.contactPerson,
            phone: this.phone,
            priority: this.priority
        };
        this.taskmodalService.downloadFile(data).subscribe((res: any) => {
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

    //------------------ Global Filter --------------//

    globalSearch(event: any) {
        if (event.target.value.length >= 2) {
            this.searchName = event.target.value;
            this.getTaskManagementList();
        } else {
            this.searchName = "";
            this.getTaskManagementList();
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

    changeAssignUser(data: any) {
        this.assignedEmployeeName = data.assignTo;
        this.taskId = data.taskId;
        this.modalService.open(this.changeAssgnUser, { size: 'md' });
    }

    assignEmpUpdate() {
        if (this.assignedEmployeeName == "" || this.assignedEmployeeName == null) {
            this.notifier.notify('error', "Please select assign to employee");
            return;
        }
        const data = {
            assignTo: this.assignedEmployeeName,
            taskId: this.taskId
        };
        //console.log("Request data for task update>>>>>>>",data);
        this.taskmodalService.updateAssignedEmpUser(data).subscribe((res:any)=>{
            if(res.success){
                this.getTaskManagementList();
                this.closeModal();
                this.notifier.notify('success',res.message);
            } else{
                this.notifier.notify('error',res.message)
            }
        })

    }
    getUserList() {
        const data = {
            clientId: this.commonService.getClientId()
        };
        this.taskmodalService.employeeList(data).subscribe((res: any) => {
            if (res.success) {
                this.assignToList = res.response.userList;
                //console.log("Activity userlist>>>>>>>>>", this.assignToList);
            }
        })
    }
}
