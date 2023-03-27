import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  submitted: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl(''),

  })
  constructor(
    private authservice: AuthserviceService,
    private router: Router,private toastr: ToastrService) {
  }

  

  ngOnInit(): void {
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {

      return;
    }
    this.authservice.login(this.loginForm.value).subscribe((response: any) => {
      this.toastr.success('تم الدخول بنجاح', response.message);
      localStorage.setItem('token', response.token)
      { this.router.navigate(['/videos']); }
    },
      (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
