import { Component, signal } from '@angular/core';
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
  // Form controls
  comment = new FormControl('');
  rating = new FormControl('');

  // Signals for feedback submission status
  submissionMessage = signal('');

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback() {
    const comment = this.comment.value?.trim();
    const rating = Number(this.rating.value);

    if (!comment || rating <= 0) {
      this.submissionMessage.set('Please fill out both fields with valid values.');
      return;
    }

    const feedback = {
      comment,
      rating,
      createdAt: new Date().toISOString()
    };

    this.feedbackService.submit(feedback).subscribe({
      next: () => {
        this.submissionMessage.set('Thanks for your feedback!');
        this.comment.reset();
        this.rating.reset();
        // Optional: refresh feedback list
        this.feedbackService.fetchFeedback();
      },
      error: () => this.submissionMessage.set('Failed to submit feedback. Please try again.')
    });
  }
}
