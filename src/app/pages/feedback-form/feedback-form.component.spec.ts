import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { mockIssuerDetails } from '../../data/mock-data';
import { RatingsService } from '../../services/ratings.service';
import { FeedbackFormComponent } from './feedback-form.component';

describe('FeedbackFormComponent', () => {
  const ratingsServiceMock = {
    submitFeedback: jest.fn(() =>
      of({
        success: true,
        feedbackId: 'fb_123456',
        message: 'Thank you for your feedback!'
      })
    )
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [FeedbackFormComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ detail: mockIssuerDetails.iss_001 })
          }
        },
        { provide: RatingsService, useValue: ratingsServiceMock }
      ]
    }).compileComponents();
  });

  it('keeps the Next button disabled until required user fields are entered', () => {
    const fixture = TestBed.createComponent(FeedbackFormComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    const buttonsBefore = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    const nextButtonBefore = buttonsBefore.find((button) => button.textContent?.includes('Next'));

    expect(nextButtonBefore?.disabled).toBe(true);

    component.userGroup.patchValue({
      name: 'Nazreen',
      email: 'nazreen@example.com',
      role: 'Credit Analyst'
    });

    fixture.detectChanges();

    const buttonsAfter = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    const nextButtonAfter = buttonsAfter.find((button) => button.textContent?.includes('Next'));

    expect(nextButtonAfter?.disabled).toBe(false);
  });
});
