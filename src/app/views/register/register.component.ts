import { Component, OnInit } from "@angular/core";
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { map } from "rxjs/operators";
import { UsersService } from "src/app/shared/user.service";
import { RolService } from "src/app/services/rol.service";
import { EmpresaService } from "src/app/services/empresa.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ThisReceiver } from "@angular/compiler";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  empresa_mk: any;
  rol_mk: any;
  currentEmpresa: any;
  currentIndex = -1;

  empresas = {
    id: "",
    nombre: "",
  };

  roles = {
    id: "",
    nombre: "",
    descripcion: "",
    estado: true,
  };

  submitted = false;

  userName: string | undefined;
  contrasena: string | undefined;
  nombres: string | undefined;
  apellidos: string | undefined;
  tipoDocumento: string | undefined;
  nroDocumento: string | undefined;
  correo: string | undefined;
  rolId: string | undefined;
  empresaId: string | undefined;
  passwordError: boolean | undefined;

  constructor(
    public router: Router,
    public userService: UsersService,
    public rolService: RolService,
    public empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
    this.ObtenerRoles();
    this.ObtenerEmpresa();
  }

  ObtenerRoles() {
    this.rolService.getAll().subscribe(
      (data) => {
        this.rol_mk = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ObtenerEmpresa() {
    this.empresaService.getAll().subscribe(
      (data) => {
        this.empresa_mk = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  register() {
    if (this.userName =='' || this.correo ==undefined || this.correo==''|| this.nombres =='' || this.nombres ==undefined || this.apellidos=='' || this.apellidos==undefined||
    this.tipoDocumento == undefined || this.nroDocumento==undefined || this.nroDocumento =='' || this.empresaId==undefined || this.rolId==undefined){
      Swal.fire({
        title: 'Atención!',
        text: "Debe de llenar todos los campos",
        icon: 'warning',
        confirmButtonColor: '#083E5E',
        confirmButtonText: 'Aceptar'
      })
    }
    else{
      const user = {
        userName: this.userName,
        contrasena: this.contrasena,
        nombres: this.nombres,
        apellidos: this.apellidos,
        tipoDocumento: this.tipoDocumento,
        nroDocumento: this.nroDocumento,
        correo: this.correo,
        rolId: this.rolId,
        empresaId: this.empresaId,
      };
      this.userService.register(user).subscribe(
        (data) => {
          this.userService.setToken(data.token);
        },
        (error) => {
          if (error.status == 400) {
            Swal.fire({
              title: '',
              text: error.error,
              icon: 'warning',
              confirmButtonColor: '#083E5E',
              confirmButtonText: 'Aceptar'
            })
          }
  
          if (error.status == 200) {
            Swal.fire({
              title: '',
              text: "Se registró el usuario correctamente.",
              icon: 'success',
              confirmButtonColor: '#083E5E',
              confirmButtonText: 'Aceptar',
              timer: 6000
            }).then((result) =>{
              if(result.isConfirmed){
                this.router.navigateByUrl("/usuario");
              }
            })
            
          }
        }
      );
    }


    
  }
}
 