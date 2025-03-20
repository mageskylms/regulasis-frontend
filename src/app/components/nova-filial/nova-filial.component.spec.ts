import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaFilialComponent } from './nova-filial.component';

describe('NovaFilialComponent', () => {
  let component: NovaFilialComponent;
  let fixture: ComponentFixture<NovaFilialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaFilialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
