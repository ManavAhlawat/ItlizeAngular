import { NgModule } from "@angular/core";
import { AgGridModule } from 'ag-grid-angular';
import { ResourceComponent } from './resource.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'


@NgModule({
    imports: [BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AgGridModule.withComponents([])],
    exports: [ResourceComponent],
    declarations:[
        ResourceComponent
    ],
    //bootstrap:[ResourceComponent]
})
export class ResourceModule{}