import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {CommonService} from "../../../../service/common.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DashboardService} from "../../../../service/dashboard.service";

@Component({
    selector: 'app-piechart',
    templateUrl: './piechart.component.html',
    styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit, OnChanges {

    @Input() dataset: any = [];
    @Input() title = '';
    @Input() totalAmount = 0;
    @Input() subtitle = '';
    @Input() graphId = '';
    @Input() extraKey = '';
    @Input() extraString = '';
    @Input() directString = '';
    @Input() exportType = '';
    @Input() isExport = false;
    @Input() onChartFilter = true;
    @Input() isLegendShow = false;
    @Output() onExport: EventEmitter<any> = new EventEmitter();
    @Output() dayViewChanged: EventEmitter<any> = new EventEmitter();
    selectFlag = 0;
    loaderSup: any;
    isLoader = true;
    barChartPlugins: any = [];
    barChartData: any = [];
    barChartLegend = true;
    barChartLabels: any = [];

    barChartOptions: ChartConfiguration<'pie'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        }

    };

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
        if (this.isLegendShow) {
            // @ts-ignore
            this.barChartOptions.plugins = {
                legend: {
                    display: true
                }
            };
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
            if (res.status === true && res.id === this.graphId) {
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
            labels.push(obj.label);
        }
        dataset.push({
            label: 'Value',
            data: data,
            borderWidth: 1,
            fill: true,
            backgroundColor: [
                'rgb(63, 81, 181)',
                'rgb(249,83,66)',
                'rgb(98, 185, 102)'
            ]
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
