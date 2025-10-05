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
import { WarehouseService } from '../../pages/warehouses/warehouse.service';
import { Warehouse } from '../../pages/warehouses/warehouse.model';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-warehouse',
  standalone: true,
  imports: [CommonModule, TableModule, TranslateModule, ButtonModule],
  templateUrl: './view-warehouse.component.html',
  styleUrls: ['./view-warehouse.component.scss'],
})
export class ViewWarehouseComponent implements OnInit, OnChanges {
  @Input() id!: string;
  @Output() editWarehouse = new EventEmitter<string>();
  @Output() deleteWarehouseEvent = new EventEmitter<string>();
  @Output() wareHouseStatus = new EventEmitter<string>();

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  warehouseDetails: Warehouse | null = null;
  openPanels: boolean[] = [true, true];
  isLoading: boolean = true;

  togglePanel(index: number) {
    this.openPanels[index] = !this.openPanels[index];
  }

  onEditClick() {
    if (this.warehouseDetails) {
      this.editWarehouse.emit(this.warehouseDetails.id.toString());
    } else if (this.id) {
      this.editWarehouse.emit(this.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      // this.loadWarehouseData();
    }
  }

  ngOnInit() {
    // إذا كان هناك id ممرر، نحمل البيانات
    if (this.id) {
      this.loadWarehouseData();
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
      const warehouseGroup = primaryGroup?.children['warehouse'];
      const warehouseId = warehouseGroup?.segments[0]?.path ?? null;

      if (warehouseId) {
        this.id = warehouseId;
        this.loadWarehouseData();
      } else {
        console.warn('No warehouse ID found in the URL.');
        this.isLoading = false;
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
      this.isLoading = false;
    }
  }

  private loadWarehouseData() {
    if (!this.id) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;

    this.warehouseService.getWarehouseById(this.id).subscribe({
      next: (res) => {
        this.warehouseDetails = res.data.warehouse;
        this.wareHouseStatus.emit(this.warehouseDetails?.status);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading warehouse data:', err);
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
    if (this.warehouseDetails) {
      this.deleteWarehouseEvent.emit(this.warehouseDetails.id.toString());
    } else if (this.id) {
      this.deleteWarehouseEvent.emit(this.id);
    }
  }
}
