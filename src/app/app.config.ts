import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { UsuarioService } from './services/usuario.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgxMaskDirective, NgxMaskPipe, } from 'ngx-mask';
import { NovaFilialComponent } from './components/nova-filial/nova-filial.component';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        AuthService,
        ApiService,
        UsuarioService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ]
};
