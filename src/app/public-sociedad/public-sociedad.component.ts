import { Component, OnInit } from '@angular/core';
import { APODERADO_ROLE } from '../app-constants';
import { SociedadAnonima, Socio } from '../interfaces';

@Component({
  selector: 'app-public-sociedad',
  templateUrl: './public-sociedad.component.html',
  styleUrls: ['./public-sociedad.component.css']
})
export class PublicSociedadComponent implements OnInit {
  sociedadAnonima: SociedadAnonima | undefined;

  constructor() {
    let socio1 = new Socio("Lorenzo", "Repetto", 60)
    let socio2 = new Socio("Cristian", "Giambruni", 40)
    let socios: Socio[] = []
    socios.push(socio1)
    socios.push(socio2)
    this.sociedadAnonima = new SociedadAnonima("Test SA", new Date(), "466 City Bell", "47 número 830", "melisa2648@gmail.com", socios, new Socio("Lorenzo", "Repetto", 60), [], APODERADO_ROLE, "")
  }

  ngOnInit(): void {
  }

}
