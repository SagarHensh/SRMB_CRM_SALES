import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalenderDataModule } from 'src/app/calender-data/calender-data.module';

@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.css']
})
export class CalenderViewComponent implements OnInit {

  currDay: any = "";
  dayOrdinal: any = "";
  currDate: any = "";
  currMonth: any = "";
  currYear: any = "";
  calData: any;
  monthView: any;
  monthBox: any = [];
  weekData: any = [];
  eventData: any = [
    {
      "date": "2022-08-06",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Task",
        "time": "2:00 PM",
        "class": "green-button",
        "count": 3,
      },
    },
    {
      "date": "2022-08-06",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Event",
        "time": "2:00 PM",
        "class": "orange-button",
        "count": 5,
      },
    },
    {
      "date": "2022-08-10",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Task",
        "time": "2:00 PM",
        "class": "green-button",
        "count": 5,
      },
    },
    {
      "date": "2022-08-12",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Task",
        "time": "2:00 PM",
        "class": "green-button",
        "count": 3,
      },
    },
    {
      "date": "2022-08-12",
      "time": "12:00 PM",
      "data": {
        "id": 2,
        "status": 2,
        "name": "Followup",
        "time": "2:00 PM",
        "class": "pink-button",
        "count": 6,
      },
    },
    {
      "date": "2022-08-12",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Meeting",
        "time": "2:00 PM",
        "class": "gray-button",
        "count": 2,
      },
    },
    {
      "date": "2022-08-12",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Event",
        "time": "2:00 PM",
        "class": "orange-button",
        "count": 1,
      },
    },
    {
      "date": "2022-08-13",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Followup",
        "time": "2:00 PM",
        "class": "pink-button",
        "count": 4,
      },
    },
    {
      "date": "2022-08-13",
      "time": "12:00 PM",
      "data": {
        "id": 1,
        "status": 2,
        "name": "Task",
        "time": "2:00 PM",
        "class": "green-button",
        "count": 2,
      },
    }
  ]
  dateInfo: any = [];
  selectedDate: any = "";
  selectedDateString: any = "";
  viewDateObj: any;
  @ViewChild('subordinateListModal') subordinateListModal: any;

  scheduleListModalData: any;

  constructor(private modalService: NgbModal) {
    this.calData = new CalenderDataModule();
  }

  ngOnInit(): void {
    this.getAllMonthDetails();
  }

  getAllMonthDetails() {
    console.log("module::", this.calData.getMonthView());
    this.calData.setEventsDetails(this.eventData);
    this.monthView = this.calData.getMonthView();
    this.monthBox = this.monthView.view;
    console.log("monthBox", this.monthBox);
    this.weekData = ['SUN', 'MON', 'TUES', 'WEDNES', 'THURS', 'FRI', 'SATUR'];
    this.currDate = this.calData.getCurDate();
    this.currMonth = this.monthView.currentMonth;
    this.currYear = this.monthView.CurrentYear;
    this.getDateInfo(this.currDate);
    console.log("Current Date ::", this.currDate)
  }

  getDateInfo(value: any) {
    let aa: any = value.split("-");
    console.log("Date info::", aa);
    this.dateInfo = aa;
    this.selectedDate = value;
    let ds = this.getOrdinalNum(aa[2]);
    let obj = {
      day: aa[2],
      ordinal: ds,
      monthString: this.monthView.currentMonth,
      year: this.monthView.CurrentYear
    }
    console.log("Obj::", this.monthView.currentMonth)
    this.viewDateObj = obj;
    // this.selectedDateString = ds + " " + this.monthView.months[parseInt(aa[1]) - 1] + " " + aa[0];
    // console.log("Selected Date String::", this.selectedDateString);
    // let data = {
    //   selectedDate: this.selectedDate,
    //   selectedDateString: this.selectedDateString
    // }
    // this.selectedDateEvent.emit(data);
  }

  isArray(obj: any) {
    return Array.isArray(obj)
  }
  getOrdinalNum(n: any) {
    return (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
  }

  nextMonth() {
    this.calData.changeNextMonth();
    this.getAllMonthDetails();
  }

  prevMonth() {
    this.calData.changePrevMonth();
    this.getAllMonthDetails();
  }
  openSubOrdinateModal(data: any, dateInfo:any) {
    let obj = {
      header: data.name,
      date : this.selectedDateFormTable(dateInfo),
      list: [
        {
          id: 1,
          name: "Credit Followup",
          description: "Require Credit Limit 1000000"
        },
        {
          id: 2,
          name: "Followup for Lead",
          description: "New customer meet"
        }
      ]
    }
    this.scheduleListModalData = obj;
    this.modalService.open(this.subordinateListModal, { size: 'lg', centered: true, animation: true })
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  selectedDateFormTable(data: any) {
    console.log("Calender seleceted Data::", data);
    let month: any = data.month > 9 ? data.month : "0" + data.month;
    let value: any = data.year + "-" + month + "-" + data.day;
    return value;
  }

}
