import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { AuthenticationService, CredentialsService } from '@auth/services';
import { MockAuthenticationService } from '@app/auth/services/authentication.service.mock';
import { MockCredentialsService } from '@app/auth/services/credentials.service.mock';

import { I18nModule } from '@i18n';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from '@shell/components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot(), I18nModule, CoreModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: CredentialsService, useClass: MockCredentialsService }
      ],
      declarations: [HeaderComponent, ShellComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
