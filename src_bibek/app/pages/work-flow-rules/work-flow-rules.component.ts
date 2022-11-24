import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-flow-rules',
  templateUrl: './work-flow-rules.component.html',
  styleUrls: ['./work-flow-rules.component.css']
})
export class WorkFlowRulesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  createRule(){
    this.router.navigate(['/pages/work-flow-rules-create']);
  }
  ruleDetails(id:any){
    this.router.navigate(['/pages/work-flow-rules-details']);
  }

}
