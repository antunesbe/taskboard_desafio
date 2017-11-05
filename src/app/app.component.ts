import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {

  }

  public logout = () =>{
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
