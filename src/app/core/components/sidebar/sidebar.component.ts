import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IsActiveMatchOptions,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

interface SidebarMenu {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  iconDark: string;
  link?: string;
  isOpen: boolean;
  items?: {
    title: string;
    titleAr?: string;
    link: string;
    icon: string; // light
    iconDark: string; // dark
  }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  template: `
    <aside
      [ngClass]="{
        'translate-x-0 ltr:left-0 rtl:right-0': isOpen,
        'ltr:-translate-x-full rtl:translate-x-full': !isOpen,
        'lg:translate-x-0 lg:ltr:left-0 lg:rtl:right-0': true
      }"
      class="fixed inset-y-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto border-[var(--border-color)] dark:border-gray-700 border-r rtl:border-l rtl:border-r-0 will-change-transform ltr:left-0 rtl:right-0"
    >
      <!-- Header -->
      <div
        class="p-6 flex justify-between items-center border-b border-[var(--border-color)] dark:border-gray-700"
      >
        <h2
          class="text-2xl font-semibold text-[var(--text-primary)] dark:text-gray-100"
        >
          {{ 'DASHBOARD.TITLE' | translate }}
        </h2>
        <button
          (click)="toggleSidebar.emit()"
          class="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-gray-400 dark:hover:text-gray-100"
        >
          ✕
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-6">
        <div class="px-6 space-y-2">
          <!-- Home -->
          <a
            routerLink="/merchants"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="closeSidebar.emit()"
            class="group flex items-center px-4 py-2 rounded-lg transition-colors text-[var(--text-secondary)] dark:text-gray-400 hover:bg-[var(--primary-color)] hover:text-white"
          >
            <!-- icon -->
            <!-- <img src="assets/icons/dashboard_dark.svg" class="mr-2 rtl:ml-2 group-hover:hidden"
                 [class.hidden]="router.isActive('/', {paths:'exact', queryParams:'ignored', fragment:'ignored', matrixParams:'ignored'})"/>
            <img src="assets/icons/dashboard.svg" class="mr-2 rtl:ml-2 hidden group-hover:block"
                 [class.block]="router.isActive('/', {paths:'exact', queryParams:'ignored', fragment:'ignored', matrixParams:'ignored'})"/> -->
            <img
              src="assets/icons/dashboard.svg"
              class="icon-1 mr-2 rtl:ml-2 hidden group-hover:block"
            />

            <!-- (2) Dark: تظهر في الوضع العادي فقط -->
            <img
              src="assets/icons/dashboard_dark.svg"
              class="icon-2 mr-2 rtl:ml-2 block group-hover:hidden"
            />

            {{ 'DASHBOARD.HOME' | translate }}
          </a>

          <!-- Dynamic Menus -->
          <div *ngFor="let menu of sidebarMenus" class="relative">
            <!-- For menus with sub-items -->
            <button
              *ngIf="menu.items?.length"
              (click)="toggleMenuDropdown(menu.id)"
              class="group flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors text-[var(--text-secondary)] dark:text-gray-400 hover:bg-[var(--primary-color)] hover:text-white"
              [class.bg-[var(--primary-color)]]="isChildActive(menu)"
              [class.text-white]="isChildActive(menu)"
            >
              <div class="flex items-center">
                <!-- icon -->
                <img
                  [src]="menu.icon"
                  class="mr-2 rtl:ml-2 hidden group-hover:block"
                  [class.hidden]="isChildActive(menu)"
                />
                <img
                  [src]="menu.iconDark"
                  class="mr-2 rtl:ml-2 group-hover:hidden"
                  [class.block]="isChildActive(menu)"
                />

                <span *ngIf="appLanguage === 'en'">{{ menu.title }}</span>
                <span *ngIf="appLanguage === 'ar'">{{ menu.titleAr }}</span>
              </div>
            </button>

            <!-- For single-item menus -->
            <a
              *ngIf="!menu.items?.length && menu.link"
              [routerLink]="menu.link"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="closeSidebar.emit()"
              class="group flex items-center px-4 py-2 rounded-lg transition-colors text-[var(--text-secondary)] dark:text-gray-400 hover:bg-[var(--primary-color)] hover:text-white"
            >
              <div class="flex items-center">
                <!-- (1) تظهر في hover و active، وتختفي في العادي -->
                <img
                  [src]="menu.icon"
                  class="icon-1 mr-2 rtl:ml-2 hidden group-hover:block"
                />

                <!-- (2) Dark icon: تظهر في العادي فقط -->
                <img
                  [src]="menu.iconDark"
                  class="icon-2 mr-2 rtl:ml-2 block group-hover:hidden"
                />

                <span *ngIf="appLanguage === 'en'">{{ menu.title }}</span>
                <span *ngIf="appLanguage === 'ar'">{{ menu.titleAr }}</span>
              </div>
            </a>

            <!-- Sub Items -->
            <div
              *ngIf="menu.isOpen && menu.items?.length"
              class="ml-8 mt-1 space-y-1"
            >
              <a
                *ngFor="let item of menu.items"
                [routerLink]="item.link"
                routerLinkActive="text-[var(--primary-color)]"
                class="group flex items-center px-4 py-2 rounded-lg transition-colors text-[var(--text-secondary)] dark:text-gray-400 hover:text-[var(--primary-color)]"
                (click)="closeSidebar.emit()"
              >
                <!-- icon -->
                <img
                  [src]="item.iconDark"
                  class="mr-2 rtl:ml-2 group-hover:hidden"
                  [class.hidden]="
                    router.isActive(item.link, {
                      paths: 'exact',
                      queryParams: 'ignored',
                      fragment: 'ignored',
                      matrixParams: 'ignored'
                    })
                  "
                />
                <img
                  [src]="item.icon"
                  class="mr-2 rtl:ml-2 hidden group-hover:block"
                  [class.block]="
                    router.isActive(item.link, {
                      paths: 'exact',
                      queryParams: 'ignored',
                      fragment: 'ignored',
                      matrixParams: 'ignored'
                    })
                  "
                />

                <span *ngIf="appLanguage === 'en'">{{ item.title }}</span>
                <span *ngIf="appLanguage === 'ar'">{{ item.titleAr }}</span>
              </a>
            </div>
          </div>

          <!-- <a
            routerLink="settings"
            routerLinkActive="active-link"
            (click)="closeSidebar.emit()"
            class="group flex items-center px-4 py-2 rounded-lg transition-colors text-[var(--text-secondary)] dark:text-gray-400 hover:bg-[var(--primary-color)] hover:text-white"
          >
            <img
              src="assets/icons/settings_dark.svg"
              class="mr-2 rtl:ml-2 group-hover:hidden"
              [class.hidden]="
                router.isActive('settings', {
                  paths: 'exact',
                  queryParams: 'ignored',
                  fragment: 'ignored',
                  matrixParams: 'ignored'
                })
              "
            />
            <img
              src="assets/icons/settings.svg"
              class="mr-2 rtl:ml-2 hidden group-hover:block"
              [class.block]="
                router.isActive('settings', {
                  paths: 'exact',
                  queryParams: 'ignored',
                  fragment: 'ignored',
                  matrixParams: 'ignored'
                })
              "
            />

            {{ 'DASHBOARD.SETTINGS' | translate }}
          </a> -->
        </div>
      </nav>
    </aside>
  `,
  styles: [
    `
      .active-link {
        background-color: var(--primary-color) !important;
        color: #fff !important;
      }
      a.active-link .icon-1 {
        display: block !important;
      }
      a.active-link .icon-2 {
        display: none !important;
      }
      a.active-link .icon-1 { display: block !important; }
      a.active-link .icon-2 { display: none !important; }
    `,
  ],
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() closeSidebar = new EventEmitter<void>();

  sidebarMenus: SidebarMenu[] = [
    {
      id: 'orders',
      title: 'orders',
      titleAr: 'الطلبات',
      icon: 'assets/icons/orders.svg',
      iconDark: 'assets/icons/orders_dark.svg',
      isOpen: false,
      link: '/merchants/orders',
    },
    {
      id: 'warehouses',
      title: 'Warehouses',
      titleAr: 'المستودع',
      icon: 'assets/icons/warehouse.svg',
      iconDark: 'assets/icons/warehouse_dark.svg',
      isOpen: false,
      link: '/merchants/warehouses',
    },
    {
      id: 'customers',
      title: 'Customers',
      titleAr: 'العملاء',
      icon: 'assets/icons/customers.svg',
      iconDark: 'assets/icons/customers_dark.svg',
      isOpen: false,
      link: '/merchants/customers',
    },
    /* {
      id: 'projects',
      title: 'Projects',
      titleAr: 'المشاريع',
      icon: 'assets/icons/projects.svg',
      iconDark: 'assets/icons/projects_dark.svg',
      isOpen: false,
      items: [
        {
          title: 'View Projects',
          titleAr: 'عرض المشاريع',
          link: 'projects',
          icon: 'assets/icons/folder.svg',
          iconDark: 'assets/icons/folder_dark.svg',
        },
        {
          title: 'Add Project',
          titleAr: 'إضافة مشروع',
          link: 'projects/add',
          icon: 'assets/icons/plus.svg',
          iconDark: 'assets/icons/plus_dark.svg',
        },
      ],
    },
    {
      id: 'employees',
      title: 'Employees',
      titleAr: 'الموظفين',
      icon: 'assets/icons/employees.svg',
      iconDark: 'assets/icons/employees_dark.svg',
      isOpen: false,
      items: [
        {
          title: 'View Employees',
          titleAr: 'عرض الموظفين',
          link: 'employees',
          icon: 'assets/icons/team.svg',
          iconDark: 'assets/icons/team_dark.svg',
        },
        {
          title: 'Add Employee',
          titleAr: 'إضافة موظف',
          link: 'employees/add',
          icon: 'assets/icons/user-add.svg',
          iconDark: 'assets/icons/user-add_dark.svg',
        },
      ],
    },
    {
      id: 'reports',
      title: 'Reports',
      titleAr: 'التقارير',
      icon: 'assets/icons/reports.svg',
      iconDark: 'assets/icons/reports_dark.svg',
      isOpen: false,
      items: [
        {
          title: 'Sales Reports',
          titleAr: 'تقارير المبيعات',
          link: 'reports/sales',
          icon: 'assets/icons/sales.svg',
          iconDark: 'assets/icons/sales_dark.svg',
        },
        {
          title: 'Performance Reports',
          titleAr: 'تقارير الأداء',
          link: 'reports/performance',
          icon: 'assets/icons/performance.svg',
          iconDark: 'assets/icons/performance_dark.svg',
        },
      ],
    }, */
  ];

  constructor(
    public router: Router,
    private translationService: TranslationService
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeAllMenuDropdowns();
    }
  }
  exactMatchOpts: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  get appLanguage(): string {
    return this.translationService.getCurrentLang();
  }

  toggleMenuDropdown(menuId: string): void {
    const menu = this.sidebarMenus.find((m) => m.id === menuId);
    if (menu) {
      menu.isOpen = !menu.isOpen;
      this.sidebarMenus
        .filter((m) => m.id !== menuId)
        .forEach((m) => (m.isOpen = false));
    }
  }

  closeAllMenuDropdowns(): void {
    this.sidebarMenus.forEach((menu) => (menu.isOpen = false));
  }

  isChildActive(menu: SidebarMenu): boolean {
    return menu.items?.some((item) =>
      this.router.isActive(item.link, {
        paths: 'subset',
        queryParams: 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored',
      })
    )
      ? true
      : false;
  }

  isActiveLink(link: string): boolean {
    return this.router.isActive(`/merchants/${link}`, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
