import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.html'
})
export class FeedbackComponent implements OnInit {
  comment = new FormControl('');
  rating = new FormControl('');
  sessionId: string | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the session_id from URL parameters
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if (this.sessionId) {
        console.log('Payment session ID:', this.sessionId);
      }
    });
  }

  submitFeedback() {
    const feedback = {
      comment: this.comment.value!,
      rating: Number(this.rating.value),
      createdAt: new Date().toISOString(),
      sessionId: this.sessionId
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
