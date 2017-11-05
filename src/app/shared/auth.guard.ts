import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ) {
    let isLoggedIn = this.authService.loggedIn();
    console.log(isLoggedIn);
    if(!isLoggedIn){
        this.router.navigateByUrl('login');
        return false
    }
    return true;
  }
}
