var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Calendar, Day } from 'dayspan';
import * as moment from 'moment';
var HTML_CODE = "\n<div  [ngStyle]=\"backgroudStyle\">\n    <ion-item *ngIf=\"showView === 'calendar'\" [ngStyle]=\"backgroudStyle\">\n        <ion-icon name=\"calendar\" slot=\"start\">\n        </ion-icon>\n        <ion-button fill=\"clear\" (click)=\"showMonthView()\" class=\"calendar-button\">\n            {{monthLabels[monthSelected-1]}}\n        </ion-button>\n        <ion-button fill=\"clear\" (click)=\"showYearView()\" class=\"calendar-button\">\n            {{yearSelected}}\n        </ion-button>\n\n        <span slot=\"end\">\n            <ion-button  fill=\"clear\" (click)=\"previous()\">\n                <ion-icon slot=\"icon-only\" name=\"ios-arrow-back\"></ion-icon>\n            </ion-button>\n            <ion-button fill=\"clear\" (click)=\"next()\">\n                <ion-icon slot=\"icon-only\" name=\"ios-arrow-forward\"></ion-icon>\n            </ion-button>\n        </span>\n    </ion-item>\n\n    <ion-grid *ngIf=\"showView === 'calendar'\">\n        <ion-row>\n            <ion-col *ngFor=\"let daylabel of dayLabels\" text-center [ngStyle]=\"dayLabelsStyle\">\n                {{daylabel}}\n            </ion-col>\n        </ion-row>\n        <ion-row *ngFor=\"let week of weeks\">\n            <ion-col *ngFor=\"let day of week\" (click)=\"selectDay(day)\" [ngStyle]=\"getDayStyle(day)\" text-center>\n                <span [ngStyle]=\"!day.inCalendar && notInCalendarStyle\">{{day.dayOfMonth}}</span>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf=\"showView === 'month'\">\n        <ion-row justify-content-end>\n            <ion-col text-end>\n                <ion-button fill=\"clear\" (click)=\"resetView()\">\n                    <ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col *ngFor=\"let monthLabel of monthLabels; let i = index\" [ngStyle]=\"getMonthStyle(i)\" size=\"3\" (click)=\"selectMonth(i+1)\" text-center>\n                {{monthLabel}}\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf=\"showView === 'year'\">\n        <ion-row>\n            <ion-col size=\"10\" text-center>\n                    <div>\n                        <ion-button fill=\"clear\" (click)=\"showPreviousYears()\">\n                            <ion-icon slot=\"icon-only\" name=\"ios-arrow-back\"></ion-icon>\n                        </ion-button>\n                        <ion-button fill=\"clear\" [disabled]=\"true\" class=\"year-range\">\n                            {{startYear}} to {{endYear}}\n                        </ion-button>\n                    \n                        <ion-button fill=\"clear\" (click)=\"showNextYears()\">\n                            <ion-icon slot=\"icon-only\" name=\"ios-arrow-forward\"></ion-icon>\n                        </ion-button>\n                    </div>\n            </ion-col>\n            <ion-col size=\"2\" text-center>\n                <ion-button fill=\"clear\" (click)=\"resetView()\">\n                    <ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row> \n        <ion-row>\n            <ion-col *ngFor=\"let year of years\" [ngStyle]=\"getYearStyle(year)\" size=\"3\" (click)=\"selectYear(year)\" text-center>\n                {{year}}\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</div>\n";
var CSS_STYLE = "\n  .item {\n      .item-inner {\n        border-bottom: none !important;\n      }\n    }\n\n  ion-icon {\n    font-size: 25px;\n  }\n\n  .year-range {\n    font-size: 15px;\n    font-weight: 550;\n    &.button[disabled] {\n      opacity: 1;\n      color: gray !important;\n    }\n  }\n\n  .calendar-button {\n    text-decoration: underline;\n    padding-right: 2px !important;\n    padding-left: 2px !important;\n  }\n";
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
        this.monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.backgroundStyle = { 'background-color': '#ffffff' };
        this.notInCalendarStyle = { 'color': '#8b8b8b' };
        this.dayLabelsStyle = { 'font-weight': 500, 'font-size': '14px' };
        this.monthLabelsStyle = { 'font-size': '15px' };
        this.yearLabelsStyle = { 'font-size': '15px' };
        this.itemSelectedStyle = { 'background': '#488aff', 'color': '#f4f4f4 !important' };
        this.todaysItemStyle = { 'color': '#32db64' };
        this.onSelect = new EventEmitter();
        this.showView = 'calendar';
        this.yearSelected = new Date().getFullYear();
        this.monthSelected = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
        this.currentDay = new Date().getDate();
        //End of styles
    }
    DatePickerComponent.prototype.ngOnInit = function () {
        this.initOptions();
        this.createCalendarWeeks();
    };
    DatePickerComponent.prototype.initOptions = function () {
        this.yearSelected = this.date ? this.date.getFullYear() : new Date().getFullYear();
        this.monthSelected = this.date ? this.date.getMonth() + 1 : new Date().getMonth() + 1;
        this.dayHighlighted = this.date ? Day.fromDate(this.date) : Day.today();
        if (this.date) {
            this.daySelected = this.dayHighlighted;
        }
    };
    DatePickerComponent.prototype.createCalendarWeeks = function () {
        this.weeks = this.generateCalendarWeeks(Day.fromMoment(moment(this.monthSelected + '-01-' + this.yearSelected, 'MM-DD-YYYY')));
    };
    DatePickerComponent.prototype.previous = function () {
        if (this.monthSelected === 1) {
            this.monthSelected = 12;
            this.yearSelected--;
        }
        else {
            this.monthSelected--;
        }
        this.createCalendarWeeks();
    };
    DatePickerComponent.prototype.next = function () {
        if (this.monthSelected === 12) {
            this.monthSelected = 1;
            this.yearSelected++;
        }
        else {
            this.monthSelected++;
        }
        this.createCalendarWeeks();
    };
    DatePickerComponent.prototype.confirmDay = function (day) {
        this.onSelect.emit(day.toDate());
    };
    DatePickerComponent.prototype.selectDay = function (day) {
        var _this = this;
        this.daySelected = day;
        setTimeout(function () {
            _this.confirmDay(day);
        }, 200);
    };
    DatePickerComponent.prototype.showMonthView = function () {
        this.showView = 'month';
        "";
    };
    DatePickerComponent.prototype.showYearView = function () {
        this.showView = 'year';
        var startYear = this.yearSelected - 10;
        if (startYear % 10 !== 0) {
            startYear = startYear - (startYear % 10);
        }
        var endYear = startYear + 19;
        this.startYear = startYear;
        this.endYear = endYear;
        this.generateYears();
    };
    DatePickerComponent.prototype.generateYears = function () {
        this.years = [];
        for (var i = this.startYear; i <= this.endYear; i++) {
            this.years.push(i);
        }
    };
    DatePickerComponent.prototype.showPreviousYears = function () {
        this.endYear = this.startYear - 1;
        this.startYear = this.endYear - 19;
        this.generateYears();
    };
    DatePickerComponent.prototype.showNextYears = function () {
        this.startYear = this.endYear + 1;
        this.endYear = this.startYear + 19;
        this.generateYears();
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        var _this = this;
        this.monthSelected = month;
        this.createCalendarWeeks();
        setTimeout(function () {
            _this.showView = 'calendar';
        }, 200);
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        var _this = this;
        this.yearSelected = year;
        this.createCalendarWeeks();
        setTimeout(function () {
            _this.showView = 'calendar';
        }, 200);
    };
    DatePickerComponent.prototype.resetView = function () {
        this.showView = 'calendar';
    };
    DatePickerComponent.prototype.isToday = function (day) {
        return this.yearSelected === this.currentYear && this.monthSelected === this.currentMonth && this.currentDay === day;
    };
    DatePickerComponent.prototype.generateCalendarWeeks = function (forDay) {
        var weeks = [];
        var month = Calendar.months(1, forDay);
        var numOfWeeks = month.days.length / 7;
        var dayIndex = 0;
        for (var week = 0; week < numOfWeeks; week++) {
            var days = [];
            for (var day = 0; day < 7; day++) {
                days.push(month.days[dayIndex]);
                dayIndex++;
            }
            weeks.push(days);
        }
        return weeks;
    };
    //Styles
    DatePickerComponent.prototype.getDayStyle = function (day) {
        var style = {};
        if (this.isToday(day.dayOfMonth)) {
            style = this.todaysItemStyle;
        }
        if (this.daySelected && day.dayIdentifier === this.daySelected.dayIdentifier) {
            style = __assign({}, style, this.itemSelectedStyle);
        }
        return style;
    };
    DatePickerComponent.prototype.getMonthStyle = function (index) {
        var style = {};
        style = __assign({}, style, this.monthLabelsStyle);
        if (index === this.currentMonth - 1) {
            style = __assign({}, style, this.todaysItemStyle);
        }
        if (index === this.monthSelected - 1) {
            style = __assign({}, style, this.itemSelectedStyle);
        }
        return style;
    };
    DatePickerComponent.prototype.getYearStyle = function (year) {
        var style = {};
        style = __assign({}, style, this.yearLabelsStyle);
        if (year === this.currentYear) {
            style = __assign({}, style, this.todaysItemStyle);
        }
        if (year === this.yearSelected) {
            style = __assign({}, style, this.itemSelectedStyle);
        }
        return style;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "monthLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "dayLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DatePickerComponent.prototype, "date", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "backgroundStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "notInCalendarStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "dayLabelsStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "monthLabelsStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "yearLabelsStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "itemSelectedStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatePickerComponent.prototype, "todaysItemStyle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DatePickerComponent.prototype, "onSelect", void 0);
    DatePickerComponent = __decorate([
        Component({
            selector: 'ionic-calendar-date-picker',
            template: HTML_CODE,
            styles: [CSS_STYLE]
        })
    ], DatePickerComponent);
    return DatePickerComponent;
}());
export { DatePickerComponent };
//# sourceMappingURL=date-picker-component.js.map