import { NzSafeAny } from 'ng-zorro-antd';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export type MyErrorsOptions = { en: string } & Record<string, NzSafeAny>;
export type CustomValidationErrors = Record<string, MyErrorsOptions>;

export const autoTips = {
  en: {
    required: 'Required',
    email: 'Invalid email',
  },
};

export class CustomValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): CustomValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { en: `Min length is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): CustomValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { en: `Max length is ${maxLength}` } };
    };
  }

  static phoneNumber(control: AbstractControl): CustomValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isPhoneNumber(value) ? null : { phoneNumber: { en: 'Invalid phone number' } };
  }

  static confirm(value: any): ValidatorFn {
    return (control: AbstractControl): CustomValidationErrors | null => {
      if (value === control.value) {
        return null;
      }
      return { confirm: { en: `LMFAO` } };
    };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isPhoneNumber(value: string): boolean {
  return typeof value === 'string' && /(^\d{10}$)/.test(value);
}
