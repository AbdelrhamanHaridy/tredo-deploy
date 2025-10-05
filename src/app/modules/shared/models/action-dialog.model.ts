export interface ActionDialogConfig {
  title: string;              // Change Status, Delete, ...
  message: string;            // Confirmation text
  confirmText?: string;       // Yes, Set as Primary
  cancelText?: string;        // Cancel
  icon?: string;              // pi pi-star-fill, pi pi-trash, etc.
  type?: 'primary' | 'delete' | 'status' | 'custom'; // for styling
}
