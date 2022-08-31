import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CookieService } from "ngx-cookie-service";
import { Root } from "./models/administrador.interface";

@Injectable({
  providedIn: "root"
})
export class UsersService {
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
    return this.http.post("https://localhost:7275/api/Seguridad/login", user);
  }
  register(user: any): Observable<any> {
    return this.http.post("https://localhost:7275/api/Usuario/agregar", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
 

  getUsuario(id: any) {
    return this.http.get<Root>(`https://localhost:7275/api/Usuario/${id}`);
  }
}
