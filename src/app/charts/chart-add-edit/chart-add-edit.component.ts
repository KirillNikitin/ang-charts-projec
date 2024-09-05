import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ChartService } from '../chart.service';
import { NgxColorsModule } from 'ngx-colors';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-chart-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgxColorsModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './chart-add-edit.component.html',
  styleUrl: './chart-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartAddEditComponent implements OnInit {
  public chartsForm: FormGroup;
  public schema: any = {};

  chartType: string[] = [
    'line',
    'spline',
    'area'
  ];

  ngOnInit(): void {
    this.chartsForm.patchValue({
      //id: this.data.id,
      date: this.data.date,
      value: this.data.title.text,
      color: this.data.series[0].color,
      type: this.data.series[0].type
    });
  }

  constructor(
    private _fb: FormBuilder,
    private _chartService: ChartService,
    private _dialogRef: MatDialogRef<ChartAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.chartsForm = this._fb.group({
      //id: '',
      value: '',
      type: '',
      color: '',
      date: '',
    });
  }

  onFormSubmit() {
    if (this.chartsForm.valid) {
      const validJSON = this.validJSONprovider(this.chartsForm.value);
      if (this.data) {
        this._chartService.updateChart(this.data.id, validJSON).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Chart updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._chartService.addChart(validJSON).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Chart added');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }

    } else {
      this._coreService.openSnackBar('Form data is not valid');
    }
  }

  closeDialog() {
    this._dialogRef.close(false);
  }

  validJSONprovider(data: any) {
    this.schema = {
      type: "object",
      properties: {
        series: [
          {
            data: [],
            type: "",
            name: "",
            color: ""
          }
        ],
        title: {
          text: ""
        },
        id: "",
        date: ""
      },
    }

    const validJSON: object = {
      properties: {
        series: [
          {
            data: [],
            type: data.type,
            name: '', //data.name,
            color: data.color
          }
        ],
        title: {
          text: data.value
        },
        date: data.date
      },
    }

    //return validJSON
    let vJ: Chart = {
      series: [{
        data: [1, 2, 3],
        type: data.type,
        name: '', //data.name,
        color: data.color
      }],
      title: {
        text: data.value
      },
      id: data.id,
      date: data.date || Date.now()

    }
    return vJ
  }

}

export interface Chart {
  series: [{}];
  title: {};
  id: string;
  date: Date;
}
