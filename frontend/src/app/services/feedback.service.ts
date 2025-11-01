import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  /**
   * Submit a new feedback entry to JSON Server
   */
  submit(feedback: Omit<Feedback, 'id'>): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  /**
   * Retrieve all feedback entries
   */
  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }
}
