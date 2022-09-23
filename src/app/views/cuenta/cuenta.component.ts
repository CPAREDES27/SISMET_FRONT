import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";
import { CambiarContrasenaComponent } from '../usuario/cambiar-contrasena/cambiar-contrasena.component';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  empresa_mk: any;
  rol_mk: any;
  user: any;
  currentEmpresa: any;
  mensaje: string = "";
  colorboton: string = "";

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




  usuarios_mk: any;
  currentUsuario: any;
  currentIndex = -1;
  userName = '';
  message = '';


  usuarios = {
    userName: '',
    contrasena: '',
    nombres: '',
    apellidos: '',
    estado: true,
    intentos: 0,
    fechaCreacion: '',
    fechaModificacion: '',
    tipoDocumento: '',
    nroDocumento: '',
    correo: '',
    rolId: '',
    empresaId: ''

  };



  submitted = false;

  constructor(private dialog: MatDialog, private usuarioService: UsuarioService, private route: ActivatedRoute, public rolService: RolService,
    public empresaService: EmpresaService, public router: Router, public auth: AuthenticationService,) { }

  ngOnInit() {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") === undefined)
    this.router.navigateByUrl("/login");
    this.getAuthUsuario();
    this.getUsuario(this.route.snapshot.paramMap.get("id"));
    this.ObtenerRoles();
    this.ObtenerEmpresa();


  }

  getAuthUsuario() {
    this.user = this.auth.getUsuarioPerfil();
  }


  openDialog() {
    const dialogRef = this.dialog.open(CambiarContrasenaComponent, {
      data: {
        id: this.currentUsuario.id

      }
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }


  ObtenerRoles() {
    this.rolService.getAll().subscribe(
      (data) => {
        this.rol_mk = data;
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
      },
      (error) => {
        console.log(error);
      }
    );
  }


  refreshList() {
    this.currentUsuario = null;
    this.currentIndex = -1;
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  setActiveTutorialSave(usuarios: null, index: number) {
    this.currentUsuario = usuarios;
    this.currentIndex = index;
  }

  //EDIT
  getUsuario(id: string | null) {
    this.usuarioService.get(id)
      .subscribe(
        data => {
          this.currentUsuario = data;
        },
        error => {
          console.log(error);
        });
  }

  updateUsuario() {
    this.usuarioService.update(this.currentUsuario.id, this.currentUsuario)
      .subscribe(
        (res: any) => {
          if (res.value.mensaje != "") {
            Swal.fire({
              title: '',
              text: res.value.mensaje,
              icon: 'success',
              confirmButtonColor: '#083E5E',
              confirmButtonText: 'Aceptar',
              timer: 6000
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl("/dashboard");
              }
            })
          }

        },

        (error) => {
          if (error.status == 400)
            Swal.fire("¡Ha ocurrido un error!", error, 'error');

          else console.log(error);
        });

  }





}
