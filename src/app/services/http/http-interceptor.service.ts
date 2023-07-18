import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getCookie } from 'src/shared/utils';

@Injectable()
export class HttpInterceptorService  implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('httpRequest', httpRequest);
    const accessToken = getCookie('auth');
    if(accessToken){
      const token='Bearer ' + accessToken
      return next.handle(httpRequest.clone({ setHeaders: { Authorization: token } }));
    }
    else {
      return next.handle(httpRequest);
    }
  }
}
