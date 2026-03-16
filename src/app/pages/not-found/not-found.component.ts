import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  template: `
    <section class="not-found">
      <p>Page not found.</p>
      <a routerLink="/dashboard">
        <p-button label="Back to Dashboard"></p-button>
      </a>
    </section>
  `,
  styles: [
    `
      .not-found {
        min-height: 60vh;
        display: grid;
        place-items: center;
        gap: 1rem;
      }
    `
  ]
})
export class NotFoundComponent {}
