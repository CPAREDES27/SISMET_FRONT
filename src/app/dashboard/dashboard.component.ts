import { DataDavisDt } from './../shared/models/DataDavis.interface';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/user.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { AuthenticationService } from '../services/authentication.service';

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
 
 

 DataDavisDt: any;

  public ngAfterViewInit(): void {
    this.createChartGauge();
    this.createChartPiramide();
  }



  private createChartGauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Gauge Chart',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '35%'],
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
        data: [40],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
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
          text: 'Column Chart',
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
            text: 'Total percent market share'
          }
      
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
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
              format: '{point.y:.1f}%'
            }
          }
        },
        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Et_Day",
                y: this.DataDavisDt.davis_current_observation.Et_Day ,
                drilldown: "Chrome"
              },
              {
                name: "Firefox",
                y: 15.50,
                drilldown: "Firefox"
              },
              {
                name: "Internet Explorer",
                y: 14,
                drilldown: "Internet Explorer"
              }
            ]
          }
        ],
        drilldown: {
          breadcrumbs: {
            position: {
              align: 'right'
            }
          },
          series: [
            {
              name: "Chrome",
              id: "Chrome",
              data: [
                [
                  "v65.0",
                  0.1
                ],
                [
                  "v64.0",
                  1.3
                ],
                [
                  "v63.0",
                  53.02
                ],
                [
                  "v62.0",
                  1.4
                ],
                [
                  "v61.0",
                  0.88
                ],
                [
                  "v60.0",
                  0.56
                ],
                [
                  "v59.0",
                  0.45
                ],
                [
                  "v58.0",
                  0.49
                ],
                [
                  "v57.0",
                  0.32
                ],
                [
                  "v56.0",
                  0.29
                ],
                [
                  "v55.0",
                  0.79
                ],
                [
                  "v54.0",
                  0.18
                ],
                [
                  "v51.0",
                  0.13
                ],
                [
                  "v49.0",
                  2.16
                ],
                [
                  "v48.0",
                  0.13
                ],
                [
                  "v47.0",
                  0.11
                ],
                [
                  "v43.0",
                  0.17
                ],
                [
                  "v29.0",
                  0.26
                ]
              ]
            },
            {
              name: "Firefox",
              id: "Firefox",
              data: [
                [
                  "v58.0",
                  1.02
                ],
                [
                  "v57.0",
                  7.36
                ],
                [
                  "v56.0",
                  0.35
                ],
                [
                  "v55.0",
                  0.11
                ],
                [
                  "v54.0",
                  0.1
                ],
                [
                  "v52.0",
                  0.95
                ],
                [
                  "v51.0",
                  0.15
                ],
                [
                  "v50.0",
                  0.1
                ],
                [
                  "v48.0",
                  0.31
                ],
                [
                  "v47.0",
                  0.12
                ]
              ]
            },
            {
              name: "Internet Explorer",
              id: "Internet Explorer",
              data: [
                [
                  "v11.0",
                  6.2
                ],
                [
                  "v10.0",
                  0.29
                ],
                [
                  "v9.0",
                  0.27
                ],
                [
                  "v8.0",
                  0.47
                ]
              ]
            }
            
          ]
        }
      } as any
    );

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


  




    
    this.ObtenerEstaciones();
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

ObtenerHighcharts(idEstacion:any) {
 
    this.estacionService.get(idEstacion).subscribe(
      (data) => {
        this.DataDavisDt = data;
        console.log(data);
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

  getEstacion(id: number) {

    this.service.getUsuario(id)
      .subscribe(
        data => {
          this.currentEstacion = data.empresa.estacion;

          this.ObtenerHighcharts(this.currentEstacion[0].id);
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


