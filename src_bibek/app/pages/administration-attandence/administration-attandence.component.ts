import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-administration-attandence',
  templateUrl: './administration-attandence.component.html',
  styleUrls: ['./administration-attandence.component.css']
})
export class AdministrationAttandenceComponent implements OnInit {

  attendanceFlag: boolean = true;
  holidayFlag: boolean = false;

    barChartLevels:any = ['Jan','Feb','Mar','Apr','May'];
    barChartOption ={
      responsive: true,
      animation: {
      animateScale: true,
      animateRotate: true
      },
      legend: {
      display: false,
      }};
    barChartType = 'bar';
    barChartLegend:boolean = true;
    barChartData:any = [{
      label: '# of Votes',
      data: [10, 19, 3, 5, 2, 3],
      borderWidth: 1,
      fill: true
  }];
  
  @ViewChild('addHoliday') addHoliDayModal: any;


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addHoliDayFunc(): any {
    this.modalService.open(this.addHoliDayModal, { centered: true });
    setTimeout(() => {
      const elem = document.getElementsByClassName('modal');
      if (elem) {
        elem[0].classList.add('addContactModal')
      }
    }, 200);
  }

  modalClose(): void {
    this.modalService.dismissAll();
  }

  attendance() {
    this.holidayFlag = false;
    this.attendanceFlag = true;
  }
  holiday() {
    this.attendanceFlag = false;
    this.holidayFlag = true;
  }
}
