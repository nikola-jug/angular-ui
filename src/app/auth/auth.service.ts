import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileData } from '../domain/profile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly profile = signal<ProfileData | null>(null);
  private loaded = false;

  // Returns the cached profile on subsequent calls — no extra HTTP request.
  // A null result means unauthenticated; the authGuard will redirect to home.
  loadProfile(): Observable<ProfileData | null> {
    if (this.loaded) {
      return of(this.profile());
    }
    return this.http.get<ProfileData>(`${environment.bffBaseUrl}/api/profile`).pipe(
      tap((data) => {
        this.profile.set(data);
        this.loaded = true;
      }),
      catchError(() => {
        this.loaded = true;
        return of(null);
      }),
    );
  }
}
