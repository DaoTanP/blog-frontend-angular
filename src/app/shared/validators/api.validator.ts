import { ApiService } from '@/core/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';

export function emailExistValidator(apiService: ApiService): AsyncValidatorFn {
  return (
    control: AbstractControl<string, string>
  ): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(1000).pipe(
      switchMap(() =>
        apiService
          .isEmailAvailable(control.value)
          .pipe(
            map((isAvailable: boolean) => {
              return isAvailable ? null : { exists: true };
            })
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              switch (error.status) {
                case 400:
                  return of({ email: true });

                case 0:
                // return of({ connection: true });

                default:
                  return of(null);
              }
            })
          )
      )
    );
  };
}

export function usernameExistValidator(
  apiService: ApiService
): AsyncValidatorFn {
  return (
    control: AbstractControl<string, string>
  ): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return timer(1000).pipe(
      switchMap(() =>
        apiService
          .isUsernameAvailable(control.value)
          .pipe(
            map((isAvailable: boolean) => {
              return isAvailable ? null : { exists: true };
            })
          )
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400) return of({ username: true });
              return of(null);
            })
          )
      )
    );
  };
}
