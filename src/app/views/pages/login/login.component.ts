import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthserviceService } from '../../../services/authservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
  ]
}) 
export class LoginComponent implements OnInit {
  // user : String;
  //toaster config
  // public toasterconfig: ToasterConfig =
  // new ToasterConfig({
  //   tapToDismiss: true,
  //   timeout: 5000
  // });
  submitted: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl(''),

  })
  constructor(private toasterService: ToasterService,
    private authservice: AuthserviceService,
    private router: Router,private toastr: ToastrService) {
  }

  

  ngOnInit(): void {
  }
  login() {
    this.toastr.success('Hello world!');
    this.submitted = true;
    // this.toasterService.pop('success', 'تم الدخول بنجاح');
    if (this.loginForm.invalid) {

      return;
    }
    this.authservice.login(this.loginForm.value).subscribe((response: any) => {
      // this.toasterService.pop('success', 'تم الدخول بنجاح', response.message);
      localStorage.setItem('token', response.token)
      { this.router.navigate(['/dashboard']); }
    },
      (error: any) => {
        console.log(error);
        // this.toasterService.pop('error', 'خطأ ', error.error.message);
      }
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
