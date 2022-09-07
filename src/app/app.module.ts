import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { 
  BrowserAnimationsModule 
} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule, NgbActiveModal,NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsersService } from './shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RecuperarPassowordComponent } from './views/recuperar-passoword/recuperar-passoword.component';
import { AddUserComponent } from './views/usuario/add-user/add-user.component';
import { ListUserComponent } from './views/usuario/list-user/list-user.component';
import { DetailsUserComponent } from './views/usuario/details-user/details-user.component';
import { ListDatosComponent } from './views/datos/list-datos/list-datos.component';
import { ViewMapComponent } from './views/mapa/view-map/view-map.component';
import { RegisterUserComponent } from './views/usuario/register-user/register-user.component';
import { CalculosComponent } from './Calculos/calculos.component';
import { EstacionComponent } from './estacion/estacion.component';
import { MatSliderModule } from '@angular/material/slider';;
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgregarEstacionComponent } from './views/datos/agregar-estacion/agregar-estacion.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CambiarContrasenaComponent } from './views/usuario/cambiar-contrasena/cambiar-contrasena.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CuentaComponent } from './views/cuenta/cuenta.component';

@NgModule({
  declarations: [
    // LoginComponent,
    AppComponent,
    SidenavComponent,
    SidebarComponent,
    AuthLayoutComponent,
    FooterComponent,
    BodyComponent,
    NavbarComponent,
    RecuperarPassowordComponent,
    AddUserComponent,
    ListUserComponent,
    DetailsUserComponent,
    ListDatosComponent,
    ViewMapComponent,
    RegisterUserComponent,
    CalculosComponent,
    EstacionComponent,
    AgregarEstacionComponent,
    CambiarContrasenaComponent,
    MatSpinnerOverlayComponent,
    CuentaComponent,
 

  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgbModule,
    NgxPaginationModule,

    ToastrModule.forRoot({
      progressBar: true
    }),
  ],
  providers: [UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  AgregarEstacionComponent],
  entryComponents:[MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
