import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.css']
})
export class HeaderDashboardComponent implements OnInit {
  selectedMenu = 1;
  constructor(private route: Router) { }

  ngOnInit(): void {
    const url = this.route.url.split('/')[this.route.url.split('/').length - 1]
    this.selectedMenu = url == 'dashboard' ? 1 : 2
  }

  onDashboardChange(flag: number): void {
    this.selectedMenu = flag;
    if (flag === 1) {
      this.route.navigate(['/pages/dashboard']);
    } else {
      this.route.navigate(['/pages/dashboard/lead']);
    }
  }

}
