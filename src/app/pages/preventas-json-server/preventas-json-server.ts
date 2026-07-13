import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Preventa } from '../../models/preventa';
import { PreventasJsonServerService } from '../../services/preventas-json-server';

@Component({
  selector: 'app-preventas-json-server',
  imports: [CommonModule, FormsModule],
  templateUrl: './preventas-json-server.html',
  styleUrl: './preventas-json-server.css'
})
export class PreventasJsonServer implements OnInit {
  private preventasService = inject(PreventasJsonServerService);

  preventas: Preventa[] = [];
  formulario: Preventa = this.crearFormularioVacio();

  cargando = false;
  editando = false;

  mensajeError = '';
  mensajeExito = '';

  ngOnInit(): void {
    this.cargarPreventas();
  }

  cargarPreventas(intentos = 0): void {
    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    this.preventasService.obtenerPreventas().subscribe({
      next: (datos) => {
        this.preventas = datos;
        this.cargando = false;
      },
      error: () => {
        if (intentos < 3) {
          setTimeout(() => {
            this.cargarPreventas(intentos + 1);
          }, 800);

          return;
        }

        this.mensajeError = 'No se pudo conectar con json-server. Verifica http://localhost:3000/preventas.';
        this.cargando = false;
      }
    });
  }

  guardarPreventa(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.validarFormulario()) {
      return;
    }

    if (this.editando) {
      this.preventasService.actualizarPreventa(this.formulario.id, this.formulario).subscribe({
        next: () => {
          this.mensajeExito = 'Preventa actualizada mediante PUT.';
          this.limpiarFormulario();
          this.cargarPreventas();
        },
        error: () => {
          this.mensajeError = 'No se pudo actualizar la preventa.';
        }
      });

      return;
    }

    this.preventasService.crearPreventa(this.formulario).subscribe({
      next: () => {
        this.mensajeExito = 'Preventa creada mediante POST.';
        this.limpiarFormulario();
        this.cargarPreventas();
      },
      error: () => {
        this.mensajeError = 'No se pudo crear la preventa.';
      }
    });
  }

  editarPreventa(preventa: Preventa): void {
    this.formulario = { ...preventa };
    this.editando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  eliminarPreventa(id: number): void {
    const confirmar = confirm('¿Seguro que deseas eliminar esta preventa desde db.json?');

    if (!confirmar) {
      return;
    }

    this.preventasService.eliminarPreventa(id).subscribe({
      next: () => {
        this.mensajeExito = 'Preventa eliminada mediante DELETE.';
        this.cargarPreventas();

        if (this.formulario.id === id) {
          this.limpiarFormulario();
        }
      },
      error: () => {
        this.mensajeError = 'No se pudo eliminar la preventa.';
      }
    });
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  private validarFormulario(): boolean {
    if (!this.formulario.titulo.trim()) {
      this.mensajeError = 'El título es obligatorio.';
      return false;
    }

    if (!this.formulario.categoria.trim()) {
      this.mensajeError = 'La categoría es obligatoria.';
      return false;
    }

    if (!this.formulario.precio || this.formulario.precio <= 0) {
      this.mensajeError = 'El precio debe ser mayor a cero.';
      return false;
    }

    if (!this.formulario.fechaLanzamiento.trim()) {
      this.mensajeError = 'La fecha de lanzamiento es obligatoria.';
      return false;
    }

    if (!this.formulario.estado.trim()) {
      this.mensajeError = 'El estado es obligatorio.';
      return false;
    }

    if (!this.formulario.descripcion.trim()) {
      this.mensajeError = 'La descripción es obligatoria.';
      return false;
    }

    return true;
  }

  private limpiarFormulario(): void {
    this.formulario = this.crearFormularioVacio();
    this.editando = false;
  }

  private crearFormularioVacio(): Preventa {
    return {
      id: 0,
      titulo: '',
      categoria: '',
      precio: 0,
      fechaLanzamiento: '',
      estado: '',
      imagen: '',
      descripcion: ''
    };
  }
}
