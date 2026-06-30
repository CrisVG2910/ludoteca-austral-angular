import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  usuarioActual: Usuario | null = null;
  guardado = false;

  formPerfil = this.fb.group({
    nombreCompleto: ['', Validators.required],
    nombreUsuario: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    direccion: ['']
  });

  ngOnInit(): void {
    this.usuarioActual = this.authService.obtenerUsuarioActual();

    if (!this.usuarioActual) {
      return;
    }

    this.formPerfil.patchValue({
      nombreCompleto: this.usuarioActual.nombreCompleto,
      nombreUsuario: this.usuarioActual.nombreUsuario,
      correo: this.usuarioActual.correo,
      fechaNacimiento: this.usuarioActual.fechaNacimiento,
      direccion: this.usuarioActual.direccion ?? ''
    });
  }

  guardar(): void {
    this.guardado = false;

    if (this.formPerfil.invalid) {
      this.formPerfil.markAllAsTouched();
      return;
    }

    const valor = this.formPerfil.getRawValue();

    const actualizado = this.authService.actualizarPerfil({
      nombreCompleto: valor.nombreCompleto ?? '',
      nombreUsuario: valor.nombreUsuario ?? '',
      correo: valor.correo ?? '',
      fechaNacimiento: valor.fechaNacimiento ?? '',
      direccion: valor.direccion ?? ''
    });

    if (actualizado) {
      this.guardado = true;
      this.usuarioActual = this.authService.obtenerUsuarioActual();
    }
  }
}
