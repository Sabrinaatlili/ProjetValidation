import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCoursComponent } from './single-cours.component';

describe('SingleCoursComponent', () => {
  let component: SingleCoursComponent;
  let fixture: ComponentFixture<SingleCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
