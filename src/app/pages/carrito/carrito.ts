import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { CarritoService, ItemCarrito } from '../../services/carrito';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  private carritoService = inject(CarritoService);

  carrito: ItemCarrito[] = [];
  total = 0;

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carrito = this.carritoService.obtenerItems();
    this.recalcularTotal();
  }

  actualizarCantidad(indice: number, nuevaCantidad: number | string): void {
    const cantidad = Number(nuevaCantidad);

    if (cantidad < 1 || Number.isNaN(cantidad)) {
      return;
    }

    this.carrito[indice].cantidad = cantidad;
    this.carritoService.guardarItems(this.carrito);
    this.recalcularTotal();
  }

  eliminar(indice: number): void {
    this.carrito.splice(indice, 1);
    this.carritoService.guardarItems(this.carrito);
    this.recalcularTotal();
  }

  limpiar(): void {
    this.carritoService.limpiar();
    this.carrito = [];
    this.total = 0;
  }

  recalcularTotal(): void {
    this.total = this.carritoService.calcularTotal(this.carrito);
  }
}
