import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {CommonService} from '../../../service/common.service';
import {Subject, Subscription} from 'rxjs';
import {LeadService} from "../../../service/lead.service";

@Component({
    selector: 'app-lead-dashboard',
    templateUrl: './lead-dashboard.component.html',
    styleUrls: ['./lead-dashboard.component.css']
})
export class LeadDashboardComponent implements OnInit, OnDestroy {

    filterList: any = [];
    startDate = '2022-07-01';
    endDate = '2022-08-20';
    nextChartSub = new Subject<any>();
    nextChartSubsp: Subscription = new Subscription();
    totalLead = 0;
    totalLeadGrowth = 0;
    totalLeadToCustomer = 0;
    totalLeadToCustomerGrowth = 0;
    totalConvertedOpportunity = 0;
    totalConvertedOpportunityGrowth = 0;
    totalNewConnected = 0;
    totalNewConnectedGrowth = 0;
    leadPipelineByStageData: any = [];
    convToOpportunityBifurcationData: any = [];
    growthForecastData: any = [];
    leadCollectedData: any = [];
    leadCollectedTotal: any = [];
    growthForecastDataLabels = [{name: 'value', data: [], label: 'Actual Value'}, {
        name: 'expectedvalue',
        data: [],
        label: 'Expected Value'
    }];

    allLeadArray: any = [];
    public pageList: Array<any> = [
        {name: '10', value: '10'},
        {name: '15', value: '15'},
        {name: '20', value: '20'},
        {name: '30', value: '30'},
        {name: '50', value: '50'}
    ];
    selectedVal: number = 10;
    offset = 0;
    limit = 10;
    isdisable: boolean = false;
    isPrevious: boolean = true;
    deleteLeadId = "" as any;
    contactName = "";
    orgName = "";
    title = "";
    phone = "";
    email = "";
    leadStatus = "";
    owner = "";

    constructor(private dashboardService: DashboardService, private common: CommonService,
                private leadRest: LeadService) {
        this.filterList = this.dashboardService.filterList;
    }

    ngOnInit(): void {
        const initDate: any = this.dashboardService.getInitialDate();
        this.startDate = initDate.startDate;
        this.endDate = initDate.endDate;
        this.getDashboardData('totalLead');
        this.nextChartSubsp = this.nextChartSub.asObservable().subscribe((res: any) => {
            this.getDashboardData('convToCustomer');
            this.getDashboardData('convToOpportunity');
            this.getDashboardData('newConnection');
            this.getDashboardData('leadPipelineByStage');
            this.getDashboardData('convToOpportunityBifurcation');
            this.getDashboardData('growthForecast');
            this.getDashboardData('leadCollected');
            this.getAllLead();
        });
    }

    ngOnDestroy(): void {
        if (this.nextChartSubsp) {
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
        this.dashboardService.getLeadDashboardData(data).subscribe((res: any) => {
            if (res.success) {
                // console.log(JSON.stringify(res));
                if (chartType === 'totalLead') {
                    this.totalLead = res.response.data;
                    this.totalLeadGrowth = res.response.Growth;
                    if (flag == 0) {
                        this.nextChartSub.next({success: true});
                    }
                } else if (chartType === 'convToCustomer') {
                    this.totalLeadToCustomer = res.response.data;
                    this.totalLeadToCustomerGrowth = res.response.Growth;
                } else if (chartType === 'convToOpportunity') {
                    this.totalConvertedOpportunity = res.response.data;
                    this.totalConvertedOpportunityGrowth = res.response.Growth;
                } else if (chartType === 'newConnection') {
                    this.totalNewConnected = res.response.data;
                    this.totalNewConnectedGrowth = res.response.Growth;
                } else if (chartType === 'leadPipelineByStage') {
                    this.leadPipelineByStageData = res.response.data;
                } else if (chartType === 'convToOpportunityBifurcation') {
                    this.convToOpportunityBifurcationData = res.response.data;
                } else if (chartType === 'growthForecast') {
                    this.growthForecastData = res.response.data;
                } else if (chartType === 'leadCollected') {
                    this.leadCollectedData = res.response.data;
                    this.leadCollectedTotal = res.response.Total;
                }
            } else {
            }
        })
    }

    getAllLead(): any {
        this.common.spinnerShow();
        let param = {
            'limit': this.limit,
            'offset': this.offset.toString(),
            'contactName': this.contactName,
            'orgName': this.orgName,
            'title': this.title,
            'phone': this.phone,
            'email': this.email,
            'leadStatus': this.leadStatus,
            'owner': this.owner
        };
        this.leadRest.getAllLeadList(param).subscribe((res: any) => {
            this.common.spinnerHide();
            if ((res.success) && (res.status == 200)) {
                this.allLeadArray = [];
                if (res.response.data.length == 0) {
                    this.offset = this.offset > 0 ? this.offset - this.limit : this.offset;
                    this.isdisable = true;
                } else {
                    this.allLeadArray = res.response.data;
                    this.isdisable = res.response.data.length < this.limit ? true : false;
                }

            }
        });
    }

    previous() {
        this.isdisable = false;
        this.offset = this.offset > 0 ? this.offset - this.limit : 0;
        this.offset = this.offset < 0 ? 0 : this.offset;
        this.getAllLead();
        if (this.offset <= 0) {
            this.isPrevious = true;
        }
    }

    next() {
        this.isPrevious = false;
        this.offset = this.offset + this.limit;
        this.getAllLead();
    }

    changepagelimit(e: any) {
        this.limit = Number(e.target.value);
        this.getAllLead();
    }

    searchByText(event: any) {
        if (event.target.value.length >= 3) {
            this.getAllLead();
        }
        if (event.target.value.length == 0) {
            this.getAllLead();
        }
    }

}
