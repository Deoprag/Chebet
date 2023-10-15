import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private token: string | null = localStorage.getItem('token');

  setToken(token: string) {
    this.token = token;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }
    return this.jwtHelper.isTokenExpired(this.token);
  }
}