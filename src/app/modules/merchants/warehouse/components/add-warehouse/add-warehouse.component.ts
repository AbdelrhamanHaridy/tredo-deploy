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
import { GovernorateatesResponse } from '../../../../../core/services/global/interfaces/governaorates.interface';
import {
  Area,
  AreasResponse,
} from '../../../../../core/services/global/interfaces/areas.interface';
import { WarehouseService } from '../../pages/warehouses/warehouse.service';
import {
  CitiesResponse,
  City,
} from '../../../../../core/services/global/interfaces/cities.interface';
import { Governorate, Warehouse } from '../../pages/warehouses/warehouse.model';

@Component({
  selector: 'app-add-warehouse',
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
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.scss',
})
export class AddWarehouseComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() warehouseId: string | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  warehouseForm: FormGroup = new FormGroup({});
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
    private warehouseService: WarehouseService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      if (this.warehouseId) {
        this.isEditMode = true;
        // this.loadWarehouseData();
      } else {
        this.isEditMode = false;
        this.resetForm();
      }
    }

    if (changes['warehouseId'] && this.warehouseId) {
      this.isEditMode = true;
      if (this.visible) {
        this.loadWarehouseData();
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
    this.warehouseForm = this.fb.group({
      name: ['', [Validators.required]],
      responsible_manger_name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      phone2: ['', [Validators.pattern(/^01[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      governorate_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      area_id: [''],
      location: ['', [Validators.required]],
      status: ['', [Validators.required]],
      is_primary: [false],
      created_date_at: ['', [Validators.required]],
    });
  }

  loadWarehouseData() {
    if (!this.warehouseId) {
      console.warn('No warehouse ID provided for editing');
      return;
    }
    this.isLoading = true;
    this.isDataLoaded = false;

    this.warehouseService.getWarehouseById(this.warehouseId).subscribe({
      next: (res) => {
        const warehouse = res.data.warehouse;
        this.patchFormWithWarehouseData(warehouse);
        this.isLoading = false;
        this.isDataLoaded = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.isDataLoaded = false;
      },
    });
  }

  patchFormWithWarehouseData(warehouse: Warehouse) {
    // ننتظر حتى تحميل كل البيانات الأساسية
    setTimeout(() => {
      try {
        // البحث عن الكائنات المناسبة من القوائم
        const country = this.countries.find(
          (c) => c.id === warehouse.country?.id
        );
        const governorate = this.governorates.find(
          (g) => g.id === warehouse.governorate?.id
        );
        const city = this.cities.find((c) => c.id === warehouse.city?.id);
        const area = warehouse.area
          ? this.areas.find((a) => a.id === warehouse.area?.id)
          : null;
        const status = this.statuses.find((s) => s.value === warehouse.status);

        this.warehouseForm.patchValue({
          name: warehouse.name,
          responsible_manger_name: warehouse.responsible_manger_name,
          phone: warehouse.phone,
          phone2: warehouse.phone2 || '',
          email: warehouse.email,
          address: warehouse.address,
          country_id: country || null,
          governorate_id: governorate || null,
          city_id: city || null,
          area_id: area || null,
          location: warehouse.location,
          status: status?.value,
          is_primary: warehouse.is_primary || false,
          created_date_at: new Date(warehouse.created_date_at),
        });
      } catch (error) {
        console.error('Error patching form:', error);
      }
    }, 100);
  }

  public validateControl = (controlName: string) => {
    return (
      this.warehouseForm?.get(controlName)?.invalid &&
      this.warehouseForm?.get(controlName)?.touched
    );
  };

  onHide() {
    this.visibleChange.emit(false);
    this.resetForm();
  }

  resetForm() {
    this.warehouseForm.reset();
    this.warehouseId = null;
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
    if (this.warehouseForm.valid) {
      const formValue = this.warehouseForm.value;
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

      if (this.isEditMode && this.warehouseId) {
        this.updateWarehouse(formValue);
      } else {
        this.addWarehouse(formValue);
      }
    } else {
      this.warehouseForm.markAllAsTouched();
    }
  }

  addWarehouse(formValue: any) {
    this.warehouseService.addWarehouse(formValue).subscribe({
      next: (res) => {
        this.handleSuccess();
      },
      error: (err) => {
        console.error('Error adding warehouse:', err);
        this.handleError(err);
      },
    });
  }

  updateWarehouse(formValue: any) {
    if (!this.warehouseId) return;

    this.warehouseService
      .updateWarehouse(this.warehouseId, formValue)
      .subscribe({
        next: (res) => {
          this.handleSuccess();
        },
        error: (err) => {
          console.error('Error updating warehouse:', err);
          this.handleError(err);
        },
      });
  }

  private handleSuccess() {
    this.visibleChange.emit(false);
    this.warehouseService.refreshWarehouses();
    this.resetForm();
    this.messageService.add({
      severity: 'success',
      summary: this.translate.instant('warehouses.notifications.success'),
      detail: this.translate.instant(
        'warehouses.notifications.OperationSuccess'
      ),
      life: 5000,
    });
  }

  private handleError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: this.translate.instant('warehouses.notifications.failed'),
      detail: this.translate.instant(
        'warehouses.notifications.OperationFailed'
      ),
      life: 5000,
    });
  }
}
