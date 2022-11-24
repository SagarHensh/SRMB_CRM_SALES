import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-management',
  templateUrl: './expense-management.component.html',
  styleUrls: ['./expense-management.component.css']
})
export class ExpenseManagementComponent implements OnInit {

  expenseApprovalFlag: boolean = false;
  expenseReportFlag: boolean = false;
  expenseFlag:boolean = true;
  addExpenseFlag:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  expense(){
    this.addExpenseFlag = false;
    this.expenseApprovalFlag = false;
    this.expenseReportFlag = false;
    this.expenseFlag = true;
  }
  expenseApproval() {
    this.addExpenseFlag = false;
    this.expenseFlag = false;
    this.expenseApprovalFlag = true;
  }

  expenseReport(){
    this.addExpenseFlag = false;
    this.expenseApprovalFlag = false;
    this.expenseReportFlag = true;
  }

  addExpense(){
    this.expenseFlag = false;
    this.expenseApprovalFlag = false;
    this.expenseReportFlag = false;
    this.addExpenseFlag = true;
  }
}

