export type RolUsuario = 'cliente' | 'admin';

export interface Usuario {
  id: number;
  nombreCompleto: string;
  nombreUsuario: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  direccion?: string;
  rol: RolUsuario;
}

export type RegistroUsuario = Omit<Usuario, 'id'>;
