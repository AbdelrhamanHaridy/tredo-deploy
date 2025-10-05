import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AddWarehouseComponent } from '../../components/add-warehouse/add-warehouse.component';
import { JsonPipe, NgClass, NgForOf } from '@angular/common';
import { WarehousesTableComponent } from '../../components/warehouses-table/warehouses-table.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { filter } from 'rxjs/operators';
import { ViewWarehouseComponent } from '../../components/view-warehouse/view-warehouse.component';
import { StatsDataResponse, Warehouse } from './warehouse.model';
import { WarehouseService } from './warehouse.service';
import { GlobalService } from '../../../../../core/services/global/global.service';
import { GovernorateatesResponse } from '../../../../../core/services/global/interfaces/governaorates.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

interface Article {
  title: string;
  total: string;
  desc: string;
  icon: string;
  background: string;
}

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    BreadcrumbModule,
    DrawerModule,
    ViewWarehouseComponent,
    TranslateModule,
    ButtonModule,
    AddWarehouseComponent,
    NgForOf,
    WarehousesTableComponent,
    RouterModule,
    NgClass,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.scss',
})
export class WarehousesComponent implements OnInit {
  showAddWarehouseDialog: boolean = false;
  showEditWarehouseDialog: boolean = false; // إضافة dialog للتعديل
  editWarehouseId: string | null = null; // ID للمستودع المراد تعديله

  drawerVisible = false;
  drawerId: string | null = null;
  drawerDetails: Warehouse | null = null;
  warehouseStatusValue: string | null = null;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private globalService: GlobalService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  items: MenuItem[] = [];
  home: MenuItem | undefined;
  articles: Article[] = [];
  totalWarehouses = 0;
  totalCities = 0;
  totalActives = 0;
  totalRegions = 0;
  ngOnInit() {
    this.setBreadcrumb();
    this.warehouseStats();
    this.translate.onLangChange.subscribe(() => {
      this.setBreadcrumb();
    });

    this.checkForDrawerParam();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkForDrawerParam();
      });
  }

  warehouseStats() {
    this.warehouseService.getWarehouseStats().subscribe({
      next: (res: StatsDataResponse) => {
        this.totalWarehouses = res.data.stats.total_warehouses;
        this.totalCities = res.data.stats.total_cities;
        this.totalActives = res.data.stats.total_active_warehouses;
        this.totalRegions = res.data.stats.total_governorates;
        this.setArticles();
      },
    });
  }

  checkForDrawerParam() {
    const hasDrawerOutlet = this.router.url.includes('(warehouse:');

    if (hasDrawerOutlet) {
      const match = this.router.url.match(/\(warehouse:([^)]+)\)/);
      if (match && match[1]) {
        this.drawerId = match[1];
        this.drawerVisible = true;
      }
    } else {
      this.route.firstChild?.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.drawerId = id;
          this.drawerVisible = true;

          this.router.navigate(
            ['/merchants/warehouses', { outlets: { warehouse: [id] } }],
            { replaceUrl: true }
          );
        } else {
          this.drawerVisible = false;
          this.drawerId = null;
          this.drawerDetails = null;
        }
      });
    }
  }

  onEditDialogHide() {
    this.showEditWarehouseDialog = false;
    this.editWarehouseId = null;
    this.warehouseStats();
  }

  setArticles() {
    this.articles = [
      {
        title: this.translate.instant(
          'warehouses.warehouseItems.totalWarehouses'
        ),
        total: String(this.totalWarehouses),
        desc: this.translate.instant(
          'warehouses.warehouseItems.warehousesTotal'
        ),
        icon: 'assets/icons/warehouse/box.svg',
        background: '#FFD7FE',
      },
      {
        title: this.translate.instant('warehouses.warehouseItems.active'),
        total: String(this.totalActives),
        desc: this.translate.instant(
          'warehouses.warehouseItems.currentlyActive'
        ),
        icon: 'assets/icons/warehouse/target.svg',
        background: '#E6F9EE',
      },
      {
        title: this.translate.instant('warehouses.warehouseItems.cities'),
        total: String(this.totalCities),

        desc: this.translate.instant('warehouses.warehouseItems.totalCoverage'),
        icon: 'assets/icons/warehouse/location.svg',
        background: '#E0E8F8',
      },
      {
        title: this.translate.instant('warehouses.warehouseItems.regions'),
        total: String(this.totalRegions),
        desc: this.translate.instant('warehouses.warehouseItems.overallCount'),
        icon: 'assets/icons/warehouse/pin.svg',
        background: '#FFF4E0',
      },
    ];
  }

  private setBreadcrumb() {
    this.items = [
      {
        label: this.translate.instant('breadcrumb.warehouses'),
        icon: 'pi pi-warehouse text-p-text',
        routerLink: '/merchants/warehouses',
      },
    ];

    this.home = {
      icon: 'pi pi-th-large text-p-text',
      routerLink: '/merchants',
      label: this.translate.instant('breadcrumb.dashboard'),
    };
  }

  addNewWarehouse() {
    this.showAddWarehouseDialog = !this.showAddWarehouseDialog;
  }

  closeDrawer() {
    this.drawerVisible = false;
    this.drawerId = null;

    this.router.navigate(
      ['/merchants/warehouses', { outlets: { warehouse: null } }],
      { replaceUrl: true }
    );
  }
  onEditWarehouse(warehouseId: string) {
    this.editWarehouseId = warehouseId;
    this.showEditWarehouseDialog = true;
  }
  onDeleteWarehouse(warehouseId: string) {
    this.confirmationService.confirm({
      message: this.translate.instant('warehouses.notifications.deleteMsg'),
      header: this.translate.instant(
        'warehouses.notifications.deleteWarehouse'
      ),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('warehouses.notifications.yes'),
      rejectLabel: this.translate.instant('warehouses.notifications.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.warehouseService.deleteWarehouse(warehouseId).subscribe({
          next: () => {
            this.closeDrawer();
            this.warehouseService.refreshWarehouses();
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant(
                'warehouses.notifications.success'
              ),
              detail: this.translate.instant(
                'warehouses.notifications.OperationSuccess'
              ),
              life: 5000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translate.instant(
                'warehouses.notifications.failed'
              ),
              detail: this.translate.instant(
                'warehouses.notifications.OperationFailed'
              ),
              life: 5000,
            });
          },
        });
      },
    });
  }
}
