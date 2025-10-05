import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomerService } from '../../pages/customers/customer.service';
import { ActionDialogConfig } from '../../../../shared/models/action-dialog.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../../../core/services/global/global.service';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {
  Area,
  AreasResponse,
} from '../../../../../core/services/global/interfaces/areas.interface';
import {
  Governorate,
  GovernorateatesResponse,
} from '../../../../../core/services/global/interfaces/governaorates.interface';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import {
  CustomerSearchParams,
  Customer,
  CustomersResponse,
} from '../../pages/customers/customer.model';
import { Status } from '../../../../../core/services/global/interfaces/status.interface';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  showFilters = false;
  dialogVisible = false;
  dialogConfig: ActionDialogConfig | null = null;
  selectedCustomerId: string | null = null;
  messageService = inject(MessageService);
  translate = inject(TranslateService);
  areas: Area[] = [];
  governorates: Governorate[] = [];
  private searchSubject = new Subject<string>();
  statuses!: Status[];

  currentPage: number = 1;
  totalRecords: number = 0;
  rowsPerPage: number = 10;

  searchParams: CustomerSearchParams = {
    status: '',
    country_id: '',
    city_id: '',
    orders: '',
    governorate_id: '',
    is_primary: '',
    search: '',
    created_date_at: '',
    phone: '',
    email: '',
    from_date: '',
    to_date: '',
    area_id: '',
  };

  getBasics() {
    this.globalService
      .getAllAreas({ paginate: true })
      .subscribe((res: AreasResponse) => {
        this.areas = res.data.areas;
      });
    this.globalService
      .getGovernorates({ paginate: true })
      .subscribe((res: GovernorateatesResponse) => {
        this.governorates = res.data.governorates;
      });
    this.globalService.getAllStatus().subscribe((res) => {
      this.statuses = res.data.status;
    });
  }

  handleDialogCancel() {
    this.selectedCustomerId = null;
  }

  @ViewChild('dt') dt: Table | undefined;
  @Output() customerSelected = new EventEmitter<Customer>();
  private customerService = inject(CustomerService);
  private globalService = inject(GlobalService);
  customers: Customer[] = [];
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchValue) => {
      this.searchParams.search = searchValue;
      this.currentPage = 1;
      this.onSearch();
    });
    this.getBasics();
    this.loadCustomers();
    this.customerService.customerRefresh$.subscribe(() => {
      this.loadCustomers();
    });
  }

  onSearchInput(value: string) {
    this.searchSubject.next(value);
  }
  loadCustomers(params?: CustomerSearchParams) {
    const requestParams = {
      ...params,
      page: this.currentPage,
    };

    this.customerService.getCustomers(requestParams).subscribe({
      next: (customers: CustomersResponse) => {
        this.customers = customers.data.customers;
        this.totalRecords = customers.data.pagination.total;
      },
      error: (err) => {
        console.error('Error fetching customers', err);
      },
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.loadCustomers(this.searchParams);
  }

  openFilters(): void {
    this.showFilters = !this.showFilters;
  }
  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }
  onSearch() {
    if (this.searchParams.from_date) {
      this.searchParams.from_date = this.formatDate(
        new Date(this.searchParams.from_date!)
      );
    }
    if (this.searchParams.to_date) {
      this.searchParams.to_date = this.formatDate(
        new Date(this.searchParams.to_date!)
      );
    }
    if (this.searchParams.created_date_at) {
      this.searchParams.created_date_at = this.formatDate(
        new Date(this.searchParams.created_date_at!)
      );
    }
    this.currentPage = 1;
    this.loadCustomers(this.searchParams);
  }

  onClear() {
    this.searchParams = {
      status: '',
      country_id: '',
      city_id: '',
      governorate_id: '',
      is_primary: '',
      search: '',
      created_date_at: '',
      phone: '',
      email: '',
      orders: '',
      from_date: '',
      to_date: '',
      area_id: '',
    };
    this.currentPage = 1;
    this.loadCustomers();
  }
}
