import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LegalesService } from 'src/app/services/legales.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-estatuto-sociedades',
  templateUrl: './estatuto-sociedades.component.html',
  styleUrls: ['./estatuto-sociedades.component.css']
})
export class EstatutoSociedadesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'fechaCreacion', 'apoderado', 'estado', 'operaciones'];
  usuarioInfo: any;

  constructor(public legales: LegalesService, private auth: AuthService, private router: Router) {
    this.usuarioInfo = this.auth.getLoginInformation()
  }

  ngOnInit(): void {
    this.legales.getSociedades()
  }

  aprobarSociedad(id: number) {
    this.legales.updateSociedad(true, this.usuarioInfo.username, this.usuarioInfo.password, id)
      .subscribe((data) => {
        this.legales.getSociedades()
        swal("Aprobar Estatuto", "La operación se realizó correctamente", "success");
        this.router.navigate(["public/sociedad/1"])
      }, (error) => {
        swal("Aprobar Estatuto", "Ocurrió un problema: " + error.error.message, "error");
      })

  }

  desaprobarSociedad(id: number) {
    this.legales.updateSociedad(false, this.usuarioInfo.username, this.usuarioInfo.password, id)
      .subscribe((data) => {
        this.legales.getSociedades()
        swal("Desaprobar Estatuto", "La operación se realizó correctamente", "success").then(() => {
          this.router.navigate(["public/sociedad/1"])
        });
      }, (error) => {
        swal("Desaprobar Estatuto", "Ocurrió un problema: " + error.error.message, "error");
      })

  }

  ngOnDestroy() {
    this.legales.reset()
  }

}
