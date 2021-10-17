import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PRIVATE_BACKEND_URL } from 'src/app/app-constants';
import { LegalesService } from 'src/app/services/legales.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-estatuto-sociedades',
  templateUrl: './estatuto-sociedades.component.html',
  styleUrls: ['./estatuto-sociedades.component.css']
})
export class EstatutoSociedadesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'fechaCreacion', 'apoderado', 'estado', 'operaciones'];

  constructor(private http: HttpClient, public legales: LegalesService) { }

  ngOnInit(): void {
  }

  aprobarSociedad() {
    this.http.post(PRIVATE_BACKEND_URL, "1")
      .subscribe((data) => {
        swal("Aprobar Sociedad", "La operación se realizó correctamente", "success");
      }, (error) => {
        swal("Aprobar Sociedad", "Ocurrió un problema", "error");
      })

  }

  desaprobarSociedad() {
    this.http.post(PRIVATE_BACKEND_URL, "1")
      .subscribe((data) => {
        swal("Desaprobar Sociedad", "La operación se realizó correctamente", "success");
      }, (error) => {
        swal("Desaprobar Sociedad", "Ocurrió un problema", "error");
      })

  }

}
