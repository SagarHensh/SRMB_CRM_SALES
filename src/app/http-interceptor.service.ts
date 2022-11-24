import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from './service/common.service';
import { ConfigService } from './service/config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  API_ROOT = this.configService.API_ROOT;
  ignoreUrlList: any = [
     this.API_ROOT + 'v2/user/login'
  ]
  constructor(private common: CommonService, private configService: ConfigService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    // console.log("Request URL:", request.url);
    if (!this.ignoreUrlList.includes(request.url)) {
      // console.log("Enter ignoreUrlList>>>>>>>");
      const token = this.common.getToken();
      // console.log("Token in interceptors>>>>", token);
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }

      });
      //console.log("Authorization>>>>>>>>>>",request);
      if (request.method.toLowerCase() === 'post') {
        let obj: any = {};
        try {
          obj = JSON.parse(request.body)
        } catch (e) {
          obj = request.body
        }
        obj['userId'] = this.common.getuserId()
        obj['clientId'] = this.common.getClientId()
        obj['userType'] = this.common.getUserType()
        // obj['token'] = this.common.getToken()
        request = request.clone({
          body: obj
        });
        //console.log("Requsrt>>>>>>>>>>>>>>>>>>>>>>>>",request);
      }

    }
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        // if (event.body.response) {
        //   event.body.response = this.common.decryptResponse(event.body.response);
        // }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // console.log(err);
        if (err.status === 400) {
          // redirect to the login route
          // or show a modal
          console.log('ERROR');
          // window.location.href = this.messageService.API_ROOT;
        }
      }
    }));
  }
}
