import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@auth/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  menuHidden: boolean;
  menuItemsLeft = [
    {
      title: 'Home',
      link: '/home',
      disabled: true,
    },
    {
      title: 'About',
      link: '/about',
      disabled: true,
    },
  ];
  menuItemsRight = [
    {
      title: 'Join',
      link: '/join',
    },
    {
      title: 'Login',
      link: '/auth',
    },
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/auth'], { replaceUrl: true }));
  }
}
