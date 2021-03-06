import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import {ProjectComponent} from '@app/users/project.component';
import {GridComponent} from '@app/users/grid/grid.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'project', component: ProjectComponent},
            { path: 'add', component: AddEditComponent },
            { path: 'edit/:id', component: AddEditComponent },
            { path: 'grid', component: GridComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
