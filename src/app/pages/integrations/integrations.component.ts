import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {

  thirdPartyFlag:boolean = true;
  webhooksFlag:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  thirdParty(){
    this.webhooksFlag = false
    this.thirdPartyFlag = true;

  }

  webHooks(){
    this.thirdPartyFlag = false;
    this.webhooksFlag = true;
  }

}
