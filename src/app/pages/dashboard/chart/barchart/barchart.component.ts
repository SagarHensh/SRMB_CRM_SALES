import {Component, OnInit, OnChanges, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {CommonService} from '../../../../service/common.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChartConfiguration} from "chart.js";
import {DashboardService} from "../../../../service/dashboard.service";

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, OnChanges, OnDestroy {

    @Input() dataset: any = [];
    @Input() title = '';
    @Input() subtitle = '';
    @Input() totalAmount = 0;
    @Input() indexAxis = 'x';
    @Input() chartLabel = '';
    @Input() graphId = '';
    @Input() extraKey = '';
    @Input() extraString = '';
    @Input() directString = '';
    @Input() exportType = '';
    @Input() backgroundColor = '';
    @Input() borderColor = '';
    @Input() isExport = false;
    @Input() isChartFilter = true;
    @Output() onExport:EventEmitter<any>= new EventEmitter();
    @Output() dayViewChanged:EventEmitter<any>= new EventEmitter();
    selectFlag = 0;
    loaderSup: any;
    isLoader = true;
    barChartPlugins: any = [];
    barChartData: any = [];
    barChartLegend = true;
    barChartLabels: any = [];

    barChartOptionsY: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        indexAxis: 'y',
        maintainAspectRatio: false,
        elements: {
            bar: {
                borderWidth: 0,
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                display: false
            },
            title: {
                display: false,
            }
        }
    };
    barChartOptionsX: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        indexAxis: 'x',
        maintainAspectRatio: false,
        elements: {
            bar: {
                borderWidth: 0,
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                display: false
            },
            title: {
                display: false,
            }
        }
    };

    barChartOptions3: ChartConfiguration<'bar'>['options'];

    barChartColors = [
        {
            backgroundColor: 'red',
            borderColor: 'red'
        }
    ];
    selectedFilter = '';
    filterList: any = this.dashboardService.filterList;
    constructor(private common: CommonService, private modalService: NgbModal, private dashboardService: DashboardService) { }
    ngOnInit(): void {
        if (this.indexAxis === 'Y') {
            this.barChartOptions3 = this.barChartOptionsY;
        } else {
            this.barChartOptions3 = this.barChartOptionsX;
        }
        const color = this.getRandomColor();
        this.barChartColors = [
            {
                backgroundColor: color,
                borderColor: color
            }
        ];
        this.subscribeLoader();
    }
    ngOnDestroy(): void {
        if (this.loaderSup) {
            this.loaderSup.unsubscribe();
        }
    }
    onCallTypeChange(callType: string): void {
        this.dayViewChanged.emit(callType);
    }
    openModal(fullScreen: any): void {
        this.modalService.open(fullScreen, {size: 'lg', centered: true})
    }

    closeModal() {
        this.modalService.dismissAll();
    }
    filterChanged(flag: number, filter: string): any {
        this.selectFlag = flag;
        this.selectedFilter = filter;
        this.dayViewChanged.emit(filter)
    }
    subscribeLoader(): void {
        this.loaderSup = this.common.chartLoaderSub.asObservable().subscribe((res: any) => {
            if(res.status === true && res.id === this.graphId) {
                this.isLoader = true;
            } else if (res.status === false && res.id === this.graphId) {
                this.isLoader = false;
            }
        });
    }
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    getVal(label: string) {
        for (const obj of this.dataset) {
            if (obj.label === label) {
                return obj[this.extraKey]
            }
        }
    }
    setChartData(): void {
        const data = [];
        const labels = [];
        const dataset = [];
        this.barChartData = [];
        for (const obj of this.dataset) {
            data.push(obj.value);
            labels.push(obj.label.split(' '));
        }
        dataset.push({
            label: this.chartLabel,
            data: data,
            borderWidth: 1,
            fill: true,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor
        });
        this.barChartLabels = labels;
        this.barChartData = {
            labels: labels,
            datasets: dataset
        }
    }
    ngOnChanges(changes: any) {
        this.setChartData();
    }
    exportData(): any {
        this.onExport.emit({type: this.exportType, calType: this.selectedFilter});
    }
}
