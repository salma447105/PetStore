import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  id?: number;
  comment: string;
  rating: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly apiUrl = 'http://localhost:3000/feedback';

  feedbackList = signal<Feedback[]>([]);

  constructor(private http: HttpClient) {}

  submit(feedback: Omit<Feedback, 'id'>): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }
  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  fetchFeedback() {
    this.getAll().subscribe((data) => this.feedbackList.set(data));
  }
}
