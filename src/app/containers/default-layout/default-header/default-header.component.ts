import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
url : string = ""
  constructor(private classToggler: ClassToggleService,private router: Router) {
    super();
    this.url = this.router.url
    console.log("gg",this.url)
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
