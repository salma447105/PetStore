import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login implements OnInit {

  constructor(protected auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.error.set(null);
  }

  loginForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required], nonNullable: true})
    });

  getFormValid(){
    return this.loginForm.valid;
  }

  getEmailValid(){
    return this.loginForm.controls['email'].valid;
  }

  getPassValid(){
    return this.loginForm.controls['password'].valid;
  }

  getEmailTouched(){
    return this.loginForm.controls['email'].touched;
  }

  getPassTouched(){
    return this.loginForm.controls['password'].touched;
  }


  async login_() {
    const result = await this.auth.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    console.log(result);
    if (result) this.router.navigateByUrl('/');
  }

  async loginGoogle_() {
    const result = await this.auth.loginOrSignUpGoogle();
    console.log(result);
    if (result) this.router.navigateByUrl('/');
  }

    async loginFB_() {
    const result = await this.auth.loginOrSignUpFB();
    console.log(result);
    if (result) this.router.navigateByUrl('/');
  }

  async loginTwitter_() {
    const result = await this.auth.loginOrSignUpTwitter();
    console.log(result);
    if (result) this.router.navigateByUrl('/');
  }
}
