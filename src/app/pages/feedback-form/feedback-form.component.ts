import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { StepsModule } from 'primeng/steps';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { IssuerDetailResponse } from '../../models/ratings.models';
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    ProgressSpinnerModule,
    RatingModule,
    SelectModule,
    StepsModule,
    TagModule,
    TextareaModule
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);

  readonly roles = ['Credit Analyst', 'Portfolio Manager', 'Risk Manager', 'Other'];
  readonly stepItems = [{ label: 'User Info' }, { label: 'Ratings' }, { label: 'Details' }, { label: 'Review' }];

  currentStep = 0;
  loading = true;
  submitting = false;
  detail?: IssuerDetailResponse;
  showStatusDialog = false;
  statusDialogTitle = '';
  statusDialogMessage = '';
  currentStepAnnouncement = 'Step 1 of 4. User information.';

  readonly form = this.fb.nonNullable.group({
    user: this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      organization: ['']
    }),
    ratings: this.fb.nonNullable.group({
      accuracy: [0, [Validators.required, Validators.min(1)]],
      driverRelevance: [0, [Validators.required, Validators.min(1)]],
      aiInsightQuality: [0, [Validators.required, Validators.min(1)]],
      timeliness: [0, [Validators.required, Validators.min(1)]]
    }),
    feedback: this.fb.nonNullable.group(
      {
        agreedDrivers: this.fb.array<FormControl<string>>([]),
        disagreedDrivers: this.fb.array<FormControl<string>>([]),
        additionalFactors: ['', [Validators.maxLength(500)]],
        comments: ['', [Validators.maxLength(1000)]]
      },
      {
        validators: [this.requiredDriverSelectionsValidator()]
      }
    )
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.detail = data['detail'] as IssuerDetailResponse | undefined;
          this.loading = false;
          this.focusCurrentStepField();
          this.cdr.markForCheck();
        }
      });
  }

  get agreedDrivers(): FormArray<FormControl<string>> {
    return this.form.controls.feedback.controls.agreedDrivers;
  }

  get disagreedDrivers(): FormArray<FormControl<string>> {
    return this.form.controls.feedback.controls.disagreedDrivers;
  }

  get userGroup(): FormGroup {
    return this.form.controls.user;
  }

  get ratingsGroup(): FormGroup {
    return this.form.controls.ratings;
  }

  get feedbackGroup(): FormGroup {
    return this.form.controls.feedback;
  }

  toggleDriverSelection(driverId: string, target: 'agreed' | 'disagreed', checked: boolean): void {
    const control = target === 'agreed' ? this.agreedDrivers : this.disagreedDrivers;
    const existingIndex = control.controls.findIndex((item) => item.value === driverId);

    if (checked && existingIndex === -1) {
      control.push(this.fb.nonNullable.control(driverId));
    }

    if (!checked && existingIndex !== -1) {
      control.removeAt(existingIndex);
    }

    this.feedbackGroup.updateValueAndValidity();
    this.feedbackGroup.markAsTouched();
  }

  isDriverSelected(driverId: string, target: 'agreed' | 'disagreed'): boolean {
    const control = target === 'agreed' ? this.agreedDrivers : this.disagreedDrivers;
    return control.controls.some((item) => item.value === driverId);
  }

  nextStep(): void {
    const group = this.getCurrentStepGroup();
    group.markAllAsTouched();

    if (group.invalid) {
      return;
    }

    this.currentStep += 1;
    this.updateStepAnnouncement();
    this.focusCurrentStepField();
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
      this.updateStepAnnouncement();
      this.focusCurrentStepField();
    }
  }

 submit(): void {
  this.form.markAllAsTouched();

  if (this.form.invalid || !this.detail) {
    return;
  }

  this.submitting = true;

  this.ratingsService
    .submitFeedback({
      issuerId: this.detail.issuer.id,
      user: this.form.getRawValue().user,
      ratings: this.form.getRawValue().ratings,
      feedback: this.form.getRawValue().feedback,
      metadata: {
        submittedAt: new Date().toISOString(),
        version: '1.0'
      }
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        this.submitting = false;

        this.statusDialogTitle = response.success
          ? 'Feedback Submitted'
          : 'Submission Failed';

        this.statusDialogMessage = response.message;
        this.showStatusDialog = true;

        this.cdr.markForCheck();
      },
      error: (err) => {
        // Only fallback safety (rare case)
        this.submitting = false;
        this.statusDialogTitle = 'Submission Failed';
        this.statusDialogMessage = err.message || 'Try again.';
        this.showStatusDialog = true;
        this.cdr.markForCheck();
      }
    });
}

  closeStatusDialog(): void {
    const wasSuccess = this.statusDialogTitle === 'Feedback Submitted';
    this.showStatusDialog = false;

    if (wasSuccess) {
      this.router.navigate(['/dashboard']);
    }

    this.cdr.markForCheck();
  }

  hasError(groupName: 'user' | 'ratings' | 'feedback', controlName: string, errorName: string): boolean {
    const group = this.form.get(groupName);
    const control = group?.get(controlName);
    return !!control?.touched && !!control.getError(errorName);
  }

  isCurrentStepInvalid(): boolean {
    return this.getCurrentStepGroup().invalid;
  }

  getStepSummary(): string {
    return this.currentStepAnnouncement;
  }

  private getCurrentStepGroup(): FormGroup {
    if (this.currentStep === 0) {
      return this.userGroup;
    }

    if (this.currentStep === 1) {
      return this.ratingsGroup;
    }

    return this.feedbackGroup;
  }

  private requiredDriverSelectionsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const agreedDrivers = control.get('agreedDrivers') as FormArray<FormControl<string>> | null;
      const disagreedDrivers = control.get('disagreedDrivers') as FormArray<FormControl<string>> | null;

      const errors: ValidationErrors = {};

      if (!agreedDrivers?.length) {
        errors['agreedDriversRequired'] = true;
      }

      if (!disagreedDrivers?.length) {
        errors['disagreedDriversRequired'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  private updateStepAnnouncement(): void {
    const labels = [
      'Step 1 of 4. User information.',
      'Step 2 of 4. Rating feedback.',
      'Step 3 of 4. Detailed feedback.',
      'Step 4 of 4. Review and submit.'
    ];

    this.currentStepAnnouncement = labels[this.currentStep] ?? labels[0];
    this.cdr.markForCheck();
  }

  private focusCurrentStepField(): void {
    setTimeout(() => {
      const selector =
        this.currentStep === 0
          ? '#name'
          : this.currentStep === 1
            ? '#rating-accuracy input[type="radio"], #rating-accuracy [tabindex]'
            : this.currentStep === 2
              ? `#agree-${this.detail?.drivers[0]?.id ?? ''}`
              : '#review-heading';

      const element = this.document.querySelector(selector) as HTMLElement | null;
      element?.focus();
    });
  }
}
