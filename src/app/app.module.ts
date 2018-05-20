import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule,
         MatProgressSpinnerModule,
         MatButtonModule,
         MatProgressBarModule
        } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { StreamsService } from './services/streams.service';
import { StreamsPageComponent } from './views/streams-page/streams-page.component';
import { StreamPageComponent } from './views/stream-page/stream-page.component';

import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { UserPageComponent } from './views/user-page/user-page.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("747325281443-82qc3hh5t0br4941i8bpn56sjiffbt8p.apps.googleusercontent.com")
  },
]);

export function provideConfig() {
  return config;
}

// Routing settings
const routes = [
  { path: '', component: LoginPageComponent },
  { path: 'streams', component: StreamsPageComponent },
  { path: 'stream/:videoId', component: StreamPageComponent },
  { path: 'user/:userId', component: UserPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    StreamsPageComponent,
    StreamPageComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    HttpClientModule,
    MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatProgressBarModule, MatProgressBarModule
  ],
  providers: [
    StreamsService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
