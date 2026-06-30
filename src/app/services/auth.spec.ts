import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('debe evitar registrar un correo duplicado', () => {
    const creado = service.registrar({
      nombreCompleto: 'Usuario Test',
      nombreUsuario: 'usuarioTest',
      correo: 'test@correo.cl',
      password: 'Clave123',
      fechaNacimiento: '2000-01-01',
      direccion: '',
      rol: 'cliente'
    });

    const duplicado = service.registrar({
      nombreCompleto: 'Usuario Duplicado',
      nombreUsuario: 'usuarioDuplicado',
      correo: 'test@correo.cl',
      password: 'Clave123',
      fechaNacimiento: '2000-01-01',
      direccion: '',
      rol: 'cliente'
    });

    expect(creado).toBe(true);
    expect(duplicado).toBe(false);
  });

  it('debe iniciar sesión con credenciales correctas', () => {
    const resultado = service.iniciarSesion('admin@ludoteca.cl', 'Admin123');

    expect(resultado).toBe(true);
    expect(service.estaLogueado()).toBe(true);
  });
});
