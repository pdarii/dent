import { AbstractControl } from '@angular/forms';

export function ValidateName(control: AbstractControl) {
  const result = /\d/.test( control.value);
  return result ? { invalid: true } : null;
}

export function ValidatePhone(control: AbstractControl) {
  const result = /^[0-9]*$/.test( control.value);
  return result ? null : { invalid: true };
}
