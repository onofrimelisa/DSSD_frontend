import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

  getInfoPublicaSociedad(id: number) {
    return this.http.get(BACKEND_URL + "/sociedad/" + id)
  }
}
