import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid/grid.component';
import {ProjectComponent} from '@app/users/project.component';
import {Ng2CompleterModule} from 'ng2-completer';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        AgGridModule.withComponents([]),
        FormsModule,
        Ng2CompleterModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        ProjectComponent,
        AddEditComponent,
        GridComponent
    ]
})
export class UsersModule { }
