import {Injectable} from '@angular/core';
import { GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  auth = false;
  private SERVER_URL = 'https://localhost:7275/api/';

  authState$ = new BehaviorSubject<boolean>(this.auth);

  userRole: number | undefined;

  constructor(
              private httpClient: HttpClient,
              private router: Router) {

   
  }

  //  Login User with Email and Password

  /*
  loginUser(email: string, password: string) {

    this.httpClient.post<ResponseModel>(`${this.SERVER_URL}auth/login`, {email, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.idroles;
          this.authState$.next(this.auth);
          this.userData$.next(data);

          // This code will check and redirect the user to the admin route, assuming it to be http://localhost:4200/admin
          // Change the url to match the route in your code
          console.log(this.userRole);
          if (this.userRole === 777) {
            this.router.navigateByUrl('admin').then();
          }
        }
      });

  }*/

//  Google Authentication




  registerUser(formData: any): Observable<{ message: string }> {
    const {userName, nombres, apellidos,correo, contrasena,tipoDocumento,nroDocumento} = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}Usuario/agregar`, {
      userName,
      nombres,
      apellidos,
      contrasena,
      correo,
      tipoDocumento,
      nroDocumento
    });
  }




}


export interface ResponseModel {
  token: string;
  auth: boolean;
  userName:string,
  nombres:string,
  apellidos:string,
  password:string,
  correo:string,
  tipoDocumento:string,
  nroDocumento:number

}