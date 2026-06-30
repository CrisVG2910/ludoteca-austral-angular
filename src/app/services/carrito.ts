import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Juego } from '../models/juego';

export interface ItemCarrito extends Juego {
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private platformId = inject(PLATFORM_ID);
  private esNavegador = isPlatformBrowser(this.platformId);
  private carritoKey = 'ludoteca_carrito';

  agregar(juego: Juego): void {
    const carrito = this.obtenerItems();

    const existente = carrito.find((item) => item.id === juego.id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        ...juego,
        cantidad: 1
      });
    }

    this.guardarItems(carrito);
  }

  obtenerItems(): ItemCarrito[] {
    if (!this.esNavegador) {
      return [];
    }

    const data = localStorage.getItem(this.carritoKey);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as ItemCarrito[];
    } catch {
      return [];
    }
  }

  guardarItems(items: ItemCarrito[]): void {
    if (!this.esNavegador) {
      return;
    }

    localStorage.setItem(this.carritoKey, JSON.stringify(items));
  }

  calcularTotal(items: ItemCarrito[]): number {
    return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  limpiar(): void {
    if (!this.esNavegador) {
      return;
    }

    localStorage.removeItem(this.carritoKey);
  }
}
