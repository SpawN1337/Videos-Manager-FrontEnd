import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {  ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule1 } from 'src/app/shared/shared.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListVideoComponent } from './list-video/list-video.component';
@NgModule({
  declarations: [
    UpdateUserComponent,
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    ListVideoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule1,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
  ]
})
export class PagesModule {
}
