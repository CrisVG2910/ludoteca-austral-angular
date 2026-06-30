import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { edadMinimaValidator } from '../../validators/edad-minima.validator';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  enviado = false;
  registroCorrecto = false;
  mensajeError = '';

  formRegistro = this.fb.group(
    {
      nombreCompleto: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).+$/)
        ]
      ],
      repetirPassword: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, edadMinimaValidator(13)]],
      direccion: ['']
    },
    {
      validators: passwordMatchValidator
    }
  );

  registrar(): void {
    this.enviado = true;
    this.registroCorrecto = false;
    this.mensajeError = '';

    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      return;
    }

    const valor = this.formRegistro.getRawValue();

    const creado = this.authService.registrar({
      nombreCompleto: valor.nombreCompleto ?? '',
      nombreUsuario: valor.usuario ?? '',
      correo: valor.correo ?? '',
      password: valor.password ?? '',
      fechaNacimiento: valor.fechaNacimiento ?? '',
      direccion: valor.direccion ?? '',
      rol: 'cliente'
    });

    if (!creado) {
      this.mensajeError = 'El correo ingresado ya se encuentra registrado.';
      return;
    }

    this.registroCorrecto = true;
  }

  limpiar(): void {
    this.formRegistro.reset();
    this.enviado = false;
    this.registroCorrecto = false;
    this.mensajeError = '';
  }

  campoInvalido(campo: string): boolean {
    const control = this.formRegistro.get(campo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  campoValido(campo: string): boolean {
    const control = this.formRegistro.get(campo);

    return !!(
      control &&
      control.valid &&
      (control.touched || control.dirty)
    );
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formRegistro.get(campo);

    return !!(
      control &&
      control.hasError(error) &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  passwordsNoCoinciden(): boolean {
    const repetirPassword = this.formRegistro.get('repetirPassword');

    return !!(
      this.formRegistro.hasError('passwordsNoCoinciden') &&
      (repetirPassword?.touched || repetirPassword?.dirty || this.enviado)
    );
  }
}
