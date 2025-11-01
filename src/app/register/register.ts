import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styles: ``
})
export class Register implements OnInit {

  constructor(protected auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.error.set(null);
  }

  isRegistered : boolean = false;

  regForm = new FormGroup({
    fullName: new FormControl('', {validators: [Validators.required, Validators.minLength(15), Validators.maxLength(30)], nonNullable: true}),
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).*$/)], nonNullable: true})
    });

  getFormValid(){
    return this.regForm.valid;
  }

  getFullNameValid(){
    return this.regForm.controls['fullName'].valid;
  }

  getEmailValid(){
    return this.regForm.controls['email'].valid;
  }

  getPassValid(){
    return this.regForm.controls['password'].valid;
  }

  getFullNameTouched(){
    return this.regForm.controls['fullName'].touched;
  }

  getEmailTouched(){
    return this.regForm.controls['email'].touched;
  }

  getPassTouched(){
    return this.regForm.controls['password'].touched;
  }


  async signUp_() {
    const result = await this.auth.signUp(this.regForm.controls['email'].value, this.regForm.controls['password'].value, this.regForm.controls['fullName'].value);
    if (result) {
      this.regForm.reset();
      this.auth.error.set(null);
      this.isRegistered = true;
      setTimeout(() => this.router.navigateByUrl('/'), 2500);
    }
  }

  async signUpGoogle_() {
    const result = await this.auth.loginOrSignUpGoogle();
    if (result) {
      this.auth.error.set(null);
      this.isRegistered = true;
      setTimeout(() => this.router.navigateByUrl('/'), 2000);
    }
  }

  async signUpFB_() {
    const result = await this.auth.loginOrSignUpFB();
    if (result) {
      this.auth.error.set(null);
      this.isRegistered = true;
      setTimeout(() => this.router.navigateByUrl('/'), 2000);
    }
  }

  async signUpTwitter_() {
    const result = await this.auth.loginOrSignUpTwitter();
    if (result) {
      this.auth.error.set(null);
      this.isRegistered = true;
      setTimeout(() => this.router.navigateByUrl('/'), 2000);
    }
  }
}
