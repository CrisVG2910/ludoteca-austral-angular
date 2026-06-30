import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { RegistroUsuario, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private esNavegador = isPlatformBrowser(this.platformId);

  private usuariosKey = 'ludoteca_usuarios';
  private sesionKey = 'ludoteca_sesion';

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioActual$ = this.usuarioSubject.asObservable();

  constructor() {
    this.inicializarUsuariosDemo();

    const sesion = this.leerStorage<Usuario | null>(this.sesionKey, null);
    this.usuarioSubject.next(sesion);
  }


  registrar(datos: RegistroUsuario): boolean {
    if (this.correoExiste(datos.correo)) {
      return false;
    }

    const usuarios = this.obtenerUsuarios();

    const nuevoUsuario: Usuario = {
      id: Date.now(),
      ...datos
    };

    usuarios.push(nuevoUsuario);
    this.guardarUsuarios(usuarios);

    return true;
  }

  iniciarSesion(correo: string, password: string): boolean {
    const usuarios = this.obtenerUsuarios();

    const usuario = usuarios.find(
      (item) => item.correo === correo && item.password === password
    );

    if (!usuario) {
      return false;
    }

    this.guardarStorage(this.sesionKey, usuario);
    this.usuarioSubject.next(usuario);

    return true;
  }

  cerrarSesion(): void {
    if (this.esNavegador) {
      localStorage.removeItem(this.sesionKey);
    }

    this.usuarioSubject.next(null);
  }


  actualizarPerfil(datos: Partial<Usuario>): boolean {
    const usuarioActual = this.obtenerUsuarioActual();

    if (!usuarioActual) {
      return false;
    }

    const usuarios = this.obtenerUsuarios();

    const usuariosActualizados = usuarios.map((usuario) =>
      usuario.id === usuarioActual.id
        ? { ...usuario, ...datos }
        : usuario
    );

    const usuarioActualizado = usuariosActualizados.find(
      (usuario) => usuario.id === usuarioActual.id
    );

    if (!usuarioActualizado) {
      return false;
    }

    this.guardarUsuarios(usuariosActualizados);
    this.guardarStorage(this.sesionKey, usuarioActualizado);
    this.usuarioSubject.next(usuarioActualizado);

    return true;
  }

  correoExiste(correo: string): boolean {
    return this.obtenerUsuarios().some((usuario) => usuario.correo === correo);
  }

  obtenerUsuarios(): Usuario[] {
    return this.leerStorage<Usuario[]>(this.usuariosKey, []);
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }

  estaLogueado(): boolean {
    return this.usuarioSubject.value !== null;
  }

  esAdmin(): boolean {
    return this.usuarioSubject.value?.rol === 'admin';
  }

  recuperarUsuarioPorCorreo(correo: string): Usuario | undefined {
    return this.obtenerUsuarios().find((usuario) => usuario.correo === correo);
  }

  eliminarUsuario(id: number): void {
    const usuarios = this.obtenerUsuarios().filter((usuario) => usuario.id !== id);
    this.guardarUsuarios(usuarios);
  }

  private inicializarUsuariosDemo(): void {
    const usuarios = this.obtenerUsuarios();

    if (usuarios.length > 0) {
      return;
    }

    const usuariosDemo: Usuario[] = [
      {
        id: 1,
        nombreCompleto: 'Administrador Ludoteca',
        nombreUsuario: 'admin',
        correo: 'admin@ludoteca.cl',
        password: 'Admin123',
        fechaNacimiento: '1990-01-01',
        direccion: 'Santiago',
        rol: 'admin'
      },
      {
        id: 2,
        nombreCompleto: 'Cliente Demo',
        nombreUsuario: 'cliente',
        correo: 'cliente@ludoteca.cl',
        password: 'Cliente123',
        fechaNacimiento: '2000-01-01',
        direccion: 'Puerto Montt',
        rol: 'cliente'
      }
    ];

    this.guardarUsuarios(usuariosDemo);
  }

  private guardarUsuarios(usuarios: Usuario[]): void {
    this.guardarStorage(this.usuariosKey, usuarios);
  }

  private leerStorage<T>(key: string, fallback: T): T {
    if (!this.esNavegador) {
      return fallback;
    }

    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    try {
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private guardarStorage<T>(key: string, value: T): void {
    if (!this.esNavegador) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }
}
