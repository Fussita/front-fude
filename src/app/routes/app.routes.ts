import { Routes } from '@angular/router';
import { HomePageComponent } from '../presentation/pages/home-page/home-page.component';
import { LoginPageComponent } from '../presentation/pages/login-page/login-page.component';
import { TabPageComponent } from '../presentation/pages/tab-page/tab-page.component';
import { PbInstitutionPageComponent } from '../presentation/pages/pb-institution-page/pb-institution-page.component';
import { SubsidiaryPageComponent } from '../presentation/pages/subsidiary-page/subsidiary-page.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'institution',
        component: PbInstitutionPageComponent
    },
    {
        path: 'auth/login',
        component: LoginPageComponent
    },
    {
        path: 'auth/tab',
        component: TabPageComponent
    },
    {
        path: 'auth/tab',
        canActivate: [],
        loadChildren: () => import('./adm.routes').then((routes) => routes.admRoutes)
    },
    {
        path: 'subsidiary',
        component: SubsidiaryPageComponent
    },
    /*
    {
        path: 'auth/institution',
        canActivate: [],
        component: AdmInstitutionPageComponent
    },
    {
        path: 'auth/institution/add',
        canActivate: [],
        component: AddInstitutionPageComponent
    },
    {
        path: 'auth/institution/mod/:id',
        canActivate: [],
        component: AdmModInstitutionPageComponent
    },
    {
        path: 'auth/alliance',
        canActivate: [],
        component: AdmAlliancePageComponent
    },
    {
        path: 'auth/alliance/add',
        canActivate: [],
        component: AdmAddAlliancePageComponent
    },
    {
        path: 'auth/alliance/mod/:id',
        canActivate: [],
        component: AdmModAlliancePageComponent
    },
    {
      path: 'subsidiary',
      component: SubsidiaryPageComponent
    },
    {
      path: 'auth/subsidiary',
      component: AdminSubsidiaryPageComponent
    },
    {
      path: 'auth/subsidiary/add',
      component: AddSubsidiaryPageComponent
    },*/
    {
        path: '**',
        redirectTo: 'home'
    },
]
