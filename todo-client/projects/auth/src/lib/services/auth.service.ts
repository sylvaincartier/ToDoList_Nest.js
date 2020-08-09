import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ApplicationUser {
	accessToken: string;
	expiresIn: Date;
	username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ApplicationUser>;
  public currentUser: Observable<ApplicationUser>;

  constructor(private readonly http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('currentUser'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
		return this.currentUserSubject.value;
	}

  login(username: string, password: string)
  {
    return this.http.post<any>('auth/login', { username, password }).pipe(map(user => {
      if(user && user.accessToken) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
