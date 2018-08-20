import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static match(form: AbstractControl) {
    const password = form.get('password').value;
    const password2 = form.get('password2').value;

    if (password !== password2) {
      return {match: { password , password2 }};
    } else {
      return null;
      }
    }
  }

