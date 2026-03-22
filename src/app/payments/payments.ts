import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Payment } from '../domain/payment';

@Component({
  selector: 'app-payments',
  imports: [RouterLink],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly payments = signal<Payment[]>([]);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.http
      .get<Payment[]>(`${environment.bffBaseUrl}/api/payments`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.payments.set(data),
        error: (err) => {
          if (err.status === 403) {
            this.error.set('Payments require Keycloak authentication. Please sign in with Keycloak.');
          } else {
            this.error.set('Failed to load payments.');
          }
        },
      });
  }

  logout(): void {
    this.document.location.href = `${environment.bffBaseUrl}/logout`;
  }
}
