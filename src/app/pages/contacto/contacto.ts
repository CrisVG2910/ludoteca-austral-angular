import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  private fb = inject(FormBuilder);

  enviado = false;

  formContacto = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    motivo: ['', Validators.required],
    mensaje: ['', Validators.required]
  });

  enviar(): void {
    this.enviado = true;

    if (this.formContacto.invalid) {
      this.formContacto.markAllAsTouched();
      return;
    }
  }

  limpiar(): void {
    this.formContacto.reset();
    this.enviado = false;
  }

  campoInvalido(campo: string): boolean {
    const control = this.formContacto.get(campo);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.enviado)
    );
  }

  tieneError(campo: string, error: string): boolean {
    const control = this.formContacto.get(campo);

    return !!(
      control &&
      control.hasError(error) &&
      (control.touched || control.dirty || this.enviado)
    );
  }
}
