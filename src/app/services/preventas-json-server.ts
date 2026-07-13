import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Preventa } from '../models/preventa';

@Injectable({
  providedIn: 'root'
})
export class PreventasJsonServerService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/preventas';

  obtenerPreventas(): Observable<Preventa[]> {
    return this.http.get<Preventa[]>(this.apiUrl);
  }

  crearPreventa(preventa: Preventa): Observable<Preventa> {
    const preventaSinId = {
      titulo: preventa.titulo,
      categoria: preventa.categoria,
      precio: preventa.precio,
      fechaLanzamiento: preventa.fechaLanzamiento,
      estado: preventa.estado,
      imagen: preventa.imagen,
      descripcion: preventa.descripcion
    };

    return this.http.post<Preventa>(this.apiUrl, preventaSinId);
  }

  actualizarPreventa(id: number, preventa: Preventa): Observable<Preventa> {
    return this.http.put<Preventa>(`${this.apiUrl}/${id}`, preventa);
  }

  eliminarPreventa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
