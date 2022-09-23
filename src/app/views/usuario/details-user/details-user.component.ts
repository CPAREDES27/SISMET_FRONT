import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {

  empresa_mk: any;
  rol_mk: any;
  currentEmpresa: any;

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
  carga : boolean=false;
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

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, public rolService: RolService,
    public empresaService: EmpresaService, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") === undefined)
    this.router.navigateByUrl("/login");
    else{
      this.getUsuario(this.route.snapshot.paramMap.get('id'));
      this.ObtenerRoles();
      this.ObtenerEmpresa();
    }
   
  }

  ObtenerRoles() {
 
    this.rolService.getAll().subscribe(
      (data) => {
        this.rol_mk = data;
      
      },
      (error) => {
        this.carga = false;
        Swal.fire({
          title: '',
          html: 'No hay conexión con el servidor',
          imageWidth: "100px",
          icon: 'error',
          confirmButtonColor: '#083E5E',
          confirmButtonText: 'Aceptar'
        });
        console.log(error);
      }
    );
  }

  ObtenerEmpresa() {
    debugger;
    this.empresaService.getAll().subscribe(
      (data) => {
        this.empresa_mk = data;
        this.carga=false;
      },
      (error) => {
        Swal.fire({
          title: '',
          html: 'No hay conexión con el servidor',
          imageWidth: "100px",
          icon: 'error',
          confirmButtonColor: '#083E5E',
          confirmButtonText: 'Aceptar'
        });
        this.carga=false;
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
    this.carga = true;
    this.usuarioService.get(id)
      .subscribe(
        data => {
          this.currentUsuario = data;
          this.carga =false;
        },
        error => {
          Swal.fire({
            title: '',
            html: 'No hay conexión con el servidor',
            imageWidth: "100px",
            icon: 'error',
            confirmButtonColor: '#083E5E',
            confirmButtonText: 'Aceptar'
          });
          this.carga=false;
        });
  }

  updateUsuario() {
    this.carga = true;
    this.usuarioService.update(this.currentUsuario.id, this.currentUsuario)
      .subscribe(
        response => {
          this.message = 'El usuario fue actualizado.';
          Swal.fire("", "El usuario fue eliminado.", 'success');
          this.carga = false;
          this.router.navigateByUrl("/usuario");
        },
        error => {
          Swal.fire({
            title: '',
            html: 'No hay conexión con el servidor',
            imageWidth: "100px",
            icon: 'error',
            confirmButtonColor: '#083E5E',
            confirmButtonText: 'Aceptar'
          });
          this.carga=false;
          console.log(error);
          Swal.fire("¡Ha ocurrido un error!", error, 'error');

        });
  }

  deleteUsuario() {
    this.usuarioService.delete(this.currentUsuario.id)
      .subscribe(
        response => {
          this.message = 'El usuario fue eliminado';
          Swal.fire("", "El usuario fue eliminado.", 'success');
          this.router.navigateByUrl("/usuario");
        },
        error => {
          console.log(error);
          Swal.fire("¡Ha ocurrido un error!", error, 'error');
        });
  }

}

