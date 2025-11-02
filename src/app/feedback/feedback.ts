import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.html'
})
export class FeedbackComponent {
  // Form controls
  comment = new FormControl('');
  rating = new FormControl('');

  // Alert state
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;

  submitFeedback() {
    const commentVal = this.comment.value;
    const ratingVal = this.rating.value;
    if (!commentVal || !ratingVal) {
      this.showStyledAlert('Please fill out both fields.', 'error');
      return;
    }
    this.showStyledAlert('Thanks for your feedback!', 'success');

    this.comment.reset();
    this.rating.reset();
  }

  showStyledAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
}
