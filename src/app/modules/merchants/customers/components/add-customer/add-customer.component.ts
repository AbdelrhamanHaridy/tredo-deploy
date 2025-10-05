import { MessageService } from 'primeng/api';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgClass, NgIf } from '@angular/common';
import { GlobalService } from '../../../../../core/services/global/global.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AccountType,
  AccountTypesResponse,
} from '../../../../../core/services/global/interfaces/account-types.interface';
import {
  CountriesResponse,
  Country,
} from '../../../../../core/services/global/interfaces/countries.interface';
import {
  Status,
  StatusResponse,
} from '../../../../../core/services/global/interfaces/status.interface';
import {
  Governorate,
  GovernorateatesResponse,
} from '../../../../../core/services/global/interfaces/governaorates.interface';
import {
  Area,
  AreasResponse,
} from '../../../../../core/services/global/interfaces/areas.interface';
import { CustomerService } from '../../pages/customers/customer.service';
import {
  CitiesResponse,
  City,
} from '../../../../../core/services/global/interfaces/cities.interface';
import { Customer } from '../../pages/customers/customer.model';

@Component({
  selector: 'app-add-customer',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    TranslateModule,
    NgIf,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent {
  @Input() visible: boolean = false;
  @Input() customerId: string | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  customerForm: FormGroup = new FormGroup({});
  countries: Country[] = [];
  accountTypes: AccountType[] = [];
  statuses: Status[] = [];
  governorates: Governorate[] = [];
  areas: Area[] = [];
  cities: City[] = [];

  isEditMode: boolean = false;
  isLoading: boolean = false;
  isDataLoaded: boolean = false;

  constructor(
    private globalService: GlobalService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      if (this.customerId) {
        this.isEditMode = true;
        // this.loadCustomerData();
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    }

    if (changes['customerId'] && this.customerId) {
      this.isEditMode = true;
      if (this.visible) {
        this.loadCustomerData();
      }
    }
  }

  getBasics() {
    this.globalService
      .getAllCountries({ paginate: true })
      .subscribe((res: CountriesResponse) => {
        this.countries = res.data.countries;
      });

    this.globalService.getAllStatus().subscribe((res: StatusResponse) => {
      this.statuses = res.data.status;
    });

    this.globalService
      .getGovernorates({ paginate: true })
      .subscribe((res: GovernorateatesResponse) => {
        this.governorates = res.data.governorates;
      });

    this.globalService
      .getAllAreas({ paginate: true })
      .subscribe((res: AreasResponse) => {
        this.areas = res.data.areas;
      });

    this.globalService
      .getAllCities({ paginate: true })
      .subscribe((res: CitiesResponse) => {
        this.cities = res.data.cities;
      });
  }

  ngOnInit(): void {
    this.getBasics();
    this.initForm();
  }

  initForm() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      phone2: ['', [Validators.pattern(/^01[0-9]{9}$/)]],
      country_id: ['1', [Validators.required]],
      governorate_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      area_id: ['', [Validators.required]],
      created_date_at: ['', [Validators.required]],
      status: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  loadCustomerData() {
    if (!this.customerId) {
      console.warn('No customer ID provided for editing');
      return;
    }
    this.isLoading = true;
    this.isDataLoaded = false;

    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (res) => {
        const customer = res.data.customer;
        this.patchFormWithCustomerData(customer);
        this.isLoading = false;
        this.isDataLoaded = true;
      },
      error: (err) => {
        console.error('Error loading customer data:', err);
        this.isLoading = false;
        this.isDataLoaded = false;
      },
    });
  }

  patchFormWithCustomerData(customer: Customer) {
    setTimeout(() => {
      try {
        const country = this.countries.find(
          (c) => c.id === customer.country?.id
        );
        const governorate = this.governorates.find(
          (g) => g.id === customer.governorate?.id
        );
        const city = this.cities.find((c) => c.id === customer.city?.id);
        const area = customer.area
          ? this.areas.find((a) => a.id === customer.area?.id)
          : null;
        const status = this.statuses.find((s) => s.value === customer.status);

        this.customerForm.patchValue({
          name: customer.name,
          phone: customer.phone,
          phone2: customer.phone2 || '',
          email: customer.email,
          address: customer.address,
          country_id: country || null,
          governorate_id: governorate || null,
          city_id: city || null,
          area_id: area || null,
          status: status?.value,
          created_date_at: new Date(customer.created_date_at),
        });
      } catch (error) {
        console.error('Error patching form:', error);
      }
    }, 100);
  }

  public validateControl = (controlName: string) => {
    return (
      this.customerForm?.get(controlName)?.invalid &&
      this.customerForm?.get(controlName)?.touched
    );
  };

  onHide() {
    this.visibleChange.emit(false);
    this.resetForm();
  }

  resetForm() {
    this.customerForm.reset();
    this.customerId = null;
    this.isEditMode = false;
    this.isDataLoaded = false;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formValue = this.customerForm.value;
      formValue.country_id = String(
        formValue.country_id?.id || formValue.country_id
      );
      formValue.governorate_id = String(
        formValue.governorate_id?.id || formValue.governorate_id
      );
      formValue.city_id = String(formValue.city_id?.id || formValue.city_id);
      if (formValue.area_id) {
        formValue.area_id = String(formValue.area_id?.id || formValue.area_id);
      }
      formValue.created_date_at = this.formatDate(
        new Date(formValue.created_date_at)
      );
      if (formValue.is_primary == null) {
        formValue.is_primary = false;
      }

      if (this.isEditMode && this.customerId) {
        this.updateCustomer(formValue);
      } else {
        this.addCustomer(formValue);
      }
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  addCustomer(formValue: any) {
    this.customerService.addCustomer(formValue).subscribe({
      next: (res) => {
        this.handleSuccess();
      },
      error: (err) => {
        console.error('Error adding customer:', err);
        this.handleError(err);
      },
    });
  }

  updateCustomer(formValue: any) {
    if (!this.customerId) return;

    this.customerService.updateCustomer(this.customerId, formValue).subscribe({
      next: (res) => {
        this.handleSuccess();
      },
      error: (err) => {
        console.error('Error updating customer:', err);
        this.handleError(err);
      },
    });
  }

  private handleSuccess() {
    this.visibleChange.emit(false);
    this.customerService.refreshCustomers();
    this.resetForm();
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('customers.notifications.success'),
      detail: this.translate.instant(
        'customers.notifications.OperationSuccess'
      ),
      life: 5000,
    });
  }

  private handleError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: this.translate.instant('customers.notifications.failed'),
      detail: this.translate.instant('customers.notifications.OperationFailed'),
      life: 5000,
    });
  }
}
