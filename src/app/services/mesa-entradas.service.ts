import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRIVATE_BACKEND_URL } from '../app-constants';
import { SociedadAnonima } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MesaEntradasService {
  sociedades: SociedadAnonima[] = []
  loading: boolean = true

  constructor(private http: HttpClient, private auth: AuthService) {
    this.getSociedades()
  }

  updateSociedad(aprobado: boolean, usuario: string, password: string, id: number) {
    return this.http.put(PRIVATE_BACKEND_URL + "/sociedad/" + id + "/status?aprobado=" + aprobado, { username: usuario, password })
  }

  getSociedades() {
    this.http.get(PRIVATE_BACKEND_URL + "/sociedades?username=" + this.auth.getLocalStorage("username"))
      .subscribe((result: any) => {
        this.loading = false
        this.sociedades = result
        console.log(this.sociedades);
      }, (err) => {
        console.log(err);
      })
  }

  reset() {
    this.loading = true;
    this.sociedades = []
  }
}
