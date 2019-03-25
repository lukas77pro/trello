import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', [this.required]),
    email: new FormControl('', [this.required, Validators.email]),
    password: new FormControl('', [this.required, Validators.minLength(5)])
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.userForm.status) {
      this.userService
        .create(this.userForm.value)
        .subscribe(message => this.router.navigate(['/login']), error => console.log(error));
    }
  }

  private required(control: AbstractControl) {
    return control.value.trim() ? null : { 'required': true };
  }
}
