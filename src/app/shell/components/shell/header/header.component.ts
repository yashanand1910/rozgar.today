import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '@shell/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() menuItemsLeft: MenuItem[];
  @Input() menuItemsRight: MenuItem[];
  @Input() isLoading: boolean;
  @Output() menuItemClick = new EventEmitter<MenuItem>();

  constructor(private router: Router) {}
}
