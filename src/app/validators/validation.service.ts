
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    firstName: '',
    place: '',
    lastName: '',
    username: '',
    grade: '',
    password: '',
    confirmPassword: '',
    role: '',
    accept: false,

  };

  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'First name is required',
      },
      lastName: {
        required: 'Last name is required',
      },
      username: {
        required: 'Username is required',
        minLength: `'Username must be ${this.formRules.usernameMin} characters or more`
      },
      grade: {
        required: 'required',
        email: 'Invalid grade',
      },
      password: {
        requiredd: 'لم يتم إدخال كلمة المرور',
        pattern: ' كلمة المرور يجب أن تحتوي على : أرقام، أحرف كبيرة وأحرف ',
        minLength: ` كلمة المرور يجب أن تحتوي على ${this.formRules.passwordMin}   حروف على الاقل  `
      },
      confirmPassword: {
        required: 'لم يتم عليك تأكيد كلمة المرور',
        passwordMismatch: 'كلمات المرور غير متطابقة'
      },
      role: {
        required: 'Role confirmation is required',
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      }
    };
  }
}
