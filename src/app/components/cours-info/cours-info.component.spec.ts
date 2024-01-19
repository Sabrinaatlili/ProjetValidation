import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursInfoComponent } from './cours-info.component';

describe('CoursInfoComponent', () => {
  let component: CoursInfoComponent;
  let fixture: ComponentFixture<CoursInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
