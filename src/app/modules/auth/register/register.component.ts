import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup =  new FormGroup({})
  constructor(
    private AuthService:AuthService,
    private fb:FormBuilder,
    private toastr:ToastrService
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
        next: (res:any)=> {
          this.toastr.success(res.message)
          
        },
        error: (err:any)=> {
          this.toastr.error(err['message'], 'error')
        }
      })
    }
 }
