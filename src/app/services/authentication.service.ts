import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment'; 




const baseUrl = 'Empresa';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  urlServices: string= environment.urlService;
  private rol:string="";
  

  constructor(private http: HttpClient) { }

  getUsuarioPerfil() {
    
    var token = localStorage.getItem('token');
    if(token != null)
    this.rol=jwtDecode(token)
    console.log(this.rol)
  }


 


}