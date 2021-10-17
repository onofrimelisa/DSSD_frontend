import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MESA_ENTRADAS_ROLE, LEGALES_ROLE, APODERADO_ROLE } from '../app-constants';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
    this.router.navigate(["/login"])
  }

  goToHome() {
    switch (this.auth.getLocalStorage("role")) {
      case MESA_ENTRADAS_ROLE:
        this.router.navigate(["/mesa_entradas/sociedades"])
        break;

      case LEGALES_ROLE:
        this.router.navigate(["/legales/sociedades"])
        break;

      case APODERADO_ROLE:
        this.router.navigate(["/apoderado/sociedades"])
        break;

      default:
        this.router.navigate(["/login"])
        break;
    }
  }

}
