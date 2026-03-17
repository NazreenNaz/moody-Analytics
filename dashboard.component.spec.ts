import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { mockIssuers } from '../../data/mock-data';
import { RatingsService } from '../../services/ratings.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  const ratingsServiceMock = {
    getIssuers: jest.fn(() => of(mockIssuers))
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: RatingsService, useValue: ratingsServiceMock }
      ]
    }).compileComponents();
  });

  it('renders issuer rows after loading completes', fakeAsync(() => {
    const fixture = TestBed.createComponent(DashboardComponent);

    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Apple Inc.');
    expect(content).toContain('Tesla Inc.');
    expect(ratingsServiceMock.getIssuers).toHaveBeenCalled();
  }));

  it('debounces the dashboard search input', fakeAsync(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    const filterSpy = jest.spyOn(component, 'applyGlobalFilter');

    fixture.detectChanges();
    component.searchControl.setValue('Technology');

    tick(249);
    expect(filterSpy).not.toHaveBeenCalled();

    tick(1);
    expect(filterSpy).toHaveBeenCalledWith('Technology');
  }));
});
