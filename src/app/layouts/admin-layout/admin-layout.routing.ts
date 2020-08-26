import { Routes } from '@angular/router';

import { ResourceComponent } from '../../pages/resource/resource.component';
import { ProjectComponent } from '../../pages/project/project.component';
import { FormulaComponent} from '../../pages/formula/formula.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'resource',      component: ResourceComponent },
    { path: 'formula',          component: FormulaComponent },
    { path: 'project',          component: ProjectComponent },
];
