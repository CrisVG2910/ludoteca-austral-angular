import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { JUEGOS } from '../../data/juegos.data';
import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  authService = inject(AuthService);

  juegos = JUEGOS;
  usuarios: Usuario[] = this.authService.obtenerUsuarios();

  get esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  eliminarUsuario(id: number): void {
    this.authService.eliminarUsuario(id);
    this.usuarios = this.authService.obtenerUsuarios();
  }
}
