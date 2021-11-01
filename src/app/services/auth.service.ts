import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string | undefined

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasenia: string) {
    return this.http.post(BACKEND_URL + "/login", { username: usuario, password: contrasenia })
  }

  setRole(role: string) {
    this.role = role
  }

  setAllLocalStorage(data: any, usuario: string, contrasenia: string) {
    this.setLocalStorage("token", data.token)
    this.setLocalStorage("sessionId", data.sessionId)
    this.setLocalStorage("role", data.role)
    this.setLocalStorage("username", usuario)
    this.setLocalStorage("password", contrasenia)
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

  getLoginInformation() {
    if (!this.isUserLogged()) return

    return {
      token: this.getLocalStorage("token"),
      sessionId: this.getLocalStorage("sessionId"),
      role: this.getLocalStorage("role"),
      username: this.getLocalStorage("username"),
      password: this.getLocalStorage("password"),
    }
  }

  logout() {
    localStorage.clear()
  }
}
