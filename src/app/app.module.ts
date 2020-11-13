import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '@app/helpers/fake.backend';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from '@app/helpers/error.interceptor';
import { appInitializer } from '@app/helpers/user.initializer';
import { JwtInterceptor } from '@app/helpers/jwt.interceptor';
import { UserService } from '@app/user/services/user.service';
import { AppComponent } from './app.component';
import { AlertComponent } from '@app/alerts/alert.component';
import { HomeComponent } from './home';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, AlertComponent, HomeComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [UserService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
