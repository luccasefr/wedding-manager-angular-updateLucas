import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private router: Router) { }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    let isLogged = this.auth.IsLogged();
    if(!isLogged){
        this.router.navigate(['/login']);
    }
    return isLogged;
  }
}
