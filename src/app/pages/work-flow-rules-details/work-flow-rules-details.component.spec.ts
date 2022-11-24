import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRulesDetailsComponent } from './work-flow-rules-details.component';

describe('WorkFlowRulesDetailsComponent', () => {
  let component: WorkFlowRulesDetailsComponent;
  let fixture: ComponentFixture<WorkFlowRulesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFlowRulesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRulesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
