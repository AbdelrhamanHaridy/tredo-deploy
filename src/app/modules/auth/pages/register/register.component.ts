import { AvgOrder } from './../../../../core/services/global/interfaces/avg_order.interface';
import { GlobalService } from './../../../../core/services/global/global.service';
import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/authentication/auth.service';
import { AuthResponseDto } from '../../../../core/models/AuthResponseDto';
import {
  IndustriesResponse,
  Industry,
} from '../../../../core/services/global/interfaces/industries.interface';
import {
  CountriesData,
  CountriesResponse,
  Country,
} from '../../../../core/services/global/interfaces/countries.interface';
import {
  AccountType,
  AccountTypesResponse,
} from '../../../../core/services/global/interfaces/account-types.interface';

@Component({
  selector: 'app-register',
  imports: [
    TranslateModule,
    NgIf,
    NgClass,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('tabAnimation', [
      state(
        'void',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        '*',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class RegisterComponent {
  accountType: 'business' | 'personal' = 'business';

  errorMessage = '';
  successMessage = '';
  showError = false;
  registerForm: FormGroup = new FormGroup({});
  business_industry: Industry[] = [];
  avg_orders: AvgOrder[] = [];
  countries: Country[] = [];
  accountTypes: AccountType[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private globalService: GlobalService
  ) {}

  getBasics() {
    this.globalService.getAllAvgOrders().subscribe((res) => {
      this.avg_orders = res.data.avg_order;
    });
    this.globalService
      .getAllIndustries({ paginate: true })
      .subscribe((res: IndustriesResponse) => {
        this.business_industry = res.data.industry;
      });
    this.globalService
      .getAllCountries({ paginate: true })
      .subscribe((res: CountriesResponse) => {
        this.countries = res.data.countries;
      });
    this.globalService
      .getAllAccountTypes()
      .subscribe((res: AccountTypesResponse) => {
        this.accountTypes = res.data.account_types;
      });
  }

  ngOnInit(): void {
    this.getBasics();
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      business_name: ['', Validators.required],
      industry_id: ['', Validators.required],
      average_order: ['', Validators.required],
      country_id: ['', Validators.required],
      type: ['business', Validators.required],
      terms_accepted: [false, Validators.requiredTrue],
      links: this.fb.group({
        name: ['', Validators.required],
        url: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
            ),
          ],
        ],
      }),
    });
  }

  public validateControl = (controlName: string) => {
    return (
      this.registerForm?.get(controlName)?.invalid &&
      this.registerForm?.get(controlName)?.touched
    );
  };

  public validateLinkControl = (controlName: string) => {
    return (
      this.registerForm?.get('links')?.get(controlName)?.invalid &&
      this.registerForm?.get('links')?.get(controlName)?.touched
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm?.get(controlName)?.hasError(errorName);
  };

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.prepareFormData();

      this.authService.Register(formData).subscribe({
        next: (res: AuthResponseDto) => {
          // localStorage.setItem('token', res.data.token);
          const userEmail = this.registerForm.get('email')?.value;

          if (userEmail) {
            this.router.navigate(['/otp'], {
              queryParams: { email: userEmail },
            });
          } else {
            this.errorMessage = 'Email not found';
            this.showError = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.showError = true;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private prepareFormData(): any {
    const originalData = this.registerForm.value;

    if (originalData.type === 'personal') {
      const {
        business_name,
        industry_id,
        average_order,
        links,
        ...personalData
      } = originalData;
      return personalData;
    }

    return { ...originalData };
  }

  showTabs = {
    personal: true,
    business: false,
  };

  showSections = {
    personalDetails: true,
    businessDetails: false,
  };

  toggleSection(section: 'personalDetails' | 'businessDetails') {
    this.showSections[section] = !this.showSections[section];
  }
}
