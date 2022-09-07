import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 

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

  collection:number[] = [];
  estacionOne: any;
  config: any;
  isItemsPerPage=true;
  p = 1;
   

  index:number=0;
  submitted = false;

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 5
    }
    this.index=1;
    this.message = '';

    this.getMembers();

  }

  pageChanged(event:any){
    
    this.getMembers(event);
  }
  BuscarUsuario(){
    console.log("buscqueda");
  }
  getMembers(pageNumber:number=1) {
   
    
    const data = {
      username: "",
      correo: "",
      nombres: "",
      apellidos: "",
      pagina: pageNumber,
      recordsPorPagina: 10
    };

    this.usuarioService.create(data)
      .subscribe(
        response => {
          this.usuarios_mk= response;
          console.log(response);
          this.submitted = true;
          this.config = {
            itemsPerPage: 10,
            currentPage: pageNumber,
            totalItems: response.cantidad
          };
        },
        error => {
          console.log(error);
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