import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Preventa } from '../../models/preventa';
import { PreventasService } from '../../services/preventas';

@Component({
  selector: 'app-preventas',
  imports: [CommonModule, FormsModule],
  templateUrl: './preventas.html',
  styleUrl: './preventas.css'
})
export class Preventas implements OnInit {
  private preventasService = inject(PreventasService);
  private readonly storageKey = 'ludoteca_preventas_local';

  preventas: Preventa[] = [];
  formulario: Preventa = this.crearFormularioVacio();

  cargando = false;
  editando = false;

  mensajeError = '';
  mensajeExito = '';

  ngOnInit(): void {
    this.cargarPreventas();
  }

  cargarPreventas(): void {
    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const datosLocales = localStorage.getItem(this.storageKey);

    if (datosLocales) {
      this.preventas = JSON.parse(datosLocales) as Preventa[];
      this.cargando = false;
      return;
    }

    this.preventasService.obtenerPreventas().subscribe({
      next: (datos) => {
        this.preventas = datos;
        this.guardarEnLocalStorage();
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar las preventas desde el JSON inicial.';
        this.cargando = false;
      }
    });
  }

  guardarPreventa(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.formulario.titulo.trim()) {
      this.mensajeError = 'El título es obligatorio.';
      return;
    }

    if (!this.formulario.categoria.trim()) {
      this.mensajeError = 'La categoría es obligatoria.';
      return;
    }

    if (!this.formulario.precio || this.formulario.precio <= 0) {
      this.mensajeError = 'El precio debe ser mayor a cero.';
      return;
    }

    if (!this.formulario.fechaLanzamiento.trim()) {
      this.mensajeError = 'La fecha de lanzamiento es obligatoria.';
      return;
    }

    if (!this.formulario.estado.trim()) {
      this.mensajeError = 'El estado es obligatorio.';
      return;
    }

    if (!this.formulario.descripcion.trim()) {
      this.mensajeError = 'La descripción es obligatoria.';
      return;
    }

    if (this.editando) {
      this.preventas = this.preventas.map((preventa) =>
        preventa.id === this.formulario.id
          ? { ...this.formulario }
          : preventa
      );

      this.mensajeExito = 'Preventa actualizada correctamente.';
    } else {
      const nuevoId =
        this.preventas.length > 0
          ? Math.max(...this.preventas.map((preventa) => preventa.id)) + 1
          : 1;

      const nuevaPreventa: Preventa = {
        ...this.formulario,
        id: nuevoId
      };

      this.preventas = [...this.preventas, nuevaPreventa];
      this.mensajeExito = 'Preventa creada correctamente.';
    }

    this.guardarEnLocalStorage();
    this.limpiarFormulario();
  }

  editarPreventa(preventa: Preventa): void {
    this.formulario = { ...preventa };
    this.editando = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  eliminarPreventa(id: number): void {
    const confirmar = confirm('¿Seguro que deseas eliminar esta preventa?');

    if (!confirmar) {
      return;
    }

    this.preventas = this.preventas.filter((preventa) => preventa.id !== id);
    this.guardarEnLocalStorage();
    this.mensajeExito = 'Preventa eliminada correctamente.';

    if (this.formulario.id === id) {
      this.limpiarFormulario();
    }
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  restaurarDatosOriginales(): void {
    const confirmar = confirm('Esto eliminará los cambios locales y restaurará el JSON original. ¿Continuar?');

    if (!confirmar) {
      return;
    }

    localStorage.removeItem(this.storageKey);
    this.preventas = [];
    this.limpiarFormulario();
    this.cargarPreventas();
    this.mensajeExito = 'Datos originales restaurados correctamente.';
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.preventas));
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
