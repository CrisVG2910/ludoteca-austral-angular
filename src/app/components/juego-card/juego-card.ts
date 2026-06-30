import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Juego } from '../../models/juego';

@Component({
  selector: 'app-juego-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './juego-card.html',
  styleUrl: './juego-card.css'
})
export class JuegoCard {
  @Input() juego!: Juego;
  @Output() seleccionado = new EventEmitter<Juego>();

  seleccionarJuego(): void {
    this.seleccionado.emit(this.juego);
  }
}
