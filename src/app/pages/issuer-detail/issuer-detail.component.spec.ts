import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { mockIssuerDetails } from '../../data/mock-data';
import { IssuerDetailComponent } from './issuer-detail.component';

describe('IssuerDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuerDetailComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ detail: mockIssuerDetails['iss_001'] })
          }
        }
      ]
    }).compileComponents();
  });

  it('renders the page title and issuer detail content from resolved route data', () => {
    const fixture = TestBed.createComponent(IssuerDetailComponent);

    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Issuer Detail Overview');
    expect(content).toContain('Apple Inc.');
    expect(content).toContain('Strong Cash Flow Generation');
  });
});
