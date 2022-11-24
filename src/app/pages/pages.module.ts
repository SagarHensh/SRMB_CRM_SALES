import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatInputModule} from '@angular/material/input';
import { NgxSpinnerModule } from "ngx-spinner";
import { ContactsDetailsComponent } from './contacts-details/contacts-details.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsDetailsComponent } from './organizations-details/organizations-details.component';
import { OrganizationsModalComponent } from './organizations-modal/organizations-modal.component';
// SAGAR
import { LeadlistComponent } from './leadlist/leadlist.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { LeadModalComponent } from './lead-modal/lead-modal.component';
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { OpportunityModalComponent } from './opportunity-modal/opportunity-modal.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AdministrationUserComponent } from './administration-user/administration-user.component';
import { HierarchySetupComponent } from './hierarchy-setup/hierarchy-setup.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AdministrationAttandenceComponent } from './administration-attandence/administration-attandence.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModuleComponent } from './module/module.component';
import { WorkFlowRulesComponent } from './work-flow-rules/work-flow-rules.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { WorkFlowRulesCreateComponent } from './work-flow-rules-create/work-flow-rules-create.component';
import { WorkFlowRulesDetailsComponent } from './work-flow-rules-details/work-flow-rules-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ApproveContactComponent } from './approve-contact/approve-contact.component';
import { ApproveOrganizationComponent } from './approve-organization/approve-organization.component';
import { ApproveLeadComponent } from './approve-lead/approve-lead.component';
import { ApproveOpportunityComponent } from './approve-opportunity/approve-opportunity.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { RegistrationDetailsComponent } from './registration-details/registration-details.component';
import { RegistrationModalComponent } from './registration-modal/registration-modal.component';
import { ApproveCustomerComponent } from './approve-customer/approve-customer.component';
import { EnqueryComponent } from './enquery/enquery.component';
import { CalenderViewComponent } from './calender-view/calender-view.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


/*
* Santanu Dhabal
* 26.07.2022 */

import {HeaderDashboardComponent} from './dashboard/header-dashboard/header-dashboard.component';
import {MainDashboardComponent} from './dashboard/main-dashboard/main-dashboard.component';
import {LeadDashboardComponent} from './dashboard/lead-dashboard/lead-dashboard.component';
import {BarchartComponent} from './dashboard/chart/barchart/barchart.component';


import {NgChartsModule} from 'ng2-charts';
import { PiechartComponent } from './dashboard/chart/piechart/piechart.component';
import { DoughnutchartComponent } from './dashboard/chart/doughnutchart/doughnutchart.component';
import { LinechartComponent } from './dashboard/chart/linechart/linechart.component';
import { StackbarchartComponent } from './dashboard/chart/stackbarchart/stackbarchart.component';
//-----------End--------------//
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { FieldVisitsListComponent } from './field-visits-list/field-visits-list.component';
import { FeildVisitDetailsComponent } from './feild-visit-details/feild-visit-details.component';






const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    PagesComponent,
    TasklistComponent,
    TaskDetailsComponent,
    TaskModalComponent,
    ContactsDetailsComponent,
    ContactsListComponent,
    ContactsModalComponent,
    OrganizationsListComponent,
    OrganizationsDetailsComponent,
    OrganizationsModalComponent,
    LeadlistComponent,
    LeadDetailsComponent,
    LeadModalComponent,
    OpportunityListComponent,
    OpportunityDetailsComponent,
    OpportunityModalComponent,
    AdministrationUserComponent,
    HierarchySetupComponent,
    AdministrationAttandenceComponent,
    ExpenseManagementComponent,
    NotificationsComponent,
    ModuleComponent,
    WorkFlowRulesComponent,
    IntegrationsComponent,
    WorkFlowRulesCreateComponent,
    WorkFlowRulesDetailsComponent,
    UserDetailsComponent,
    UserCreateComponent,
    CalendarComponent,
    ApproveContactComponent,
    ApproveOrganizationComponent,
    ApproveLeadComponent,
    ApproveOpportunityComponent,
    RegistrationListComponent,
    RegistrationDetailsComponent,
    RegistrationModalComponent,
    ApproveCustomerComponent,
    EnqueryComponent,
    CalenderViewComponent,
    HeaderDashboardComponent,
    MainDashboardComponent,
    LeadDashboardComponent,
    BarchartComponent,
    PiechartComponent,
    DoughnutchartComponent,
    LinechartComponent,
    StackbarchartComponent,
    FieldVisitsListComponent,
    FeildVisitDetailsComponent,


    
  ],
  imports: [
    CommonModule,
    NgbModule,
    PagesRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatInputModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatSliderModule,
    MatTabsModule,
    NgChartsModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    AutocompleteLibModule

  ]
})
export class PagesModule { }
