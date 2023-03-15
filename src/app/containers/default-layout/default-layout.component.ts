import { Component } from '@angular/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor( private toasterService: ToasterService) {}
}
