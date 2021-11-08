import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APODERADO_ROLE } from '../app-constants';
import { SociedadAnonima, Socio } from '../interfaces';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-public-sociedad',
  templateUrl: './public-sociedad.component.html',
  styleUrls: ['./public-sociedad.component.css']
})
export class PublicSociedadComponent implements OnInit {
  sociedadAnonima: SociedadAnonima | undefined;
  loading: boolean = true

  constructor(private route: ActivatedRoute, private _public: PublicService) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    const sociedadId = Number(routeParams.get('id'))
    console.log(sociedadId)

    this._public.getInfoPublicaSociedad(sociedadId).subscribe((data: any) => {
      this.sociedadAnonima = data
      this.loading = false
    })
  }

}
