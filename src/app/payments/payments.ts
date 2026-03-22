import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

@Component({
  selector: 'app-payments',
  imports: [RouterLink],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit {
  private readonly http = inject(HttpClient);

  readonly payments = signal<Payment[]>([]);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.http.get<Payment[]>(`${environment.bffBaseUrl}/payments`).subscribe({
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
}
