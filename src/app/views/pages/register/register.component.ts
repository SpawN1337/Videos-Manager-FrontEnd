import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../validators/validation.service';

/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value ? null : { 'passwordMismatch': true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted = false;
  formErrors: any;
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required]),
    base: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(this.vf.formRules.passwordMin), Validators.pattern(this.vf.formRules.passwordPattern)]),
    confirmPassword: new FormControl(''),
    role: new FormControl('', Validators.required),
    accept: new FormControl(false, Validators.requiredTrue)
  }, { validators: confirmPasswordValidator });



  constructor(private toasterService: ToastrService,
    private router: Router,
    private authservice: AuthserviceService,
    public vf: ValidationService) {
    this.formErrors = this.vf.errorMessages;
  }
  ngOnInit(): void {
    //   this.registerForm = new FormGroup({
    //     firstName: new FormControl('', Validators.required),
    //     lastName: new FormControl('', Validators.required),
    //     email: new FormControl('', Validators.required),
    //     password: new FormControl('', Validators.required),
    //     repassword: new FormControl('')
    //   },
    //     {
    //       validators: [matchingPasswords]
    //     }
    //   );
  }

  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;
       if (this.registerForm.invalid) {
      return
    };
    //with Services
    this.authservice.register(this.registerForm.value).subscribe((response: any) => {
      this.toasterService.success('success', 'Success Login', response.message);
      this.router.navigate(['/login']);
    },
      (error: any) => {
        this.toasterService.error('error', 'Error', error.error.message);
        console.log(error);
      }
    );
  }


  onReset() {

    this.submitted = false;
    this.registerForm.reset();

  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

  }
}

