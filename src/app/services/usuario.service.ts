import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Usuarios } from '../shared/models/usuario.interface';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlServices: string= environment.urlService;
  constructor(private http: HttpClient) { }

 
  get(id: any) {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any):Observable<Usuarios> {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.post<Usuarios>(`${baseUrl}/ObtenerUsuarios`, data);
  }

  update(id: any, data: any) {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any) {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.delete(`${baseUrl}/${id}`);
  }

  recuperar(data: any) {
    const baseUrl = `${this.urlServices}Usuario`;
    return this.http.post(`${baseUrl}/CambiarContrasena`,data);
  }


 


}