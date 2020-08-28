import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { ResourceComponent }       from '../../pages/resource/resource.component';
import { FormulaComponent }           from '../../pages/formula/formula.component';
import { ProjectComponent }           from '../../pages/project/project.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    //ResourceComponent,
    FormulaComponent,
    ProjectComponent,
  ]
})

export class AdminLayoutModule {}
