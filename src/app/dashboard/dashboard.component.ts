import { DataDavisDt } from "./../shared/models/DataDavis.interface";
import { Component, OnInit, ElementRef } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/shared/user.service";
import { EstacionService } from "src/app/services/estacion.service";
import { AuthenticationService } from "../services/authentication.service";

import { JwtDecodeOptions } from "jwt-decode";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import HighchartsColumn from "highcharts/modules/drilldown";
import HighchartsAccess from "highcharts/modules/accessibility";
import HighchartData from "highcharts/modules/data";
import HighchartExportData from "highcharts/modules/export-data";

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HighchartsColumn(Highcharts);
HighchartExportData(Highcharts);
HighchartData(Highcharts);
HighchartsAccess(Highcharts);
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    carga:boolean=false;
  DataDavisDt?: DataDavisDt;
  fechaFinal : string="";
  private createChartGauge(): void {
    const chart = Highcharts.chart("chart-gauge", {
      chart: {
        type: "solidgauge",
      },
      title: {
        useHTML: true,
        text: "<img style='text-align:center' src='../assets/img/icons/radsol.png' width='35' height='30' > Radiación Solar",
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "55%"],
        size: "100%",
        background: {
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      },
      yAxis: {
        min: 0,
        max: Number(this.DataDavisDt?.davis_current_observation.solar_radiation),
        stops: [
          [0.1, "#55BF3B"], // green
          [0.5, "#DDDF0D"], // yellow
          [0.9, "#DF5353"], // red
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
      series: [
        {
          name: null,
          data: [
            Number(this.DataDavisDt?.davis_current_observation.solar_radiation),
          ],
          dataLabels: {
            format:
              '<div style="text-align: center"><span style="font-size: 1.25rem">{y} </span><br><span>W/m²</span></div>',
          },
        },
      ],
    } as any);
  }
  
  getFechaActual(){
    var fecha = new Date();
    var mes = fecha.getMonth();
    var mesF="";
    var hora = fecha.getHours();
    var minuto = fecha.getMinutes();
    var minutoF="";
    if(minuto<10){
      minutoF=minuto.toString();
      minutoF="0"+minutoF;
    }else{
      minutoF=minuto.toString();
      
    }
    if(mes<10){
      mes=mes+1;
      mesF= mes.toString();
      mesF= "0"+mesF;
    }else{
      mes=mes+1;
      mesF = mes.toString();
    }
    var dia = fecha.getDate();
    var anio = fecha.getFullYear();
    this.fechaFinal=hora+":"+minutoF +" del "+ dia+"/"+mesF+"/"+anio;
  }

  private createChartPiramide(): void {
    const chart = Highcharts.chart(
      "chart-column" as any,
      {
        chart: {
          type: "column",
        },
        title: {
          text: "ET",
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "Total cantidades (mm)",
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px"></span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> en Total<br/>',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}",
            },
          },
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Día",
                y: Number(this.DataDavisDt?.davis_current_observation.et_day),
                drilldown: "Día",
              },
              {
                name: "Mes",
                y: Number(this.DataDavisDt?.davis_current_observation.et_month),
                drilldown: "Mes",
              },
              {
                name: "Año",
                y: Number(this.DataDavisDt?.davis_current_observation.et_year),
                drilldown: "Año",
              },
            ],
            dataLabels: {
              format:
                '<div>{y} mm</div>',
            },
          },
        ],
      } as any
    );
  }

  private createChartPiramideRain(): void {
    const chart = Highcharts.chart(
      "chart-columnRain" as any,
      {
        chart: {
          type: "column",
        },
        title: {
          text: "Lluvia",
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "Total cantidades (mm)",
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px"></span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> en Total<br/>',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}",
            },
          },
        },

        series: [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Día",
                y: Number(
                  this.DataDavisDt?.davis_current_observation.rain_day_in
                ),
                drilldown: "Día",
              },
              {
                name: "Mes",
                y: Number(
                  this.DataDavisDt?.davis_current_observation.rain_month_in
                ),
                drilldown: "Mes",
              },
              {
                name: "Año",
                y: Number(
                  this.DataDavisDt?.davis_current_observation.rain_year_in
                ),
                drilldown: "Año",
              },
            ],
            dataLabels: {
              format:
                '<div>{y} mm</div>',
            },
          },
        ],
      } as any
    );
  }

  private createChartTemperatura(): void {
    const chart = Highcharts.chart(
      "chart-Temperatura" as any,
      {
        chart: {
          type: "column",
        },
        title: {
          text: "Temperatura del Aire",
        },
        xAxis: {
          categories: ["Hoy"],
        },
        yAxis: {
          title: {
            text: "Temperatura °C",
          },
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px"></span><br>',
          pointFormat:
            '<span style="color:{point.color}"><b>{series.name}</b></span>: <b>{point.y:.2f}</b> a las <b>{point.name}</b><br/>',
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Temp. Máxima",

            data: [
              {
                name: this.DataDavisDt?.davis_current_observation
                  .temp_day_high_time,
                y: Number(
                  this.DataDavisDt?.davis_current_observation.temp_day_high_f
                ),
              },
            ],

            fecha:
              this.DataDavisDt?.davis_current_observation.temp_day_high_time,
          },
          {
            name: "Temp. Mínima",
            data: [
              {
                name: this.DataDavisDt?.davis_current_observation
                  .temp_day_low_time,
                y: Number(
                  this.DataDavisDt?.davis_current_observation.temp_day_low_f
                ),
              },
            ],
            fecha:
              this.DataDavisDt?.davis_current_observation.temp_day_low_time,
          },

        ],
      } as any
    );
  }

  private createChartGaugeUvIndex(): void {
    const chart = Highcharts.chart("chart-gaugeUv", {
      chart: {
        type: "solidgauge",
        
      },
      title: {
        useHTML: true,
        text: "<img style='text-align:center' src='../assets/img/icons/raduv.png' width='35' height='30' > Radiación UV"
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "55%"],
        size: "100%",
        background: {
         
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, "#55BF3B"], // green
          [0.5, "#DDDF0D"], // yellow
          [0.9, "#DF5353"], // red
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
      series: [
        {
          name: null,
          data: [Number(this.DataDavisDt?.davis_current_observation.uv_index)],
          dataLabels: {
            format:
              '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span><br><span>índice</span></div>',
          },
        },
      ],
    } as any);
  }

  private createChartGaugeHumedad(): void {
    const chart = Highcharts.chart("chart-gaugeHumedad", {
      chart: {
        type: "solidgauge",
      },
      title: {
        useHTML: true,
        text: "<img style='text-align:center' src='../assets/img/icons/HR.png' width='35' height='30' > Humedad Relativa"
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "55%"],
        size: "100%",
        background: {
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "arc",
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, "#55BF3B"], // green
          [0.5, "#DDDF0D"], // yellow
          [0.9, "#DF5353"], // red
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
      series: [
        {
          name: null,
          data: [Number(this.DataDavisDt?.relative_humidity)],
          dataLabels: {
            format:
              '<div style="text-align: center"><span style="font-size: 1.25rem">{y} %</span></div>',
          },
        },
      ],
    } as any);
  }



  private createChartWindRose(): void {


    const chart = Highcharts.chart("chart-windrose", {
      data: {
        table: 'freq',
        startRow: 1,
        endRow: 17,
        endColumn: 7
      },

      chart: {
        polar: true,
        type: 'column'
      },

      title: {
        text: 'Dirección de viento',
        align: 'left'
      },

      subtitle: {
        text: '',
        align: 'left'
      },

      pane: {
        size: '85%'
      },

      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical'
      },

      xAxis: {
        tickmarkPlacement: 'on'
      },

      yAxis: {
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        title: {
          text: ''
        },
        // labels: {
        //   formatter: function () {
        //     return this.value + '%';
        //   }
        // },
        reversedStacks: false
      },

      tooltip: {
        valueSuffix: ''
      },

      plotOptions: {
        series: {
          stacking: 'normal',
          shadow: false,
          groupPadding: 0,
          pointPlacement: 'on'
        }
      }
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
  usuario_mk: any;
  user: any;

  WindDire: any;

  NorthBool: Number = 0;
  NorthNorthEastBool: number = 0;
  NorthEastBool: number = 0;
  EastNorthEastBool: number = 0;
  EastBool: number = 0;
  EastSouthEastBool: number = 0;
  SouthEastBool: number = 0;
  SouthSouthEastBool: number = 0;
  SouthBool: number = 0;
  SouthSouthWestBool: number = 0;
  SouthWestBool: number = 0;
  WestSouthWestBool: number = 0;
  WestBool: number = 0;
  WestNorthWestBool: number = 0;
  NorthWestBool: number = 0;
  NorthNorthWestBool: number = 0;

  currentUsuario: any;
  currentIndex = -1;
  estacionActual: number = 0;
  station_mk: any;

  stations = {
    id: "",
    nombreEstacion: "",
  };

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
      uv_index: "",
    },
  };

  usuario = {
    id: "",
    userName: "",
    contrasena: "",
    nombres: "",
    apellidos: "",
    estado: "",
    intentos: "",
    fechaCreacion: "",
    fechaModificacion: "",
    tipoDocumento: "",
    nroDocumento: "",
    correo: "",
    empresaId: "",
    empresa: {
      id: "",
      nombre: "",
      descripcion: "",
      estacion: [
        {
          id: "",
          nombreEstacion: "",
          latitud: "",
          longitud: "",
          usuario: "",
          clave: "",
          token: "",
        },
      ],
    },
    rolId: "",
    rol: {
      id: "",
      nombre: "",
      descripcion: "",
      estado: "",
    },
  };

  constructor(
    location: Location,
    public auth: AuthenticationService,
    public router: Router,
    private route: ActivatedRoute,
    public estacionService: EstacionService,
    private element: ElementRef,
    private service: UsersService
  ) {
    this.location = location;
  }

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") === undefined){
      this.router.navigateByUrl("/login");
    }
    this.getFechaActual();
    this.getAuthUsuario();

    if (this.user.rol == 2) {
      this.getEstacion(this.user.Id);
    }

    if (this.user.rol == 1) {
      this.ObtenerEstaciones();
    }

    this.getRol();

    const user = {
      id: this.user.Id,
    };

    this.service.getUsuario(this.user.Id).subscribe(
      (res) => {
        let headers = new Headers();
     
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
       
      }
    );
  }

  changes(event: any) {
    var idEstacion = event.target["value"];
    this.estacionActual = idEstacion;
    this.ObtenerHighcharts(idEstacion);
  }
  ngAfterViewInit() {
    this.createChartGauge();
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
  }
  actualizar() {
    this.ObtenerHighcharts(this.estacionActual);
    this.getFechaActual();
  }

  ObtenerTablaWindRose() {

    if (this.DataDavisDt?.wind_dir == 'North') {
      this.NorthBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'North-northeast') {
      this.NorthNorthEastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'Northeast') {
      this.NorthEastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'East-northeast') {
      this.EastNorthEastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'East') {
      this.EastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'East-southeast') {
      this.EastSouthEastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'Southeast') {
      this.SouthEastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'South-southeast') {
      this.SouthSouthEastBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'South') {
      this.SouthBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'South-southwest') {
      this.SouthSouthWestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'Southwest') {
      this.SouthWestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthSouthWestBool = 0;
      this.WestSouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'West-southwest') {
      this.WestSouthWestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthSouthWestBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'West') {
      this.WestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'West-northwest') {
      this.WestNorthWestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.NorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'Northwest') {
      this.NorthWestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthSouthWestBool = 0;
      this.SouthWestBool = 0;
      this.WestSouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthNorthWestBool = 0;
    } else if (this.DataDavisDt?.wind_dir == 'Northnorthwest') {
      this.NorthNorthWestBool = Number(this.DataDavisDt?.wind_degrees);
      this.NorthBool = 0;
      this.NorthNorthEastBool = 0;
      this.NorthEastBool = 0;
      this.EastNorthEastBool = 0;
      this.EastBool = 0;
      this.EastSouthEastBool = 0;
      this.SouthEastBool = 0;
      this.SouthSouthEastBool = 0;
      this.SouthBool = 0;
      this.SouthWestBool = 0;
      this.WestBool = 0;
      this.WestNorthWestBool = 0;
      this.NorthWestBool = 0;
    }

  }

  ObtenerHighcharts(idEstacion: any) {
    this.carga = true;
    this.estacionService.get(idEstacion).subscribe(
      (data) => {
        this.DataDavisDt = data;
        this.DataDavisDt.davis_current_observation.et_day = Number(this.DataDavisDt.davis_current_observation.et_day).toFixed(1);
        this.DataDavisDt.davis_current_observation.et_month = Number(this.DataDavisDt.davis_current_observation.et_month).toFixed(1);
        this.DataDavisDt.davis_current_observation.et_year = Number(this.DataDavisDt.davis_current_observation.et_year).toFixed(1);
        this.DataDavisDt.davis_current_observation.rain_day_in = Number(this.DataDavisDt.davis_current_observation.rain_day_in).toFixed(1);
        this.DataDavisDt.davis_current_observation.rain_month_in = Number(this.DataDavisDt.davis_current_observation.rain_month_in).toFixed(1);
        this.DataDavisDt.davis_current_observation.rain_year_in = Number(this.DataDavisDt.davis_current_observation.rain_year_in).toFixed(1);
        this.ObtenerTablaWindRose();
        this.createChartGauge();
        this.createChartPiramide();
        this.createChartPiramideRain();
        this.createChartTemperatura();
        this.createChartGaugeUvIndex();
        this.createChartGaugeHumedad();
        //this.createChartWindRose();
        this.carga=false;


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
        this.estacionActual = this.currentEstacion[0].id;
        this.ObtenerHighcharts(this.currentEstacion[0].id);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  ObtenerEstacionesDelUsuario() {
    this.service.getUsuario(this.user.Id).subscribe(
      (data) => {
        this.usuario_mk = data;

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
    this.currentEstacion = usuario;
    this.currentIndex = index;
  }

  getRol() {
    this.auth.getUsuarioPerfil();
  }
  onChange(event: any) {
  }
  getEstacion(id: number) {
    
    this.service.getUsuario(this.user.Id).subscribe(
      (data) => {
        this.currentEstacion = data.empresa.estacion;
        this.estacionActual = this.currentEstacion[0].id;
        this.ObtenerHighcharts(this.currentEstacion[0].id);
     
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
}
