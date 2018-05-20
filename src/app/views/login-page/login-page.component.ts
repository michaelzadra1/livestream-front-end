import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.router.navigate(['/streams']);
      }
      this.loading = false;
    });
  }
  oauthLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.router.navigate(['/streams']);
      },
      (error) => {
        console.log(error);
    });
  }

}
