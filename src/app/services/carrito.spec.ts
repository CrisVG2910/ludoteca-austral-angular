import { TestBed } from '@angular/core/testing';
import { CarritoService, ItemCarrito } from './carrito';

describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);
  });

  it('debe calcular correctamente el total del carrito', () => {
    const items: ItemCarrito[] = [
      {
        id: 1,
        nombre: 'Juego 1',
        categoria: 'Estrategia',
        descripcion: 'Juego de prueba',
        precio: 10000,
        imagen: '',
        destacado: false,
        stock: 5,
        cantidad: 2
      },
      {
        id: 2,
        nombre: 'Juego 2',
        categoria: 'Cartas',
        descripcion: 'Juego de prueba',
        precio: 5000,
        imagen: '',
        destacado: false,
        stock: 5,
        cantidad: 1
      }
    ];

    const total = service.calcularTotal(items);

    expect(total).toBe(25000);
  });

  it('debe agregar un juego al carrito', () => {
    service.agregar({
      id: 1,
      nombre: 'Catan',
      categoria: 'Estrategia',
      descripcion: 'Juego de estrategia',
      precio: 34990,
      imagen: '',
      destacado: true,
      stock: 8
    });

    const items = service.obtenerItems();

    expect(items.length).toBe(1);
    expect(items[0].nombre).toBe('Catan');
    expect(items[0].cantidad).toBe(1);
  });
});
