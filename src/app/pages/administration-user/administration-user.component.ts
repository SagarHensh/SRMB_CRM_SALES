import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { CommonService } from 'src/app/service/common.service';
import { AdministrationService } from 'src/app/service/administration.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { Router } from '@angular/router';
import { RestService } from '../../rest.service';
import { ConfigService } from 'src/app/service/config.service';
import { EMPLOYEE_LIST } from '../tableHeader';
@Component({
  selector: 'app-administration-user',
  templateUrl: './administration-user.component.html',
  styleUrls: ['./administration-user.component.css']
})
export class AdministrationUserComponent implements OnInit {

  @ViewChild('addUser') addUser: any;
  @ViewChild('deletemodal') deleteModal: any;
  @ViewChild('addRole') addRoleModal: any;
  @ViewChild('updateRoleModalDesign') updateRoleModal: any;
  @ViewChild('downloadFile') linkDownload: any;
  userFlag: boolean = false;
  roleFlag: boolean = false;
  permissionFlag: boolean = false;
  downloadPath = "";
  downloadBasePath = this.config.IMAGE_PATH + '/';

  searchByUserName = "";
  searchByUserPhone = "";
  searchByUserRole = "";
  searchByUserDesignation = "";
  searchByUserEmail = "";
  limit = 50;
  offset = 0;
  userList: any = [];
  roleList: any = [];
  designationList: any = [];
  searchName = "";

  userCId = "" as any;

  selectedVal: number = 50;

  title: string = "";
  role_description: string = "";
  titleEdit: string = "";
  role_descriptionEdit: string = "";
  roleId: any;
  clientId: any;
  userId: any;
  permissions: any;
  getres: any;
  getDataFromApi: any;
  allRole: any;
  getEditDataFromApi: any;
  getPermissionDataFromApi: any;
  getTable1PermissionDataFromApi: any;
  getTableSecondPermissionDataFromApi: any;
  getRoleListFromApi: any;
  selectedOption: any = "";
  selectedRoleId: any;
  moduleAndPermission: any;

  public pageList: Array<any> = [
    { name: '50', value: '50' },
    { name: '100', value: '100' },
    { name: '150', value: '150' },
    { name: '200', value: '250' }
  ]

  isdisable: boolean = false;
  isPrevious: boolean = true;
  kanbanViewFlag: boolean = false;
  tableHeader: any = [];
  authUserData: any;
  permissionData: any;


  constructor(private modalService: NgbModal, private notifier: NotifierService, private common: CommonService, private administration: AdministrationService, private router: Router, private RestService: RestService, private config: ConfigService) { }

  ngOnInit(): void {
    this.common.Subject.subscribe((res: any) => {
      this.getUserList();
    });
    this.tableHeader = EMPLOYEE_LIST;
    let menuItem: any = localStorage.getItem('userdlt');
    this.authUserData = JSON.parse(menuItem);
    this.userFlag = true;
    this.getUserList();
    this.showAllRole();
    this.getRoleListForPermission();
    this.getRole();
    this.getDesignation();
    // console.log("Employee>>>>>>>",this.allowEmployee);
    // this.getDesignation();
    // this.getCountry();
    // this.getRole();
    this.getPermissionData();
  }

  getPermissionData() {
    // console.log("permission data::", this.authUserData.moduleDetails)
    if (this.authUserData.moduleDetails.length > 0) {
      this.authUserData.moduleDetails.map((data: any) => {
        if (data.name == "Employee") {
          this.permissionData = data;
          console.log("Employee Admin Permission Dta:", this.permissionData);
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

  addRoleFunc(): any {
    this.modalService.open(this.addRoleModal, { centered: true });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }

  addUserPopup() {
    this.administration.userUpdateFlag = false;
    // console.log("Add user>>>>>>>>");
    this.modalService.open(UserCreateComponent, { centered: true });
  }

  edit(id: any) {
    //console.log("id>>>>>>>>>>>>>>>>>", id);
    this.administration.userUpdateFlag = true;
    this.administration.userDetailsParticularId = id;
    this.modalService.open(UserCreateComponent, { centered: true });
  }

  modalClose(): void {
    this.modalService.dismissAll();
  }
  userClick() {
    this.roleFlag = false;
    this.permissionFlag = false;
    this.userFlag = true;

  }

  roleClick() {
    this.userFlag = false;
    this.roleFlag = true;
    this.permissionFlag = false;
  }
  permissionClick() {
    this.userFlag = false;
    this.roleFlag = false;
    this.permissionFlag = true;

  }

  getUserList() {
    const data = {
      searchUserName: this.searchByUserName,
      searchUserPhone: this.searchByUserPhone,
      searchUserRole: this.searchByUserRole,
      searchUserDesig: this.searchByUserDesignation,
      searchUserEmail: this.searchByUserEmail,
      limit: this.limit,
      offset: this.offset,
      searchName: this.searchName
    };
    console.log("Request data for employee Data listing>>>>",data);
    this.administration.getUserList(data).subscribe((res: any) => {
      console.log(" GetUser List data res>>>>>>>>>", res);
      if (res.success) {
        if (res.response.data.length == 0) {
          this.userList = [];
          this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
          this.isdisable = true;
        } else {
          this.userList = res.response.data;
          this.isdisable = res.response.data.length < this.limit ? true : false;
        }
      }
    })
  }

  createRole(): any {
    // console.log("creat role function hit");
    // console.log("title", this.title);
    // console.log("role_description", this.role_description);
    if (this.title == "") {
      this.notifier.notify('error', 'Role Name is required');
      return false;
    }
    if (this.role_description == "") {
      this.notifier.notify('error', 'Description type is required');
      return false;
    }
    var insert = {
      roleName: this.title,
      roleDescription: this.role_description,
      userId: this.common.getuserId(),
      clientId: this.common.getClientId()
    };
    this.RestService.insertData(insert).subscribe((res: any) => {
      if (res.success == true) {
        this.notifier.notify('success', 'Role created successfully');
        this.title = "";
        this.role_description = "";
      }
    })
    this.modalClose();
  }

  showAllRole(): any {
    var allRole;
    var getDataFromApi = {
      "searchRoleName": "",
      "searchRoleDescription": "",
      "clientId": this.common.getClientId(),
      "limit": 10,
      "offset": 0
    };
    this.RestService.getAllRoleData(getDataFromApi).subscribe((res: any) => {
      this.getres = res;
      //console.log(JSON.stringify(this.getres));
      if (this.getres.success == true) {
        this.getDataFromApi = this.getres.response.data;
        //console.log('getDataFromApi', this.getDataFromApi);
      } else {
        this.getDataFromApi = [];
      }
    })
  }

  updateRole(roleId: any): any {
    this.modalService.open(this.updateRoleModal, { centered: true });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
    this.getDataForEdit(roleId);

  }

  getDataForEdit(roleId: any): any {
    var getEditDataFromApi = {
      "searchRoleName": "",
      "searchRoleDescription": "",
      "clientId": this.common.getClientId(),
      "limit": 10,
      "offset": 0
    };
    this.RestService.getEditRoleData(getEditDataFromApi).subscribe((res: any) => {
      this.getres = res;
      //console.log(JSON.stringify(this.getres));
      if (this.getres.success == true) {
        this.getEditDataFromApi = this.getres.response.data;
        //console.log('getEditDataFromApi', this.getEditDataFromApi);
        for (let e = 0; e < this.getEditDataFromApi.length; e++) {
          if (this.getEditDataFromApi[e].roleId == roleId) {
            // console.log("roleId", roleId);
            this.titleEdit = this.getEditDataFromApi[e].roleName;
            this.role_descriptionEdit = this.getEditDataFromApi[e].description;
            this.roleId = this.getEditDataFromApi[e].roleId;
          }
        }
      } else {
        this.getEditDataFromApi = [];
      }
    })
  }

  editRole(): any {
    var dataForEdit = {
      "roleName": this.titleEdit,
      "roleDescription": this.role_descriptionEdit,
      "userId": this.common.getuserId(),
      "clientId": this.common.getClientId(),
      "roleId": this.roleId
    };
    this.RestService.editData(dataForEdit).subscribe((res: any) => {
      if (res.success == true) {
        this.notifier.notify('success', 'Role updated successfully');
        this.titleEdit = "";
        this.role_descriptionEdit = "";
      }
    })
    this.modalClose();
  }

  deleteRole(roleId: any): any {
    console.log("roleId", roleId);
    let Deletedata = {
      "roleId": roleId,
      "userId": this.common.getuserId()
    };
    console.log("Deletedata", Deletedata);
    this.RestService.deleteData(Deletedata).subscribe((res: any) => {
      if (res.success == true) {
        this.notifier.notify('success', 'Role Deleted successfully');
      }
    })
    this.showAllRole();
  }

  fetchPermissionDataFromApi(): any {
    var permissionData = {
      "clientId": this.common.getClientId(),
      "roleId": this.selectedOption
    }
    this.RestService.permissionDataFetch(permissionData).subscribe((res: any) => {
      //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(res));
      this.getres = res;
      //console.log(JSON.stringify(this.getres));
      if (this.getres.success == true) {
        //console.log('>>>>>>>>>>>>>>>>', JSON.stringify(res));
        this.getPermissionDataFromApi = this.getres.response;
        //console.log('getPermissionDataFromApi', this.getPermissionDataFromApi);
        this.getTable1PermissionDataFromApi = this.getPermissionDataFromApi[0];
        //console.log("getTable1PermissionDataFromApi", this.getTable1PermissionDataFromApi);
        for (let t2 = 1; t2 < this.getPermissionDataFromApi.length; t2++) {
          this.getTableSecondPermissionDataFromApi = this.getPermissionDataFromApi[t2];
          //console.log("getTableSecondPermissionDataFromApi", this.getTableSecondPermissionDataFromApi);
        }
      } else {
        this.getPermissionDataFromApi = [];
      }
    })
  }

  getRoleListForPermission(): any {
    var getRoleListForPermissionFromApi = {
      "clientId": this.common.getClientId()
    };
    this.RestService.getAllRoleListData(getRoleListForPermissionFromApi).subscribe((res: any) => {
      this.getres = res;
      //console.log(JSON.stringify(this.getres));
      if (this.getres.success == true) {
        this.getRoleListFromApi = this.getres.response.data;
        //console.log('getRoleListFromApi', this.getRoleListFromApi);
      } else {
        this.getRoleListFromApi = [];
      }
    })
  }

  selectFunc(event: any) {
    var selectedRoleId = event;
    //console.log("Function is hitting !", selectedRoleId);
    this.fetchPermissionDataFromApi();
  }

  saveRollListData(): any {
    var clientId = this.common.getClientId();
    var roleId = this.selectedOption;
    var roleListArray = [];
    for (let a = 0; a < this.getPermissionDataFromApi.length; a++) {

      var moduleId = this.getPermissionDataFromApi[a].moduleId;
      var moduleName = this.getPermissionDataFromApi[a].moduleName;
      var addPem = this.getPermissionDataFromApi[a].permission.addPem;
      var editPem = this.getPermissionDataFromApi[a].permission.editPem;
      var deletePem = this.getPermissionDataFromApi[a].permission.deletePem;
      var approvePem = this.getPermissionDataFromApi[a].permission.approvePem;
      if (addPem == true) {
        addPem = "1";
      } else {
        addPem = "0";
      }
      if (editPem == true) {
        editPem = "1";
      } else {
        editPem = "0";
      }
      if (deletePem == true) {
        deletePem = "1";
      } else {
        deletePem = "0";
      }
      if (approvePem == true) {
        approvePem = "1";
      } else {
        approvePem = "0";
      }

      let permissionArray = {
        "moduleId": moduleId,
        "moduleName": moduleName,
        "permission": [
          {
            "addPem": addPem,
            "editPem": editPem,
            "deletePem": deletePem,
            "approvePem": approvePem
          }
        ]
      }

      roleListArray.push(permissionArray);
    }
    let param = {
      "clientId": String(clientId),
      "roleId": String(roleId),
      "userId": this.common.getuserId(),
      "permissions": roleListArray
    };
    //console.log(JSON.stringify(param));
    this.RestService.saveRoleList(param).subscribe((res: any) => {
      // console.log('<><><><><><><>', res);
      if (res.success == true) {
        this.notifier.notify('success', 'Permission update successfully');
        this.clientId = "";
        this.roleId = "";
        this.userId = "";
        this.permissions = [];
      }
    })
  }


  userDetails(id: any) {
    this.router.navigate(['pages/user-details/' + id]);

  }

  remove(index: any) {
    this.userCId = index;
    this.modalService.open(this.deleteModal, { centered: true, size: 'sm' })
  }

  delete() {
    const data = {
      userCId: Number(this.userCId)
    };
    console.log("Data>>>>>>>>>>>", data);
    this.administration.deleteUser(data).subscribe((res: any) => {
      if (res.success) {
        this.getUserList();
        this.closeModal()
        this.notifier.notify('success', res.message);
      } else {
        this.notifier.notify('error', res.message);
      }
    })

  }
  changepagelimit(e: any) {

    this.limit = Number(e.target.value);
    this.getUserList();

  }

  previous() {
    this.isdisable = false;
    this.offset = this.offset > 0 ? this.offset - this.limit : 0;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getUserList();
    if (this.offset <= 0) {
      this.isPrevious = true;
    }

  }

  next() {
    this.isPrevious = false;
    this.offset = this.offset + this.limit;
    this.getUserList();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  getRole() {
    this.administration.getRole({}).subscribe((res: any) => {
      console.log("role list>>>>>>>>", res);
      if (res.success) {
        this.roleList = res.response.data;
      }
    })
  }
  getDesignation() {
    this.administration.getDesignation({}).subscribe((res: any) => {
      // console.log("Designation list>>>>>>>", res);
      if (res.success) {
        this.designationList = res.response;
      }
    })
  }
  searchByRole(event: any) {
    if (event.target.value == "0") {
      this.searchByUserRole = "";
      this.userList = [];
      this.getUserList();
    } else {
      this.searchByUserRole = event.target.value;
      this.userList = [];
      this.getUserList();
    }

  }

  searchByDesignation(event: any) {
    if (event.target.value == "0") {
      this.searchByUserDesignation = "";
      this.userList = [];
      this.getUserList();
    } else {
      this.searchByUserDesignation = event.target.value;
      this.userList = [];
      this.getUserList();
    }
  }



  searchByEmpName(event: any) {
    if (event.target.value.length >= 2) {
      this.searchByUserName = event.target.value;
      this.getUserList();
    }
    if (event.target.value.length == 0) {
      this.searchByUserName = "";
      this.getUserList();
    }
  }

  searchByEmpPhone(event: any) {
    if (event.target.value.length >= 2) {
      this.searchByUserPhone = event.target.value;
      this.getUserList();
    }
    if (event.target.value.length == 0) {
      this.searchByUserPhone = "";
      this.getUserList();
    }
  }

  //---------------------For Excel or CSV Download--------------//

  downloadData(type: any) {
    this.modalService.open(this.linkDownload, { centered: true, size: 'sm' });
    const data = {
      searchUserPhone: this.searchByUserPhone,
      searchUserRole: this.searchByUserRole,
      searchUserDesig: this.searchByUserDesignation,
      searchUserEmail: this.searchByUserEmail,
      limit: this.limit,
      offset: this.offset
    };
    this.administration.downloadData(data).subscribe((res: any) => {
      //console.log("Download path>>>>>>>>>>>>>>",res);
      if (res.success) {
        if (type == "2") {
          this.downloadPath = "";
          this.downloadPath = this.downloadBasePath + res.response.path.dir + res.response.excelPath;
        }
        if (type == "1") {
          this.downloadPath = this.downloadBasePath + res.response.path.dir + res.response.path.file;
        }
        // console.log("Download file path>>>>>>>>>>>",this.downloadPath);
        this.notifier.notify('success', res.message);
      }
    })
  }

  fileDownload() {
    this.closeModal();
    window.open(this.downloadPath);
  }

  // settingsToggle():void{
  //     var tb = document.getElementById("settingsnew");
  //    //tb.classList.add("open");

  // }

  globalSearch(event: any) {
    if (event.target.value.length >= 2) {
      this.searchName = event.target.value;
      this.getUserList();
    } else {
      this.searchName = "";
      this.getUserList();
    }
  }

  //----------------- Kanbanview ---------------------//

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

  addEmpTask(id: any) {
    this.router.navigate(['pages/user-details/' + id]);
  }

}
