import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

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
    rolId:'',
    empresaId:''

  };



  submitted = false;

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute, public rolService: RolService,
    public empresaService: EmpresaService, public router: Router) { }

  ngOnInit(): void {
     this.getUsuario(this.route.snapshot.paramMap.get('id'));
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
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUsuario() {
    this.usuarioService.update(this.currentUsuario.id, this.currentUsuario)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El usuario fue actualizado.';
          Swal.fire("","El usuario fue eliminado.",'success');
          this.router.navigateByUrl("/usuario");
        },
        error => {
          console.log(error);
          Swal.fire("¡Ha ocurrido un error!",error,'error');
          
        });
  }

  deleteUsuario() {
    this.usuarioService.delete(this.currentUsuario.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El usuario fue eliminado';
          Swal.fire("","El usuario fue eliminado.",'success');
          this.router.navigateByUrl("/usuario");
        },
        error => {
          console.log(error);
          Swal.fire("¡Ha ocurrido un error!",error,'error');
        });
  }

}
