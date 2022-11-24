import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  isEmailErr = false;
  isPasswordErr = false;

  constructor(private notifier: NotifierService, private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login(): any {
    this.isEmailErr = false;
    this.isPasswordErr = false;
    
    if (this.email === '') {
      this.notifier.notify('error', 'Email is required');
      this.isEmailErr = true;
      return false;
    }
    if (this.password === '') {
      this.notifier.notify('warning', 'Password is required');
      this.isPasswordErr = true;
      return false;
    }
    const data = {
      email: this.email,
      password: this.password,
      platform: "web",
      deviceId: "",
      fcmToken: "",
      businessType: "1"
    };
   // console.log("Request data for login>>>>>",data);
    this.loginService.login(data).subscribe((res: any) => {
     console.log("login res>>>>>>>>>>>>>",res);
      if (res.success) {
        this.notifier.notify('success',"Login Successfully");
        this.router.navigate(['/pages/dashboard'])
        localStorage.setItem("userdlt",JSON.stringify(res.response[0]));
        localStorage.setItem("clientId", JSON.stringify(res.response[0].clientId));
        localStorage.setItem("userId", JSON.stringify(res.response[0].userId));
        localStorage.setItem("userType", JSON.stringify(res.response[0].userType));
        localStorage.setItem("token",res.response[0].token);
        localStorage.setItem("hasCRM",res.response[0].clientSettings[4].settingsValue);
        //localStorage.setItem("moduleDetails",(res.response[0].moduleDetails));
        
      } else{
        this.notifier.notify('error',res.message);
      }
      // this.router.navigate(['/pages/tasklist'])

    })

  }

}
