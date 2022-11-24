import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldVisitsListComponent } from './field-visits-list.component';

describe('FieldVisitsListComponent', () => {
  let component: FieldVisitsListComponent;
  let fixture: ComponentFixture<FieldVisitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldVisitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldVisitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
