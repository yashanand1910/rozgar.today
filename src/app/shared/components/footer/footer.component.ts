import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  version = environment.version;

  constructor() {}

  ngOnInit(): void {}
}
