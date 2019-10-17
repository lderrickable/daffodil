import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterComponent } from './newsletter.component';
import { DaffContainerModule } from '@daffodil/design';

import { By } from '@angular/platform-browser';
import { DaffNewsletterFacade } from '@daffodil/newsletter';
import { Observable } from 'apollo-link';
import { ReactiveFormsModule } from '@angular/forms';
import { of, empty } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';


class MockDaffNewsletterFacade {
  loading$: Observable<boolean>;
  error$: Observable<string>;
  success$: Observable<boolean>;
}

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;
  let facade: MockDaffNewsletterFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsletterComponent
      ],
      imports: [
        DaffContainerModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: DaffNewsletterFacade, useClass: MockDaffNewsletterFacade }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(DaffNewsletterFacade);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on <daff-container>', () => {
    it('should set size="md"', () => {
      const container = fixture.debugElement.query(By.css('daff-container'));

      expect(container.componentInstance.size).toEqual('md');
    });
  });
  describe('when intialized', () => {
    let newsletterElement;

    beforeEach(() => {
      component.loading$ = of(false);
      component.success$ = of(false);
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.newsletter__right');
    });
    it('should render class newsletter__right', () => {
      expect(newsletterElement).not.toBeNull();
    });

  });
  describe('when loading$ is true', () => {
    let newsletterElement;

    beforeEach(() => {
      component.loading$ = of(true);
      component.success$ = of(false);
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.newsletter__loading');
    });
    it('should render newsletter__loading', () => {
      expect(newsletterElement).not.toBeNull();
    });
  })
  describe('when success$ is true', () => {
    let newsletterElement;

    beforeEach(() => {
      component.loading$ = of(false);
      component.success$ = of(true);
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.newsletter__success');
    });
    it('should render newsletter__loading', () => {
      expect(newsletterElement).not.toBeNull();
    });
  })
  describe('when an error is thrown', () => {
    let newsletterElement;

    beforeEach(() => {
      component.loading$ = of(false);
      component.success$ = of(false);
      component.error$ = of('Error');
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.newsletter__retry');
    });
    it('should render newsletter__loading', () => {
      expect(newsletterElement).not.toBeNull();
    });
  })
});
