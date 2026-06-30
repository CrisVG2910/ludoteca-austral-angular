import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repetirPassword = control.get('repetirPassword')?.value;

  if (!password || !repetirPassword) {
    return null;
  }

  return password === repetirPassword ? null : { passwordsNoCoinciden: true };
}
