import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Observable } from 'rxjs';
import { Estaciones } from '../shared/models/estacion.interface';


@Injectable({
    providedIn: 'root'
  })
  export class DatosService {
    urlServices: string= environment.urlService;
    constructor(private http: HttpClient) { }
  
    postDavis(data:any):Observable<Estaciones>{
      const baseUrl = `${this.urlServices}Davis`;
      return this.http.post<Estaciones>(baseUrl,data);
    }

    ExportarDatos(data:any): Observable<any>{
      const baseUrl = `${this.urlServices}Davis/ExportarData`;
      return this.http.post(baseUrl,data, {responseType:'blob'});
    }
  
  }