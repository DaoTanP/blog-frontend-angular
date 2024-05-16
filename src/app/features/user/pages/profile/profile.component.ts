import { User } from '@/core/models/user.model';
import { ApiService } from '@/core/services/api.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: Observable<User | null> = of(null);
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    activatedRoute.paramMap.subscribe((params) => {
      const username: string | undefined = params.get('username') || undefined;
      this.user = apiService.getProfile(username);
    });
  }
}
