import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
import { EstacionService } from '../services/estacion.service';
import { Calculo } from '../shared/models/calculo.interface';
import { UsersService } from '../shared/user.service';
import * as Highcharts from 'highcharts';



declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.scss']
})
export class CalculosComponent implements OnInit {

  constructor(private service:UsersService, private estacionService: EstacionService,public auth: AuthenticationService,) { }
  data:any;
  calculo:any;
  public activity:any;
  public xData:any;
  public label:any;
  primeraEstacion:number=0;
  options:any;
  show:boolean=false;
  valor:any;
  user: any;
  carga:boolean=false;
  userDetails: any;
  fechaIn:string="";
  fechaFi:string="";
  today:string="";
  todayF:string="";
  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.todayF = new Date().toISOString().split('T')[0];

    this.getAuthUsuario()

    if (this.user.rol == 2) {
      console.log("entreCliente")
      this.getEstacion(this.user.Id);
    }

    if (this.user.rol == 1) {
      console.log("entreAdmin")
      this.ObtenerEstaciones();
    }


    const user = {
      id: this.user.Id,
    };

    this.service.getUsuario(this.user.Id).subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  ObtenerEstaciones() {
    this.estacionService.getAll().subscribe(
      (data) => {
        this.data = data;
        this.valor=data[0].id;
        console.log(this.data);
        console.log(this.valor);
      },
      (error) => {
        console.log(error);
      }
    );
  }
 
  horasFrio():boolean{

    console.log(this.valor)
    console.log(this.today)
    console.log(this.todayF)
    
    if(this.today>this.todayF){
      Swal.fire({
        title: '',
        html: 'La fecha inicial no debe ser mayor a la fecha final',
        imageWidth:"100px",
        icon:'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      });
     return false;
    
    }
    this.carga=true;
    var html="<b style=font-size:26px>Total de horas de frío</b></br>";
    this.estacionService.getHorasFrio(this.valor,this.today,this.todayF)
        .subscribe(data=>{
          this.carga=false;
          this.calculo=data.valid;
          if(this.calculo){
           this.show=true;
           this.histograma(data.histogramTable,data.valor);
           Highcharts.chart('container', this.options);
          }else{
            
           this.show=false;
           Swal.fire({
             title: '',
             html: 'No registra horas frio',
             imageWidth:"100px",
             imageUrl:"../assets/img/icons/sol.png",
             confirmButtonColor: '#083E5E',
             confirmButtonText: 'Aceptar'
           })
          }
        },
        error=>{
          Swal.fire({
            title: 'Error',
            html: error.message,
            imageWidth:"100px",
            imageUrl:"../assets/img/icons/sol.png",
            confirmButtonColor: '#083E5E',
            confirmButtonText: 'Aceptar'
          });
          this.carga=false;
        });
        return true;
  }
  histograma(datas:any,valor?:any){
    var horas =[];
    var fecha=[];
    var titulo = "";
    for(var i=0;i<datas.length;i++){
      if(valor==undefined){
        horas[i]=datas[i].valor;
        fecha[i]=datas[i].mes;
      }else{
        horas[i]=datas[i].horas;
        fecha[i]=datas[i].fecha;
      }
    }

    if(valor!=undefined){
      titulo="<b>Total: </b>"+valor
    }
    
    this.options = {
    title: {
        text: titulo
    },

    xAxis: {
      categories: fecha,
      crosshair: true
    },

    yAxis: [{
        title: { text: 'Data' }
    }, {
        title: { text: 'Histogram' },
        opposite: true
    }],

    plotOptions: {
        histogram: {
            accessibility: {
                pointDescriptionFormatter: function (point:any) {
                    var ix = point.index + 1,
                        x1 = point.x.toFixed(3),
                        x2 = point.x2.toFixed(3),
                        val = point.y;
                    return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                }
            }
        }
    },

    series: [{
      name: 'Data',
      data: horas
  
    }]
};
  }
  radiacionSolar():boolean{

    console.log(this.valor)
    console.log(this.today)
    console.log(this.todayF)
    if(this.today>this.todayF){
      Swal.fire({
        title: '',
        html: 'La fecha inicial no debe ser mayor a la fecha final',
        imageWidth:"100px",
        icon:'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      });
     return false;
    
    }
    this.carga=true;
    var html="<b style=font-size:26px>Total de horas de Radiación Solar</b></br>";
    this.estacionService.getRadiacionSolar(this.valor,this.today,this.todayF)
        .subscribe(data=>{
          this.carga=false;
         this.calculo=data.valor;
         if(this.calculo){
          this.show=true;
          this.histograma(data.histogramTable,data.valor);
          Highcharts.chart('containers', this.options);
         }else{
          this.show=false;
          Swal.fire({
            title: '',
            html: 'No registra horas frio',
            imageWidth:"100px",
            imageUrl:"../assets/img/icons/sol.png",
            confirmButtonColor: '#083E5E',
            confirmButtonText: 'Aceptar'
          })
         }
        },
        error=>{
          Swal.fire(error);
        });
        return true;
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
    console.log(this.user);
  }

  getEstacion(id: number) {
    this.service.getUsuario(id)
      .subscribe(
        data => {
          this.data = data.empresa.estacion;
          this.valor=data.empresa.estacion[0].id;
       
        },
        error => {
          console.log(error);
        });
  }
  changes(event:any){
    this.valor=event.target['value'];
    console.log(this.valor);
  }

  onInduccionFloral(){
    
    console.log(this.valor);
    this.carga=true;
    this.estacionService.getInduccionFloral(this.valor)
    .subscribe(data=>{
      this.carga=false;
     this.calculo=data[0].valor;
     this.histograma(data);
     Highcharts.chart('containerInduccion', this.options);
     console.log(this.calculo);
    
    },
    error=>{
      Swal.fire(error);
    }); 
  }
}
