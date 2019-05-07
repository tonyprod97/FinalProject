import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
   private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: new FormControl('', [Validators.required]),
      userName: new FormControl('', Validators.required)
    });
    this.authService.logout();
  }

  onLogIn() {
    this.errorMessage = '';
    this.authService.login(this.form.controls.userName.value, this.form.controls.password.value)
                          .subscribe(data => {
                              localStorage.setItem('user', JSON.stringify(data));
                              this.router.navigate(['/home']);
                              this.openSnackBar();
                          }, error => this.errorMessage = error);
  }

  openSnackBar() {
    this.snackBar.open('Login Success','Welcome!' , {
      duration: 2000,
    });
  }

  onFormChange() {
    if(this.errorMessage) this.errorMessage = null;
  }

}
