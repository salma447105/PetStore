import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styles: ``
})
export class ForgotPassword implements OnInit {
  constructor(protected auth: AuthService) {}

  ngOnInit() {
    this.auth.error.set(null);
  }

  isSent: boolean = false;

  forgotForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)], nonNullable: true})
    });

  getFormValid(){
    return this.forgotForm.valid;
  }

  getEmailValid(){
    return this.forgotForm.controls['email'].valid;
  }

  getEmailTouched(){
    return this.forgotForm.controls['email'].touched;
  }

  async resetPass () {
    const success = await this.auth.resetPassword(this.forgotForm.controls['email'].value);
    if (success) {
      this.forgotForm.reset();
      this.auth.error.set(null);
      this.isSent = true;
    }
  }
}
