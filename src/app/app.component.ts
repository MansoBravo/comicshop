import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda';

   private authService = inject( AuthService );
   private router = inject( Router );

  // public finishedAuthCheck = computed<boolean>( () => {
  //   console.log(this.authService.authStatus() )
  //   if ( this.authService.authStatus() === AuthStatus.checking ) {
  //     return false;
  //   }

  //   return true;
  // });


  // public authStatusChangedEffect = effect(() => {
  //   console.log("effect");
  //   console.log(this.router.url);
  //   switch( this.authService.authStatus() ) {

  //     case AuthStatus.checking:
  //       return;

  //     case AuthStatus.authenticated:
  //       this.router.navigateByUrl('/dashboard');
  //       return;

  //     case AuthStatus.notAuthenticated:
  //       this.router.navigateByUrl('/auth/login');
  //       return;

  //   }
  // });


}
