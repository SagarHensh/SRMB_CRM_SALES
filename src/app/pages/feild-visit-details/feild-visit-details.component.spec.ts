import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeildVisitDetailsComponent } from './feild-visit-details.component';

describe('FeildVisitDetailsComponent', () => {
  let component: FeildVisitDetailsComponent;
  let fixture: ComponentFixture<FeildVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeildVisitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeildVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
