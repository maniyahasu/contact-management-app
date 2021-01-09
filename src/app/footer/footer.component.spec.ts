import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create footer section', () => {
    let footerSection = fixture.debugElement.nativeElement.querySelector("footer");
    expect(footerSection).toBeDefined();
  });

  it('should copyright message', () => {
    let footerSection = fixture.debugElement.nativeElement.querySelector("footer .footer-content");
    expect(footerSection.textContent).toContain('Copyright, All rights reserved');
  });
});
