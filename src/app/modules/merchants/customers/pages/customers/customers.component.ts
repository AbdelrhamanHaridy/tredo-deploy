import { MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { filter } from 'rxjs/operators';
import { GlobalService } from '../../../../../core/services/global/global.service';
import { GovernorateatesResponse } from '../../../../../core/services/global/interfaces/governaorates.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

interface Article {
  title: string;
  total: string;
  desc: string;
  plus?: string;
  icon: string;
  background: string;
}
import { Component } from '@angular/core';
import { AddCustomerComponent } from '../../components/add-customer/add-customer.component';
import { CustomersTableComponent } from '../../components/customers-table/customers-table.component';
import { ViewCustomerComponent } from '../../components/view-customer/view-customer.component';
import { CustomerService } from './customer.service';
import {
  Customer,
  StatsDataResponse,
  TopCity,
  TopGovernorate,
} from './customer.model';

@Component({
  selector: 'app-customers',
  imports: [
    BreadcrumbModule,
    DrawerModule,
    ViewCustomerComponent,
    TranslateModule,
    ButtonModule,
    AddCustomerComponent,
    NgForOf,
    CustomersTableComponent,
    RouterModule,
    NgClass,
    NgIf,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  showAddCustomerDialog: boolean = false;
  showEditCustomerDialog: boolean = false; // إضافة dialog للتعديل
  editCustomerId: string | null = null; // ID للمستودع المراد تعديله

  drawerVisible = false;
  drawerId: string | null = null;
  drawerDetails: Customer | null = null;
  customerStatusValue: string | null = null;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private globalService: GlobalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  items: MenuItem[] = [];
  home: MenuItem | undefined;
  articles: Article[] = [];
  totalCustomers = 0;
  newThisMonth = 0;
  totalActives = 0;
  topGovernorate!: TopGovernorate;
  topCity!: TopCity;
  ngOnInit() {
    this.setBreadcrumb();
    this.customerStats();
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

  customerStats() {
    this.customerService.getCustomerStats().subscribe({
      next: (res: StatsDataResponse) => {
        this.totalCustomers = res.data.stats.total_customers;
        this.newThisMonth = res.data.stats.new_this_month;
        // this.totalActives = res.data.stats.top_city.concentration_increase;
        this.topCity = res.data.stats.top_city || {};
        this.setArticles();
      },
    });
  }

  checkForDrawerParam() {
    const hasDrawerOutlet = this.router.url.includes('(customer:');

    if (hasDrawerOutlet) {
      const match = this.router.url.match(/\(customer:([^)]+)\)/);
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
            ['/merchants/customers', { outlets: { customer: [id] } }],
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
    this.showEditCustomerDialog = false;
    this.editCustomerId = null;
    this.customerStats();
  }

  setArticles() {
    this.articles = [
      {
        title: this.translate.instant('customers.customerItems.totalCustomers'),
        total: String(this.totalCustomers),
        desc: this.translate.instant('customers.customerItems.customersTotal'),
        icon: 'assets/icons/customer/customers.svg',
        background: '#FFD7FE',
      },
      {
        title: this.translate.instant('customers.customerItems.newThisMonth'),
        total: String(this.newThisMonth),
        desc: this.translate.instant('customers.customerItems.addedLast30Days'),
        icon: 'assets/icons/customer/new-customer.svg',
        background: '#E6F9EE',
      },
      {
        title: this.translate.instant('customers.customerItems.topProvince'),
        total: String(this.topGovernorate?.total_customers || 0),
        desc: this.translate.instant('customers.customerItems.mostCustomers'),
        plus: '40',
        icon: 'assets/icons/customer/company.svg',
        background: '#E4E3FF',
      },
      {
        title: this.translate.instant('customers.customerItems.topCity'),
        total: String(this.topCity?.name || '-'),
        desc: this.translate.instant(
          'customers.customerItems.highestConcentration'
        ),
        plus: '20',
        icon: 'assets/icons/customer/location.svg',
        background: '#FFF4E0',
      },
    ];
  }

  private setBreadcrumb() {
    this.items = [
      {
        label: this.translate.instant('breadcrumb.customers'),
        icon: 'pi pi-customer text-p-text',
        routerLink: '/merchants/customers',
      },
    ];

    this.home = {
      icon: 'pi pi-th-large text-p-text',
      routerLink: '/merchants',
      label: this.translate.instant('breadcrumb.dashboard'),
    };
  }

  addNewCustomer() {
    this.showAddCustomerDialog = !this.showAddCustomerDialog;
  }

  closeDrawer() {
    this.drawerVisible = false;
    this.drawerId = null;

    this.router.navigate(
      ['/merchants/customers', { outlets: { customer: null } }],
      { replaceUrl: true }
    );
  }
  onEditCustomer(customerId: string) {
    this.editCustomerId = customerId;
    this.showEditCustomerDialog = true;
  }
  onDeleteCustomer(customerId: string) {
    this.confirmationService.confirm({
      message: this.translate.instant('customers.notifications.deleteMsg'),
      header: this.translate.instant('customers.notifications.deleteCustomer'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('customers.notifications.yes'),
      rejectLabel: this.translate.instant('customers.notifications.cancel'),
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.customerService.deleteCustomer(customerId).subscribe({
          next: () => {
            this.closeDrawer();
            this.customerService.refreshCustomers();
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant(
                'customers.notifications.success'
              ),
              detail: this.translate.instant(
                'customers.notifications.OperationSuccess'
              ),
              life: 5000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translate.instant('customers.notifications.failed'),
              detail: this.translate.instant(
                'customers.notifications.OperationFailed'
              ),
              life: 5000,
            });
          },
        });
      },
    });
  }
}
