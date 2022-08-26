import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListDatosComponent } from '../views/datos/list-datos/list-datos.component';
import { ViewMapComponent } from '../views/mapa/view-map/view-map.component';
import { RegisterComponent } from '../views/register/register.component';
import { AddUserComponent } from '../views/usuario/add-user/add-user.component';
import { DetailsUserComponent } from '../views/usuario/details-user/details-user.component';
import { ListUserComponent } from '../views/usuario/list-user/list-user.component';


export const BodyRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'datos',      component: ListDatosComponent},
    { path: 'mapa',      component: ViewMapComponent},

    //Edicion Usuarios
    { path: 'usuario',      component: ListUserComponent},
    { path: 'usuario-edit/:id',       component: AddUserComponent },
    { path: 'usuario-details/:id',       component: DetailsUserComponent },
    { path: 'register',       component: RegisterComponent },


];
