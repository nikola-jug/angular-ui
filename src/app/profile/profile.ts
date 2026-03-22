import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ProfileData {
  subject: string;
  issuer: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private readonly http = inject(HttpClient);

  readonly profile = signal<ProfileData | null>(null);

  ngOnInit(): void {
    this.http.get<ProfileData>(`${environment.bffBaseUrl}/profile`).subscribe({
      next: (data) => this.profile.set(data),
    });
  }
}
