import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(login: string, password: string) {
    const formattedUsername: string = login.replace(/[.-]/g, '');
    const url = 'http://localhost:8080/api/user/login';
    return this.http.post(url, { login: formattedUsername, password });
  }
}
