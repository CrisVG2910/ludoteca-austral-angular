import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JUEGOS } from '../../data/juegos.data';
import { Juego } from '../../models/juego';
import { JuegoCard } from '../../components/juego-card/juego-card';

import { inject } from '@angular/core';
import { CarritoService } from '../../services/carrito';


@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, JuegoCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  juegos: Juego[] = JUEGOS;
  busqueda = '';
  categoriaSeleccionada = '';
  juegoSeleccionado?: Juego;

  categorias: string[] = ['Estrategia', 'Familiar', 'Cartas', 'Cooperativo'];


  get juegosFiltrados(): Juego[] {
    return this.juegos.filter((juego) => {
      const coincideBusqueda = juego.nombre
        .toLowerCase()
        .includes(this.busqueda.toLowerCase());

      const coincideCategoria =
        this.categoriaSeleccionada === '' ||
        juego.categoria === this.categoriaSeleccionada;

      return coincideBusqueda && coincideCategoria;
    });
  }

  mostrarSeleccion(juego: Juego): void {
    this.juegoSeleccionado = juego;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.categoriaSeleccionada = '';
    this.juegoSeleccionado = undefined;
  }

  private carritoService = inject(CarritoService);
    agregarAlCarrito(juego: Juego): void {
      this.carritoService.agregar(juego);
      this.mensajeCarrito = `${juego.nombre} fue agregado al carrito.`;
    }
  mensajeCarrito = '';

}
