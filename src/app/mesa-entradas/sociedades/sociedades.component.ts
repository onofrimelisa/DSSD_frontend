import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MesaEntradasService } from 'src/app/services/mesa-entradas.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-sociedades',
  templateUrl: './sociedades.component.html',
  styleUrls: ['./sociedades.component.css']
})
export class SociedadesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'fechaCreacion', 'apoderado', 'estado', 'operaciones'];
  usuarioInfo: any;

  constructor(private http: HttpClient, public mesaEntradas: MesaEntradasService, private auth: AuthService) {
    this.usuarioInfo = this.auth.getLoginInformation()
  }

  ngOnInit(): void {
    this.mesaEntradas.getSociedades()
  }

  aprobarSociedad(id: number) {
    this.mesaEntradas.updateSociedad(true, this.usuarioInfo.username, this.usuarioInfo.password, id)
      .subscribe((data) => {
        this.mesaEntradas.getSociedades()
        swal("Aprobar Sociedad", "La operación se realizó correctamente", "success");
      }, (error) => {
        console.log(error)
        swal("Aprobar Sociedad", "Ocurrió un problema: " + error.error.message, "error");
      })

  }

  desaprobarSociedad(id: number) {
    this.mesaEntradas.updateSociedad(false, this.usuarioInfo.username, this.usuarioInfo.password, id)
      .subscribe((data) => {
        this.mesaEntradas.getSociedades()
        swal("Desaprobar Sociedad", "La operación se realizó correctamente", "success");
      }, (error) => {
        swal("Desaprobar Sociedad", "Ocurrió un problema: " + error.error.message, "error");
      })

  }

  ngOnDestroy() {
    this.mesaEntradas.reset()
  }
}
