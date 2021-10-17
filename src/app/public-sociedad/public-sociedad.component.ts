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
    let socio1 = new Socio("meli", "onofri", 60)
    let socio2 = new Socio("lore", "repetto", 40)
    let socios: Socio[] = []
    socios.push(socio1)
    socios.push(socio2)
    this.sociedadAnonima = new SociedadAnonima("Sociedad Anonima", new Date(), "466", "466", "onofri@gmail.com", socios, new Socio("meli", "onofri", 60), [], APODERADO_ROLE, "")
  }

  ngOnInit(): void {
  }

}
