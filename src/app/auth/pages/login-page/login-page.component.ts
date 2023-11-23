import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent{

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });


  login() {
    const { email, password } = this.myForm.value;
    console.log( this.authService.login(email, password).subscribe());
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          console.log(message);
          Swal.fire('Error', message, 'error' )
        }
      })

  }

}
