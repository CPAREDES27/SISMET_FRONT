import { Injectable } from "@angular/core";
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  auth = false;
  urlServices: string = environment.urlService;
  private SERVER_URL = this.urlServices;

  authState$ = new BehaviorSubject<boolean>(this.auth);

  userRole: number | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(formData: any): Observable<{ message: string }> {
    const {
      userName,
      nombres,
      apellidos,
      correo,
      contrasena,
      tipoDocumento,
      nroDocumento,
    } = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(
      `${this.SERVER_URL}Usuario/agregar`,
      {
        userName,
        nombres,
        apellidos,
        contrasena,
        correo,
        tipoDocumento,
        nroDocumento,
      }
    );
  }
}

export interface ResponseModel {
  token: string;
  auth: boolean;
  userName: string;
  nombres: string;
  apellidos: string;
  password: string;
  correo: string;
  tipoDocumento: string;
  nroDocumento: number;
}
