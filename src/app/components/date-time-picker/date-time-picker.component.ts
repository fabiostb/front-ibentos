import { Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent {

  readonly times = DateTimePickerComponent.getTimes();

  @Input() label = '';
  @Input() hourGap = 0;
  @Input()
  set dateTime(date: Date | undefined) {
    this.dateTimeInternal = date;
    this.updateDateTime();
  }
  get dateTime(): Date | undefined {
    return this.dateTimeInternal!;
  }

  @Output()
  dateTimeChange: EventEmitter<Date> = new EventEmitter<Date>();

  dateTimeInternal: Date | undefined;
  selectedTime: string | undefined | null;

  private static getTimes(): string[] {
    const hours: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let quarter = 0; quarter < 4; quarter++) {
        hours.push(moment({hour, minute: quarter * 15}).format('HH:mm'));
      }
    }
    return hours;
  }

  private updateDateTime() {
    if (isNotNullOrUndefined(this.dateTimeInternal)) {
      this.selectedTime = moment(this.dateTimeInternal).format('HH:mm');
    }
  }

  timeOnChange() {
    const selectedTimeNumbers: number[] | undefined = this.selectedTime?.split(':').map(Number);
    const hours: number = selectedTimeNumbers ? selectedTimeNumbers[0] : 0;
    const minutes: number = selectedTimeNumbers ? selectedTimeNumbers[1] : 0;
    this.dateTimeChange.emit(moment(this.dateTime).set({hour: hours, minute: minutes}).toDate());
  }
}
