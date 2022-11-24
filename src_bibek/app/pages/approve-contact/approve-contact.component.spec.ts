import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveContactComponent } from './approve-contact.component';

describe('ApproveContactComponent', () => {
  let component: ApproveContactComponent;
  let fixture: ComponentFixture<ApproveContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
