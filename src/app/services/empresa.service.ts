import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 




@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  urlServices: string= environment.urlService;


  constructor(private http: HttpClient) { }

  getAll() {
    const baseUrl = `${this.urlServices}Empresa`;
    return this.http.get(baseUrl);
  }


 


}