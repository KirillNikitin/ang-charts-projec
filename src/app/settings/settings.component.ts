import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { ChartAddEditComponent } from '../charts/chart-add-edit/chart-add-edit.component';
import { ChartService } from '../charts/chart.service';

import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HighchartsChartModule
  ],

  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllCharts();
  }

  displayedColumns: string[] = ['chart', 'id', 'value', 'type', 'date', 'action'];
  dataSource = [];

  constructor(
    private _dialog: MatDialog,
    private _chartService: ChartService,
    private _coreService: CoreService
  ) { }

  openAddEditChartForm() {
    const dialogRef = this._dialog.open(ChartAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getAllCharts();
        }
      },
    });
  }

  getAllCharts() {
    this._chartService.getCharts().subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  editChart(data: any) {
    this._dialog.open(ChartAddEditComponent, {
      data,
    }).afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getAllCharts();
        }
      },
    });
  }

  deleteChart(id: number) {
    this._chartService.deleteChart(id).subscribe({
      next: (res: any) => {
        this._coreService.openSnackBar('Chart deleted');
        this.getAllCharts();
      },
      error: (err: any) => console.error()

    })
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
}
