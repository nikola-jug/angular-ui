import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private readonly document = inject(DOCUMENT);

  // Profile is guaranteed to be loaded by authGuard before this component renders.
  readonly profile = inject(AuthService).profile;

  logout(): void {
    this.document.location.href = `${environment.bffBaseUrl}/logout`;
  }
}
