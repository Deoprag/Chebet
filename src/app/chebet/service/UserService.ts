import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { User } from '../model/User';
import { GenderService } from './GenderService';
import { DateService } from './DateService';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  login(login: string, password: string) {
    login = login.replace(/[.-]/g, '');
    const url = 'http://localhost:8080/api/user/login';
    return this.http.post(url, { login, password });
  }
  
  signUp(firstName: any, lastName: any, email: any, cpf: any, gender: any, password: any, birthDate: any, phoneNumber: any) {
    cpf = cpf.replace(/[.-]/g, '');
    phoneNumber = phoneNumber.replace(/[( )-]/g, '');
    gender = gender.code === 'M' ? 'Male' : gender.code === 'F' ? 'Female' : 'Other';
    const url = 'http://localhost:8080/api/user/signUp';
    return this.http.post(url, { 
      firstName, 
      lastName, 
      email, 
      birthDate, 
      cpf, 
      gender, 
      phoneNumber,
      password
    });
  }
  
  update(user: User) {
    const url = `http://localhost:8080/api/user/`;
    var id = user.id;
    var email = user.email;
    var phoneNumber = user.phoneNumber.replace(/[( )-]/g, '');
    var gender = user.gender.code === 'M' ? 'Male' : user.gender.code === 'F' ? 'Female' : 'Other';
    return this.http.put(url, {
      id,
      email,
      phoneNumber,
      gender
    });
  }

  delete(user: User) {
    const url = `http://localhost:8080/api/user/${user.id}`;
    return this.http.delete(url);
  }
  
  findByUsername(username: any): Observable<User> {
    const url = `http://localhost:8080/api/user/findByCpf/${username}`;
  
    return this.http.get<User>(url).pipe(
      map((response: any) => {
        const genderService = new GenderService();
        const user = new User();
        const dateService = new DateService();
        user.id = response.id;
        user.firstName = response.firstName;
        user.lastName = response.lastName;
        user.email = response.email;
        user.birthDate = dateService.formatDate(response.birthDate);
        user.cpf = response.cpf;
        var gender = genderService.getGender(response.gender[0]);
        if (gender) {
          user.gender = gender;
        }
        user.phoneNumber = response.phoneNumber;
        user.balance = response.balance;
        user.active = response.active;
        return user;
      })
    );
  }
}
