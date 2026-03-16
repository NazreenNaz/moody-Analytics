import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IssuerDetailResponse, KeyDriver } from '../../models/ratings.models';

@Component({
  selector: 'app-issuer-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    MessageModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TableModule,
    TagModule
  ],
  templateUrl: './issuer-detail.component.html',
  styleUrl: './issuer-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssuerDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  detail?: IssuerDetailResponse;
  loading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.detail = data['detail'] as IssuerDetailResponse | undefined;
          this.loading = false;

          if (!this.detail) {
            this.errorMessage = 'We could not load the issuer detail right now.';
          }

          this.cdr.markForCheck();
        }
      });
  }

  get breadcrumbItems() {
    return [{ label: 'Dashboard', routerLink: '/dashboard' }, { label: this.detail?.issuer.name ?? 'Issuer Detail' }];
  }

  getHome() {
    return { icon: 'pi pi-home', routerLink: '/dashboard' };
  }

  getImpactSeverity(impact: KeyDriver['impact']): 'success' | 'warn' | 'danger' | 'secondary' {
    if (impact === 'Positive') {
      return 'success';
    }

    if (impact === 'Negative') {
      return 'danger';
    }

    if (impact === 'Neutral') {
      return 'warn';
    }

    return 'secondary';
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
