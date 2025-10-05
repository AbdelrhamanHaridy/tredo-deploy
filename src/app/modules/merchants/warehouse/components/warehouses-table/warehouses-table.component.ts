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
import {
  Warehouse,
  WarehouseSearchParams,
  WarehousesResponse,
} from '../../pages/warehouses/warehouse.model';
import { WarehouseService } from '../../pages/warehouses/warehouse.service';
import { ActionDialogComponent } from '../../../../shared/components/action-dialog/action-dialog.component';
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

@Component({
  selector: 'app-warehouses-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    RouterLink,
    RouterModule,
    ActionDialogComponent,
    TranslateModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
  ],
  templateUrl: './warehouses-table.component.html',
  styleUrls: ['./warehouses-table.component.scss'],
})
export class WarehousesTableComponent {
  showFilters = false;
  dialogVisible = false;
  dialogConfig: ActionDialogConfig | null = null;
  selectedWarehouseId: string | null = null;
  messageService = inject(MessageService);
  translate = inject(TranslateService);
  areas: Area[] = [];
  governorates: Governorate[] = [];
  private searchSubject = new Subject<string>();

  currentPage: number = 1;
  totalRecords: number = 0;
  rowsPerPage: number = 10;

  searchParams: WarehouseSearchParams = {
    status: '',
    country_id: '',
    city_id: '',
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
  }

  openPrimaryDialog(id: string) {
    this.selectedWarehouseId = id;
    this.dialogConfig = {
      title: this.translate.instant('warehouses.changeStatus.title'),
      message: this.translate.instant('warehouses.changeStatus.message'),
      confirmText: this.translate.instant(
        'warehouses.changeStatus.confirmText'
      ),
      cancelText: this.translate.instant('warehouses.changeStatus.cancel'),
      icon: 'pi pi-star-fill',
      type: 'primary',
    };
    this.dialogVisible = true;
  }

  handleDialogConfirm() {
    if (this.selectedWarehouseId) {
      this.setPrimary(this.selectedWarehouseId);
    }
  }

  handleDialogCancel() {
    this.selectedWarehouseId = null;
  }

  @ViewChild('dt') dt: Table | undefined;
  @Output() warehouseSelected = new EventEmitter<Warehouse>();
  private warehouseService = inject(WarehouseService);
  private globalService = inject(GlobalService);
  warehouses: Warehouse[] = [];
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((searchValue) => {
      this.searchParams.search = searchValue;
      this.currentPage = 1;
      this.onSearch();
    });
    this.getBasics();
    this.loadWarehouses();
    this.warehouseService.warehouseRefresh$.subscribe(() => {
      this.loadWarehouses();
    });
  }

  onSearchInput(value: string) {
    this.searchSubject.next(value);
  }
  loadWarehouses(params?: WarehouseSearchParams) {
    const requestParams = {
      ...params,
      page: this.currentPage,
    };

    this.warehouseService.getWarehouses(requestParams).subscribe({
      next: (warehouses: WarehousesResponse) => {
        this.warehouses = warehouses.data.warehouses;
        this.totalRecords = warehouses.data.pagination.total;
      },
      error: (err) => {
        console.error('Error fetching warehouses', err);
      },
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.loadWarehouses(this.searchParams);
  }
  setPrimary(id: string | number) {
    this.warehouseService.setPrimaryWarehouse(id.toString()).subscribe({
      next: (res) => {
        this.warehouses.forEach((w) => (w.is_primary = false));
        const target = this.warehouses.find((w) => w.id === id);
        if (target) target.is_primary = true;
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('common.toast.success'),
          detail: this.translate.instant(
            'warehouses.notifications.setAsPrimarySuccess'
          ),
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('common.toast.error'),
          detail: this.translate.instant(
            'warehouses.notifications.setAsPrimaryError'
          ),
        });
      },
    });
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
    this.loadWarehouses(this.searchParams);
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
      from_date: '',
      to_date: '',
      area_id: '',
    };
    this.currentPage = 1;
    this.loadWarehouses();
  }
}
