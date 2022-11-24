import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { TaskmodalService } from 'src/app/service/taskmodal.service';
import { CommonService } from 'src/app/service/common.service';
// import { TasklistComponent } from '../tasklist/tasklist.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {


    showHide: boolean = false;
    counter: number = 0;
    taskName = '' as any;
    taskId: any;
    taskCategory = '' as any;
    assignType = 1 as any;
    selectUser = '' as any;
    dueDate = '' as any;
    priorityStatus = '' as any;
    taskStage = '' as any;
    organizationName = '' as any;
    personName = '' as any;
    phoneNo: any = [{ item: '' }];
    email: any = [{ item: '' }];
    description = '' as any;
    visibilityPermission = "" as any;
    meetingTime = '' as any;
    needMeeting: boolean = false;
    meetingFlag: boolean = false;
    assignUserList: any;
    taskCategoryList: any;
    stageList: any;
    priorityList: any;
    meetingValue: number = 0;
    recurringStatus = '' as any;
    recurringFlag: boolean = false;
    recurringValue: number = 0;
    selectedRecurringType = '' as any;
    fromToenddateFlag: boolean = false;
    dailyDateFlag: boolean = false;
    dailyDate = '' as any;
    startDate = '' as any;
    endDate = '' as any;
    accessId = "";
    visibilityPersionFlag: Boolean = false;
    modalTypeFlag: boolean = false;
    urlId = "";
    assignToFlag: boolean = false;
    //VisiPermissionFlag: boolean = true;
    VisiPermissionFlag: boolean = false;
    phoneNumberList: any = [];
    emailList: any = [];

    // myDatePicker = "";
    picker: any;
    // dateTime = "";

    constructor(private modalService: NgbModal, private taskModalService: TaskmodalService, private notifier: NotifierService, private commonService: CommonService, private activatedRoute: ActivatedRoute, private route: Router) {
    }

    ngOnInit(): void {


        //----------------- Previous Logic Only Admin can Assign the task---------------------//

        // const userTypeId = this.commonService.getUserType();
        // if (userTypeId != 2) {
        //     this.assignToFlag = true;
        // } else {
        //     this.VisiPermissionFlag = false;
        //     this.assignType = 1;
        //     this.selectUser = this.commonService.getuserId();
        //     this.accessId = this.commonService.getuserId();
        // }


        //this.selectUser = this.commonService.getuserId();
        //this.accessId = this.commonService.getuserId();


        this.activatedRoute.params.subscribe((data: any) => {
            if (data) {
                this.urlId = data.id;
            }
        })

        const data = {};
        this.taskModalService.assignUserList(data).subscribe((res: any) => {
            this.assignUserList = res.response.userDtl;
            this.taskCategoryList = res.response.categoryDtl;
            this.stageList = res.response.stageDtl;
            this.priorityList = res.response.priorityDtl;

        })

        // console.log("getTask>>>>>>>>", this.commonService.taskDetails);
        if (this.commonService.updateTaskFlag) {
            this.modalTypeFlag = true;
            for (let item of this.commonService.taskDetails) {
                this.taskId = item.taskId;
                this.taskName = item.taskName;
                this.taskCategory = item.taskCategoryId;
                this.selectUser = item.assignTo;
                this.assignType = item.assignType;
                this.dueDate = item.dueDate;
                this.priorityStatus = item.priorityStatusId;
                this.taskStage = item.taskStageId;
                this.organizationName = item.organizationName;
                this.personName = item.contactPerson;
                if (item.contactPersonPhone != null && item.contactPersonPhone != "") {
                    if (item.contactPersonPhone.includes(",")) {
                        this.phoneNo = [];
                        for (const d of item.contactPersonPhone.split(',')) {
                            this.phoneNo.push({ item: d });
                        }
                    } else {
                        this.phoneNo = [];
                        this.phoneNo.push({ item: item.contactPersonPhone })
                    }
                } else {
                    this.phoneNo = [{ item: "" }];
                }

                // if (this.phoneNo.length === 0) {
                //     this.phoneNo = [{ item: '' }]
                // }

                if (item.contactPersonEmail != null && item.contactPersonEmail != "") {
                    if (item.contactPersonEmail.includes(",")) {
                        this.email = [];
                        for (const d of item.contactPersonEmail.split(',')) {
                            this.email.push({ item: d });
                        }
                    } else {
                        this.email = [];
                        this.email.push({ item: item.contactPersonEmail });
                    }
                } else {
                    this.email = [{ item: "" }];
                }

                // if (this.email.length === 0) {
                //     this.email = [{ item: '' }]
                // }

                this.description = item.taskDescription;
                this.visibilityPermission = item.permissionType;
                this.accessId = item.accessId;
                this.meetingValue = item.needMeeting;

                if (item.needMeeting == 1) {
                    this.needMeeting = true;
                    this.meetingFlag = true;
                } else {
                    this.needMeeting = false;
                    this.meetingFlag = false;
                }
                this.meetingTime = item.meetingTime;
                this.recurringValue = item.isRecurring;
                if (item.isRecurring == 1) {
                    this.recurringStatus = true;
                    this.recurringFlag = true;
                } else {
                    this.recurringStatus = false;
                    this.recurringFlag = false;
                }
                this.selectedRecurringType = item.recurringType;
                if (item.recurringType == 2) {
                    this.dailyDateFlag = false;
                    this.fromToenddateFlag = true;
                }
                if (item.recurringType == 1) {
                    this.fromToenddateFlag = false;
                    this.dailyDateFlag = true;

                }
                if (item.recurringType == '') {
                    this.dailyDateFlag = false;
                    this.fromToenddateFlag = false;
                }
                if (item.permissionType == 4) {
                    this.visibilityPermission = 4;
                    this.visibilityPersionFlag = true;
                }
                if (item.permissionType == 2) {
                    this.visibilityPermission = 2;
                }
                if (item.permissionType == 1) {
                    this.visibilityPermission = 1;
                }

                this.startDate = item.startDate;
                this.endDate = item.endDate
            }

        }
    }

    saveNext(): void {
        if (this.counter == 0) {

            if (this.taskName == '' || this.taskName == null) {
                this.notifier.notify('error', "Please enter task name");
                return;
            }
            if (this.taskCategory == '' || this.taskCategory == null) {
                this.notifier.notify('error', "Please select task category");
                return;
            }
            if (this.commonService.getUserType() != 2) {
                if (this.selectUser == '') {
                    this.notifier.notify('error', "Please select user");
                    return;
                }
            }
            if (this.dueDate == '' || this.dueDate == null) {
                this.notifier.notify('error', "Please select due date");
                return;
            }
            if (this.priorityStatus == '' || this.priorityStatus == null) {
                this.notifier.notify('error', "please select priority status");
                return;
            }
            if (this.taskStage == '' || this.taskStage == null) {
                this.notifier.notify('error', "Please select task stage");
                return;
            }
        }
        if (this.counter == 1) {
            if (this.organizationName == '' || this.organizationName == null) {
                this.notifier.notify('error', "Please enter organization name");
                return;
            }
            if (this.personName == '' || this.personName == null) {
                this.notifier.notify('error', "Please enter contact person name");
                return;
            }
            for (const obj of this.phoneNo) {
                if (obj.item == "" || obj.item == null) {
                    this.notifier.notify('error', "Please enter phone number");
                    return;
                }
                if (obj.item != "") {
                    if (this.commonService.phoneNumberFormat(obj.item) == false) {
                        this.notifier.notify('error', "Please enter valid phone number");
                        return;
                    }
                }

            }

            if (this.phoneNo.length > 1) {
                if (Number(this.phoneNo[0].item) == Number(this.phoneNo[1].item)) {
                    this.notifier.notify('error', "Alternate phone number must be different");
                    return;
                }
            }

            //....Email Validation turned off

            for (const obj of this.email) {
                // if (obj.item == "" || obj.item == null) {
                //     this.notifier.notify('error', "Please enter mail id");
                //     return;
                // }
                if (obj.item != "") {
                    if (this.commonService.mailFormatCheck(obj.item) == false) {
                        this.notifier.notify('error', "Please enter valid mail id");
                        return;

                    }
                }

            }
            if (this.email.length > 1) {
                if (this.email[0].item == this.email[1].item) {
                    this.notifier.notify('error', "Alternate Email must be different");
                    return;
                }
            }

            if (this.needMeeting == false) {
                this.notifier.notify('error', "Please choose need meeting");
                return;
            }

            if (this.needMeeting == true) {
                if (this.meetingTime == "") {
                    this.notifier.notify('error', "Please select meeting time");
                    return;
                }
            }
            if (this.recurringStatus == false) {
                this.notifier.notify('error', "Please choose recurring status");
                return;
            }
            if (this.recurringStatus == true) {
                if (this.selectedRecurringType == "") {
                    this.notifier.notify('error', "Please select recurring type");
                    return;
                }
                if (this.selectedRecurringType == 1) {
                    if (this.startDate == "") {
                        this.notifier.notify('error', "Please select date");
                        return;
                    }
                }
                if (this.selectedRecurringType == 2) {
                    if (this.startDate == "") {
                        this.notifier.notify('error', "Please select start date");
                        return;
                    }
                    if (this.endDate == "") {
                        this.notifier.notify('error', "Please select end date");
                        return;
                    }

                    if (this.startDate > this.endDate) {
                        this.notifier.notify('error', "End date should be grater than start date");
                        return;
                    }
                }
            }

            // console.log("conter 1111111111");

        }

        if (this.counter == 2) {
            if (this.description == "" || this.description == null) {
                this.notifier.notify('error', "Please enter description");
                return;
            }
            if (this.description != "") {
                if (this.description.length > 350) {
                    this.notifier.notify('error', "Please enter description within 350 characters");
                    return;
                }
            }
        }

        const prevElem = document.getElementById('step_' + this.counter);
        const prevElemDtl = document.getElementById('stepDtl_' + this.counter);
        if (prevElem && prevElemDtl) {
            prevElem.className = 'success';
            prevElemDtl.classList.remove('show');
            prevElemDtl.classList.add('hide');
        }

        this.counter += 1;
        const nextElem = document.getElementById('step_' + this.counter);
        const nextElemDtl = document.getElementById('stepDtl_' + this.counter);
        if (nextElem && nextElemDtl) {
            nextElem.className = 'active';
            nextElemDtl.classList.remove('hide');
            nextElemDtl.classList.add('show');
        }
    }

    saveprev(): void {
        if (this.counter != null && this.counter > 0) {
            const nextElem = document.getElementById('step_' + this.counter);
            const nextElemDtl = document.getElementById('stepDtl_' + this.counter);
            if (nextElem && nextElemDtl) {
                nextElem.className = 'success';
                nextElemDtl.classList.remove('show');
                nextElemDtl.classList.add('hide');
            }
            this.counter -= 1;
            const prevElem = document.getElementById('step_' + this.counter);
            const prevElemDtl = document.getElementById('stepDtl_' + this.counter);
            if (prevElem && prevElemDtl) {
                prevElem.className = 'active';
                prevElemDtl.classList.remove('hide');
                prevElemDtl.classList.add('show');
            }
        }
    }

    submit(): any {

        if (this.visibilityPermission == "") {
            this.notifier.notify('error', "Please choose visibility permission");
            return;
        }
        if (this.visibilityPermission === 4) {
            if (this.accessId == "") {
                this.notifier.notify('error', "Please select user");
                return;
            }
        }


        this.meetingTime = new Date(this.meetingTime).toISOString();
        this.meetingTime = this.meetingTime.split(".")[0];
        this.phoneNumberList = [];
        this.emailList = [];

        for (let i = 0; i < this.phoneNo.length; i++) {
            this.phoneNumberList.push(this.phoneNo[i].item);
        }
        for (let i = 0; i < this.email.length; i++) {
            this.emailList.push(this.email[i].item);
        }
        const data = {
            taskName: this.taskName,
            taskCategoryId: this.taskCategory,
            assignTo: this.selectUser,
            //assignType: userType,
            assignType: this.assignType,
            dueDate: this.dueDate,
            priorityStatusId: this.priorityStatus,
            taskStageId: this.taskStage,
            organizationName: this.organizationName,
            contactPerson: this.personName,
            //contactPersonPhone: this.phoneNo.join(','),
            //contactPersonEmail: this.email.join(','),
            contactPersonPhone: this.phoneNumberList,
            contactPersonEmail: this.emailList,
            taskDescription: this.description,
            permissionType: this.visibilityPermission,
            accessId: this.accessId,
            needMeeting: this.meetingValue,
            meetingTime: this.meetingTime,
            isRecurring: this.recurringValue,
            recurringType: this.selectedRecurringType,
            startDate: this.startDate,
            endDate: this.endDate == "" ? null : this.endDate

        };

        //console.log("Submitted Data>>>>>>>>", data);

        this.taskModalService.createTask(data).subscribe((res: any) => {
            if (res.success) {
                this.notifier.notify('success', res.message);
                this.modalClose();
                this.commonService.Subject.next(data);
            } else {
                this.notifier.notify('error', res.message);
            }

        })

    }

    update() {

        this.meetingTime = new Date(this.meetingTime).toISOString();
        //console.log("Meeting Time is:=",this.meetingTime);
        this.meetingTime = this.meetingTime.split(".")[0];

        this.phoneNumberList = [];
        this.emailList = [];

        for (let i = 0; i < this.phoneNo.length; i++) {
            this.phoneNumberList.push(this.phoneNo[i].item);
        }
        for (let i = 0; i < this.email.length; i++) {
            this.emailList.push(this.email[i].item);
        }
        const data = {
            taskId: this.taskId,
            taskName: this.taskName,
            taskCategoryId: this.taskCategory,
            assignTo: this.selectUser,
            assignType: this.assignType,
            dueDate: this.dueDate,
            priorityStatusId: this.priorityStatus,
            taskStageId: this.taskStage,
            organizationName: this.organizationName,
            contactPerson: this.personName,
            // contactPersonPhone: this.phoneNo.join(','),
            // contactPersonEmail: this.email.join(','),
            contactPersonPhone: this.phoneNumberList,
            contactPersonEmail: this.emailList,
            taskDescription: this.description,
            permissionType: this.visibilityPermission,
            accessId: this.accessId,
            needMeeting: this.meetingValue,
            meetingTime: this.meetingTime,
            isRecurring: this.recurringValue,
            recurringType: this.selectedRecurringType,
            startDate: this.startDate,
            endDate: this.endDate == "" ? null : this.endDate
        };
        this.taskModalService.update(data).subscribe((res: any) => {
            if (res.success) {
                this.notifier.notify('success', res.message)
                this.modalClose();
                this.commonService.Subject.next(data);
            } else {
                this.notifier.notify('error', res.message);
            }
        })
    }

    meetingNeed() {
        if (this.needMeeting == true) {
            this.meetingValue = 1;
            this.meetingFlag = true;
        } else {
            this.meetingFlag = false;
            this.meetingValue = 0;

        }

    }

    recurring() {
        if (this.recurringStatus == true) {
            this.recurringFlag = true;
            this.recurringValue = 1;
            this.selectedRecurringType = "";
        } else {
            this.recurringFlag = false;
            this.fromToenddateFlag = false;
            this.dailyDateFlag = false;
            this.recurringValue = 0;
        }

    }

    selectedRecurring() {
        if (this.selectedRecurringType == 2) {
            this.startDate = "";
            this.endDate = "";
            this.dailyDateFlag = false;
            this.fromToenddateFlag = true;
        }

        if (this.selectedRecurringType == 1) {
            this.startDate = "";
            this.fromToenddateFlag = false;
            this.dailyDateFlag = true;
        }
        if (this.selectedRecurringType == '') {
            this.dailyDateFlag = false;
            this.fromToenddateFlag = false;
        }

    }

    visibilityPersionFun() {
        if (this.visibilityPermission == 1) {
            this.accessId = this.commonService.getuserId();
            this.visibilityPersionFlag = false;
        }
        if (this.visibilityPermission == 4) {
            this.accessId = "";
            this.visibilityPersionFlag = true;
        }
        if (this.visibilityPermission == 2) {
            this.visibilityPersionFlag = false;
            this.accessId = this.commonService.getuserId();

        }
    }

    modalClose(): void {
        this.modalService.dismissAll()
    }

    add(flag = 0): void {
        if (flag === 0) {
            this.phoneNo.push({ item: '' });
        } else {
            this.email.push({ item: '' });
        }
    }

    remove(i: number, flag = 0): void {
        if (flag === 0) {
            this.phoneNo.splice(i, 1);
        } else {
            this.email.splice(i, 1);
        }
    }


    dateSelect() {
        //console.log("selected date>>>>>", this.meetingTime);
    }
}
