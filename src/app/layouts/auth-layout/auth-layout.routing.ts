import { Routes } from '@angular/router';
import { RecuperarPassowordComponent } from 'src/app/views/recuperar-passoword/recuperar-passoword.component';
import { AddUserComponent } from 'src/app/views/usuario/add-user/add-user.component';

import { LoginComponent } from '../../views/login/login.component';
import { RegisterComponent } from '../../views/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'recuperar',       component: RecuperarPassowordComponent },

];


