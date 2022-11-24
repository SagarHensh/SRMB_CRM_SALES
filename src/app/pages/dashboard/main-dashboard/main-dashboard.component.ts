import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from "../../../service/dashboard.service";
import {CommonService} from "../../../service/common.service";
import {Subject, Subscription} from 'rxjs';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit, OnDestroy {
    filterList: any = [];
    startDate = '';
    endDate = '';
    nextChartSub = new Subject<any>();
    nextChartSubsp: Subscription = new Subscription();
    totalNewCustomer = 0;
    totalNewCustomerGrowth = 0;
    totalBusiness = 0;
    totalBusinessGrowth = 0;
    totalExpenses = 0;
    totalExpensesGrowth = 0;
    totalEmployeeStrength = 0;
    totalEmployeeStrengthGrowth = 0;
    opportunityByStageTotal = 0;
    opportunityByStageData: any = [];
    leadConvRateTotal = 0;
    leadConvRateData: any = [];
    opportunityPipelineTotal = 0;
    opportunityPipelineData: any = [];
    opportunityAnalyticsData: any = [];

    pastOpportunity = 0;
    pastOpportunityGrowth = 0;
    lostOpportunity = 0;
    lostOpportunityGrowth = 0;
    wonOpportunity = 0;
    wonOpportunityGrowth = 0;
    opportunityAnalysisLabels = [{name: 'value', data: [], label: 'Lead'}, {name: 'opportunityvalue', data: [], label: 'Opportunity'}];
    constructor(private dashboardService: DashboardService, private common: CommonService) {
        this.filterList = this.dashboardService.filterList;
    }

    ngOnInit(): void {
        const initDate: any = this.dashboardService.getInitialDate();
        this.startDate = initDate.startDate;
        this.endDate = initDate.endDate;
        this.getDashboardData('newCustomer');
        // this.getDashboardData('opportunityPipeline');
        this.nextChartSubsp = this.nextChartSub.asObservable().subscribe((res: any) => {
            this.getDashboardData('totalBusiness');
            this.getDashboardData('expenses');
            this.getDashboardData('employeeStrength');
            this.getDashboardData('opportunityByStage');
            this.getDashboardData('leadConvRate');
            this.getDashboardData('opportunityPipeline');
            this.getDashboardData('opportunityAnalytics');
            this.getDashboardData('recentOpportunities');
        });
    }

    ngOnDestroy(): void {
      if(this.nextChartSubsp) {
        this.nextChartSubsp.unsubscribe();
      }
    }

    onCallTypeChange(callType: string, chartType: string): void {
        this.getDashboardData(chartType, callType, 1);
    }

    getDashboardData(chartType: string, callType: string = '', flag: number = 0): void {
        const data = {
            type: chartType,
            startDate: this.startDate,
            endDate: this.endDate,
            calType: callType,
            clientId: this.common.getClientId()
        };
        if (callType !== '') {
            data.startDate = '';
            data.endDate = '';
        }
        this.dashboardService.getDashboardData(data).subscribe((res: any) => {
            if (res.success) {
              // console.log(JSON.stringify(res));
              if(chartType === 'newCustomer') {
                  this.totalNewCustomer = res.response.data;
                  this.totalNewCustomerGrowth = res.response.Growth;
                  //console.log("=========totalNewCustomer=======",this.totalNewCustomer);
                  //console.log("=========totalNewCustomerGrowth=======",this.totalNewCustomerGrowth);

                  if (flag == 0) {
                      this.nextChartSub.next({success: true});
                  }
              } else if (chartType === 'totalBusiness') {
                  this.totalBusiness = res.response.data;
                  this.totalBusinessGrowth = res.response.Growth;
              } else if (chartType === 'expenses') {
                  this.totalExpenses = res.response.data;
                  this.totalExpensesGrowth = res.response.Growth;
              } else if (chartType === 'employeeStrength') {
                  this.totalEmployeeStrength = res.response.data;
                  this.totalEmployeeStrengthGrowth = res.response.Growth;
              } else if (chartType === 'opportunityByStage') {
                  this.opportunityByStageData = res.response.data;
                  this.opportunityByStageTotal = res.response.totalvalue;
              } else if (chartType === 'leadConvRate') {
                  this.leadConvRateData = res.response.data;
              } else if (chartType === 'opportunityPipeline') {
                  this.opportunityPipelineData = res.response.data;
                  this.opportunityPipelineTotal = res.response.totalvalue;
              } else if (chartType === 'opportunityAnalytics') {
                  this.opportunityAnalyticsData = res.response.data;
              } else if (chartType === 'recentOpportunities') {
                  // this.opportunityAnalyticsData = res.response.data;
                  this.pastOpportunity = res.response.notmovable;
                  this.pastOpportunityGrowth = res.response.Growthn;
                  this.lostOpportunity = res.response.lost;
                  this.lostOpportunityGrowth = res.response.Growthl;
                  this.wonOpportunity = res.response.data;
                  this.wonOpportunityGrowth = res.response.Growthw;
              }
            } else {
            }
        })
    }

}
