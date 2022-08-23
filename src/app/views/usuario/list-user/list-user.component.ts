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

  
  submitted = false;

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute) { }

  ngOnInit(): void {

   //this.obtenerUsuarios();
    this.saveUser();
    this.message = '';
    //this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

/*
  obtenerUsuarios() {
    this.usuarioService.getAll()
      .subscribe(
        data => {
          this.usuarios_mk= data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }*/

  /*
  refreshList() {
    this.obtenerUsuarios();
    this.currentUsuario = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(usuarios: null, index: number) {
    this.currentUsuario = usuarios;
    this.currentIndex = index;
  }*/

  saveUser() {
    const data = {
      /*
      nombre: this.productos.nombre,
      quantity: this.productos.quantity,
      precio: this.productos.precio,
      fecha_vencimiento: this.productos.fecha_vencimiento,
      nombre_cat: this.productos.nombre_cat,
      empresa: this.productos.empresa,
      kilo: this.productos.kilo,
      estado: this.productos.estado,
      image: this.productos.image,
      precio_compra: this.productos.precio_compra,*/


      username: "",
      correo: "",
      nombres: "",
      apellidos: "",
      pagina: 1,
      recordsPorPagina: 8

    };

    this.usuarioService.create(data)
      .subscribe(
        response => {
          this.usuarios_mk= response;
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  refreshListSave() {
    this.saveUser();
    this.currentUsuario = null;
    this.currentIndex = -1;
  }

  setActiveTutorialSave(usuarios: null, index: number) {
    this.currentUsuario = usuarios;
    this.currentIndex = index;
  }


  //ADD

  


  //EDIT
  /*
  getTutorial(product_id) {
    this.categoriaService.get(product_id)
      .subscribe(
        data => {
          this.currentCategoria = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }*/

  /*

  updateTutorial() {
    this.categoriaService.update(this.currentCategoria.product_id, this.currentCategoria)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El producto fue actualizado';
        },
        error => {
          console.log(error);
        });
  }*/

  /*
  deleteUsuario() {
    this.usuarioService.delete(this.currentUsuario.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El usuario fue eliminado';
        },
        error => {
          console.log(error);
        });
  }
*/


}