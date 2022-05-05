import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContestantService {
  private apiServerUrl = environment.apiBaseUrl;
  postId!: number;
  status!: string;
  constructor(private http: HttpClient, private auth: AuthService) {}
}
