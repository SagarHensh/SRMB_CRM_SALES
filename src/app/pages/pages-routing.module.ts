import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RegistrationModalComponent } from './registration-modal/registration-modal.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { RegistrationDetailsComponent } from './registration-details/registration-details.component';
import { ApproveCustomerComponent } from './approve-customer/approve-customer.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ContactsDetailsComponent } from './contacts-details/contacts-details.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ApproveContactComponent } from './approve-contact/approve-contact.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { ApproveOrganizationComponent } from './approve-organization/approve-organization.component';
import { OrganizationsDetailsComponent } from './organizations-details/organizations-details.component';
import { AdministrationUserComponent } from './administration-user/administration-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HierarchySetupComponent } from './hierarchy-setup/hierarchy-setup.component';
import { AdministrationAttandenceComponent } from './administration-attandence/administration-attandence.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModuleComponent } from './module/module.component';
import { WorkFlowRulesComponent } from './work-flow-rules/work-flow-rules.component';
import { WorkFlowRulesCreateComponent } from './work-flow-rules-create/work-flow-rules-create.component';
import { WorkFlowRulesDetailsComponent } from './work-flow-rules-details/work-flow-rules-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { EnqueryComponent } from './enquery/enquery.component';
/*
 * @Auther Sagar
 * @reason : FOR LEAD
 */
import { LeadlistComponent } from './leadlist/leadlist.component';
import { ApproveLeadComponent } from './approve-lead/approve-lead.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
/*
 * @Auther Sagar
 * @reason : For Opportunity
 */
import { OpportunityListComponent } from './opportunity-list/opportunity-list.component';
import { ApproveOpportunityComponent } from './approve-opportunity/approve-opportunity.component';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';

//---------------Dashboard------------//

import { HeaderDashboardComponent } from './dashboard/header-dashboard/header-dashboard.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { LeadDashboardComponent } from './dashboard/lead-dashboard/lead-dashboard.component';
import { FieldVisitsListComponent } from './field-visits-list/field-visits-list.component';
import {FeildVisitDetailsComponent } from './feild-visit-details/feild-visit-details.component'

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'registration-list',
      component: RegistrationListComponent
    },
    {
      path: 'registration-details/:id',
      component: RegistrationDetailsComponent
    },
    {
      path: 'approve-customer',
      component: ApproveCustomerComponent
    },
    {
      path: 'tasklist',
      component: TasklistComponent
    }, {
      path: 'task-details/:id',
      component: TaskDetailsComponent
    },
    {
      path: 'contact-details/:id',
      component: ContactsDetailsComponent
    },
    {
      path: 'contact-list',
      component: ContactsListComponent
    },
    {
      path: 'approve-contact',
      component: ApproveContactComponent
    },
    {
      path: 'organizations-list',
      component: OrganizationsListComponent
    },
    {
      path: 'approve-organization',
      component: ApproveOrganizationComponent
    },
    {
      path: 'organizations-details/:id',
      component: OrganizationsDetailsComponent
    },
    /*
   * @Auther Sagar
   * @reason : FOR LEAD
   */
    {
      path: 'lead-list',
      component: LeadlistComponent
    },
    {
      path: 'lead-details/:id',
      component: LeadDetailsComponent
    },
    {
      path: 'approve-lead',
      component: ApproveLeadComponent
    },
   
    /**
     * Auther : Sagar
     * reason : FOR Opportunity
     */
    {
      path: 'opportunity-list',
      component: OpportunityListComponent
    },
    {
      path: 'approve-opportunity',
      component: ApproveOpportunityComponent
    },
    {
      path: 'opportunity-details/:id',
      component: OpportunityDetailsComponent
    },
    {
      path: 'enquery',
      component: EnqueryComponent
    },
    {
      path: 'administration-user',
      component: AdministrationUserComponent
    },
    {
      path: 'user-details/:id',
      component: UserDetailsComponent
    },
    {
      path: 'hierarchy-setup',
      component: HierarchySetupComponent
    },
    {
      path: 'administration-attandence',
      component: AdministrationAttandenceComponent
    },
    {
      path: 'expense-management',
      component: ExpenseManagementComponent
    },
    {
      path: 'notifications',
      component: NotificationsComponent
    },
    {
      path: 'module',
      component: ModuleComponent
    },
    {
      path: 'work-flow-rules',
      component: WorkFlowRulesComponent
    },
    {
      path: 'work-flow-rules-create',
      component: WorkFlowRulesCreateComponent
    },
    {
      path: 'work-flow-rules-details',
      component: WorkFlowRulesDetailsComponent
    },
    {
      path: 'calendar',
      component: CalendarComponent
    },
    {
      path: 'integrations',
      component: IntegrationsComponent
    },
    {
      path: 'dashboard',
      component: HeaderDashboardComponent,
      children: [{
        path: '',
        component: MainDashboardComponent
      }, {
        path: 'lead',
        component: LeadDashboardComponent
      }]
    },
    {
      path: 'field-visit-list',
      component: FieldVisitsListComponent
    },
    {
      path: 'feild-visit-details/:id',
      component: FeildVisitDetailsComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
