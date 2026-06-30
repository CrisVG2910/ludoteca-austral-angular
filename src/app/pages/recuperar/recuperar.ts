import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-recuperar',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css'
})
export class Recuperar {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  buscado = false;
  usuarioEncontrado?: Usuario;

  formRecuperar = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  buscar(): void {
    this.buscado = true;
    this.usuarioEncontrado = undefined;

    if (this.formRecuperar.invalid) {
      this.formRecuperar.markAllAsTouched();
      return;
    }

    const correo = this.formRecuperar.value.correo ?? '';
    this.usuarioEncontrado = this.authService.recuperarUsuarioPorCorreo(correo);
  }

  limpiar(): void {
    this.formRecuperar.reset();
    this.buscado = false;
    this.usuarioEncontrado = undefined;
  }
}
