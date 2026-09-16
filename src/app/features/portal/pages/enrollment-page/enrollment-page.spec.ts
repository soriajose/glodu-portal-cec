import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentPage } from './enrollment-page';

describe('EnrollmentPage', () => {
  let component: EnrollmentPage;
  let fixture: ComponentFixture<EnrollmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
