import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./auth.model";

export interface authResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private expirationTime:any;
  constructor(private http: HttpClient, private router: Router) { }
  signUp(email: string, password: string) {
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIJMbthcsW5FCpqXgz_R7pUJYi04xeoAM',
      {
        email: email,
        password: password,
        returnSecureToken: true

      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }))
  }

  signIn(email: string, password: string) {
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIJMbthcsW5FCpqXgz_R7pUJYi04xeoAM', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  private handleAuth(email: string, id: string, tokenId: string, _tokenExpirationDate: number) {
    const expiresIn = new Date(new Date().getTime() + +_tokenExpirationDate * 1000);

    const user = new User(email, id, tokenId, expiresIn);
    this.user.next(user);
    this.autoLogout(_tokenExpirationDate*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const user: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate
    } = JSON.parse(localStorage.getItem('userData'))
    if (!user) {
      return null;
    }
    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expiratinDate=new Date(user._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expiratinDate);
    }

  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.expirationTime){
      clearTimeout(this.expirationTime)
    }
    this.expirationTime=null;
  }

  autoLogout(expireDuration:number){
       this.expirationTime=setTimeout(() => {
         this.logout()
         
       },expireDuration);
 

  }


  private handleError(resError: HttpErrorResponse) {
    let errorMessege = "An unknown error occured";
    if (!resError.error || !resError.error.error) {
      return throwError(errorMessege);
    }
    switch (resError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessege = "This Email allready exists";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessege = "No User found with this email";
        break;
      case 'INVALID_PASSWORD':
        errorMessege = "Invalid Password";
        break;
    }
    return throwError(errorMessege)

  }
}