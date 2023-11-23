import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )


  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(6)  ]],
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
    password2: ['123456', [ Validators.required ]],
  // }, {
  //   validators: [
  //     this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
  //   ]
  });

  // isValidField( field: string ) {
  //   return this.validatorsService.isValidField( this.myForm, field );
  // }

  register() {
    const { name, email, password } = this.myForm.value;
    this.authService.register(name, email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard/users'),
        error: (message) => {
          Swal.fire('Error', message, 'error' )
        }
      })
  }

}
