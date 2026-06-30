import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  enviado = false;
  errorLogin = false;

  formLogin = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ingresar(): void {
    this.enviado = true;
    this.errorLogin = false;

    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const valor = this.formLogin.getRawValue();

    const loginCorrecto = this.authService.iniciarSesion(
      valor.correo ?? '',
      valor.password ?? ''
    );

    if (!loginCorrecto) {
      this.errorLogin = true;
      return;
    }

    this.router.navigate(['/catalogo']);
  }

  limpiar(): void {
    this.formLogin.reset();
    this.enviado = false;
    this.errorLogin = false;
  }

  campoInvalido(campo: string): boolean {
    const control = this.formLogin.get(campo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formLogin.get(campo);

    return !!(
      control &&
      control.hasError(error) &&
      (control.touched || control.dirty || this.enviado)
    );
  }
}
