import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ActionDialogConfig } from '../../models/action-dialog.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-action-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, TranslateModule],
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent {
  @Input() config!: ActionDialogConfig | null;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onCancel() {
    this.cancel.emit();
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
