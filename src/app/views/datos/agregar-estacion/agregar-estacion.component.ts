import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { EstacionService } from "src/app/services/estacion.service";
import { UsersService } from "src/app/shared/user.service";
import Swal from "sweetalert2";
import { ListDatosComponent } from "../list-datos/list-datos.component";

@Component({
  selector: "app-agregar-estacion",
  templateUrl: "./agregar-estacion.component.html",
  styleUrls: ["./agregar-estacion.component.scss"],
})
export class AgregarEstacionComponent implements OnInit {
  user: any;
  userDetails: any;


  nombreEstacion: string | undefined;
  latitud: string | undefined;
  longitud: string | undefined;
  usuario: string | undefined;
  clave: string | undefined;
  token: string | undefined;
  carga: boolean = false;
  empresasDavis: any;
  submitted = false;
  estacionGet:number=1;

  constructor(
    public estacionService: EstacionService,
    public auth: AuthenticationService,
    private router: Router,
    private service: UsersService,
    public dialogRef: MatDialogRef<AgregarEstacionComponent>,
    public empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.getAuthUsuario();
    this.getInfoUsuario();
    this.ObtenerEmpresa();
  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
  }

  getInfoUsuario() {
    this.service.getUsuario(this.user.Id).subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
 
  ObtenerEmpresa() {
    this.empresaService.getAll().subscribe(
      (data) => {
        this.empresasDavis = data;
        var indexOf = this.empresasDavis.findIndex((object:any)=>{
          return object.id===7;
        });

        if(indexOf !== -1){
          this.empresasDavis.splice(indexOf,1);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  register() {
    console.log(this.estacionGet);
    if (
      this.nombreEstacion == "" ||
      this.latitud == undefined ||
      this.longitud == "" ||
      this.usuario == "" ||
      this.clave == undefined ||
      this.token == ""
    ) {
      Swal.fire({
        title: "Atención!",
        text: "Debe de llenar todos los campos",
        icon: "warning",
        confirmButtonColor: "#083E5E",
        confirmButtonText: "Aceptar",
      });
    } else {
      const estacion = {
        nombreEstacion: this.nombreEstacion,
        latitud: this.latitud,
        longitud: this.longitud,
        usuario: this.usuario,
        clave: this.clave,
        token: this.token,
        empresaId: this.estacionGet,
      };
      this.carga=true;
      this.estacionService.create(estacion).subscribe(
        (data) => {
          this.submitted = true;
        },
        (error) => {
          if (error.status == 400) {
            this.carga=false;
            Swal.fire({
              title: "",
              text: error.error,
              icon: "warning",
              confirmButtonColor: "#083E5E",
              confirmButtonText: "Aceptar",
            });
          }

          if (error.status == 200) {
            this.carga=false;
            Swal.fire({
              title: "",
              text: "Se registró la estación correctamente.",
              icon: "success",
              confirmButtonColor: "#083E5E",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close();
           
              }
            });
          }
        }
      );
    }
  }


  
}
