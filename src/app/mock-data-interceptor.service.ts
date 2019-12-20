import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

const USERS: User[] = [
  { firstName: 'Israel', lastName: 'Israeli' },
  { firstName: 'Foo', lastName: 'Bar Baz' },
];

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('im here', req);
    if (req.url.includes('/users')) {
      return of(new HttpResponse({
        body: USERS,
        status: 200,
      }));
    }
    return next.handle(req);
  }
}

export const PROVIDE_MOCK_DATA_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: MockDataInterceptor,
};
