import { Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContactsModalComponent} from '../contacts-modal/contacts-modal.component';
import {Router} from '@angular/router';
import {ContactsService} from 'src/app/service/contacts.service';
import {NotifierService} from 'angular-notifier';
import {CommonService} from 'src/app/service/common.service';

@Component({
  selector: 'app-approve-contact',
  templateUrl: './approve-contact.component.html',
  styleUrls: ['./approve-contact.component.css']
})
export class ApproveContactComponent implements OnInit {

  @ViewChild('deletemodal') deletemodal: any;
  @ViewChild('approveModalDesign')approveModal: any;
    limit: number = 10;
    offset: number = 0;
    searchText = "";
    searchTextName = "";
    searchTextPhone = "";
    searchTextEmail = "";
    searchContactTyp = "";
    searchContactStatus = "";
    contactsList: any = [];
    contactId = "";
    selectedVal: number = 10;
    approveText="";

    public pageList: Array<any> = [
        {name: '10', value: '10'},
        {name: '15', value: '15'},
        {name: '20', value: '20'},
        {name: '30', value: '30'},
        {name: '50', value: '50'}
    ]

    isdisable: boolean = false;
    isPrevious: boolean = true;
    contactsTypeList: any = [];
    occassionList: any = [];
    platformList: any = [];
    countryList: any = [];
    activityTypeList: any = [];
    userList: any = [];
    constructor(private ngModelService: NgbModal, private router: Router, private contactsService: ContactsService,
                private notifier: NotifierService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        //this.contactsService.contactDetailForUpdate =[];
        this.commonService.Subject.subscribe((res: any) => {
            this.getContactList();
        })
        this.getContactList();
        this.getContactsLandingData();
    }

    approveModalFunc(item:any): any {
      this.contactId=item;
      this.ngModelService.open(this.approveModal, { centered: true });
      setTimeout(() => {
        const elem = document.getElementsByClassName('modal');
        if (elem) {
          elem[0].classList.add('addContactModal')
        }
      }, 200);
    }

    modalClose(): void {
      this.ngModelService.dismissAll();
    }

    sendApprove(): any{
      if(this.approveText == ""){
        this.notifier.notify('error', 'Please Enter a Remark');
        return false;
      }
      var param ={
        "contactId": this.contactId,
        "userId": this.commonService.getuserId(),
        "approvedRemark": this.approveText
      }
      this.contactsService.giveApprove(param).subscribe((res : any) =>{
        if(res.success == true){
            this.getContactList();
          this.notifier.notify('success', 'Contact Approved Successfully');
          this.approveText = "";
        }
      })
      this.modalClose();
    }

    getContactsLandingData() {
        if (this.commonService.contactsTypeList.length === 0 || this.commonService.occassionList.length === 0
            || this.commonService.platformList.length === 0 || this.commonService.countryList.length === 0) {
            this.contactsService.getContactsLandingData({}).subscribe((res: any) => {
                if (res.success) {
                    this.contactsTypeList = res.response.contactTypData;
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
        this.contactsService.contactModalFlag = false;
        this.ngModelService.open(ContactsModalComponent, {centered: true, size: 'xl'});
        setTimeout(() => {
            const elem = document.getElementsByClassName('modal');
            if (elem) {
                elem[0].classList.add('addContactModal')
            }
        }, 200);
    }

    editNew() {
        this.ngModelService.open(ContactsModalComponent, {centered: true, size: 'xl'});
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
        this.commonService.spinnerShow();
        const data = {
            limit: this.limit,
            offset: String(this.offset),
            clientId: this.commonService.getClientId(),
            userId: this.commonService.getuserId(),
            userType:this.commonService.getUserType(),
            searchTextName: this.searchTextName,
            searchTextPhone: this.searchTextPhone,
            searchTextEmail: this.searchTextEmail,
            searchContactTyp: this.searchContactTyp,
            searchContactStatus: this.searchContactStatus
        };
        console.log("Request for contact listing>>>>>>>>>",data);
        this.contactsService.getContactsListAll(data).subscribe((res: any) => {
            console.log("Res>>>>>>>>>>>>>",res);
            this.commonService.spinnerHide();
            if (res.success) {
                if (res.response.count == 0) {
                    this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    this.isdisable = true;
                } else {
                    this.contactsList = res.response.data;
                    this.isdisable = res.response.length < this.limit ? true : false;
                }
            }
        })
    }

    remove(item: any) {
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
        this.ngModelService.open(this.deletemodal, {centered: true, size: 'sm'})
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

}
