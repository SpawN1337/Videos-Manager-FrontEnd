import { Component } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../validators/validation.service';
import { GradeService } from '../../../services/grade.service';
/** passwords must match - custom validator */
export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirm = control.get('confirmPassword');

      return password && confirm && password.value !== confirm.value
        ? { mismatch: true }
        : null;
    };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  submitted = false;
  formErrors: any;
  myGrade: any;
  registerForm = new FormGroup({
    grade: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    base: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(this.vf.formRules.passwordMin), Validators.pattern(this.vf.formRules.passwordPattern)]),
    confirmPassword: new FormControl('',[Validators.required]),
    role: new FormControl('', Validators.required),
    accept: new FormControl(false, Validators.requiredTrue)
  },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  constructor(private toasterService: ToastrService,
    private router: Router,
    private gradeservice: GradeService,
    private authservice: AuthserviceService,
    public vf: ValidationService) {
    this.formErrors = this.vf.errorMessages;
  }
  ngOnInit(): void {
    this.allGrades()
  }

  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    };
    //with Services
    this.authservice.register(this.registerForm.value).subscribe((response: any) => {
      this.toasterService.success('Success Login', response.message);
      this.router.navigate(['/users']);
    },
      (error: any) => {
        this.toasterService.error('Error', error.error.message);
        console.log(error);
      }
    );
  }

  allGrades() {
    this.gradeservice.allGrades().subscribe((response: any) => {
      this.myGrade = response
    },
      (error: any) => {
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

