import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRulesCreateComponent } from './work-flow-rules-create.component';

describe('WorkFlowRulesCreateComponent', () => {
  let component: WorkFlowRulesCreateComponent;
  let fixture: ComponentFixture<WorkFlowRulesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkFlowRulesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRulesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
