import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import {ConfigService} from './config.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  filterList = [{
    id: '1W',
    name: 'Last Week'
  },{
    id: '1M',
    name: 'Last Month'
  }, {
    id: '3M',
    name: 'Last 3 Month'
  }];
  
  /*
  , {
    id: '6M',
    name: 'Last 6 Month'
  }, {
    id: '1Y',
    name: 'Last Year'
  }, {
    id: '1D',
    name: 'Today'
  }
   */
  DASHBOARD_API_ROOT = this.configService.DASHBOARD_API_ROOT;
  constructor(private http:HttpClient,private configService:ConfigService) { }

  formatDate(date: any) {
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  getInitialDate(): any {
    const date = new Date();
    const endDate = this.formatDate(date);
    const startDate = this.formatDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))
    return {startDate: startDate, endDate: endDate};
  }

  getDashboardData(data: any): any{
    return this.http.post(this.DASHBOARD_API_ROOT + 'getDashboardData' , data, httpOptions);
  }

  getLeadDashboardData(data: any): any{
    return this.http.post(this.DASHBOARD_API_ROOT + 'getLeadDashboardData' , data, httpOptions);
  }
}
