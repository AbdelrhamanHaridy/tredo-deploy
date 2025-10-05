// otp.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, NgIf } from '@angular/common';
import { VerifyOtpResponse } from '../../../../core/services/global/interfaces/verify-otp-response.interface';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule, TranslateModule, NgIf, NgClass],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (!this.email) {
        console.error('No email provided');
        this.router.navigate(['/register']);
      }
    });
  }

  public validateControl = (controlName: string) => {
    return (
      this.otpForm?.get(controlName)?.invalid &&
      this.otpForm?.get(controlName)?.touched
    );
  };

  onSubmit() {
    if (this.otpForm.valid && this.email) {
      const body = {
        login: this.email,
        otp: this.otpForm.value.otp
      };

      this.authService.VerfiyOtp(body).subscribe({
        next: (res: VerifyOtpResponse) => {
          if (res.success && res.data.token) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.router.navigate(['/merchants']);
          } else {
            console.error(res.message);
          }
        },
        error: (error) => {
          console.error('Error verifying OTP', error);
        }
      });
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}
