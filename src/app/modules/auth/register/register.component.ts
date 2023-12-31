import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup =  new FormGroup({})
  RegisterUserData:any
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
      this.registerForm = this.fb.group({
        username : ['', Validators.required],
        password : ['', Validators.required],
        name : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
      })
    }

    get registerFormControl() {
      return this.registerForm.controls;
    }

    signUp() {
      this.AuthService.register(this.registerForm.value).subscribe({
        next: (res)=> {
          this.RegisterUserData = res.user
          this.userToken = res.token
          this.route.navigateByUrl('/login')
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
