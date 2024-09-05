import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartService } from '../charts/chart.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  providers: [provideNativeDateAdapter()],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public filterForm: FormGroup;
  @ViewChild('filterForm') filterFormElement: any;

  ngOnInit(): void {
    this.getAllCharts();
    this.filterFormElement.ngSubmit.emit();
  }

  ngAfterViewInit() {

  }

  displayedColumns: string[] = ['chart', 'id', 'value', 'type', 'date'];
  dataSource = [];
  numberOfCharts: number = 0;

  constructor(
    private _fb: FormBuilder,
    private _chartService: ChartService) {

    this.filterForm = _fb.group({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }

  getAllCharts() {
    this._chartService.getCharts().subscribe({
      next: (res: any) => {
        this.dataSource = res;
        this.numberOfCharts = this.dataSource.length;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  dateRangeChange() {
    this.filterForm.patchValue({
      startDate: this.filterForm.value.startDate,
      endtDate: this.filterForm.value.end,
    })
  }

  applyFilter() {
    this.filterForm.patchValue({
      startDate: this.filterForm.value.startDate,
      endtDate: this.filterForm.value.end,
    })
    const startDate = Date.parse(this.filterForm.value.startDate);
    const endDate = Date.parse(this.filterForm.value.endDate);

    if (startDate && endDate) {
      this.getAllCharts();
      this.dataSource = this.dataSource.filter(e => Date.parse(e['date']) >= startDate && Date.parse(e['date']) <= endDate)
    }
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
}
