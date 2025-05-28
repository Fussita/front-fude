import { Routes } from '@angular/router';
import { TabPageComponent } from '../presentation/pages/tab-page/tab-page.component';
import { AddInstitutionPageComponent } from '../presentation/pages/adm-context/add-institution-page/add-institution-page.component';
import { AddSubsidiaryPageComponent } from '../presentation/pages/adm-context/add-subsidiary-page/add-subsidiary-page.component';
import { AdmAddAlliancePageComponent } from '../presentation/pages/adm-context/adm-add-alliance-page/adm-add-alliance-page.component';
import { AdmAlliancePageComponent } from '../presentation/pages/adm-context/adm-alliance-page/adm-alliance-page.component';
import { AdmInstitutionPageComponent } from '../presentation/pages/adm-context/adm-institution-page/adm-institution-page.component';
import { AdmModAlliancePageComponent } from '../presentation/pages/adm-context/adm-mod-alliance-page/adm-mod-alliance-page.component';
import { AdmModInstitutionPageComponent } from '../presentation/pages/adm-context/adm-mod-institution-page/adm-mod-institution-page.component';
import { AdminSubsidiaryPageComponent } from '../presentation/pages/adm-context/admin-subsidiary-page/admin-subsidiary-page.component';
import { SubsidiaryPageComponent } from '../presentation/pages/subsidiary-page/subsidiary-page.component';

export const admRoutes: Routes = [
    {
        path: '',
        canActivate: [],
        component: TabPageComponent,
        children: [
            { path: '', redirectTo: '', pathMatch: 'full' },
            //{ path: '**', redirectTo: '' },            
            {
                path: 'institution',
                canActivate: [],
                component: AdmInstitutionPageComponent
            },
            {
                path: 'institution/add',
                canActivate: [],
                component: AddInstitutionPageComponent
            },
            {
                path: 'institution/mod/:id',
                canActivate: [],
                component: AdmModInstitutionPageComponent
            },
            {
                path: 'alliance',
                canActivate: [],
                component: AdmAlliancePageComponent
            },
            {
                path: 'alliance/add',
                canActivate: [],
                component: AdmAddAlliancePageComponent
            },
            {
                path: 'alliance/mod/:id',
                canActivate: [],
                component: AdmModAlliancePageComponent
            },
            {
                path: 'subsidiary',
                component: AdminSubsidiaryPageComponent
            },
            {
                path: 'subsidiary/add',
                component: AddSubsidiaryPageComponent
            },
        ]
    }
]
