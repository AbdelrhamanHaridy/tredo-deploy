import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../pages/customers/customer.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Customer } from '../../pages/customers/customer.model';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [CommonModule, TableModule, TranslateModule, ButtonModule],
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss'],
})
export class ViewCustomerComponent implements OnInit, OnChanges {
  @Input() id!: string;
  @Output() editCustomer = new EventEmitter<string>();
  @Output() deleteCustomerEvent = new EventEmitter<string>();
  @Output() customerStatus = new EventEmitter<string>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  customerDetails: Customer | null = null;
  openPanels: boolean[] = [true, true];
  isLoading: boolean = true;

  togglePanel(index: number) {
    this.openPanels[index] = !this.openPanels[index];
  }

  onEditClick() {
    if (this.customerDetails) {
      this.editCustomer.emit(this.customerDetails.id.toString());
    } else if (this.id) {
      this.editCustomer.emit(this.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      // this.loadCustomerData();
    }
  }

  ngOnInit() {
    // إذا كان هناك id ممرر، نحمل البيانات
    if (this.id) {
      this.loadCustomerData();
    } else {
      // إذا لم يكن هناك id ممرر، نحاول استخراجه من الـ URL
      this.extractIdFromUrl();
    }
  }

  private extractIdFromUrl() {
    const url = this.router.url;
    try {
      const urlTree = this.router.parseUrl(url);
      const primaryGroup = urlTree.root.children['primary'];
      const customerGroup = primaryGroup?.children['customer'];
      const customerId = customerGroup?.segments[0]?.path ?? null;

      if (customerId) {
        this.id = customerId;
        this.loadCustomerData();
      } else {
        console.warn('No customer ID found in the URL.');
        this.isLoading = false;
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
      this.isLoading = false;
    }
  }

  private loadCustomerData() {
    if (!this.id) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;

    this.customerService.getCustomerById(this.id).subscribe({
      next: (res) => {
        this.customerDetails = res.data.customer;
        this.customerStatus.emit(this.customerDetails?.status);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading customer data:', err);
        this.isLoading = false;
      },
    });
  }

  recentShipments: any[] = [
    {
      orderNumber: 'ORD-1001',
      value: 250,
      paymentMethod: 'Credit Card',
      status: 'Delivered',
      courier: 'DHL',
      city: 'Cairo',
    },
    {
      orderNumber: 'ORD-1002',
      value: 430,
      paymentMethod: 'Cash on Delivery',
      status: 'In Transit',
      courier: 'FedEx',
      city: 'Alexandria',
    },
    {
      orderNumber: 'ORD-1003',
      value: 150,
      paymentMethod: 'Bank Transfer',
      status: 'Canceled',
      courier: 'Aramex',
      city: 'Giza',
    },
    {
      orderNumber: 'ORD-1004',
      value: 780,
      paymentMethod: 'Credit Card',
      status: 'Delivered',
      courier: 'DHL',
      city: 'Mansoura',
    },
  ];

  onDeleteClick() {
    if (this.customerDetails) {
      this.deleteCustomerEvent.emit(this.customerDetails.id.toString());
    } else if (this.id) {
      this.deleteCustomerEvent.emit(this.id);
    }
  }
}
