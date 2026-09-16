import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailPage } from './course-detail-page';

describe('CourseDetailPage', () => {
  let component: CourseDetailPage;
  let fixture: ComponentFixture<CourseDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
