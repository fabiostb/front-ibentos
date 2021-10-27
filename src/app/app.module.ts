import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IbentoDetailComponent } from './ibento-detail/ibento-detail.component';
import { IbentoSearchComponent } from './ibento-search/ibento-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CdkTableModule} from '@angular/cdk/table';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {A11yModule} from '@angular/cdk/a11y';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { IbentoDashboardComponent } from './ibento-dashboard/ibento-dashboard.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    FlexModule,
    A11yModule,
    MatSelectModule,
    ExtendedModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatTableModule,
    MatProgressBarModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBar
  ],
  declarations: [
    AppComponent,
    IbentoDetailComponent,
    IbentoSearchComponent,
    DateTimePickerComponent,
    IbentoDashboardComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
