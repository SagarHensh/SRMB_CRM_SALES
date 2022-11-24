import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOrganizationComponent } from './approve-organization.component';

describe('ApproveOrganizationComponent', () => {
  let component: ApproveOrganizationComponent;
  let fixture: ComponentFixture<ApproveOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
