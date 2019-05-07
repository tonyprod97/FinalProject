import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
    this.authService.logout();
  }

  onRegister() {
    this.errorMessage = '';
    this.authService.register(this.form.controls.userName.value, this.form.controls.password.value,
                              this.form.controls.firstName.value, this.form.controls.lastName.value,)
                      .subscribe(data => {
                        this.router.navigate(['/login']);
                        this.openSnackBar();
                      },
                        error => this.errorMessage = error);
  }

  openSnackBar() {
    this.snackBar.open('Register Success', 'Thank you for your registration' , {
      duration: 2000,
    });
  }

  onFormChange() {
    if(this.errorMessage) this.errorMessage = null;
  }
}
