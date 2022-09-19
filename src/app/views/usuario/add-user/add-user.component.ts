import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { CambiarContrasenaComponent } from '../cambiar-contrasena/cambiar-contrasena.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  empresa_mk: any;
  rol_mk: any;
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
    public empresaService: EmpresaService, public router: Router) { }

  ngOnInit(): void {
    this.getUsuario(this.route.snapshot.paramMap.get('id'));
    this.ObtenerRoles();
    this.ObtenerEmpresa();


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
          this.mensaje = this.currentUsuario.estado == 1 ? 'Eliminar' : 'Habilitar';
          this.colorboton = this.currentUsuario.estado == 1 ? '#BC0303' : '#083E5E';
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
                this.router.navigateByUrl("/usuario");
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

  deleteUsuario() {


    var mensaje = this.currentUsuario.estado == 1 ? "¿Desea eliminar el usuario?" : "¿Desea activar el usuario?"

    Swal.fire({
      title: '',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#083E5E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.delete(this.currentUsuario.id)
          .subscribe(
            (res: any) => {
              if (res.message != "") {
                Swal.fire({
                  title: '',
                  text: res.message,
                  icon: 'success',
                  confirmButtonColor: '#083E5E',
                  confirmButtonText: 'Aceptar',
                  timer: 6000
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigateByUrl("/usuario");
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
    })


  }

}
