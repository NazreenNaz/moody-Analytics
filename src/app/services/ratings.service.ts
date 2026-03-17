import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, pipe, throwError } from 'rxjs';
import { FeedbackSubmission, Issuer, IssuerDetailResponse } from '../models/ratings.models';

@Injectable({ providedIn: 'root' })
export class RatingsService {
  constructor(private readonly http: HttpClient) {}

  getIssuers(): Observable<Issuer[]> {
    return this.http.get<Issuer[]>('/api/issuers').pipe(
    catchError((error) => {
      console.error('Error fetching issuers:', error);
      return of([]);
    })
  );
  }

  getIssuerDetail(id: string): Observable<IssuerDetailResponse> {
    return this.http.get<IssuerDetailResponse>(`/api/issuers/${id}`);
  }

  submitFeedback(
  payload: FeedbackSubmission
): Observable<{ success: boolean; feedbackId: string; message: string }> {
  return this.http
    .post<{ success: boolean; feedbackId: string; message: string }>(
      '/api/feedback',
      payload
    )
    .pipe(
      catchError((error) => {
        console.error('Submit feedback failed', error);
        return throwError(() => ({
          success: false,
          message: 'Submission failed. Please try again.'
        }));
      })
    );
}
}
