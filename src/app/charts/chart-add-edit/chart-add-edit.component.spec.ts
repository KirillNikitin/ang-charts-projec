import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAddEditComponent } from './chart-add-edit.component';

describe('ChartAddEditComponent', () => {
  let component: ChartAddEditComponent;
  let fixture: ComponentFixture<ChartAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAddEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
