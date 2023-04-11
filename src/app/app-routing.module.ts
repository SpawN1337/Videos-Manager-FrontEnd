import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { HasRoleGuard } from './has-role.guard';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ListUserComponent } from './views/pages/list-user/list-user.component';
import { UpdateUserComponent } from './views/pages/update-user/update-user.component';
import { AddvideoComponent } from './views/pages/addvideo/addvideo.component';
import { ListVideoComponent } from './views/pages/list-video/list-video.component';
import { WatchvideoComponent } from './views/pages/watchvideo/watchvideo.component';
import { SearchComponent } from './views/pages/search/search.component';
import { ListAircraftComponent } from './views/pages/list-aircraft/list-aircraft.component';
import { AddAircraftComponent } from './views/pages/add-aircraft/add-aircraft.component';
import { UpdateAircraftComponent } from './views/pages/update-aircraft/update-aircraft.component';
import { ListPlaceComponent } from './views/pages/list-place/list-place.component';
import { AddPlaceComponent } from './views/pages/add-place/add-place.component';
import { UpdatePlaceComponent } from './views/pages/update-place/update-place.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'videos',
    pathMatch: 'full'
  },

  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuardGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'register', component: RegisterComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      { path: 'videos', component: ListVideoComponent },
      { path: 'search', component: SearchComponent },
      { path: 'watch/:id', component: WatchvideoComponent },
      {
        path: 'addvideo', component: AddvideoComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "operator"
        }
      },
      {
        path: 'users', component: ListUserComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      {
        path: 'aircrafts', component: ListAircraftComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      {
        path: 'addaircraft', component: AddAircraftComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      {
        path: 'updateaircraft/:id', component: UpdateAircraftComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      {
        path: 'places', component: ListPlaceComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      {
        path: 'addplace', component: AddPlaceComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      {
        path: 'updateplace/:id', component: UpdatePlaceComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },
      // {
      //   path: 'updateplace/:id', component: upda,
      //   canActivate: [HasRoleGuard],
      //   data: {
      //     role: "admin"
      //   }
      // },
      {
        path: 'updateUser/:id', component: UpdateUserComponent,
        canActivate: [HasRoleGuard],
        data: {
          role: "admin"
        }
      },

    ],
  },

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
