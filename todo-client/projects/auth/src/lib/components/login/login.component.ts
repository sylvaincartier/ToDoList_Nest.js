import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean = false;
  error: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['sylvain', Validators.required],
      password: ['@dF%^hGb03W~', Validators.required]
    })

    //reset login status
    this.authService.logout();

    //get return url from route parameter or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(data => {
      this.error = '';
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.error = error;
    })

  }

}
