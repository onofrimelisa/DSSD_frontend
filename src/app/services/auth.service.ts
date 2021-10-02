import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | undefined;

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasenia: string) {
    return this.http.post(BACKEND_URL + "/login", { username: usuario, password: contrasenia })
  }
}
