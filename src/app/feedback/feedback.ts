import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.html'
})
export class FeedbackComponent {
  comment = new FormControl('');
  rating = new FormControl('');

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback() {
    const feedback = {
comment: this.comment.value!,
      rating: Number(this.rating.value),
      createdAt: new Date().toISOString()
    };

    if (!feedback.comment || !feedback.rating) {
      alert('Please fill out both fields.');
      return;
    }

    this.feedbackService.submit(feedback).subscribe({
      next: () => {
        alert('Thanks for your feedback!');
        this.comment.reset();
        this.rating.reset();
      },
      error: () => alert('Failed to submit feedback. Please try again.')
    });
  }
}
