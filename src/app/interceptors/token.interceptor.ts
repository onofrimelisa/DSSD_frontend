import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PRIVATE_BACKEND_URL } from '../app-constants';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(PRIVATE_BACKEND_URL)) {
      const token = this.auth.getLocalStorage()

      if (token) {
        request = request.clone({
          setHeaders: { "X-Bonita-API-Token": token }
        })
      } else {
        this.router.navigate(["/login"])
      }
    }

    return next.handle(request)
  }
}
