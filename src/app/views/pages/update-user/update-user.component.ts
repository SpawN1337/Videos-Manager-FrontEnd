import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  submitted = false;
  id: any;
  myGrade: any;
  formErrors: any
  userForm: FormGroup = new FormGroup({});;
  constructor(private activatetRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private gradeservice: GradeService,
    private router: Router,
    private usersService: UserService,public vf: ValidationService
    ) {
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.allGrades()
    this.userForm = new FormGroup({
      grade: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.vf.formRules.passwordMin), Validators.pattern(this.vf.formRules.passwordPattern)]),
      confirmPassword: new FormControl(''),
      role: new FormControl('', Validators.required),
      accept: new FormControl(false, Validators.requiredTrue)
    }, 
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );


    this.id = this.activatetRoute.snapshot.params['id'];
    this.usersService.getuser(this.id).subscribe((response: any) => {
      this.userForm.patchValue(response)
    },
      (error) => {
        console.log(error);
      }
    );
  }
  get f() { return this.userForm.controls; }

  allGrades() {
    this.gradeservice.allGrades().subscribe((response: any) => {
      this.myGrade = response
    },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateuser() {

    this.submitted = true;
    // if (this.userForm.invalid) {
    //   return
    // }
    //with services
    this.usersService.updateuser(this.id, this.userForm.value).subscribe((response: any) => {
      this.toasterService.success( 'تم التحيين بنجاح', response.message);
      this.router.navigate(['users'])
    },
    (error: any) => {
      this.toasterService.error( 'Error', error.error.message);
      console.log(error);
    }
  );
  }
  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
  }
}
