import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Issuer } from '../../models/ratings.models';
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    InputTextModule,
    ProgressSpinnerModule,
    TableModule,
    TagModule,
    ButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('dt') table?: Table;

  issuers: Issuer[] = [];
  loading = true;
  readonly searchControl = new FormControl('', { nonNullable: true });

  constructor(private readonly ratingsService: RatingsService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.applyGlobalFilter(value));

    this.ratingsService
      .getIssuers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe( (issuers) => {
        this.issuers = issuers;
        this.loading = false;
        this.cdr.markForCheck();
      });
     
  }

  applyGlobalFilter(value: string): void {
    this.table?.filterGlobal(value, 'contains');
  }

  getSeverity(outlook: Issuer['outlook']): 'success' | 'warn' | 'danger' {
    if (outlook === 'Positive') {
      return 'success';
    }

    if (outlook === 'Negative') {
      return 'danger';
    }

    return 'warn';
  }
}
