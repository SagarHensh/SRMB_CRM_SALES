import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOpportunityComponent } from './approve-opportunity.component';

describe('ApproveOpportunityComponent', () => {
  let component: ApproveOpportunityComponent;
  let fixture: ComponentFixture<ApproveOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
