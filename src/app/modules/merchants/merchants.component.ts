import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { HeaderControlsComponent } from '../../core/components/header-controls/header-controls.component';
import { SidebarComponent } from '../../core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, HeaderControlsComponent, SidebarComponent, NzIconModule],
  template: `
    <div class="min-h-screen bg-[var(--background-color)] dark:bg-gray-900 relative">
      <!-- Overlay -->
      <div
        *ngIf="isSidebarOpen"
        (click)="closeSidebar()"
        class="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80 transition-opacity lg:hidden z-10">
      </div>

      <!-- Sidebar Component -->
      <app-sidebar
        [isOpen]="isSidebarOpen"
        (toggleSidebar)="toggleSidebar()"
        (closeSidebar)="closeSidebar()">
      </app-sidebar>

      <!-- Main Content -->
      <div class="lg:ltr:ml-64 lg:rtl:mr-64 transition-all duration-300">
        <!-- Header -->
        <header class="bg-[var(--surface-color)] dark:bg-gray-800 shadow-sm border-b border-[var(--border-color)] dark:border-gray-700">
          <div class="flex items-center justify-between px-6 py-4">
            <button
              (click)="toggleSidebar()"
              class="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] dark:focus:ring-blue-500 rounded-md">
              <i nz-icon nzType="menu" nzTheme="outline"></i>
            </button>
            <app-header-controls></app-header-controls>
          </div>
        </header>

        <!-- Page Content -->
        <main class="p-6 bg-screen min-h-screen">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class MerchantsComponent implements OnInit {
  isSidebarOpen = window.innerWidth >= 1024;

  ngOnInit() {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        this.isSidebarOpen = true;
        document.body.style.overflow = 'auto';
      } else if (this.isSidebarOpen) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.style.overflow = this.isSidebarOpen && window.innerWidth < 1024 ? 'hidden' : 'auto';
  }

  closeSidebar() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen = false;
      document.body.style.overflow = 'auto';
    }
  }

  constructor() {
    window.addEventListener('popstate', () => this.closeSidebar());
  }
}
