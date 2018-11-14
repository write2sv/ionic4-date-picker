import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Calendar, Day } from 'dayspan';
import * as moment from 'moment';

const HTML_CODE = `
<div  [ngStyle]="backgroudStyle">
    <ion-item *ngIf="showView === 'calendar'" [ngStyle]="backgroudStyle">
        <ion-icon name="calendar" slot="start">
        </ion-icon>
        <ion-button fill="clear" (click)="showMonthView()" class="calendar-button">
            {{monthLabels[monthSelected-1]}}
        </ion-button>
        <ion-button fill="clear" (click)="showYearView()" class="calendar-button">
            {{yearSelected}}
        </ion-button>

        <span slot="end">
            <ion-button  fill="clear" (click)="previous()">
                <ion-icon slot="icon-only" name="ios-arrow-back"></ion-icon>
            </ion-button>
            <ion-button fill="clear" (click)="next()">
                <ion-icon slot="icon-only" name="ios-arrow-forward"></ion-icon>
            </ion-button>
        </span>
    </ion-item>

    <ion-grid *ngIf="showView === 'calendar'">
        <ion-row>
            <ion-col *ngFor="let daylabel of dayLabels" text-center [ngStyle]="dayLabelsStyle">
                {{daylabel}}
            </ion-col>
        </ion-row>
        <ion-row *ngFor="let week of weeks">
            <ion-col *ngFor="let day of week" (click)="selectDay(day)" [ngStyle]="getDayStyle(day)" text-center>
                <span [ngStyle]="!day.inCalendar && notInCalendarStyle">{{day.dayOfMonth}}</span>
            </ion-col>
        </ion-row>
    </ion-grid>

    <ion-grid *ngIf="showView === 'month'">
        <ion-row justify-content-end>
            <ion-col text-end>
                <ion-button fill="clear" (click)="resetView()">
                    <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col *ngFor="let monthLabel of monthLabels; let i = index" [ngStyle]="getMonthStyle(i)" size="3" (click)="selectMonth(i+1)" text-center>
                {{monthLabel}}
            </ion-col>
        </ion-row>
    </ion-grid>

    <ion-grid *ngIf="showView === 'year'">
        <ion-row>
            <ion-col size="10" text-center>
                    <div>
                        <ion-button fill="clear" (click)="showPreviousYears()">
                            <ion-icon slot="icon-only" name="ios-arrow-back"></ion-icon>
                        </ion-button>
                        <ion-button fill="clear" [disabled]="true" class="year-range">
                            {{startYear}} to {{endYear}}
                        </ion-button>
                    
                        <ion-button fill="clear" (click)="showNextYears()">
                            <ion-icon slot="icon-only" name="ios-arrow-forward"></ion-icon>
                        </ion-button>
                    </div>
            </ion-col>
            <ion-col size="2" text-center>
                <ion-button fill="clear" (click)="resetView()">
                    <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row> 
        <ion-row>
            <ion-col *ngFor="let year of years" [ngStyle]="getYearStyle(year)" size="3" (click)="selectYear(year)" text-center>
                {{year}}
            </ion-col>
        </ion-row>
    </ion-grid>
</div>
`;



const CSS_STYLE = `
  .item {
      .item-inner {
        border-bottom: none !important;
      }
    }

  ion-icon {
    font-size: 25px;
  }

  .year-range {
    font-size: 15px;
    font-weight: 550;
    &.button[disabled] {
      opacity: 1;
      color: gray !important;
    }
  }

  .calendar-button {
    text-decoration: underline;
    padding-right: 2px !important;
    padding-left: 2px !important;
  }
`;

@Component({
  selector: 'ionic-calendar-date-picker',
  template: HTML_CODE,
  styles: [CSS_STYLE]
})
export class DatePickerComponent implements OnInit {
  @Input() monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  @Input() dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  @Input() date: Date;

  @Input() backgroundStyle = { 'background-color': '#ffffff' };
  @Input() notInCalendarStyle = { 'color': '#8b8b8b' };
  @Input() dayLabelsStyle = { 'font-weight': 500, 'font-size': '14px' };
  @Input() monthLabelsStyle = {  'font-size': '15px' };
  @Input() yearLabelsStyle = {  'font-size': '15px' };
  @Input() itemSelectedStyle = { 'background': '#488aff', 'color': '#f4f4f4 !important' };
  @Input() todaysItemStyle = { 'color': '#32db64' };

  @Output() onSelect: EventEmitter<Date> = new EventEmitter();

  showView = 'calendar';
  weeks: Array<Array<Day>>;
  years: Array<number>;

  yearSelected = new Date().getFullYear();
  monthSelected = new Date().getMonth() + 1;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentDay = new Date().getDate();

  daySelected: Day;
  dayHighlighted: Day;

  startYear: number;
  endYear: number;

  ngOnInit() {
    this.initOptions();
    this.createCalendarWeeks();
  }

  initOptions() {
    this.yearSelected = this.date ? this.date.getFullYear() : new Date().getFullYear();
    this.monthSelected = this.date ? this.date.getMonth() + 1 : new Date().getMonth() + 1;
    this.dayHighlighted = this.date ? Day.fromDate(this.date) : Day.today();

    if (this.date) {
      this.daySelected = this.dayHighlighted;
    }
  }

  createCalendarWeeks() {
    this.weeks = this.generateCalendarWeeks(
      Day.fromMoment(
        moment(this.monthSelected + '-01-' + this.yearSelected, 'MM-DD-YYYY')
      )
    );
  }

  previous() {
    if (this.monthSelected === 1) {
      this.monthSelected = 12;
      this.yearSelected--;
    } else {
      this.monthSelected--;
    }

    this.createCalendarWeeks();
  }

  next() {
    if (this.monthSelected === 12) {
      this.monthSelected = 1;
      this.yearSelected++;
    } else {
      this.monthSelected++;
    }

    this.createCalendarWeeks();
  }

  confirmDay(day: Day) {
    this.onSelect.emit(day.toDate());
  }

  selectDay(day: Day) {
    this.daySelected = day;
    setTimeout(() => {
      this.confirmDay(day);
    }, 200);
  }

  showMonthView() {
    this.showView = 'month'; ``
  }

  showYearView() {
    this.showView = 'year';
    let startYear = this.yearSelected - 10;
    if (startYear % 10 !== 0) {
      startYear = startYear - (startYear % 10);
    }
    const endYear = startYear + 19;

    this.startYear = startYear;
    this.endYear = endYear;

    this.generateYears();
  }

  generateYears() {
    this.years = [];
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years.push(i);
    }
  }

  showPreviousYears() {
    this.endYear = this.startYear - 1;
    this.startYear = this.endYear - 19;
    this.generateYears();
  }

  showNextYears() {
    this.startYear = this.endYear + 1;
    this.endYear = this.startYear + 19;
    this.generateYears();
  }

  selectMonth(month: number) {
    this.monthSelected = month;
    this.createCalendarWeeks();
    setTimeout(() => {
      this.showView = 'calendar';
    }, 200);
  }

  selectYear(year) {
    this.yearSelected = year;
    this.createCalendarWeeks();
    setTimeout(() => {
      this.showView = 'calendar';
    }, 200);
  }

  resetView() {
    this.showView = 'calendar';
  }

  isToday(day) {
    return this.yearSelected === this.currentYear && this.monthSelected === this.currentMonth && this.currentDay === day;
  }

  generateCalendarWeeks(forDay: Day): Array<any> {
    const weeks: Array<any> = [];
    const month = Calendar.months<string, any>(1, forDay);
    const numOfWeeks = month.days.length / 7;

    let dayIndex = 0;
    for (let week = 0; week < numOfWeeks; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        days.push(month.days[dayIndex]);
        dayIndex++;
      }
      weeks.push(days);
    }
    return weeks;
  }

  //Styles

  getDayStyle(day: Day) {
    let style = {};
    if (this.isToday(day.dayOfMonth)) {
      style = this.todaysItemStyle;
    }

    if (this.daySelected && day.dayIdentifier === this.daySelected.dayIdentifier) {
      style = {...style, ...this.itemSelectedStyle};
    }

    return style;
  }

  getMonthStyle(index) {
    let style = {};
    style = {...style, ...this.monthLabelsStyle};
    if (index === this.currentMonth - 1) {
      style = {...style, ...this.todaysItemStyle};
    }

    if (index === this.monthSelected - 1) {
      style = {...style, ...this.itemSelectedStyle};
    }

    return style;
  }

  getYearStyle(year) {
    let style = {};
    style = {...style, ...this.yearLabelsStyle};
    if (year === this.currentYear) {
      style = {...style, ...this.todaysItemStyle};
    }

    if (year === this.yearSelected) {
      style = {...style, ...this.itemSelectedStyle};
    }

    return style;
  }
  //End of styles
}
