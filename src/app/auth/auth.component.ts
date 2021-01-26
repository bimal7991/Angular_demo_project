import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authResponse, AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }



  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  isError = null;

  switchLogin() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    let authObservable: Observable<authResponse>;
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {

      authObservable = this.authService.signIn(email, password);

    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(response => {
      console.log(response)
      this.router.navigate(['/recipes']);
      this.isLoading = false;
    }, errorMessege => {
      console.log(errorMessege);
      this.isError = errorMessege;
      this.isLoading = false;
    })
    form.reset()
  }





}


