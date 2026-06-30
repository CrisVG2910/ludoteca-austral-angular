import { Juego } from '../models/juego';

export const JUEGOS: Juego[] = [
  {
    id: 1,
    nombre: 'Catan',
    categoria: 'Estrategia',
    descripcion: 'Juego de estrategia donde los jugadores construyen caminos, pueblos y ciudades.',
    precio: 34990,
    imagen: 'assets/img/catan.jpg',
    destacado: true,
    stock: 8
  },
  {
    id: 2,
    nombre: 'Carcassonne',
    categoria: 'Estrategia',
    descripcion: 'Juego de colocación de losetas para construir ciudades, caminos y campos.',
    precio: 28990,
    imagen: 'assets/img/carcassonne.jpg',
    destacado: false,
    stock: 5
  },
  {
    id: 3,
    nombre: 'Dixit',
    categoria: 'Familiar',
    descripcion: 'Juego familiar de imaginación, cartas ilustradas e interpretación creativa.',
    precio: 31990,
    imagen: 'assets/img/dixit.jpg',
    destacado: true,
    stock: 10
  },
  {
    id: 4,
    nombre: 'Uno',
    categoria: 'Cartas',
    descripcion: 'Juego de cartas rápido para compartir en familia o con amigos.',
    precio: 7990,
    imagen: 'assets/img/uno.jpg',
    destacado: false,
    stock: 15
  },
  {
    id: 5,
    nombre: 'Pandemic',
    categoria: 'Cooperativo',
    descripcion: 'Juego cooperativo donde los jugadores deben trabajar juntos para salvar al mundo.',
    precio: 39990,
    imagen: 'assets/img/pandemic.jpg',
    destacado: true,
    stock: 4
  },
  {
    id: 6,
    nombre: 'Dobble',
    categoria: 'Cartas',
    descripcion: 'Juego de observación y rapidez ideal para partidas cortas.',
    precio: 12990,
    imagen: 'assets/img/dobble.jpg',
    destacado: false,
    stock: 12
  }
];
