import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

const isRefreshing = { value: false };
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const addToken = (req: HttpRequest<any>): HttpRequest<any> => {
      const token = this.authService.getToken();

      return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    };

    const openPasswordDialog = (): Observable<string> => {
      const dialogRef = this.dialog.open(PasswordDialogComponent, {
        width: '300px',
        disableClose: true
      });
      return dialogRef.afterClosed();
    };

    const handle401Error = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
      if (!isRefreshing.value) {
        isRefreshing.value = true;
        refreshTokenSubject.next(null);

        return openPasswordDialog().pipe(
          switchMap((password) => this.authService.refreshToken(password)),
          switchMap((response) => {
            // Aqui, após o refresh token, você precisa setar o novo token e dados no localStorage
            const { token, userName } = response; // Certifique-se que o retorno tem essas propriedades
            console.log('🚀 Novo Token:', token);

            // Salve o novo token e o nome de usuário
            this.authService.setToken(token);
            localStorage.setItem('userName', userName);  // ou o nome real que você receber

            isRefreshing.value = false;
            refreshTokenSubject.next(token);
            return next.handle(addToken(req));
          }),
          catchError((err) => {
            isRefreshing.value = false;
            this.authService.logout();
            return throwError(() => err);
          })
        );
      } else {
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(() => next.handle(addToken(req)))
        );
      }
    };

    return next.handle(addToken(req)).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }
}

