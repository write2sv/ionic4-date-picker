import { NgModule, ModuleWithProviders } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import { DatePickerComponent } from './components/date-picker-component/date-picker-component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        DatePickerComponent,
    ],
    exports: [
        DatePickerComponent
    ]
})
export class DatePickerModule {
    forRoot(): ModuleWithProviders {
        return {
            ngModule: DatePickerModule,
            providers: []
        };
    }
}
