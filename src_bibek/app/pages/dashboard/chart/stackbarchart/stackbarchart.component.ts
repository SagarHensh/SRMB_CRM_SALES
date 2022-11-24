import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {CommonService} from "../../../../service/common.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DashboardService} from "../../../../service/dashboard.service";

@Component({
    selector: 'app-stackbarchart',
    templateUrl: './stackbarchart.component.html',
    styleUrls: ['./stackbarchart.component.css']
})
export class StackbarchartComponent implements OnInit {

    @Input() dataset: any = [];
    @Input() valueLabels: any = [];
    @Input() title = '';
    @Input() isLegendShow = false;
    @Input() subtitle = '';
    @Input() totalAmount = 0;
    @Input() indexAxis = 'x';
    @Input() graphId = '';
    @Input() extraKey = '';
    @Input() extraString = '';
    @Input() directString = '';
    @Input() exportType = '';
    @Input() isExport = false;
    @Input() isChartFilter = true;
    @Output() onExport: EventEmitter<any> = new EventEmitter();
    @Output() dayViewChanged: EventEmitter<any> = new EventEmitter();
    selectFlag = 0;
    loaderSup: any;
    isLoader = true;
    barChartPlugins: any = [];
    barChartData: any = [];
    barChartLegend = true;
    barChartLabels: any = [];

    chartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        indexAxis: 'y',
        maintainAspectRatio: false,
        animations: {
            tension: {
                duration: 4000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        scales: {
            y: {
                // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
                suggestedMin: 30,

                // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
                suggestedMax: 50,
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    /*labelColor: function(context) {
                      return {
                        borderColor: 'rgb(0, 0, 255)',
                        backgroundColor: 'rgb(255, 0, 0)',
                        borderWidth: 2,
                        borderDash: [2, 2],
                        borderRadius: 2,
                      };
                    },
                    labelTextColor: function(context) {
                      return '#543453';
                    }*/
                    // label: (tooltipItem) => {
                    //     console.log(tooltipItem);
                    //     // console.log(tooltipItem.dataIndex);
                    //     return 'dd'
                    // }
                }
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
        const color = this.getRandomColor();
        this.barChartColors = [
            {
                backgroundColor: color,
                borderColor: color
            }
        ];
        this.subscribeLoader();
        /*setTimeout(() => {
          this.barChartData = {
            labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
            datasets: [
              { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A'},
              { data: [ 30, 29, 60, 71, 36, 25, 80 ], label: 'Series B'}
            ]
          };
        }, 2000)*/
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
            labels.push(obj.label);
            for (const l of this.valueLabels) {
                l.data.push(obj[l.name])
            }
        }
        for (const l of this.valueLabels) {
            dataset.push({
                label: l.label,
                data: l.data,
                borderWidth: 2,
                fill: false
            });
        }
        this.barChartLabels = labels;
        this.barChartData = {
            labels: labels,
            datasets: dataset
        }
    }

    ngOnChanges(changes: any) {
        if (changes.dataset) {
            this.dataset = [];
            this.dataset = JSON.parse(JSON.stringify(changes.dataset.currentValue));
            for (const l of this.valueLabels) {
                l.data = [];
            }
        }
        this.setChartData();
    }

    exportData(): any {
        this.onExport.emit({type: this.exportType, calType: this.selectedFilter});
    }

}
