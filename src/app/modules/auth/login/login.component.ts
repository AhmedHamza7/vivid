import { CommonService } from 'src/app/core/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup =  new FormGroup({})
  // RegisterUserData:any
  userToken:any
  showPass:boolean = false
  constructor(
    private AuthService:AuthService,
    private fb:FormBuilder,
    private route:Router,
    private toastr:ToastrService,
    private commonService:CommonService
    ){}

    ngOnInit(): void {
      this.initRegisterForm();
    }

    initRegisterForm(): void {
      this.loginForm = this.fb.group({
        username : ['', Validators.required],
        password : ['', Validators.required],
      })
    }

    get registerFormControl() {
      return this.loginForm.controls;
    }

    login() {
      this.AuthService.login(this.loginForm.value).subscribe({
        next: (res)=> {
          // this.RegisterUserData = res.user
          this.userToken = res.token
          this.route.navigateByUrl('/home')
          this.commonService.fireSuccessToastr("successfully registered", 'Success')
        },
        error: (err) => {
          this.commonService.fireErrorToastr(err.error.message, 'Error')
        }
      })
    }

    DisplayPassword(type:string): void {
      type == 'show' ? this.showPass = true : this.showPass = false
    }
}
