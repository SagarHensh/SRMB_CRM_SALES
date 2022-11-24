import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsModalComponent } from '../contacts-modal/contacts-modal.component';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/service/contacts.service';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { ConfigService } from 'src/app/service/config.service';
import { CONTACT_LIST } from '../tableHeader';

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
    @ViewChild('deletemodal') deletemodal: any;
    @ViewChild('bulkUpload') bulkTask: any;
    @ViewChild('downloadFile') downloadFile: any;
    limit: number = 50;
    offset: number = 0;
    searchText = "";
    searchTextName = "";
    searchTextPhone = "";
    searchTextEmail = "";
    searchContactTyp = "";
    searchContactStatus = "";
    contactsList: any = [];
    contactId = "";
    selectedVal: number = 50;
    bulkFile = "";
    uploadBulkFile = "";
    orgBulkFileName = "";
    searchName = "";
    tableHeader: any = [];


    public pageList: Array<any> = [
        { name: '50', value: '50'},
        { name: '100', value: '100'},
        { name: '150', value: '150'},
        { name: '200', value: '250'}
    ]

    isdisable: boolean = false;
    isPrevious: boolean = true;
    contactsTypeList: any = [];
    occassionList: any = [];
    platformList: any = [];
    countryList: any = [];
    activityTypeList: any = [];
    userList: any = [];
    kanbanViewFlag:boolean = false;

    //-----------------For Export----------------//
    downloadBasePath = this.config.IMAGE_PATH + '/';
    downloadPath = "";

    permissionData: any;
    authUserData: any;


    constructor(private ngModelService: NgbModal, private router: Router, private contactsService: ContactsService,
        private notifier: NotifierService, private commonService: CommonService,private config:ConfigService) {
    }

    ngOnInit(): void {
        //this.contactsService.contactDetailForUpdate =[];
        this.commonService.Subject.subscribe((res: any) => {
            this.getContactList();
        })
        this.tableHeader = CONTACT_LIST;
        this.getContactList();
        this.getContactsLandingData();
        let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
        this.getPermissionData()
    }


    getPermissionData() {
        if (this.authUserData.moduleDetails.length > 0) {
          this.authUserData.moduleDetails.map((data: any) => {
            console.log(data)
            if (data.name == "Contacts") {
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

      userDetails(id: any) {
        this.router.navigate(['pages/user-details/' + id]);
    
      }

    getContactsLandingData() {
        if (this.commonService.contactsTypeList.length === 0 || this.commonService.occassionList.length === 0
            || this.commonService.platformList.length === 0 || this.commonService.countryList.length === 0) {
            this.contactsService.getContactsLandingData({}).subscribe((res: any) => {
                //console.log("res contact type====",res);
                if (res.success) {
                    this.contactsTypeList = res.response.contactTypData;
                    //console.log("contactList>>>>>>", this.contactsTypeList);
                    this.occassionList = res.response.occassionData;
                    this.platformList = res.response.platformData;
                    this.countryList = res.response.countryData;
                    this.activityTypeList = res.response.activityList;
                    this.userList = res.response.userList;
                    this.commonService.contactsTypeList = res.response.contactTypData;
                    this.commonService.occassionList = res.response.occassionData;
                    this.commonService.platformList = res.response.platformData;
                    this.commonService.countryList = res.response.countryData;
                    this.commonService.activityTypeList = res.response.activityList;
                    this.commonService.userList = res.response.activityList;
                }
            })
        } else {
            this.contactsTypeList = this.commonService.contactsTypeList;
            this.occassionList = this.commonService.occassionList
            this.platformList = this.commonService.platformList
            this.countryList = this.commonService.countryList;
            this.activityTypeList = this.commonService.activityTypeList;
            this.userList = this.commonService.userList;
        }
    }

    addNew() {

        // if(this.commonService.contactPermissionDetails.addPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for contact add");
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

        // if(this.commonService.contactPermissionDetails.editPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for contact edit");
        //     return;
        // }

        this.ngModelService.open(ContactsModalComponent, { centered: true, size: 'xl' });
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);
    }


    routeDetailsPage(contactId: any) {
        this.contactId = contactId;
        this.router.navigate(['pages/contact-details/' + this.contactId]);

    }

    getContactList() {
        //this.commonService.spinnerShow();
        const data = {
            limit: this.limit,
            offset: this.offset.toString(),
            searchName: this.searchName,
            userType: this.commonService.getUserType(),
            searchTextName: this.searchTextName,
            searchTextPhone: this.searchTextPhone,
            searchTextEmail: this.searchTextEmail,
            searchContactTyp: this.searchContactTyp,
            searchContactStatus: this.searchContactStatus.toString()
        };
       // console.log("Request for contact listing>>>>>>>>>", data);
        this.contactsService.getContactsList(data).subscribe((res: any) => {
            //console.log("Res>>>>>>>>>>>>>", res);
            //this.commonService.spinnerHide();
            if (res.success) {
                if (res.response.data.length == 0) {
                    this.contactsList = [];
                    this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    this.isdisable = true;
                } else {
                    this.contactsList = res.response.data;
                    this.isdisable = res.response.data.length < this.limit ? true : false;
                }
            }
        })
    }

    remove(item: any) {

        // if(this.commonService.contactPermissionDetails.deletePem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for contact delete");
        //     return;
        // }

        this.contactId = item;
        this.deleteOpenModal();

    }

    delete() {
        const data = {
            contactId: this.contactId
        };
        this.contactsService.deleteContacts(data).subscribe((res: any) => {
            if (res.success) {
                this.getContactList();
                this.closeModal();
                this.notifier.notify('success', res.message);
            } else {
                this.notifier.notify('error', res.message);
            }
        })

    }

    edit(item: any) {
        this.contactsService.contactModalFlag = true;
        this.contactsService.contactDetailForUpdate = item;
        this.editNew();
    }

    deleteOpenModal(): void {
        this.ngModelService.open(this.deletemodal, { centered: true, size: 'sm' })
    }

    closeModal() {
        //this.contactsService.contactDetailForUpdate ='';
        this.ngModelService.dismissAll();
    }


    changepagelimit(e: any) {

        this.limit = Number(e.target.value);
        this.getContactList();

    }

    previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getContactList();
        if (this.offset <= 0) {
            this.isPrevious = true;
        }

    }

    next() {
        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getContactList();
    }

    
//----------------------- For Filter-------------------//

    nameSearch(event: any) {
        if (event.target.value.length >= 3) {
            this.searchTextName = event.target.value;
            this.getContactList();
        }
        if (event.target.value.length == 0) {
            this.searchTextName = "";
            this.getContactList();
        }
    }

    phoneSearch(event: any) {
        if (event.target.value.length >= 3) {
            this.searchTextPhone = event.target.value;
            this.getContactList();
        }
        if (event.target.value.length == 0) {
            this.searchTextPhone = "";
            this.getContactList();
        }
    }

    emailSearch(event: any) {
        if (event.target.value.length >= 3) {
            this.searchTextEmail = event.target.value;
            this.getContactList();
        }
        if (event.target.value.length == 0) {
            this.searchTextEmail = "";
            this.getContactList();
        }

    }
    searchByContactType(event: any) {
        //console.log("Event>>>>>>", event.target.value);
        this.searchContactTyp = event.target.value;
        this.contactsList = [];
        this.getContactList();
        if (this.contactsList.length == 0) {
            this.contactsList = [];
        }

        if (event.target.value == "0") {
            this.searchContactTyp = "";
            this.getContactList();
        }
    }

    searchStatus(event: any) {

        if (event.target.value == "") {
            this.searchContactStatus = "";
            this.getContactList();
        }
        if (event.target.value != "") {
            this.searchContactStatus = event.target.value;
            this.getContactList();
        }
    }

    //---------------------For Bulk Upload---------------//

    multipleUpload() {
        this.ngModelService.open(this.bulkTask, { centered: true });
    }
    sampleDownload() {
        window.open(this.commonService.downloadPath + 'contacts.xlsx');
    }
    uploadFile() {

        const banner = document.getElementById('upload') as HTMLInputElement;
        const file: any = banner.files;
        if (file.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = () => {
                this.bulkFile = reader.result as any;
                const fileData = new FormData();
                fileData.append('file', file[0]);
                this.contactsService.uploadFileForBulk(fileData).subscribe((res: any) => {
                   // console.log("File upload res>>>>>>>>", res);
                    if (res.success) {
                        this.orgBulkFileName = res.response.orgfilename;
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
            fileName:this.uploadBulkFile
        };
        this.contactsService.bulkContactInsert(data).subscribe((res:any)=>{
            if(res.success){
                this.getContactList();
                this.closeModal();
                this.notifier.notify('success',res.message);
            } else{
                this.notifier.notify('error',res.message);
            }
        })
    }

    downloadData(type:any){
        this.ngModelService.open(this.downloadFile,{centered:true,size:'sm'});
        const data = {
            limit: this.limit,
            offset: this.offset.toString(),
            userType: this.commonService.getUserType(),
            searchTextName: this.searchTextName,
            searchTextPhone: this.searchTextPhone,
            searchTextEmail: this.searchTextEmail,
            searchContactTyp: this.searchContactTyp,
            searchContactStatus: this.searchContactStatus.toString()
        };
        this.contactsService.fileDownload(data).subscribe((res:any)=>{
           // console.log("Contact download res>>>>>>>>>>",res);
            if(res.success){
                this.downloadPath = "";
                if(type == "2"){
                    this.downloadPath = this.downloadBasePath + res.response.path.dir + res.response.excelPath;
                }
                if(type == "1"){
                    this.downloadPath = this.downloadBasePath + res.response.path.dir + res.response.path.file;
                }
            }
        })

    }

    fileDownload(){
        this.closeModal();
        window.open(this.downloadPath);
    }

    //-------------Global Filter--------//

    globalSearch(event:any){
        if(event.target.value.length >=2){
            this.searchName = event.target.value;
            this.getContactList();
        } else{
            this.searchName = "";
            this.getContactList();
        }
    }

    //------------------ Box view--------------------//

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


