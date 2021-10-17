import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(usuario: string, contrasenia: string) {
    return this.http.post(BACKEND_URL + "/login", { username: usuario, password: contrasenia })
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  getLocalStorage(key: string): string {
    return localStorage.getItem(key) || ""
  }

  isUserLogged() {
    return this.getLocalStorage("username") != ""
  }

  logout() {
    localStorage.clear()
  }
}
