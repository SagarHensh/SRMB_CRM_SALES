import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../service/login.service';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']


})
export class PagesComponent implements OnInit {
  plusCounter = 0;
  isonCounter = 0;
  notificationCounter = 0;
  ison: boolean = false;
  plusicon: boolean = false;
  menuListFromApi: any;
  menuList = [
    {

      name: "Dashboard",
      id: 'dashboard',
      icon: 'assets/images/dashboard-icon.svg',
      path: '/pages/dashboard',
      isActive: false,
      isView: '1',
      child: []
    },
    {

      name: "Employee",
      id: 'Employee',
      icon: 'assets/images/icons8-user-50 .png',
      path: '/pages/administration-user',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Contacts',
      id: 'Contacts',
      icon: 'assets/images/contacts-icon.svg',
      path: '/pages/contact-list',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Customers',
      id: 'Registration',
      icon: 'assets/images/icons8-user-50 .png',
      path: '/pages/registration-list',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Organizations',
      id: 'Organizations',
      icon: 'assets/images/organizations-icon.svg',
      path: '/pages/organizations-list',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Calender',
      id: 'Calender',
      icon: 'assets/images/organizations-icon.svg',
      path: '/pages/calendar',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Task',
      id: 'Task',
      icon: 'assets/images/task-icon.svg',
      path: '/pages/tasklist',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Enquiry',
      id: 'Enquiry',
      icon: 'assets/images/icons8-search-30.png',
      path: '/pages/enquery',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Leads',
      id: 'Leads',
      icon: 'assets/images/leads-icon.svg',
      path: '/pages/lead-list',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Opportunity',
      id: 'Opportunity',
      icon: 'assets/images/opportunity-icon.svg',
      path: '/pages/opportunity-list',
      isActive: false,
      isView: '',
      child: []
    },
    {
      name: 'Field Visit',
      id: 'FieldVisit',
      icon: 'assets/images/organizations-icon.svg',
      path: '/pages/field-visit-list',
      isActive: false,
      isView: 1,
      child: []
    },


  ]
  constructor(private router: Router, private loginService: LoginService, private common:CommonService) {

  }

  ngOnInit(): void {
    // console.log("localstorage>>>>>>>>>>>",localStorage.getItem('userId'));
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['/']);
    }
    for (const menu of this.menuList) {
      menu.isActive = false;
    }
    let menuItem: any = localStorage.getItem('userdlt');
    let details: any = JSON.parse(menuItem);

    for(let permission of details.moduleDetails){
      //console.log("permission>>>>>>>",permission);
      if(permission.name.includes("Employee")){
        this.common.empPermissionDetails = permission;
      }else if(permission.name.includes("Contacts")){
        this.common.contactPermissionDetails = permission;
      }else if(permission.name.includes("Customers")){
        this.common.customerPermissionDetails = permission;
      }else if(permission.name.includes("Organizations")){
        this.common.orgPermissionDetails = permission;
      }else if(permission.name.includes("Task")){
        this.common.taskPermissionDetails = permission;
      }else if(permission.name.includes("Enquiry")){
        this.common.enquiryPermissionDetails = permission;
      }else if(permission.name.includes("Leads")){
        this.common.leadPermissionDetails = permission;
      }else if(permission.name.includes("Opportunity")){
        this.common.oppPermissionDetails = permission;
      }else if(permission.name.includes("Calender")){
        this.common.calenderPermissionDetails = permission;
      }
    }
    //console.log("details>", details);

    
    this.menuListFromApi = details.moduleDetails;

    for (let item of this.menuListFromApi) {
      for (const menu of this.menuList) {
        if (item.name.includes(menu.name)) {
          menu.isView = item.isView;
        }
      }
    }
    //console.log("New Menu list>>>>>>>>",this.menuList);
  }

  onMenuCLick(i: number): void {
    for (const menu of this.menuList) {
      menu.isActive = false;
    }
    this.menuList[i].isActive = true;

  }

  logOut() {

    // localStorage.clear();
    // this.router.navigate(['/']);
    // window.location.href="http://3.7.173.54/crmLogin/";

    const data = {
      platform: "web"
    };
    this.loginService.logOut(data).subscribe((res: any) => {
      if (res.success) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    })
  }

  // onSubMenuCLick(i: number, a: number): void {
  //   for (const menu of this.menuList) {
  //     for (const subMenu of menu.child) {
  //       subMenu.isActive = false
  //     }
  //   }
  //   this.menuList[i].child[a].isActive = true;
  // }


  onof() {
    this.isonCounter += 1;
    this.ison = !this.ison;
  }

  plusIcon() {
    this.plusCounter += 1;

  }
  notification() {
    this.notificationCounter += 1;
  }

  //---------------- For new menu-----------------//

  openNav() {
    var element: any = document.getElementById("sidebar");
    element.classList.toggle("collapsed");
  }

  // closeNav(){
  //   var document:any = document.getElementById("sidebar").style.width = "250px";
  //   document.getElementByClass("main").style.marginLeft = "250px";
  // }
}
