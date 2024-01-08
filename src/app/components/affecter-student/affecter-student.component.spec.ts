import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterStudentComponent } from './affecter-student.component';

describe('AffecterStudentComponent', () => {
  let component: AffecterStudentComponent;
  let fixture: ComponentFixture<AffecterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
