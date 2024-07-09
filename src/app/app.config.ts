import { ApplicationConfig, LOCALE_ID, ValueProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

//Interceptor
import { httpInterceptor } from './interceptor/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//Material
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

registerLocaleData(localePt);

const SNACK_BAR_CONFIG: ValueProvider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  } as MatSnackBarConfig,
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpInterceptor])
    ),
    SNACK_BAR_CONFIG,
    provideAnimationsAsync(), 
    {provide: LOCALE_ID  , useValue: 'pt-BR'}
  ]
};
