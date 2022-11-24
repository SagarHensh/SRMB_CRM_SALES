import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchySetupComponent } from './hierarchy-setup.component';

describe('HierarchySetupComponent', () => {
  let component: HierarchySetupComponent;
  let fixture: ComponentFixture<HierarchySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchySetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
