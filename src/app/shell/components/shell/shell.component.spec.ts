import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from '@shell/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectIsLoading, selectUser } from '@auth/selectors';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
          ReactiveComponentModule,
          NzMenuModule,
          NzIconModule
        ],
        providers: [
          provideMockStore({
            selectors: [
              { selector: selectIsLoading, value: false },
              { selector: selectUser, value: false }
            ]
          })
        ],
        declarations: [HeaderComponent, ShellComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
