import { OnInit, EventEmitter } from '@angular/core';
import { Day } from 'dayspan';
export declare class DatePickerComponent implements OnInit {
    monthLabels: string[];
    dayLabels: string[];
    date: Date;
    backgroundStyle: {
        'background-color': string;
    };
    notInCalendarStyle: {
        'color': string;
    };
    dayLabelsStyle: {
        'font-weight': number;
        'font-size': string;
    };
    monthLabelsStyle: {
        'font-size': string;
    };
    yearLabelsStyle: {
        'font-size': string;
    };
    itemSelectedStyle: {
        'background': string;
        'color': string;
    };
    todaysItemStyle: {
        'color': string;
    };
    onSelect: EventEmitter<Date>;
    showView: string;
    weeks: Array<Array<Day>>;
    years: Array<number>;
    yearSelected: number;
    monthSelected: number;
    currentYear: number;
    currentMonth: number;
    currentDay: number;
    daySelected: Day;
    dayHighlighted: Day;
    startYear: number;
    endYear: number;
    ngOnInit(): void;
    initOptions(): void;
    createCalendarWeeks(): void;
    previous(): void;
    next(): void;
    confirmDay(day: Day): void;
    selectDay(day: Day): void;
    showMonthView(): void;
    showYearView(): void;
    generateYears(): void;
    showPreviousYears(): void;
    showNextYears(): void;
    selectMonth(month: number): void;
    selectYear(year: any): void;
    resetView(): void;
    isToday(day: any): boolean;
    generateCalendarWeeks(forDay: Day): Array<any>;
    getDayStyle(day: Day): {};
    getMonthStyle(index: any): {};
    getYearStyle(year: any): {};
}
