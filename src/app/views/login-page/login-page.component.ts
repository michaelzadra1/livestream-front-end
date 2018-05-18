import { Component } from '@angular/core';
import { StreamsService } from '../../services/streams.service';
import { HttpClient } from '@angular/common/http';

import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  loading = false;
  token: string;

  constructor(
    private streamsService: StreamsService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }


  oauthLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        // sessionStorage.setItem('authToken', userData.authToken);
        this.router.navigate(['/streams']);
      },
      (error) => {
        console.log(error);
    });
  }

}
