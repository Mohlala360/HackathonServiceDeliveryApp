import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any;
  logins: Login;
  constructor() { 
    this.login = {
      username:'judith@pohComplain.co.za',
      password:'12345'
    }
  }

  ngOnInit() {
  }

  submit(){
    console.log(this.logins);

  }
  

}
export class Login{
    userName : string;
    password : string;
}