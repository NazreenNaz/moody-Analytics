import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { IssuerDetailResponse } from '../models/ratings.models';
import { RatingsService } from '../services/ratings.service';

export const issuerDetailResolver: ResolveFn<IssuerDetailResponse> = (route) => {
  const issuerId = route.paramMap.get('id');
  const ratingsService = inject(RatingsService);
  const router = inject(Router);

  if (!issuerId) {
    router.navigate(['/dashboard']);
    return EMPTY;
  }

  return ratingsService.getIssuerDetail(issuerId).pipe(
    catchError(() => {
      router.navigate(['/dashboard']);
      return EMPTY;
    })
  );
};
