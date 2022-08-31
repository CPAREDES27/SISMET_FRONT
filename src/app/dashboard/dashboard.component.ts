import { DataDavisDt } from './../shared/models/DataDavis.interface';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/user.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { AuthenticationService } from '../services/authentication.service';

import { JwtDecodeOptions } from 'jwt-decode';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsColumn from 'highcharts/modules/drilldown';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HighchartsColumn(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
 

 DataDavisDt?: DataDavisDt;

 



  private createChartGauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Radiación Solar',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '55%'],
        size: '100%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [Number(this.DataDavisDt?.davis_current_observation.solar_radiation)],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y} </span><br><span>W/m²</span></div>',
        },
      }],
    } as any);

 
  }

  private createChartPiramide(): void {
    
    const chart = Highcharts.chart(
      'chart-column' as any,
      {
        chart: {
          type: 'column',
        },
        title: {
          text: 'ET',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total cantidades'
          }
      
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px"></span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> en Total<br/>'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            }
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}'
            }
          }
        },
        
        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Día",
                y: Number(this.DataDavisDt?.davis_current_observation.et_day),
                drilldown: "Día"
              },
              {
                name: "Mes",
                y: Number(this.DataDavisDt?.davis_current_observation.et_month),
                drilldown: "Mes"
              },
              {
                name: "Año",
                y: Number(this.DataDavisDt?.davis_current_observation.et_year),
                drilldown: "Año"
              
              }
            ]
          }
        ],
        
      
          
      } as any
    );

  }

  private createChartPiramideRain(): void {
    
    const chart = Highcharts.chart(
      'chart-columnRain' as any,
      {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Lluvia',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total cantidades'
          }
      
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px"></span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> en Total<br/>'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            }
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}'
            }
          }
        },
        
        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Día",
                y: Number(this.DataDavisDt?.davis_current_observation.rain_day_in),
                drilldown: "Día"
              },
              {
                name: "Mes",
                y: Number(this.DataDavisDt?.davis_current_observation.rain_month_in),
                drilldown: "Mes"
              },
              {
                name: "Año",
                y: Number(this.DataDavisDt?.davis_current_observation.rain_year_in),
                drilldown: "Año"
              }
            ]
          }
        ],
        
            
          
      } as any
    );

  }


  private createChartTemperatura(): void {
    
    const chart = Highcharts.chart(
      'chart-Temperatura' as any,
      {
        chart: {
          type: 'column'
      },
      title: {
          text: 'Temperatura del día'
      },
      xAxis: {
          categories: ['Hoy']
      },
      yAxis: {
          title: {
              text: 'Temperatura °C'
          }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px"></span><br>',
        pointFormat: '<span style="color:{point.color}"><b>{series.name}</b></span>: <b>{point.y:.2f}</b> a las <b>{point.name}</b><br/>'
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Temp. Alta',
          
          data: [{
            name: this.DataDavisDt?.davis_current_observation.temp_day_high_time,
            y: Number(this.DataDavisDt?.davis_current_observation.temp_day_high_f)
          }],
          fecha: this.DataDavisDt?.davis_current_observation.temp_day_high_time
      }, {
          name: 'Temp. Baja',
          data: [{
            name: this.DataDavisDt?.davis_current_observation.temp_day_low_time,
            y: Number(this.DataDavisDt?.davis_current_observation.temp_day_low_f)
          }],
          fecha: this.DataDavisDt?.davis_current_observation.temp_day_low_time
      }]
      } as any
    );

  }

  private createChartGaugeUvIndex(): void {
    const chart = Highcharts.chart('chart-gaugeUv', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'UV',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '55%'],
        size: '100%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [Number(this.DataDavisDt?.davis_current_observation.uv_index)],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span><br><span>índice</span></div>',
        },
      }],
    } as any);

 
  }

  private createChartGaugeHumedad(): void {
    const chart = Highcharts.chart('chart-gaugeHumedad', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Humedad',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '55%'],
        size: '100%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [Number(this.DataDavisDt?.relative_humidity)],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y} %</span></div>',
        },
      }],
    } as any);

 
  }
//example

//example

  userDetails: any;

  public focus: any;
  public listTitles!: any[];
  public location: Location;
  estacion_mk: any;
  empresa_Id: any;
  currentEstacion: any;
  usuario_mk:any;

  currentUsuario: any;
  currentIndex = -1;

  station_mk: any

  stations = {

    id: "",
    nombreEstacion: ""

  }

  estaciones = {

    existe: false,
    dewpoint_c: "",
    pressure_mb: "",
    pressure_string: "",
    relative_humidity: "",
    temp_c: "",
    temperature_string: "",
    wind_degrees: "",
    wind_dir: "",
    wind_kt: "",
    davis_current_observation: {
      et_day: "",
      et_month: "",
      et_year: "",
      rain_day_in: "",
      rain_month_in: "",
      rain_year_in: "",
      solar_radiation: "",
      temp_day_high_f: "",
      temp_day_high_time: "",
      temp_day_low_f: "",
      temp_day_low_time: "",
      uv_index: ""}
  }


  usuario = {

      id: '',
      userName: '',
      contrasena: '',
      nombres: '',
      apellidos: '',
      estado: '',
      intentos: '',
      fechaCreacion: '',
      fechaModificacion: '',
      tipoDocumento: '',
      nroDocumento: '',
      correo: '',
      empresaId: '',
      empresa: {
        id: '',
        nombre: '',
        descripcion: '',
        estacion: [
          {
            id: '',
            nombreEstacion: '',
            latitud: '',
            longitud: '',
            usuario: '',
            clave: '',
            token: ''
          },
        
        ]
      },
      rolId: '',
      rol: {
        id: '',
        nombre: '',
        descripcion: '',
        estado: ''
      }


  }


  constructor(location: Location, public auth: AuthenticationService, public router: Router, private route: ActivatedRoute,public estacionService: EstacionService, private element: ElementRef,private service: UsersService,private estacion:EstacionService) {
    this.location = location
  }

  
   ngOnInit() {
     this.getEstacion(1);
    
    this.getRol();
   
    const user = {
      id: 1

    };

    this.service.getUsuario(1).subscribe(
      res => {
        let headers = new Headers();

        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );


  }

  changes(event:any){
    console.log(event.target['value']);
    var idEstacion = event.target['value'];
    this.ObtenerHighcharts(idEstacion);
   
    
  }
  ngAfterViewInit(){
    this.createChartGauge();
        
  }
 ObtenerHighcharts(idEstacion:any) {
 
    this.estacionService.get(idEstacion).subscribe(
      (data) => {
        
        this.DataDavisDt = data;
        this.createChartGauge();
        this.createChartPiramide();
        this.createChartPiramideRain();
        this.createChartTemperatura();
        this.createChartGaugeUvIndex();
        this.createChartGaugeHumedad();

        console.log(this.DataDavisDt);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  ObtenerEstaciones() {
    this.estacionService.getAll().subscribe(
      (data) => {
        this.currentEstacion = data;
       
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  ObtenerEstacionesDelUsuario() {
    this.service.getUsuario(1).subscribe(
      (data) => {
        this.usuario_mk = data;
        
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList() {
    this.currentEstacion = null;
    this.currentIndex = -1;
  }

  setActiveTutorialSave(usuario: null, index: number) {
    this.currentEstacion= usuario;
    this.currentIndex = index;
  }

  getRol(){
    this.auth.getUsuarioPerfil()
  }
  onChange(event:any){
    console.log(event.target['value']);
  }
   getEstacion(id: number) {

    this.service.getUsuario(1)
      .subscribe(
        data => {
          this.currentEstacion = data.empresa.estacion;
          this.ObtenerHighcharts(this.currentEstacion[0].id)
        },
        error => {
          console.log(error);
        });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }











 

}


