import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUserComponent } from './administration-user.component';

describe('AdministrationUserComponent', () => {
  let component: AdministrationUserComponent;
  let fixture: ComponentFixture<AdministrationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
