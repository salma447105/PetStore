// toast.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../services/toast';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styles: `
    .toast-success {
      @apply bg-green-500 text-white;
    }
    .toast-error {
      @apply bg-red-500 text-white;
    }
    .toast-info {
      @apply bg-blue-500 text-white;
    }
  `
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
