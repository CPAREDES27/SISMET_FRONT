import { DataDavisDt } from './../shared/models/DataDavis.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Observable } from 'rxjs';
import { Calculo } from '../shared/models/calculo.interface';
import { EstacionAll, Root } from '../shared/models/administrador.interface';





@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  urlServices: string= environment.urlService;
  constructor(private http: HttpClient) { }

  get(id: any) {
    const baseUrl = `${this.urlServices}davis`;
    return this.http.get<DataDavisDt>(`${baseUrl}/${id}`);
  }

  getEstation(id: any) {
    const baseUrl = `${this.urlServices}davis`;
    return this.http.get<Root>(`${baseUrl}/${id}`);
  }
  create(data: any) {
    const baseUrl = `${this.urlServices}davis`;
    return this.http.post(`${baseUrl}/CrearEstacion`, data);
  }
  getAll():Observable<EstacionAll[]> {
    const baseUrl = `${this.urlServices}davis`;
    return this.http.get<EstacionAll[]>(`${baseUrl}/GetEstaciones`);
  }
  getHorasFrio(id:number,fechaI:string,fechaF:string):Observable<Calculo>{
    const baseUrl = `${this.urlServices}davis`;
    return this.http.get<Calculo>(`${baseUrl}/${id}/${fechaI}/${fechaF}`);
  }


  getRadiacionSolar(id:number,fechaI:string,fechaF:string):Observable<Calculo>{
    const baseUrl = `${this.urlServices}davis/RadiacionSolar`;
    return this.http.get<Calculo>(`${baseUrl}/${id}/${fechaI}/${fechaF}`);
  }

  getInduccionFloral(id:number):Observable<Calculo[]>{
    const baseUrl = `${this.urlServices}davis/InduccionFloral`;
    return this.http.get<Calculo[]>(`${baseUrl}/${id}`);
  }

}