import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../services/estacion.service';
import { UserService } from '../services/user.service';
import { UsersService } from '../shared/user.service';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.scss']
})
export class EstacionComponent implements OnInit {

  constructor(private service:UsersService) { }
  data:any;
  valor:number=0;
  ngOnInit(): void {
    this.getEstacion(1);
    
  }

  getEstacion(id: number) {
    this.service.getUsuario(id)
      .subscribe(
        data => {
          this.data = data.empresa.estacion;
          this.valor=data.empresa.estacion[0].id;
          
          this.service.setDataEstacion(this.data);
        },
        error => {
          console.log(error);
        });
  }
  changes(event:any){
    this.valor=event.target['value'];
  }

}
