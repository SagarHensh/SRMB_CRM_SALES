import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsModalComponent } from '../contacts-modal/contacts-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from 'src/app/service/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CommonService } from "../../service/common.service";



@Component({
    selector: 'app-contacts-details',
    templateUrl: './contacts-details.component.html',
    styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {
    @ViewChild('remarksmodal') remarksmodal: any;

    //UPLOAD_IMAGE_BASE_PATH = "" as any;
    UPLOAD_IMAGE_BASE_PATH = this.common.imagePath;
    panelOpenState = false;
    contactId = '' as any;
    contactDetails: any = [];
    status = '' as any;
    limit: number = 10;
    offset: number = 0;
    activityStatus = "";
    activityList: any = [];
    activityType: any = '';
    completeStatus = "";
    activityId: any;
    remarks = "";
    activityListStatus: boolean = false;
    selectedVal: number = 10;
    public pageList: Array<any> = [
        { name: '10', value: '10' },
        { name: '15', value: '15' },
        { name: '20', value: '20' },
        { name: '30', value: '30' },
        { name: '50', value: '50' }
    ]
    isdisable: boolean = false;
    isPrevious: boolean = true;
    activityTaskType = '';
    ActivityDate = '';
    ActivityUser = '';
    activityDesc = '';
    allUser: any = [];
    contactsTypeList: any = [];
    occassionList: any = [];
    platformList: any = [];
    countryList: any = [];
    activityTypeList: any = [];
   // isAdmin = false;

//    permission
    permissionData: any;
    authUserData: any;

    imgPath = "" as any;
    contactImgPresent: boolean = false;

    isBussiness: boolean = false;

    constructor(private ngModelService: NgbModal, private contactsService: ContactsService,
        private activatedroute: ActivatedRoute, private notifierService: NotifierService,
        private common: CommonService) {
    }

    ngOnInit(): void {
        this.activatedroute.params.subscribe((data: any) => {
            // console.log("data.id>>>>>>>>>>>",data.id);
            this.contactId = data.id;
            this.getContactDetails();
            this.upcomingActivity();
        })
        let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
        this.getPermissionData()

        this.common.Subject.subscribe((res: any) => {
            this.getContactDetails();
        })
        this.getContactsLandingData();


        //this.isAdmin = this.common.getUserType() !== 2;

        this.getAllUser();
    }

    getPermissionData() {
        if (this.authUserData.moduleDetails.length > 0) {
          this.authUserData.moduleDetails.map((data: any) => {
            // console.log(data)
            if (data.name == "Contacts") {
              this.permissionData = data;
            //   console.log("Branding Permission Dta:", this.permissionData);
            }
          })
        }
      }

    getContactsLandingData() {
        if (this.common.contactsTypeList.length === 0 || this.common.occassionList.length === 0
            || this.common.platformList.length === 0 || this.common.countryList.length === 0) {
            this.contactsService.getContactsLandingData({}).subscribe((res: any) => {
                if (res.success) {
                    //console.log("=====================Landing Res>>>>>>>>>>>>>>>>>>>",res);
                    this.contactsTypeList = res.response.contactTypData;
                    this.occassionList = res.response.occassionData;
                    this.platformList = res.response.platformData;
                    this.countryList = res.response.countryData;
                    this.activityTypeList = res.response.activityList;
                    //this.allUser = res.response.userList;
                    //console.log("===============If========allUser========================",this.allUser);
                    this.common.contactsTypeList = res.response.contactTypData;
                    this.common.occassionList = res.response.occassionData;
                    this.common.platformList = res.response.platformData;
                    this.common.countryList = res.response.countryData;
                    this.common.activityTypeList = res.response.activityList;
                    this.common.userList = res.response.userList;
                }
            })
        } else {
            this.contactsTypeList = this.common.contactsTypeList;
            this.occassionList = this.common.occassionList
            this.platformList = this.common.platformList
            this.countryList = this.common.countryList;
            this.activityTypeList = this.common.activityTypeList;
            //this.allUser = this.common.userList;
            //console.log("=======================allUser====else====================",this.allUser);
        }
    }


    addNew() {

        // if(this.common.contactPermissionDetails.addPem != "0"){
        //     this.notifierService.notify("error","Sorry!!! you have no access for contact add");
        //     return;
        // }

        this.contactsService.contactModalFlag = false;
        this.ngModelService.open(ContactsModalComponent, { centered: true, size: 'xl' });
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);
    }

    editNew() {

        // if(this.common.contactPermissionDetails.editPem != "0"){
        //     this.notifierService.notify("error","Sorry!!! you have no access for contact edit");
        //     return;
        // }

        this.contactsService.contactModalFlag = true;
        this.ngModelService.open(ContactsModalComponent, { centered: true, size: 'xl' });
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);
    }

    getContactDetails() {
        this.common.spinnerShow();
        const data = {
            contactId: this.contactId
        };
        // console.log("======================data>>>>>>>>>>>>",data);
        this.contactsService.getContactDetails(data).subscribe((res: any) => {
            this.common.spinnerHide();
            if (res.success) {
                this.contactDetails = res.response;
                if (this.contactDetails[0].organization.length > 0) {
                    this.isBussiness = true;
                    // console.log("Is bussiness>>>>",this.isBussiness);
                }
                if (res.response[0].contactPrflPic) {
                    this.imgPath = this.UPLOAD_IMAGE_BASE_PATH + res.response[0].contactPrflPic;
                    //console.log("image path:>>>>>>",this.imgPath);
                    this.contactImgPresent = true;
                } 
                // else{
                //     this.imgPath = this.UPLOAD_IMAGE_BASE_PATH + res.response[0].contactPrflPic;
                // }
                //console.log("Contact Details>>>>>>>>>>",this.contactDetails);
                this.contactsService.contactDetailForUpdate = res.response;
            }
        })
    }

    getContactallActivity() {
        const data = {
            contactId: this.contactId,
            limit: this.limit,
            offset: this.offset,
            type: this.activityType
        };
        this.contactsService.getAllActivities(data).subscribe((res: any) => {
            if (res.success) {
                // if (res.response.length == 0) {
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


    statusChange(value: any) {
        this.status = value;
        const data = {
            contactId: this.contactId,
            activeStatus: this.status
        };
        this.contactsService.changeContactStatus(data).subscribe((res: any) => {
            if (res.success) {
                this.getContactDetails();
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }


    cancleTask(id: any) {
        this.activityStatus = "1";
        this.completeStatus = "";
        this.activityId = id;
        const data = {
            contactId: this.contactId,
            activityStatus: this.activityStatus,
            completeStatus: this.completeStatus,
            remark: this.remarks,
            activityId: this.activityId

        };
        this.contactsService.updateContactActivity(data).subscribe((res: any) => {
            if (res.success) {
                this.activityListStatus == false ? this.upcomingActivity() : this.pastActivity()
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })
    }

    remarksModal(id: any): void {
        this.activityId = id;
        this.ngModelService.open(this.remarksmodal, { centered: true, size: 'sm' })
    }

    submitRemarks(remarks: any) {
        this.completeStatus = "1";
        this.activityStatus = "";
        const data = {
            contactId: this.contactId,
            activityStatus: this.activityStatus,
            completeStatus: this.completeStatus,
            remark: remarks,
            activityId: this.activityId
        };
        this.contactsService.updateContactActivity(data).subscribe((res: any) => {
            if (res.success) {
                this.activityListStatus == false ? this.upcomingActivity() : this.pastActivity()
                this.closeModal();
                this.notifierService.notify('success', res.message);
            } else {
                this.notifierService.notify('error', res.message);
            }
        })

    }

    closeModal() {
        this.ngModelService.dismissAll();
    }

    pastActivity() {
        this.activityListStatus = true;
        this.activityType = "past";
        this.activityList = [];
        this.getContactallActivity();

    }

    upcomingActivity() {
        this.activityListStatus = false;
        this.activityType = "up";
        this.getContactallActivity();
    }

    addContactActivity(): any {
        if (this.activityTaskType === '' || this.activityTaskType == null) {
            this.notifierService.notify('error', 'Activity type is required');
            return false;
        }
        if (this.ActivityDate === '' || this.ActivityDate == null) {
            this.notifierService.notify('error', 'Due date is required');
            return false;
        }

        // if (this.isAdmin && this.ActivityUser === '') {
        //     this.notifierService.notify('error', 'Assign user is required.');
        //     return false;
        // }


        if (this.ActivityUser === '' || this.ActivityUser == null) {
            this.notifierService.notify('error', 'Assign user is required.');
            return false;
        }

        const data = {
            contactId: this.contactId,
            activityTypeId: this.activityTaskType,
            dueDate: this.ActivityDate,
            description: this.activityDesc,
            //assignTo: this.common.getUserType() == 2 ? this.common.getuserId() : this.ActivityUser,
            assignTo: this.ActivityUser,
            createdBy: this.common.getuserId()
        };
        this.contactsService.addContactActivity(data).subscribe((res: any) => {
            if (res.success) {
                this.notifierService.notify('success', res.message);
                this.getContactallActivity();
                this.closeModal();
            }
        }, (err: any) => { });
    }

    openAddActivityModal(addActivity: any) {
        this.activityTaskType = "";
        this.ActivityDate = "";
        this.ActivityUser = "";
        this.activityDesc = "";
        this.ngModelService.open(addActivity, { centered: true, size: 'md' });
    }

    previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getContactallActivity();
        if (this.offset <= 0) {
            this.isPrevious = true;
        }

    }

    next() {
        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getContactallActivity();
    }

    getAllUser() {
        this.contactsService.getAllUsers({}).subscribe((res: any) => {
            //console.log("User res>>>>>>>>>>", res);
            if (res.success) {
                this.allUser = res.response;
            }
        })
    }
}
