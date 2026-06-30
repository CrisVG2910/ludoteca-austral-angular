import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { JUEGOS } from '../../data/juegos.data';
import { Juego } from '../../models/juego';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  nombreTienda = 'Ludoteca Austral';

  juegosDestacados: Juego[] = JUEGOS.filter((juego) => juego.destacado);

  beneficios = [
    'Juegos familiares, estratégicos y cooperativos',
    'Catálogo seleccionado para todas las edades',
    'Experiencia simple para explorar, elegir y comprar'
  ];

  categorias = [
    {
      nombre: 'Estrategia',
      descripcion: 'Para quienes disfrutan planificar, competir y pensar cada movimiento.'
    },
    {
      nombre: 'Familiar',
      descripcion: 'Juegos fáciles de aprender para compartir en casa o con amigos.'
    },
    {
      nombre: 'Cooperativo',
      descripcion: 'Experiencias donde todos trabajan juntos para lograr un objetivo.'
    }
  ];
}
