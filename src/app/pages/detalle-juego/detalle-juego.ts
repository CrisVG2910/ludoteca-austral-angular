import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Juego } from '../../models/juego';
import { JUEGOS } from '../../data/juegos.data';

import { inject } from '@angular/core';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-detalle-juego',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-juego.html',
  styleUrl: './detalle-juego.css'
})
export class DetalleJuego implements OnInit {
  juego?: Juego;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.juego = JUEGOS.find((juego) => juego.id === id);
  }

  private carritoService = inject(CarritoService);
    agregarAlCarrito(): void {
      if (!this.juego) {
        return;
      }

      this.carritoService.agregar(this.juego);
      this.mensajeCarrito = `${this.juego.nombre} fue agregado al carrito.`;
    }
  mensajeCarrito = '';
}
