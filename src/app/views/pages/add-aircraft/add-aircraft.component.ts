import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidationService } from '../../../validators/validation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AirCraftService } from '../../../services/airCraft.service';
@Component({
  selector: 'app-add-aircraft',
  templateUrl: './add-aircraft.component.html',
  styleUrls: ['./add-aircraft.component.scss']
})
export class AddAircraftComponent {

  submitted = false;
  formErrors: any;
  form = new FormGroup({
    nomAirCraft: new FormControl('', [Validators.required]),
    accept: new FormControl(false, [Validators.required])
  });
  constructor(
    private toasterService: ToastrService,
    private AirCraftService: AirCraftService,
    public vf: ValidationService,
    private router: Router,) {
    this.formErrors = this.vf.errorMessages;
  }

  ngOnInit(): void {

  }
  get f() { return this.form.controls; }




  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    };

    this.AirCraftService.addAirCraft(this.form.value).subscribe((response: any) => {
      this.toasterService.success(response.message);
      this.router.navigate(['/aircrafts']);
    },
      (error: any) => {
        this.toasterService.error(error.error.message, 'خطأ');
        console.log(error);
      }
    );
  }

  onReset() {

    this.submitted = false;
    this.form.reset();

  }
}

