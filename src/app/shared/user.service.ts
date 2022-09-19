import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CookieService } from "ngx-cookie-service";
import { Root } from "./models/administrador.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root" 
})
export class UsersService {
  urlServices: string= environment.urlService;
  constructor(private http: HttpClient, private cookies: CookieService) {}

  private dataEstacion:any;

  setDataEstacion(data:any){
    this.dataEstacion=data;
    console.log(this.dataEstacion);
  }
  get getDataEstacion(){
   return this.dataEstacion;
  }
  login(user: any): Observable<any> {
    const baseUrl = `${this.urlServices}Seguridad`;
    return this.http.post(`${baseUrl}/login`, user);
  }
  register(user: any): Observable<any> {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.post(`${baseUrl}/agregar`, user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
 
 

  getUsuario(id: any) {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.get<Root>(`${baseUrl}/${id}`);
  }
}
