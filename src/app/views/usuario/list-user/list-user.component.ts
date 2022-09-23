import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {



  usuarios_mk: any;
  currentUsuario = null;
  currentIndex = -1;
  userName = '';
  message = '';
  color: any;
  employees:any=[];
  usuarios = {
    id: '',
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
    correo: ''

  };
  busqueda:string="";
  collection: number[] = [];
  estacionOne: any;
  config: any;
  isItemsPerPage = true;
  p = 1;
  filterValueLower:string="";
  carga : boolean=false;
  index: number = 0;
  submitted = false;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, public router: Router,) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") === undefined)
    this.router.navigateByUrl("/login");
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 5
    }
    this.index = 1;
    this.message = '';

    this.getMembers();

  }

  pageChanged(event: any) {

    this.getMembers(event);
    
  }
  BuscarUsuario() {
    console.log(this.busqueda)
    this.filterValueLower = this.busqueda.toLowerCase();
    this.getMembers(1);
    
  }
  getMembers(pageNumber: number = 1) {

    debugger;
    const data = {
      username: "",
      correo: "",
      nombres: this.filterValueLower==""?"":this.filterValueLower,
      apellidos: "",
      pagina: pageNumber,
      recordsPorPagina: 10
    };
    this.carga=true;
    this.usuarioService.create(data)
      .subscribe(
        response => {
          this.usuarios_mk = response;
          this.submitted = true;
          this.config = {
            itemsPerPage: 10,
            currentPage: pageNumber,
            totalItems: response.cantidad
          };
          this.carga=false;
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

  refreshListSave() {
    this.getMembers(1);
    this.currentUsuario = null;
    this.currentIndex = -1;
  }

  setActiveTutorialSave(usuarios: null, index: number) {
    this.currentUsuario = usuarios;
    this.currentIndex = index;
  }

}