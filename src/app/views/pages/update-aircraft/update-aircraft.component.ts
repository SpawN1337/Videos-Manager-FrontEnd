import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl,ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirCraftService } from '../../../services/airCraft.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../validators/validation.service';
@Component({
  selector: 'app-update-aircraft',
  templateUrl: './update-aircraft.component.html',
  styleUrls: ['./update-aircraft.component.scss']
})
export class UpdateAircraftComponent {

  submitted = false;
  id: any;
  myGrade: any;
  formErrors: any
  userForm: FormGroup = new FormGroup({});;
  constructor(private activatetRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private airCraftService: AirCraftService,
    private router: Router,public vf: ValidationService
    ) {
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      nomAirCraft: new FormControl('', [Validators.required]),
      accept: new FormControl(false, Validators.requiredTrue)
    }, 
    );


    this.id = this.activatetRoute.snapshot.params['id'];
    this.airCraftService.getAirCraft(this.id).subscribe((response: any) => {
      this.userForm.patchValue(response)
    },
      (error) => {
        console.log(error);
      }
    );
  }
  get f() { return this.userForm.controls; }

  

  updateaircraft() {

    this.submitted = true;
    // if (this.userForm.invalid) {
    //   return
    // }
    //with services
    this.airCraftService.updateAirCraft(this.id, this.userForm.value).subscribe((response: any) => {
      this.toasterService.success( 'تم التحيين بنجاح', response.message);
      this.router.navigate(['aircrafts'])
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

