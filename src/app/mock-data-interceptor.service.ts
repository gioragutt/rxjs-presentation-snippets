import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FakeUser {
  firstName: string;
  id: number;
  duration: number;
}

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
  id = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/users') && !req.url.startsWith('http')) {
      const delay = Math.floor(500 + Math.random() * 500);
      const id = this.id++;
      return timer(delay).pipe(
        map(() => new HttpResponse<FakeUser[]>({
          body: [
            { firstName: 'Israel', id, duration: delay / 1000 },
          ],
          status: 200,
        })),
      );
    }
    return next.handle(req);
  }
}

export const PROVIDE_MOCK_DATA_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: MockDataInterceptor,
};
