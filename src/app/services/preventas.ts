import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Preventa } from '../models/preventa';

@Injectable({
  providedIn: 'root'
})
export class PreventasService {
  private http = inject(HttpClient);
  private readonly jsonUrl = 'data/preventas.json';

  obtenerPreventas(): Observable<Preventa[]> {
    return this.http.get<Preventa[]>(this.jsonUrl);
  }
}
