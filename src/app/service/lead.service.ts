import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  API_ROOT = this.configService.API_ROOT;
  SFA_API_ROOT = this.configService.SFA_API_ROOT;
  newOrExisting: boolean = false;
  constructor(private http: HttpClient, private configService: ConfigService) { }

  getExistingContact(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/allExitingUser', data, httpOptions);
  }
  getExistingContactDetails(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/ExitingUserDetails', data, httpOptions);
  }

  // getContentType(data: any): any {
  //   return this.http.get(this.API_ROOT + 'v1/leadsManagement/getContactTypes', data);
  // }


  getContentType(data: any): any {
    return this.http.post(this.API_ROOT + 'v2/leadsManagement/getContactTypes', data, httpOptions);
  }

  // leadSource(data: any): any {
  //   return this.http.post(this.API_ROOT + 'v1/leadSource/getAllData', data, httpOptions);
  // }

  // getAllUser(data: any): any {
  //   return this.http.get(this.API_ROOT + 'v1/leadsManagement/getAllUser', data);
  // }


  getAllUser(data: any): any {
    return this.http.post(this.API_ROOT + 'v2/leadsManagement/getAllUser', data, httpOptions);
  }

  getAllCountry(data: any): any {
    return this.http.get(this.API_ROOT + 'v1/country/getCountry', data);
  }
  getAllState(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/state/getState', data, httpOptions);
  }
  getAllCity(data: any): any {
    return this.http.post(this.API_ROOT + '/v1/city/getCity', data, httpOptions);
  }
  getAllZone(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/getZone', data, httpOptions);
  }
  /*
   * Organization START FROM HERE
   */
  getAllOrganization(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/allExitingOrganization', data, httpOptions);
  }
  getAllOrganizationDetails(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/ExitingOrganizationDetails', data, httpOptions);
  }
  /**
   * CURRENT & Competitor
   * 
   */
  getAllProduct(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mstProduct/getAllData', data, httpOptions);
  }
  /**
   * FILE UPLOAD
   */
  fileUpload(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/imageupload', data);
  }
  getSocialPlatform(data: any): any {
    return this.http.get(this.API_ROOT + 'v1/mstPlatform/getAllData', data);
  }
  /**
   * Add LEAD
   */
  addLead(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addLeads', data, httpOptions);
  }
  /**
   * GET ALL LEAD LIST
   */
  getAllLeadList(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetallLeads', data, httpOptions);
  }
  /**
   * GET LEAD DETAILS
   */
  getLeadDetails(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetLeadDetails', data, httpOptions);
  }
  /**
   * UPDATE LEAD
   */
  updateLead(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/UpdateLeadDetails', data, httpOptions);
  }


  //-------------------Lead Status Change------------------------//
  leadStatusChange(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/updateLeadTypeStatus', data, httpOptions);
  }
  /**
   * Add Lead Activity
   */
  addLeadActivity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addleadActivityLog', data, httpOptions);
  }
  /**
   * Get ALL ACTIVITES
   */
  getAllActivites(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetActivityLog', data, httpOptions);
  }

  //----------------------Lead Pop up Add----------------------------//

  contactedToAttempted(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addLeadStage_Step1', data, httpOptions);
  }

  attemptedToContacted(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addLeadStage_Step2', data, httpOptions);
  }

  contactedToConvert(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addLeadStage_Step3', data, httpOptions);
  }

  //--------------------------- Lead Pop Up Mark As Completed----------------------//

  leadMarkAsComplete(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addleadStageChange', data, httpOptions);
  }

  getStageDetails(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/getLeadStageDetails', data, httpOptions);
  }

  leadStageUpdate(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/updateLeadStageChange', data, httpOptions);
  }

  //----------------------Lead Pop up Fetch----------------------------//


  getLeadNotContactedByLeadId(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetAllStage_Step1', data, httpOptions);
  }

  getLeadAttemptedByLeadId(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetAllStage_Step2', data, httpOptions);
  }

  getLeadContactedByLeadId(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetAllStage_Step3', data, httpOptions);
  }




  /**
   * Update Lead Stage
   */
  updateLeadStage(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/addLeadStage', data, httpOptions);
  }
  /**
   * GET ALL LEAD STAGE
   */
  getAllStage(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetAllStage', data, httpOptions);
  }

  getAllLeadStatus(data: any) {
    return this.http.post(this.API_ROOT + 'v1/mstSalesStage/getSalesStage', data, httpOptions);
  }
  /**
   * Update Activity LOG
   */
  updateActivityLog(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/UpdateActivityLogStatus', data, httpOptions);
  }
  /**
   * Cancel Activity LOG
   */
  cancelLeadActivity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/CancelActivityLog', data, httpOptions);
  }
  /**
   * GET CONTACT BY ORGANIZATION
   */
  getContactByOrgId(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetContactDetails', data, httpOptions);
  }
  /**
   * GET LEAD STAGE
   */
  getAllOpportunityStage(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mstSalesStage/getSalesStage', data, httpOptions);
  }
  /**
   * ADD OPPORTUNITY
   */
  addOpportunity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunity', data, httpOptions);
  }
  /**
   * GET ALL OPPORTUNITY
   */
  getAllOpportunity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/Getallopportunity', data, httpOptions);
  }
  /**
   * GET OPPORTUNITY BY ID
   */
  getOpportunityDataById(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetopportunityDetails', data, httpOptions);
  }
  /**
   * Update OPPORTUNITY
   */
  updateOpportunity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/UpdateOpportunity', data, httpOptions);
  }
  /**
   * DELETE OPPORTUNITY
   */
  deleteOpportunity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/deleteOpportunity', data, httpOptions);
  }
  /**
   * update Opportunirt Stage
   */
  updateOpportunityStage(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunitystage', data, httpOptions);
  }
  /**
   * Complete Opportunity stageDetails
   */
  getUpdateStagedetails(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetAllStage', data, httpOptions);
  }
  /**
   * Add ACtivity
   */
  addActivity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunityActivityLog', data, httpOptions);
  }
  /**
   * GET ALL ACTIVITY LOG
   */
  getAllActivityLog(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetActivityLog', data, httpOptions);
  }
  /**
   * Cancel Activity
   */
  cancelActivity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/CancelActivityLog', data, httpOptions);
  }
  /**
   * Complete Activity
   */
  conpleteActivity(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/UpdateActivityLogStatus', data, httpOptions);
  }

  // getLeadSourceType(data: any): any {
  //   return this.http.get(this.API_ROOT + 'v1/leadsManagement/getLeadSourceTypes', data);
  // }

  getLeadSourceType(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/getLeadSources', data, httpOptions);
  }

  getLeadSource(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/getLeadSourc', data, httpOptions);
  }
  deleteLead(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/deleteLead', data, httpOptions);
  }
  getActivityListMaster(): any {
    return this.http.get(this.API_ROOT + 'v1/mstActivity/getAllData');
  }

  //-----------------Opportunity Modal Api------------------------//

  submitprocessingToNeed(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunitystage_step1', data, httpOptions);
  }
  submitneedToDecision(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunitystage_step2', data, httpOptions);
  }
  submitdecisionToProposal(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunitystage_step3', data, httpOptions);
  }
  submitproposalToNegotation(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunitystage_step4', data, httpOptions);
  }
  submitNegotiationToClose(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addopportunitystage_step5', data, httpOptions);
  }
  uploadFile(data: any) {
    return this.http.post(this.API_ROOT + 'v1/imageupload', data);
  }

  //--------------------Reason List------------------------//

  getAllReason() {
    return this.http.get(this.API_ROOT + 'v1/mstReason/getAllData');
  }


  //--------------------------- Pop Up value-----------------------------//

  getProcessingValue(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetAllStage_Step1', data, httpOptions);
  }
  getNeedAnalysisValue(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetAllStage_Step2', data, httpOptions);
  }
  getDecisionMakerValue(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetAllStage_Step3', data, httpOptions);
  }
  getProposalValue(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetAllStage_Step4', data, httpOptions);
  }
  getNegotiationValue(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/GetAllStage_Step5', data, httpOptions);
  }

  //-----------Opportunity Status Change------------------//

  getNature(data: any) {
    return this.http.post(this.API_ROOT + 'v1/mstNature/list', data, httpOptions);
  }

  oppStatusChange(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/updateOpportunityTypeStatus', data, httpOptions);
  }

  //-----------------Opportunity Mark as Complete ------------------------//

  oppStageComplete(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/addOpportunityStageChange', data, httpOptions);
  }
  oppStageChange(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/updateOpportunityStageChange', data, httpOptions);
  }

  oppStageDetails(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/getOpportunityStageDetails', data, httpOptions);
  }
  //-----------Approve Contact-----------------//
  getLeadListAll(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/GetallLeads_All', data, httpOptions);
  }
  giveApprove(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/approvedLead', data, httpOptions);
  }

  //-----------Approve Opportunity-----------------//
  getOpportunityAll(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/Getallopportunity_All', data, httpOptions);
  }
  giveOpportunityApprove(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/approvedOpprotunity', data, httpOptions);
  }

  //---------------- For Lead Bulk Insert-------------//

  uploadFileForBulk(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/uploadLeadExcel', data);
  }

  bulkLeadInsert(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/leadExcelRead', data);
  }

  downloadFile(data: any) {
    return this.http.post(this.API_ROOT + 'v1/leadsManagement/download', data);
  }

  downloadFileOpp(data: any) {
    return this.http.post(this.API_ROOT + 'v1/opportunityManagement/download', data);
  }
  /**
   * GET ALL Field Visits
   */
  getAllFieldVisitsList(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/crmFieldVisitManagement/getAllFieldVisitList', data, httpOptions);
  }


  /**
   * GET ALL Field Visit Status
   */
  getAllFieldVisitStatus(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/mstVisitStatus/list', data, httpOptions);
  }
  /**
   *Update Approval Status
   */
  updateFieldVisitApprovalStatus(data: any): any {
    return this.http.post(this.API_ROOT + 'v1/crmFieldVisitManagement/approveStatusChange', data, httpOptions);
  }

  getFieldVisitDetailsById(data:any){
    return this.http.post(this.API_ROOT + '/v1/crmFieldVisitManagement/getFieldVisitDetailsById',data,httpOptions);
  }

    getVisitType(data: any): any {
      return this.http.post(this.SFA_API_ROOT + '/v1/getVisitorListType', data, httpOptions);
    }
}
