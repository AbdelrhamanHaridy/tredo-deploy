// auth.service.ts
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponseDto } from '../models/AuthResponseDto';
import { LoginModel } from '../models/LoginModel';
import { RegisterModel, ResetPasswordModel } from '../models/RegisterModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VerifyOtpResponse } from '../services/global/interfaces/verify-otp-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private profileSubject = new BehaviorSubject<any>(null);
  profile$: Observable<any> = this.profileSubject.asObservable();
  merchantData$ = new Subject();
  constructor(private http: HttpClient) {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      this.profileSubject.next(JSON.parse(storedProfile));
    }
  }

  IsLoggedIn() {
    return !!localStorage.getItem('token');
  }

  GetProfileData(): Observable<any> {
    return this.http.get<any>(`${environment.baseAPIURL}/setting/profile`).pipe(
      tap((profileData) => {
        if (profileData) {
          this.profileSubject.next(profileData);
          localStorage.setItem('profile', JSON.stringify(profileData));
        }
      })
    );
  }

  GetProfile(): any {
    return this.profileSubject.getValue();
  }

  GetInit() {
    return this.http.get<any>(`${environment.baseAPIURL}/get_init`);
  }

  Register(registerObj: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseAPIURL}/register`,
      registerObj
    );
  }

  VerfiyOtp(body: {
    login: string;
    otp: string;
  }): Observable<VerifyOtpResponse> {
    return this.http
      .post<VerifyOtpResponse>(`${environment.baseAPIURL}/verify-otp`, body)
      .pipe(
        tap((res: VerifyOtpResponse) => {
          if (res.data && res.data.token) {
            localStorage.setItem('token', res.data.token);
            this.GetProfileData().subscribe({
              next: (profile) => {
                console.log('Profile data loaded successfully', profile);
              },
              error: (error) => {
                console.error('Error loading profile data', error);
              },
            });
          }
        })
      );
  }

  SendOtp(body: { login: string }): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(
      `${environment.baseAPIURL}/send-otp`,
      body
    );
  }

  Login(data: LoginModel): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`${environment.baseAPIURL}/user/login`, data)
      .pipe(
        tap((res: AuthResponseDto) => {
          localStorage.setItem('token', res.data.token);
          this.GetProfileData();
        })
      );
  }

  VerifyAccount(body: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.post<any>(
      `${environment.baseAPIURL}/user/verify-account`,
      body
    );
  }

  Logout(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .post(
        `${environment.baseAPIURL}/user/logout`,
        {},
        { headers: new HttpHeaders().set('Authorization', token) }
      )
      .pipe(
        tap(() => {
          localStorage.clear();
          this.profileSubject.next(null);
        })
      );
  }

  SendResetEmailPassword(body: { email: string }): Observable<any> {
    return this.http.post<any>(
      `${environment.baseAPIURL}/user/send-reset-email-password`,
      body
    );
  }

  ResetPassword(user: ResetPasswordModel): Observable<any> {
    return this.http.post<any>(
      `${environment.baseAPIURL}/user/reset-password`,
      user
    );
  }

  LoginAdmin(data: LoginModel): Observable<AuthResponseDto> {
    return this.http
      .post<AuthResponseDto>(`${environment.baseAPIURL}/admin/login`, data)
      .pipe(
        tap((res: AuthResponseDto) => {
          localStorage.setItem('token', res.data.token);
          this.GetProfileData();
        })
      );
  }

  LogoutAdmin(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this.http.post(
      `${environment.baseAPIURL}/admin/logout`,
      {},
      { headers: new HttpHeaders().set('Authorization', token) }
    );
  }

  SendResetEmailPasswordAdmin(email: string): Observable<any> {
    return this.http.post<any>(
      `${environment.baseAPIURL}/admin/send-reset-email-password`,
      { email }
    );
  }

  ResetPasswordAdmin(user: ResetPasswordModel): Observable<any> {
    return this.http.post<any>(
      `${environment.baseAPIURL}/admin/reset-password`,
      user
    );
  }

  GetAllRoles(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/permission`).pipe(
      catchError((error) => {
        console.error('Error fetching roles:', error);
        return of([]); // إرجاع مصفوفة فارغة في حالة الخطأ
      })
    );
  }

  GetSingleRole(id: number | string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/permission/${id}`);
  }

  getUserRole(): string | null {
    const profile = this.GetProfile();
    return profile?.data?.role || null;
  }
}
