import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BodyComponent } from './body/body.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


const routes: Routes = [

  {path:'',redirectTo:'/login',pathMatch:'full'},

  {path: '',component: AuthLayoutComponent,
  
  children: [{
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }]
  },

  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/body/body.module').then(m => m.BodyModule)
      }
    ]
  },{
    path: '**',
    redirectTo: 'dashboard'
  }

 

];

/*
const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'coupens', component: CoupensComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'media', component: MediaComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'siderbar', component: SidebarComponent}
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
