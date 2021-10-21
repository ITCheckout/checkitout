import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacingComponent } from './admin-facing.component';

describe('AdminFacingComponent', () => {
  let component: AdminFacingComponent;
  let fixture: ComponentFixture<AdminFacingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFacingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
