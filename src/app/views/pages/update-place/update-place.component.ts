import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../../services/place.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../validators/validation.service';
@Component({
  selector: 'app-update-place',
  templateUrl: './update-place.component.html',
  styleUrls: ['./update-place.component.scss']
})
export class UpdatePlaceComponent {

  submitted = false;
  id: any;
  formErrors: any
  userForm: FormGroup = new FormGroup({});;
  constructor(private activatetRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private PlaceService: PlaceService,
    private router: Router,public vf: ValidationService
    ) {
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      place: new FormControl('', [Validators.required]),
      accept: new FormControl(false, Validators.requiredTrue)
    }, 
    );


    this.id = this.activatetRoute.snapshot.params['id'];
    this.PlaceService.getPlace(this.id).subscribe((response: any) => {
      this.userForm.patchValue(response)
    },
      (error) => {
        console.log(error);
      }
    );
  }
  get f() { return this.userForm.controls; }

  

  updateplace() {

    this.submitted = true;
    this.PlaceService.updatePlace(this.id, this.userForm.value).subscribe((response: any) => {
      this.toasterService.success( 'تم التحيين بنجاح', response.message);
      this.router.navigate(['places'])
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


