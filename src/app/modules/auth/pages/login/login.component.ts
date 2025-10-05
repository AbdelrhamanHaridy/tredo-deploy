import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    TranslateModule,
    NgIf,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  showError: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
    });
  }
  public validateControl = (controlName: string) => {
    return (
      this.loginForm?.get(controlName)?.invalid &&
      this.loginForm?.get(controlName)?.touched
    );
  };

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.SendOtp(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            const userEmail = this.loginForm.get('login')?.value;

            if (userEmail) {
              this.router.navigate(['/otp'], {
                queryParams: { email: userEmail },
              });
            } else {
              this.errorMessage = 'Email not found';
              this.showError = true;
            }
          } else {
            this.errorMessage = res.message || 'Failed to send OTP';
            this.showError = true;
          }
        },
        error: (err: HttpErrorResponse) => {},
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
