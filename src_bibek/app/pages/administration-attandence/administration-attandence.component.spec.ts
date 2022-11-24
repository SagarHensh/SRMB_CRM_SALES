import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAttandenceComponent } from './administration-attandence.component';

describe('AdministrationAttandenceComponent', () => {
  let component: AdministrationAttandenceComponent;
  let fixture: ComponentFixture<AdministrationAttandenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationAttandenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationAttandenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
