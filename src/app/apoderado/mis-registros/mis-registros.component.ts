import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApoderadoService } from 'src/app/services/apoderado.service';

@Component({
  selector: 'app-mis-registros',
  templateUrl: './mis-registros.component.html',
  styleUrls: ['./mis-registros.component.css']
})
export class MisRegistrosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'apoderado', 'fechaCreacion', 'estado', 'opciones'];

  constructor(private router: Router, public apoderado: ApoderadoService) { }

  ngOnInit(): void {
    this.apoderado.getSociedades()
  }

  ngOnDestroy() {
    this.apoderado.reset()
  }

  agregarSociedad() {
    this.router.navigate(["/registro"])
  }

  verInfoPublica(id: number) {
    this.router.navigate(["/public", id])
  }

  editar(id: number) {
    this.router.navigate(["/apoderado/editar", id])
  }
}
