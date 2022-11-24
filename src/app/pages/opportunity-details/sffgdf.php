<main class="content">
    <div class="container-fluid p-0">
        <div class="row mb-2 mb-lg-4">
            <div class="col-md-12 d-lg-flex align-items-center main-hdng">
                <div class="col-md-6">
                    <h3>Opportunity Details</h3>
                </div>
                <div class="col-md-6">
                    <div class="">
                        <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-end">
                                <li class="breadcrumb-item active"><a>Opportunity</a></li>
                                <li class="breadcrumb-item active" aria-current="page">{{opportunityName}}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-2 mb-lg-4">
            <div class="col-md-12 d-lg-flex align-items-center hdng-btm">
                <div class="col-md-6">
                    <a class="btn btn-primary btn-lg me-3" (click)="backToPreviousPage()">Back To List <i
                            class="fas fa-chevron-left"></i></a>
                </div>
                <div class="col-md-6 text-end mt-n1">
                    <ul class="list-inline ml-auto mt-3 mt-lg-0 mb-0">
                        <li class="list-inline-item">
                            <button class="btn btn-primary btn-lg" (click)="addApportunity()">Add New <i
                                    class="fas fa-plus"></i>
                            </button>
                        </li>
                        <!-- <li class="list-inline-item me-1 icon-border">
                            <a class="btn btn-outline-dark rounded-3 btn-xs" href="javascript:void(0)"
                               data-bs-toggle="tooltip" data-bs-placement="bottom" title="Print">
                                <img src="assets/images/printer.svg" alt="printer"></a>
                        </li> -->
                        <li class="list-inline-item me-1 icon-border">
                            <a class="btn btn-outline-dark rounded-3 btn-xs" (click)="editOpportunity()"
                               data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                <img src="assets/images/pen.svg" alt="pen"></a>
                        </li>
                        <!-- <li class="list-inline-item me-1 icon-border">
                            <a class="btn btn-outline-dark rounded-3 btn-xs" href="javascript:void(0)"
                               data-bs-target="#opportunityscheduleModal" data-bs-toggle="modal"
                               data-bs-dismiss="modal">
                                <img src="assets/images/calendar-days.svg" alt="calendar" data-bs-toggle="tooltip"
                                     data-bs-placement="bottom" title="Schedule"></a>
                        </li> -->
                        <!-- <li class="list-inline-item me-1 icon-border">
                            <a class="btn btn-outline-dark rounded-3 btn-xs" href="javascript:void(0)"
                               data-bs-toggle="tooltip" data-bs-placement="bottom" title="portrait">
                                <img src="assets/images/iphone-portrait.svg" alt="iphone"></a>
                        </li> -->
                        <!-- <li class="list-inline-item me-1 icon-border">
                            <a class="btn btn-outline-dark rounded-3 btn-xs" href="javascript:void(0)"
                               data-bs-toggle="tooltip" data-bs-placement="bottom" title="Email">
                                <img src="assets/images/mail.svg" alt="mail"></a>
                        </li> -->
                        <!-- <li class="list-inline-item icon-border me-0">
                            <a class="px-0 border-0 d-inline-block align-middle dropdown-toggle no-dropdown-arrow"
                               href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="assets/images/hdr-menu-vertical.svg" alt="menu-vertical"
                                     data-bs-toggle="tooltip" data-bs-placement="bottom" title="More"></a>
                            <div class="dropdown-menu dropdown-menu-end" style="">
                                <a class="dropdown-item" href="javascript:void(0)">Edit this Opportunity</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Change Opportunity image</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Delete</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Email this Opportunity</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Clone</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Follow this Opportunity</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Convert this Opportunity</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)">Add activity</a>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="bg-white shadow-lg py-3 px-3 rounded-top-lg profile-details">
                    <div class="row align-items-center">
                        <div class="col-md-7">
                            <div class="d-inline-block align-middle me-3">
                                <img src="assets/images/icon-park_target-one.png" alt="profile-img">
                            </div>
                            <div class="d-inline-block align-middle">
                                <h4>{{opportunityName}}</h4>
                                <span class="price">{{expectedRevenue}} INR</span>
                            </div>
                        </div>
                        <div class="col-md-3 d-md-flex">
                            <div class="d-inline-block align-middle">
                                <img src="assets/images/profile_iphone-portrait.svg" alt="iphone-portrait">
                            </div>
                            <div class="d-inline-block align-middle">
                                <h6 class="ph_txt">Phone number</h6>
                                <h6 class="ph_no">{{ORG_phone}}</h6>
                            </div>
                        </div>
                        <!-- <div class="col-md-2">
                            <div class="">
                                <div class="d-block">
                                    <h6 class="ph_txt text-end">Folllow</h6>
                                </div>
                                <div class="d-block">
                                    <img src="assets/images/heart.svg" alt="Folllow" class="ms-auto">
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="bg-white shadow-lg py-3 px-3 rounded-bottom-lg mb-4 profile-details border-top border-dark position-relative">
                    <div class="row align-items-center mt-3">
                        <div class="col-md-3">
                            <span class="related_badge">Related to</span>
                            <div class="row">
                                <div class="col-md-3 ">
                                    <img src="assets/images/organization-profile.png" alt="profile-img">
                                </div>
                                <div class="col-md-9">
                                    <h6 class="ph_txt">Organization name</h6>
                                    <h6 class="ph_no">{{ORG_name}}</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="d-md-flex align-items-center">
                                <div class="col-auto d-block mx-xl-5 mx-md-3">
                                    <div class="d-inline-block align-middle">
                                        <img src="assets/images/opportunity-profile1.png" alt="profile-img">
                                    </div>
                                    <div class="d-inline-block align-middle">
                                        <h6 class="ph_txt">Contact person</h6>
                                        <h6 class="ph_no">{{contactPersonName}}</h6>
                                    </div>
                                </div>
                                <div class="col-auto d-block mx-xl-5 mx-md-3">
                                    <div class="d-inline-block align-middle">
                                        <img src="assets/images/profile_calendar-day.svg" alt="profile_calendar">
                                    </div>
                                    <div class="d-inline-block align-middle">
                                        <h6 class="ph_txt">Expected Close Date</h6>
                                        <h6 class="ph_no">{{expectedCloseDate}}</h6>
                                    </div>
                                </div>
                                <div class="col-auto d-block mx-xl-5 mx-md-3">
                                    <div class="d-inline-block align-middle">
                                        <img src="assets/images/opportunity-profile2.png" alt="profile_calendar">
                                    </div>
                                    <div class="d-inline-block align-middle">
                                        <h6 class="ph_txt">Assigned to</h6>
                                        <h6 class="ph_no">{{assignToUser}}</h6>
                                    </div>
                                </div>
                                <div class="col-auto d-block mx-xl-4 mx-md-3">
                                    <div class="d-inline-block align-middle">
                                        <h6 class="ph_txt">Probability Of Winning</h6>
                                        <span class="text-success">{{winingValue}}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3 profile-navigation">
                    <div class="d-sm-flex align-items-center mb-3">
                        <div class="col-auto me-4">
                            <h4>Sales Stage: <span class="text-success">{{salesStageName}}</span></h4>
                        </div>
                        <div class="col-auto">
                            <!-- <a class="btn btn-secondary btn-xs me-1" href="javascript:void(0)" data-bs-target="#opportunityChangeModal" data-bs-toggle="modal" data-bs-dismiss="modal">Change</a> -->
                            <a class="btn btn-warning btn-xs" (click)="StageComplete()">Mark This Stage As Completed</a>
                        </div>
                    </div>
                    <div class="details-navigation customSetails-navigation">
                        <ul>
                            <li *ngFor="let data of salesStageArray; let i = index" id="oppStage_{{data.salesStageId}}">
                                <a href="javascript:void(0)"> {{data.salesStageName}}</a>
                            </li>
                            <!-- <li><a href="javascript:void(0)">Needs Analysis</a></li>
                            <li class="active"><a href="javascript:void(0)">Identify Decision Makers</a></li>
                            <li class="active"><a href="javascript:void(0)">Proposal</a></li>
                            <li class="active"><a href="javascript:void(0)">Negotiation</a></li>
                            <li class="active"><a href="javascript:void(0)"  data-bs-target="#opportunityPipelineModal" data-bs-toggle="modal" data-bs-dismiss="modal">Closed</a>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <div class="bg-white shadow-lg py-4 px-4 rounded-3 mb-3">
                    <div id="datatables-reponsive_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                        <div class="d-md-flex align-items-center mb-3">
                            <div class="col-auto d-block">
                                <h4>Stage History</h4>
                            </div>
                            <div class="col-auto d-block ms-auto">
                                <div class="text-center">
                                    <div class="dataTables_length" id="datatables-reponsive_length">
                                        <label>
                                            Records per page
                                            <select name="datatables-reponsive_length"
                                                    aria-controls="datatables-reponsive"
                                                    class="form-select form-select-sm">
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="30">20</option>
                                                <option value="30">30</option>
                                                <option value="50">50</option>
                                            </select>
                                            1 - 10
                                        </label>
                                        <label>
                                            <a class="px-1 d-inline-block align-middle" href="javascript:void(0)">
                                                <img src="assets/images/chevron-left.svg" alt="chevron-left"></a>
                                            <a class="px-1 d-inline-block align-middle" href="javascript:void(0)">
                                                <img src="assets/images/chevron-right.svg" alt="chevron-right"></a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-group btn-group-sm ms-auto  btn-download-group">
                                <button type="button" class="btn btn-md bg-white px-4">CSV</button>
                                <button type="button" class="btn bg-white px-4">PDF</button>
                                <button type="button" class="btn bg-white px-4">Excel</button>
                                <button type="button" class="btn bg-white px-4">Upload</button>
                                <button type="button" class="ps-2 dropdown-toggle no-dropdown-arrow"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="assets/images/filtering.svg" alt="filtering"></button>
                                <div class="dropdown-menu dropdown-menu-end addDropdownhead">
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Stage</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch1">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Amount</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch2">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Probability</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch3">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Expected Revenue</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch4">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Expected Closing Date</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch5">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Stage Duration</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch6">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Modified Time</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch7">
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item d-md-flex align-items-center" href="javascript:void(0)">
                                        <span class="col-auto d-block me-2">Modified By</span>
                                        <div class="form-check form-switch col-auto d-block ms-auto">
                                            <input class="form-check-input" type="checkbox" id="switch8">
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table id="datatables-column-search-select-inputs" class="table table-striped dataTable"
                                   style="width: 100%;" aria-describedby="datatables-column-search-select-inputs_info">
                                <thead class="thead-dark">
                                <tr role="row">
                                    <th class="sorting align-middle">Stage</th>
                                    <th class="sorting align-middle">Amount</th>
                                    <th class="sorting align-middle">Probability (%)</th>
                                    <th class="sorting align-middle">Expected Revenue</th>
                                    <th class="sorting align-middle">Expected Closing</th>
                                    <th class="sorting align-middle">Stage Duration</th>
                                    <th class="sorting align-middle">Modified Time</th>
                                    <th class="sorting align-middle">Modified By</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr *ngIf="getAllStageCompleteDetails.length == 0">
                                    <td colspan="8" style="text-align: center;">Non of stage complete till now</td>
                                </tr>
                                <tr role="row" *ngFor="let data of getAllStageCompleteDetails; let i = index"
                                    [ngClass]="i % 2 == 0 ? 'even' : 'odd'">
                                    <td class="align-middle">{{data.salesStageName}}</td>
                                    <td class="align-middle">{{data.Amount}}</td>
                                    <td class="align-middle">{{data.Probability}}</td>
                                    <td class="align-middle">{{data.ExpectedRevenue}}</td>
                                    <td class="align-middle">{{data.ExpectedClosing}}</td>
                                    <td class="align-middle">{{data.StageDuration}} Month</td>
                                    <td class="align-middle">{{data.modifiedAt}}</td>
                                    <td class="align-middle">{{data.firstName}} {{data.lastName}}</td>
                                </tr>
                                <!-- <tr role="row" class="even">
                                <td class="align-middle">Processing</td>
                                <td class="align-middle">45,000.00</td>
                                <td class="align-middle">20</td>
                                <td class="align-middle">90,000,00</td>
                                <td class="align-middle">15.04.2022</td>
                                <td class="align-middle">1 Month</td>
                                <td class="align-middle">22.04.2022 03:26 PM</td>
                                <td class="align-middle">Bikram Lohar</td>
                                </tr>
                                <tr role="row" class="odd">
                                <td class="align-middle">Need Analysis</td>
                                <td class="align-middle">80,000.00</td>
                                <td class="align-middle">40</td>
                                <td class="align-middle">90,000,00</td>
                                <td class="align-middle">10.05.2022</td>
                                <td class="align-middle">72 Hours</td>
                                <td class="align-middle">22.04.2022 03:26 PM</td>
                                <td class="align-middle">Sales Team Bravo</td>
                                </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="bg-white shadow-lg py-3 px-3 rounded-3 profile-details-info">
                    <div class="hdr d-md-flex align-items-center mb-3">
                        <div class="col-auto d-block">
                            <h3>Detail informations</h3>
                        </div>
                    </div>
                    <div class="accordion" id="accordionExamplebuisness">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingbuisnessOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapsebuisnessOne" aria-expanded="true"
                                        aria-controls="collapsebuisnessOne">Details
                                </button>
                            </h2>
                            <div id="collapsebuisnessOne" class="accordion-collapse collapse show"
                                 aria-labelledby="headingbuisnessOne" data-bs-parent="#accordionExamplebuisness">
                                <div class="accordion-body">
                                    <div class="details-info-inner">
                                        <table class="table table-sm table-borderless my-2">
                                            <tbody>
                                            <tr>
                                                <th>Record ID :</th>
                                                <td>63969078</td>
                                            </tr>
                                            <tr>
                                                <th>Opportunity name :</th>
                                                <td>{{opportunityName}}</td>
                                            </tr>
                                            <tr>
                                                <th>Organization :</th>
                                                <td>{{ORG_name}}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone number :</th>
                                                <td>{{ORG_phone}}</td>
                                            </tr>
                                            <tr>
                                                <th>Email address :</th>
                                                <td>{{ORG_Email}}</td>
                                            </tr>
                                            <tr>
                                                <th>Contact person :</th>
                                                <td>{{contactPersonName}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<mat-accordion>
                            <mat-expansion-panel class="custonm-mat-expansion-panel" style="margin-bottom: 15px;"
                                                 [expanded]="isOpen">
                                <mat-expansion-panel-header>
                                    <mat-panel-title>
                                        Organization
                                    </mat-panel-title>
                                    <mat-panel-description>
                                    </mat-panel-description>
                                </mat-expansion-panel-header>
                                <div class="details-info-inner">
                                    <table class="table table-sm table-borderless my-2">
                                        <tbody>
                                        <tr>
                                            <th>Record ID :</th>
                                            <td>63969078</td>
                                        </tr>
                                        <tr>
                                            <th>Opportunity name :</th>
                                            <td>{{opportunityName}}</td>
                                        </tr>
                                        <tr>
                                            <th>Organization :</th>
                                            <td>{{ORG_name}}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone number :</th>
                                            <td>{{ORG_phone}}</td>
                                        </tr>
                                        <tr>
                                            <th>Email address :</th>
                                            <td>{{ORG_Email}}</td>
                                        </tr>
                                        <tr>
                                            <th>Contact person :</th>
                                            <td>{{contactPersonName}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </mat-expansion-panel>
                        </mat-accordion>-->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingbuisnessTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapsebuisnessTwo" aria-expanded="false"
                                        aria-controls="collapsebuisnessTwo">Additional Information
                                </button>
                            </h2>
                            <div id="collapsebuisnessTwo" class="accordion-collapse collapse"
                                 aria-labelledby="headingbuisnessTwo" data-bs-parent="#accordionExamplebuisness">
                                <div class="accordion-body">
                                    <div class="details-info-inner">
                                        <table class="table table-sm table-borderless my-2">
                                            <tbody>
                                            <tr>
                                                <th>Category :</th>
                                                <td>
                                                    <span *ngIf="Oppcategory == 0">New Business</span>
                                                    <span *ngIf="Oppcategory == 1">Existing Business</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Opportunity created :</th>
                                                <td>{{opportunityCreatedAt}}</td>
                                            </tr>
                                            <tr>
                                                <th>Expected close date :</th>
                                                <td>{{expectedCloseDate}}</td>
                                            </tr>
                                            <tr>
                                                <th>Actual close date :</th>
                                                <td>{{ActualCloseDate}}</td>
                                            </tr>
                                            <tr>
                                                <th>Expected revenue :</th>
                                                <td>{{expectedRevenue}} INR</td>
                                            </tr>
                                            <tr>
                                                <th>Stage Duration :</th>
                                                <td>72 Hours</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<mat-accordion>
                            <mat-expansion-panel class="custonm-mat-expansion-panel" style="margin-bottom: 15px;">
                                <mat-expansion-panel-header>
                                    <mat-panel-title>
                                        Additional Information
                                    </mat-panel-title>
                                    <mat-panel-description>
                                    </mat-panel-description>
                                </mat-expansion-panel-header>
                                <div class="details-info-inner">
                                    <table class="table table-sm table-borderless my-2">
                                        <tbody>
                                        <tr>
                                            <th>Category :</th>
                                            <td>
                                                <span *ngIf="Oppcategory == 0">New Business</span>
                                                <span *ngIf="Oppcategory == 1">Existing Business</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Opportunity created :</th>
                                            <td>{{opportunityCreatedAt}}</td>
                                        </tr>
                                        <tr>
                                            <th>Expected close date :</th>
                                            <td>{{expectedCloseDate}}</td>
                                        </tr>
                                        <tr>
                                            <th>Actual close date :</th>
                                            <td>{{ActualCloseDate}}</td>
                                        </tr>
                                        <tr>
                                            <th>Expected revenue :</th>
                                            <td>{{expectedRevenue}} INR</td>
                                        </tr>
                                        <tr>
                                            <th>Stage Duration :</th>
                                            <td>72 Hours</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </mat-expansion-panel>
                        </mat-accordion>-->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingbuisnessThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapsebuisnessThree" aria-expanded="false"
                                        aria-controls="collapsebuisnessThree">Description
                                </button>
                            </h2>
                            <div id="collapsebuisnessThree" class="accordion-collapse collapse"
                                 aria-labelledby="headingbuisnessThree" data-bs-parent="#accordionExamplebuisness">
                                <div class="accordion-body">
                                    <div class="details-info-inner">
                                        <table class="table table-sm table-borderless my-2">
                                            <tbody>
                                            <tr>
                                                <td>{{description}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<mat-accordion>
                            <mat-expansion-panel class="custonm-mat-expansion-panel" style="margin-bottom: 15px;">
                                <mat-expansion-panel-header>
                                    <mat-panel-title>
                                        Description
                                    </mat-panel-title>
                                    <mat-panel-description>
                                    </mat-panel-description>
                                </mat-expansion-panel-header>
                                <div class="details-info-inner">
                                    <table class="table table-sm table-borderless my-2">
                                        <tbody>
                                        <tr>
                                            <td>{{description}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </mat-expansion-panel>
                        </mat-accordion>-->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingbuisnessFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapsebuisnessFour" aria-expanded="false"
                                        aria-controls="collapsebuisnessFour">Interested Items
                                </button>
                            </h2>
                            <div id="collapsebuisnessFour" class="accordion-collapse collapse"
                                 aria-labelledby="headingbuisnessFour" data-bs-parent="#accordionExamplebuisness">
                                <div class="accordion-body">
                                    <div class="details-info-inner">
                                        <table class="table table-sm table-borderless my-2">
                                            <tbody>
                                            <tr>
                                                <th>Item name :</th>
                                                <td>{{actualProductName}}</td>
                                            </tr>
                                            <tr>
                                                <th>Qty :</th>
                                                <td>{{productQtn}}</td>
                                            </tr>
                                            <tr>
                                                <th>List price :</th>
                                                <td>{{listValue}}</td>
                                            </tr>
                                            <tr>
                                                <th>Discount added :</th>
                                                <td>{{discount}}%</td>
                                            </tr>
                                            <tr>
                                                <th>Total :</th>
                                                <td>{{finalValue}} INR</td>
                                            </tr>
                                             <!--<tr>
                                                <th>Stage Duration :</th>
                                                <td>72 Hours</td>
                                            </tr> -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<mat-accordion>
                            <mat-expansion-panel class="custonm-mat-expansion-panel" style="margin-bottom: 15px;">
                                <mat-expansion-panel-header>
                                    <mat-panel-title>
                                        Interested Items
                                    </mat-panel-title>
                                    <mat-panel-description>
                                    </mat-panel-description>
                                </mat-expansion-panel-header>
                                <div class="details-info-inner">
                                    <table class="table table-sm table-borderless my-2">
                                        <tbody>
                                        <tr>
                                            <th>Item name :</th>
                                            <td>{{actualProductName}}</td>
                                        </tr>
                                        <tr>
                                            <th>Qty :</th>
                                            <td>{{productQtn}}</td>
                                        </tr>
                                        <tr>
                                            <th>List price :</th>
                                            <td>{{listValue}}</td>
                                        </tr>
                                        <tr>
                                            <th>Discount added :</th>
                                            <td>{{discount}}%</td>
                                        </tr>
                                        <tr>
                                            <th>Total :</th>
                                            <td>{{finalValue}} INR</td>
                                        </tr>
                                        &lt;!&ndash; <tr>
                                        <th>Stage Duration :</th>
                                        <td>72 Hours</td>
                                        </tr> &ndash;&gt;
                                        </tbody>
                                    </table>
                                </div>
                            </mat-expansion-panel>
                        </mat-accordion>-->
                    </div>
                    <div class="mt-2 text-start">
                        <!--       <button class="btn btn-warning btn-sm" data-bs-target="#opportunityscheduleModal" data-bs-toggle="modal" data-bs-dismiss="modal">Schedule Meeting <i class="fas fa-clock"></i></button>-->
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-white shadow-lg py-3 px-3 rounded-3 mb-3 profile-details-info">
                    <div class="hdr d-md-flex align-items-center mb-3 lead-hdr">
                        <div class="col-auto d-block">
                            <h3>Activities</h3>
                        </div>
                             <div class="col-auto d-block ms-auto">
                            <ul class="nav nav-pills " id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" [ngClass]="activityType=='past'? 'active' : ''" id="pills-activitypast-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-activity-past" type="button" role="tab"
                                        aria-controls="pills-activity-past" aria-selected="false" (click)="pastActivity()">Past</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" [ngClass]="activityType=='up'? 'active' : ''" id="pills-activityupcoming-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-activity-upcoming" type="button" role="tab"
                                        aria-controls="pills-activity-upcoming" aria-selected="true" (click)="upcomingActivity()">Upcoming</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div class="lead-details-info-inner">
                        <div class="tab-content" id="pills-activity-tabContent">

                              <div class="tab-pane fade show active" id="pills-activity-past" role="tabpanel"
                                aria-labelledby="pills-activitypast-tab">

                                <table id="datatables-column-search-select-inputs" class="table table-striped dataTable"
                                    style="width: 100%;" aria-describedby="datatables-column-search-select-inputs_info">
                                    <thead class="thead-dark">
                                        <tr role="row">
                                            <th class="sorting align-middle">Type</th>
                                            <th class="sorting align-middle">Date Due</th>
                                            <th class="sorting align-middle">Assigned to</th>
                                            <th width="40px">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngIf="allActivityArray.length === 0">
                                            <td colspan="4" class="text-center">You have to added any activity yet.</td>
                                        </tr>
                                        <tr role="row" class="odd" *ngFor = "let item of allActivityArray">
                                            <!-- <tbody *ngIf="activityStatus">
                                                <tr role="row" class="odd" *ngFor = "let item of upActivityList"> -->
                                            <td class="align-middle">{{item.activityName}}</td>
                                            <td class="align-middle">{{item.dueDate | date:'dd-MM-yyyy'}}</td>
                                            <td class="align-middle">{{item.firstName}}</td>
                                            <td width="40px" class="align-middle">
                                                <!--<a
                                                    class="d-inline-block align-middle">
                                                    <img src="assets/images/paper-plane-alt.svg" alt="chat"></a>-->
                                                <a class="d-inline-block align-middle" mat-button
                                                    [matMenuTriggerFor]="menu">
                                                    <img src="assets/images/menu-vertical.svg" alt="trash"></a>
                                                <mat-menu #menu="matMenu">
                                                    <button mat-menu-item>View details</button>
                                                     <button mat-menu-item (click)="cancelActivity(item.id)">
                                                                Cancel this task
                                                            </button>
                                                            <button mat-menu-item (click)="completeTusk(item.id)">Mark
                                                                as completed
                                                            </button>

                                                </mat-menu>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                           <!--  <div class="tab-pane fade show active" id="pills-activity-past" role="tabpanel"
                                 aria-labelledby="pills-activitypast-tab">
                                <table class="table table-striped dataTable" style="width: 100%;"
                                       aria-describedby="datatables-column-search-select-inputs_info">
                                    <thead class="thead-dark">
                                    <tr role="row">
                                        <th class="sorting align-middle">Type</th>
                                        <th class="sorting align-middle">Date Due</th>
                                        <th class="sorting align-middle">Assigned to</th>
                                        <th width="40px">&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr *ngIf="allActivityArray.length == 0">
                                        <td colspan="4" style="text-align: center;">No Activity Found</td>
                                    </tr>
                                    <tr role="row" class="odd" *ngFor="let data of allActivityArray">
                                        <td class="align-middle">{{data.activityTypeName}}</td>
                                        <td class="align-middle">{{data.dueDate}}</td>
                                        <td class="align-middle">{{data.firstName}} {{data.lastName}}</td>
                                        <td width="40px" class="align-middle">
                                            <a class="d-inline-block align-middle" href="javascript:void(0)">
                                                <img src="assets/images/paper-plane-alt.svg" alt="chat"></a>
                                             <a class="d-inline-block align-middle dropdown-toggle no-dropdown-arrow" href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="assets/images/menu-vertical.svg" alt="menu"></a> -->
                                            <!-- <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void(0)">View details</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="javascript:void(0)">Cancel this task</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="javascript:void(0)">Add new task</a>
                                            </div> 
                                            <div class="col-auto d-block ms-auto">
                                                <div class="text-end mt-n4">
                                                    <h5 class="profile-status ">
                                                        <a class="dropdown-toggle" mat-button
                                                           [matMenuTriggerFor]="activemenu" data-bs-toggle="dropdown"
                                                           aria-expanded="false">
                                                            <span class="text-success pe-2">abc</span> 
                                                        </a>
                                                        <mat-menu #activemenu="matMenu">
                                                            <button mat-menu-item>View details</button> 
                                                            <button mat-menu-item (click)="cancelActivity(data.id)">
                                                                Cancel this task
                                                            </button>
                                                            <button mat-menu-item (click)="completeTusk(data.id)">Mark
                                                                as completed
                                                            </button>
                                                        </mat-menu>
                                                    </h5>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-activity-upcoming" role="tabpanel"
                                 aria-labelledby="pills-activityupcoming-tab">
                                <table id="datatables-column-search-select-inputs" class="table table-striped dataTable"
                                       style="width: 100%;"
                                       aria-describedby="datatables-column-search-select-inputs_info">
                                    <thead class="thead-dark">
                                    <tr role="row">
                                        <th class="sorting align-middle">Type</th>
                                        <th class="sorting align-middle">Date Due</th>
                                        <th class="sorting align-middle">Assigned to</th>
                                        <th width="40px">&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                         <tr *ngIf="allActivityArray.length == 0">
                                        <td colspan="4" style="text-align: center;">No Activity Found</td>
                                    </tr>
                                    <tr role="row" class="odd" *ngFor="let data of allActivityArray">
                                        <td class="align-middle">{{data.activityTypeName}}</td>
                                        <td class="align-middle">{{data.dueDate}}</td>
                                        <td class="align-middle">{{data.firstName}} {{data.lastName}}</td>
                                        <td width="40px" class="align-middle">
                                            <a class="d-inline-block align-middle" href="javascript:void(0)">
                                                <img src="assets/images/paper-plane-alt.svg" alt="chat"></a>
                                            <a class="d-inline-block align-middle dropdown-toggle no-dropdown-arrow" href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="assets/images/menu-vertical.svg" alt="menu"></a> 
                                            <div class="dropdown-menu dropdown-menu-end">
                                            <a class="dropdown-item" href="javascript:void(0)">View details</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="javascript:void(0)">Cancel this task</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="javascript:void(0)">Add new task</a>
                                            </div> 
                                            <div class="col-auto d-block ms-auto">
                                                <div class="text-end mt-n4">
                                                    <h5 class="profile-status ">
                                                        <a class="dropdown-toggle" mat-button
                                                           [matMenuTriggerFor]="activemenu" data-bs-toggle="dropdown"
                                                           aria-expanded="false">
                                                             <span class="text-success pe-2">abc</span> 
                                                        </a>
                                                        <mat-menu #activemenu="matMenu">
                                                             <button mat-menu-item>View details</button> 
                                                            <button mat-menu-item (click)="cancelActivity(data.id)">
                                                                Cancel this task
                                                            </button>
                                                            <button mat-menu-item (click)="completeTusk(data.id)">Mark
                                                                as completed
                                                            </button>
                                                        </mat-menu>
                                                    </h5>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                   
                             
                                    </tbody>
                                </table>
                            </div> -->
                        </div>
                        <div class="mt-4 text-start">
                            <a (click)="addActivityFunc()" class="btn btn-warning btn-sm">Add Activity <i
                                    class="fas fa-plus"></i></a>
                        </div>
                    </div>
                </div>
                <!--<div class="bg-white shadow-lg py-3 px-3 rounded-3 profile-details-info mb-3">
                    <div class="hdr d-md-flex align-items-center">
                        <div class="col-auto d-block">
                            <h3>Invoice :</h3>
                        </div>
                        <div class="col-auto d-block ms-3">
                            <strong class="profile_invoice_price text-danger">0</strong>
                        </div>
                    </div>
                </div>-->
                <div class="bg-white shadow-lg py-3 px-3 rounded-3 profile-details-info mb-3">
                    <div class="hdr d-xl-flex align-items-center mb-3">
                        <div class="col-auto d-block">
                            <h3>Opportunity Ownership</h3>
                        </div>
                    </div>
                    <div class="lead-details-info-inner pad-sm-table">
                        <table class="table table-sm table-borderless my-2">
                            <tbody>
                            <tr>
                                <th>Source :</th>
                                <td>Lead Convert</td>
                            </tr>
                            <tr>
                                <th>Assigned user :</th>
                                <td>{{assignToUser}}</td>
                            </tr>
                            <!-- <tr>
                            <th>Assigned team :</th>
                            <td>Sales Team Bravo</td>
                            </tr> -->
                            </tbody>
                        </table>
                        <!-- <div class="mt-2 text-start">
                            <button class="btn btn-secondary btn-xs">Update <i class="fas fa-pen"></i></button>
                        </div> -->
                    </div>
                </div>
                <div class="bg-white shadow-lg py-3 px-3 rounded-3 profile-details-info mb-3">
                    <div class="hdr d-xl-flex align-items-center mb-3">
                        <div class="col-auto d-block">
                            <h3>Competitor</h3>
                        </div>
                    </div>
                    <div class="lead-details-info-inner pad-sm-table">
                        <table class="table table-sm table-borderless my-2">
                            <tbody *ngFor="let data of currentCompetitor">
                            <tr>
                                <th width="140px">Name :</th>
                                <td>{{data.productName}}</td>
                            </tr>
                            <tr>
                                <th width="140px">Description :</th>
                                <td>{{data.desc}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<div id="opportunityMarkModal" tabindex="-1" aria-labelledby="opportunityMarkModal"
     class="modal fade opportunityMarkModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-10">
                            <h3>Mark This Stage As Completed</h3>
                        </div>
                        <div class="col-2 d-flex justify-content-end">
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <h4>Present Stage Name : Need Analysis</h4>
                            <!-- <form action="#" method="post"> -->
                            <div class="col-12">
                                <label for="amount" class="form-label"><span class="text-danger">*</span> Amount</label>
                                <div class="input-group">
                                    <input type="text" name="amount" class="form-control" id="amount"
                                           [(ngModel)]="closingAmount">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="probablity_wining" class="form-label"><span class="text-danger">*</span>
                                    Probablity Of Wining</label>
                                <div class="input-group">
                                    <input type="text" name="amount" class="form-control" id="probablity_wining"
                                           [(ngModel)]="probablityWining">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="expected_revenue" class="form-label"><span class="text-danger">*</span>
                                    Expected Revenue</label>
                                <div class="input-group">
                                    <input type="text" name="amount" class="form-control" id="expected_revenue"
                                           [(ngModel)]="expectedRevenueComplete">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="expected_closing" class="form-label"><span class="text-danger">*</span>
                                    Expected Closing</label>
                                <div class="input-group date" id="datepicker">
                                    <input type="date" class="form-control" id="expected_closing"
                                           [(ngModel)]="expectedClosing">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="expected_revenue" class="form-label"><span class="text-danger">*</span>
                                    Stage Duration</label>
                                <div class="input-group">
                                    <input type="text" name="amount" class="form-control" id="expected_revenue"
                                           [(ngModel)]="stageDuration">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button class="btn btn-success" type="button">Submit <i
                                        class="fas fa-chevron-circle-right"></i></button>
                            </div>
                            <!-- </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- <div id="opportunityMarkModal" tabindex="-1" aria-labelledby="opportunityMarkModal" class="modal fade opportunityMarkModal" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered"> -->
<ng-template #opportunityComplete>
    <div class="modal-content">
        <div class="modal-header">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-10">
                        <h3>Mark This Stage As Completed</h3>
                    </div>
                    <div class="col-2 d-flex justify-content-end">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn-close"
                                (click)="modalClose()"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <h4>Present Stage Name : Need Analysis</h4>
                        <!-- <form action="#" method="post"> -->
                        <div class="col-12">
                            <label for="amount" class="form-label"><span class="text-danger">*</span> Amount</label>
                            <div class="input-group">
                                <input type="text" name="amount" class="form-control"
                                       [(ngModel)]="closingAmount">
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="probablity_wining" class="form-label"><span class="text-danger">*</span>
                                Probablity Of Wining</label>
                            <div class="input-group">
                                <input type="text" name="amount" class="form-control" id="probablity_wining"
                                       [(ngModel)]="probablityWining">
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="expected_revenue" class="form-label"><span class="text-danger">*</span> Expected
                                Revenue</label>
                            <div class="input-group">
                                <input type="text" name="amount" class="form-control" id="expected_revenue"
                                       [(ngModel)]="expectedRevenueComplete">
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="expected_closing" class="form-label"><span class="text-danger">*</span> Expected
                                Closing</label>
                            <div class="input-group date" id="datepicker">
                                <input type="date" class="form-control" id="expected_closing"
                                       [(ngModel)]="expectedClosing">
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="expected_revenue" class="form-label"><span class="text-danger">*</span> Stage
                                Duration</label>
                            <div class="input-group">
                                <input type="text" name="amount" class="form-control" id="expected_revenue"
                                       [(ngModel)]="stageDuration">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button class="btn btn-success" type="button" (click)="completeStage()">Submit <i
                                    class="fas fa-chevron-circle-right"></i></button>
                        </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</ng-template>
<!-- </div>
</div> -->
<ng-template #addActivity>
    <div class="modal-content">
        <div class="modal-header">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-10">
                        <h3>Add Activity</h3>
                    </div>
                    <div class="col-2 d-flex justify-content-end">
                        <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn-close"
                                (click)="modalClose()"></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <!-- <h4>Present Stage Name : Need Analysis</h4> -->
                        <!-- <form action="#" method="post"> -->
                        <div class="col-12">
                            <label for="amount" class="form-label"><span class="text-danger">*</span> Activity
                                Type</label>
                            <div class="input-group">
                                <select class="form-select" aria-label="Default select example" name="Quantity type"
                                        id="quantity_type" [(ngModel)]="activityType">
                                    <option value="" selected="">Activity Type</option>
                                    <option *ngFor="let data of activityMasterArray"
                                            value="{{data.activityId}}">{{data.activiryName}}</option>
                                    <!-- <option value="2">Phone</option> -->
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="probablity_wining" class="form-label"><span class="text-danger">*</span>Due Date</label>
                            <div class="input-group">
                                <input type="date" name="amount" class="form-control" id="probablity_wining"
                                       [(ngModel)]="dueDate">
                            </div>
                        </div>
                        <div class="col-md-12" [hidden]="ActivityassignHide">
                            <label for="parmissionType" class="form-label">Select User</label>
                            <div class="input-group">
                                <select class="form-select" aria-label="Default select example" id="status_type"
                                        [(ngModel)]="ActivityassignTo">
                                    <option selected>Select user</option>
                                    <option *ngFor="let data of allUser"
                                            value="{{data.userId}}">{{data.firstName}} {{data.lastName}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="expected_revenue" class="form-label"><span class="text-danger">*</span>
                                Desscription</label>
                            <div class="input-group">
                                <!-- <input type="text" name="amount" class="form-control" id="expected_revenue" [(ngModel)]=""> -->
                                <textarea name="Address" class="form-control" id="address_popup" rows="7"
                                          style="height:200px" [(ngModel)]="activitydescription"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button class="btn btn-success" type="button" (click)="addActivityopp()">Submit <i
                                    class="fas fa-chevron-circle-right"></i></button>
                        </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</ng-template>