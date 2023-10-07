import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/auth/login/login.component';
import { SigninComponent } from './screens/auth/signin/signin.component';
import { RecoverPasswordComponent } from './screens/auth/recover-password/recover-password.component';
import { AdminPanelComponent } from './screens/admin/admin-panel/admin-panel.component';
import { CheckInComponent } from './screens/checkin/check-in/check-in.component';
import { UnauthorizedComponent } from './screens/unauthorized/unauthorized.component';
import { BusinessComponent } from './screens/admin/business/business.component';
import { BiManagementOptionsComponent } from './screens/admin/bi-management-options/bi-management-options.component';
import { EditBusinessDialogComponent } from './screens/dialogs/admin/edit-business-dialog/edit-business-dialog.component';
import { AssignUsersDialogComponent } from './screens/dialogs/admin/assign-users-dialog/assign-users-dialog.component';
import { UserManagementComponent } from './screens/admin/user-management/user-management.component';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { AssignHrateDialogComponent } from './screens/dialogs/admin/assign-hrate-dialog/assign-hrate-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent, SigninComponent, RecoverPasswordComponent, AdminPanelComponent, CheckInComponent, UnauthorizedComponent, BusinessComponent, BiManagementOptionsComponent, EditBusinessDialogComponent, AssignUsersDialogComponent, UserManagementComponent, AssignHrateDialogComponent],
  imports: [
    BrowserModule,
    NgbModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module,
    NgxJdenticonModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
