import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less'],
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() message: string | undefined;

  constructor() {}

  ngOnInit() {}
}
