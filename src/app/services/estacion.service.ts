import { DataDavisDt } from './../shared/models/DataDavis.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 





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

  getAll() {
    const baseUrl = `${this.urlServices}davis`;
    return this.http.get(`${baseUrl}/GetEstaciones`);
  }


 


}