import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // If a session already exists the profile will be in cache — no extra HTTP call.
    // A null result means unauthenticated; stay on this page and show login options.
    this.authService
      .loadProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((profile) => {
        if (profile) this.router.navigate(['/profile']);
      });
  }

  loginWithKeycloak(): void {
    this.document.location.href = `${environment.bffBaseUrl}/oauth2/authorization/keycloak`;
  }

  loginWithAuthServer(): void {
    this.document.location.href = `${environment.bffBaseUrl}/oauth2/authorization/auth-server`;
  }
}
