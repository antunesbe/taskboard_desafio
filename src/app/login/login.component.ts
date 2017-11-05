import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validator } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor( 
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService : AuthService
	) { 
		console.log("teste2");
		this.activatedRoute.queryParams.subscribe((params: any) => {
			let userEmail:string = params['email'];
			let token: string = params['token'];
			console.log(userEmail);
			console.log(token);
			if(token == undefined || userEmail== undefined){
				console.log("entrou no false");
				return false;
			}else{
				this.authService.storeUserData(token,userEmail);
				setTimeout(()=>{
					this.router.navigateByUrl('/board');
				},1000);
			}
			
		  });
	}

  	ngOnInit() {
		  console.log("teste");
	  }

}
