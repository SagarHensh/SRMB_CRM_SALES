import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationsModalComponent } from '../organizations-modal/organizations-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OrgApiService } from "../../service/org-api.service";
import { CommonService } from "../../service/common.service";
import { NotifierService } from 'angular-notifier';
import { ConfigService } from 'src/app/service/config.service';
import { ORGANIZATION_LIST } from '../tableHeader';

@Component({
    selector: 'app-organizations-list',
    templateUrl: './organizations-list.component.html',
    styleUrls: ['./organizations-list.component.css']
})
export class OrganizationsListComponent implements OnInit {
    @ViewChild('deletemodal') deletemodal: any;
    @ViewChild('bulkUpload') bulkTask: any;
    @ViewChild('downloadFile') downloadFile: any;
    id = 1;
    limit = 50;
    offset = 0;
    searchName = "";
    searchTextOrgName = "";
    searchTextOwnerName = "";
    searchTextContactType = "";
    searchTextState = "";
    searchTextPhone = "";
    userType = "" as any;
    orgList: any = [];
    organizationId = '' as any;
    selectedVal: number = 50;
    contactTypeList: any = [];
    tableHeader: any = [];



    //--------For Bulk Upload----------//

    bulkFile = "";
    uploadBulkFile = "";
    orgBulkFileName = "";
    kanbanViewFlag:boolean = false;

    permissionData: any;
    authUserData:any

    public pageList: Array<any> = [
        { name: '50', value: '50' },
        { name: '100', value: '100' },
        { name: '150', value: '150' },
        { name: '200', value: '250' }
    ]

    isdisable: boolean = false;
    isPrevious: boolean = true;

    // ----------------- For Export------------------//

    downloadPath = "";
    downloadBasePath = this.config.IMAGE_PATH + '/';


    constructor(private ngModelService: NgbModal, private router: Router, private orgApi: OrgApiService,
        private common: CommonService, private notifier: NotifierService, private config: ConfigService) {
    }

    ngOnInit(): void {
        this.common.Subject.subscribe((data: any) => {
            this.getOrganizationList();
        })
        this.tableHeader = ORGANIZATION_LIST;
        this.getLandingData();
        this.getOrganizationList();
        console.log("org permission details>>>>>>>>>", this.common.orgPermissionDetails);
        let menuItem: any = localStorage.getItem('userdlt');
        this.authUserData = JSON.parse(menuItem);
        this.getPermissionData()
    }


    getPermissionData() {
        if (this.authUserData.moduleDetails.length > 0) {
            this.authUserData.moduleDetails.map((data: any) => {
                if (data.name == "Organizations") {
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

    getOrganizationList() {
        const data = {
            limit: this.limit,
            offset: this.offset.toString(),
            searchName: this.searchName,
            userType: this.common.getUserType(),
            searchTextOrgName: this.searchTextOrgName,
            searchTextOwnerName: this.searchTextOwnerName,
            searchTextContactType: this.searchTextContactType,
            searchTextState: this.searchTextState,
            searchTextPhone: this.searchTextPhone,
        };
        this.orgApi.getOrgList(data).subscribe((res: any) => {
            // console.log("org list>>>>>>>",res);
            if (res.success) {
                this.orgList = [];
                if (res.response.data.length == 0) {
                    this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    this.isdisable = true;
                } else {
                    this.orgList = res.response.data;
                    this.isdisable = res.response.data.length < this.limit ? true : false;
                }
                //this.orgList = res.response.data;
                // console.log(">>>>>>>>>orgList>>>>>>>>>>>>>",this.orgList);

            }
        })
    }

    getLandingData(): void {
        const data = {
            clientId: this.common.getClientId()
        };
        this.orgApi.landingData(data).subscribe((res: any) => {
            //console.log("res>>>>>>>>>>>>>>>",res);
            if (res.success) {
                this.common.countryList = res.response.countryList;
                this.common.userList = res.response.userList;
                this.common.contactTypeList = res.response.contactTypeList;
                this.contactTypeList = res.response.contactTypeList;
                this.common.productList = res.response.productList;
            }
        });
    }

    addNew() {
        // if(this.common.orgPermissionDetails.addPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for organization add");
        //     return;
        // }
        this.orgApi.modalFlag = false;
        this.ngModelService.open(OrganizationsModalComponent, { centered: true, size: 'xl' });
        // setTimeout(() => {
        const elem = document.getElementsByClassName('modal');
        if (elem) {
            elem[0].classList.add('addContactModal')
        }
        // }, 200);
    }

    editNew() {

        // if(this.common.orgPermissionDetails.editPem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for organization edit");
        //     return;
        // }

        this.ngModelService.open(OrganizationsModalComponent, { centered: true, size: 'xl' });
        // setTimeout(() => {
        const elem = document.getElementsByClassName('modal');
        if (elem) {
            elem[0].classList.add('addContactModal')
        }
        // }, 200);
    }

    detailsPage(item: any) {
        this.id = item;
        this.router.navigate(['/pages/organizations-details/' + this.id])
    }

    edit(item: any) {
        this.orgApi.modalFlag = true;
        this.orgApi.updateData = item;
        this.editNew();
    }

    deleteOpenModal(orgId: any): void {

        // if(this.common.orgPermissionDetails.deletePem != "0"){
        //     this.notifier.notify("error","Sorry!!! you have no access for organization delete");
        //     return;
        // }

        this.organizationId = orgId;
        this.ngModelService.open(this.deletemodal, { centered: true, size: 'sm' })
    }

    deleteOrg() {
        const data = {
            organizationId: this.organizationId
        };
        this.orgApi.deleteOrg(data).subscribe((res: any) => {
            if (res.success) {
                this.getOrganizationList();
                this.modalClose();
                this.notifier.notify('success', res.message);
            } else {
                this.notifier.notify('error', res.message);
            }
        })
    }

    modalClose(): void {
        this.ngModelService.dismissAll()
    }

    changepagelimit(e: any) {

        this.limit = Number(e.target.value);
        this.getOrganizationList();

    }

    previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getOrganizationList();
        if (this.offset <= 0) {
            this.isPrevious = true;
        }

    }
    next() {

        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getOrganizationList();

    }

    //----------------- For Filter--------------------//

    searchByOrgName(event: any) {
        if (event.target.value.length >= 2) {
            this.searchTextOrgName = event.target.value;
            this.getOrganizationList();
        }
        if (event.target.value.length == 0) {
            this.searchTextOrgName = "";
            this.getOrganizationList();
        }
    }
    searchByOwner(event: any) {
        if (event.target.value.length >= 2) {
            this.searchTextOwnerName = event.target.value;
            this.getOrganizationList();
        }
        if (event.target.value.length == 0) {
            this.searchTextOwnerName = "";
            this.getOrganizationList();
        }
    }

    searchByContactType(event: any) {
        //console.log("event.target.value>>>>>>>>",event.target.value);
        this.searchTextContactType = event.target.value;
        this.orgList = [];
        this.getOrganizationList();
        //   if(this.orgList.length == 0){
        //       this.orgList = [];
        //   }
        if (event.target.value == "0") {
            this.searchTextContactType = "";
            this.getOrganizationList();
        }
    }
    searchOrgByState(event: any) {
        if (event.target.value.length >= 2) {
            this.searchTextState = event.target.value;
            this.getOrganizationList();
        }
        if (event.target.value.length == 0) {
            this.searchTextState = "";
            this.getOrganizationList();
        }
    }

    searchOrgByPhone(event: any) {
        if (event.target.value.length >= 2) {
            this.searchTextPhone = event.target.value;
            this.getOrganizationList();
        }
        if (event.target.value.length == 0) {
            this.searchTextPhone = "";
            this.getOrganizationList();
        }
    }

    //--------------------------For Bulk Upload-----------------//

    multipleUpload() {
        this.ngModelService.open(this.bulkTask, { centered: true });
    }
    sampleDownload() {
        window.open(this.common.downloadPath + 'business.xlsx');
    }
    uploadFile() {
        const banner = document.getElementById('upload') as HTMLInputElement;
        const file: any = banner.files;
        if (file.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = () => {
                this.bulkFile = reader.result as string;
                //console.log("bulkFile>>>>>>>>", this.bulkFile);
                const fileData = new FormData();
                fileData.append('file', file[0]);
                this.orgApi.uploadFileForBulk(fileData).subscribe((res: any) => {
                    //console.log("File upload res>>>>>>>>", res);
                    if (res.success) {
                        this.orgBulkFileName = res.response.orgfilename;
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
        this.orgApi.bulkOrganizationInsert(data).subscribe((res: any) => {
            console.log("Bulk Insert >>>>>>", res);
            if (res.success) {
                this.getOrganizationList();
                this.modalClose();
                this.notifier.notify('success', res.message);
            } else {
                this.notifier.notify('error', res.message);
            }
        })

    }

    // --------------------------- For Export--------------------//

    downloadData(type: any) {
        this.ngModelService.open(this.downloadFile, { centered: true, size: 'sm' });
        const data = {
            limit: this.limit,
            offset: this.offset.toString(),
            userType: this.common.getUserType(),
            searchTextOrgName: this.searchTextOrgName,
            searchTextOwnerName: this.searchTextOwnerName,
            searchTextContactType: this.searchTextContactType,
            searchTextState: this.searchTextState,
            searchTextPhone: this.searchTextPhone,
        };
        this.orgApi.downloadFile(data).subscribe((res: any) => {
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
        this.modalClose();
        window.open(this.downloadPath);
    }

    //------------- Global Search -------------//

    globalSearch(event: any) {
        if (event.target.value.length >= 2) {
            this.searchName = event.target.value;
            this.getOrganizationList();
        } else {
            this.searchName = "";
            this.getOrganizationList();
        }
    }

    //-------------------------- Boxview-----------------------//

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

    userDetails(id: any) {
        this.router.navigate(['pages/user-details/' + id]);
    
      }

}
