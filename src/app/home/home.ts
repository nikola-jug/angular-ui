import { Component, inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.http
      .get(`${environment.bffBaseUrl}/profile`)
      .pipe(catchError(() => EMPTY))
      .subscribe(() => this.router.navigate(['/profile']));
  }

  loginWithKeycloak(): void {
    this.document.location.href = `${environment.bffBaseUrl}/oauth2/authorization/keycloak`;
  }

  loginWithAuthServer(): void {
    this.document.location.href = `${environment.bffBaseUrl}/oauth2/authorization/auth-server`;
  }
}
