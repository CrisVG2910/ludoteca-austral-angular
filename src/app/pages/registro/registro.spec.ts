import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registro } from './registro';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro]
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe dejar el formulario inválido cuando el correo tiene formato incorrecto', () => {
    const correo = component.formRegistro.get('correo');

    correo?.setValue('correo-invalido');

    expect(correo?.hasError('email')).toBe(true);
    expect(component.formRegistro.valid).toBe(false);
  });

  it('debe marcar error cuando las contraseñas no coinciden', () => {
    component.formRegistro.patchValue({
      password: 'Clave123',
      repetirPassword: 'Clave456'
    });

    component.formRegistro.updateValueAndValidity();

    expect(component.formRegistro.hasError('passwordsNoCoinciden')).toBe(true);
  });

  it('debe dejar inválida la fecha de nacimiento si el usuario es menor de 13 años', () => {
    const hoy = new Date();
    const fechaMenor = new Date(
      hoy.getFullYear() - 10,
      hoy.getMonth(),
      hoy.getDate()
    );

    const fechaFormateada = fechaMenor.toISOString().split('T')[0];

    const fechaNacimiento = component.formRegistro.get('fechaNacimiento');
    fechaNacimiento?.setValue(fechaFormateada);

    expect(fechaNacimiento?.hasError('edadMinima')).toBe(true);
  });

  it('debe dejar el formulario válido cuando todos los datos son correctos', () => {
    component.formRegistro.setValue({
      nombreCompleto: 'Cristóbal Vargas',
      usuario: 'cristobalvg',
      correo: 'cristobal@correo.cl',
      password: 'Clave123',
      repetirPassword: 'Clave123',
      fechaNacimiento: '2000-01-01',
      direccion: ''
    });

    expect(component.formRegistro.valid).toBe(true);
  });

  it('debe limpiar el formulario al ejecutar limpiar()', () => {
    component.formRegistro.patchValue({
      nombreCompleto: 'Cristóbal Vargas',
      usuario: 'cristobalvg',
      correo: 'cristobal@correo.cl',
      password: 'Clave123',
      repetirPassword: 'Clave123',
      fechaNacimiento: '2000-01-01',
      direccion: 'Santiago'
    });

    component.limpiar();

    expect(component.formRegistro.value.nombreCompleto).toBe(null);
    expect(component.enviado).toBe(false);
    expect(component.registroCorrecto).toBe(false);
  });
});
