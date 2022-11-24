import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendarEvent') calendarEvent:any;

  constructor(private modalService:NgbModal) {
   }

  ngOnInit(): void {
  }
  addEvent(){
    this.modalService.open(this.calendarEvent,{centered:true,size:'sm'});
  }
  closeModal(){
    this.modalService.dismissAll();
  }




}
