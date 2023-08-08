import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup =  new FormGroup({})
  constructor(
    private AuthService:AuthService,
    private fb:FormBuilder
    ){}

    ngOnInit(): void {
      this.initRegisterForm();
      console.log(this.registerForm.controls);
      
    }
    initRegisterForm(): void {
      this.registerForm = this.fb.group({
        username : ['', Validators.required],
        password : ['', Validators.required],
        name : ['', Validators.required],
        email : ['', Validators.required],
      })
    }
  // signUp() {
  //   this.AuthService.register()
  // }
 }
