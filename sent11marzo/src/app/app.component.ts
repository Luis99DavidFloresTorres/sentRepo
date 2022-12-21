import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'sent';
  @HostBinding('class') componentCssClass: any;

  constructor(public overlayContainer: OverlayContainer){}
  ngOnInit(): void {
    this.onSetTheme('light-theme');
  }
;
  public onSetTheme(e: string){
    this.overlayContainer.getContainerElement().classList.add(e);
    this.componentCssClass = e;
  }
}
