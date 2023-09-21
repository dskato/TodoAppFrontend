import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/auth/login/login.component';
import { SigninComponent } from './screens/auth/signin/signin.component';
import { RecoverPasswordComponent } from './screens/auth/recover-password/recover-password.component';
import { AdminPanelComponent } from './screens/admin/admin-panel/admin-panel.component';
import { CheckInComponent } from './screens/checkin/check-in/check-in.component';
import { RouteGuardService } from './services/auth-guard/route-guard.service';
import { UnauthorizedComponent } from './screens/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: ['ADMIN', 'SUPERADMIN'],
    },
  },
  {
    path: 'check-in',
    component: CheckInComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: ['USER'],
    },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
