import { ApiBovineServiceService } from './../services/api-bovine-service.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, catchError, map, of } from 'rxjs';
import { Race } from '../interfaces/enuns/race.enum';
import { Situation } from '../interfaces/enuns/situation.enum';

export class BovinesCustomValidador {
  
  static earringBovineValidator(api: ApiBovineServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return api.httpSearchBovineByField$('earring', control.value).pipe(
        map(response => {
          if (!response || response.length === 0) {
            return null;
          }
          return { checkEarring: true };
        }),
        catchError(() => of(null))  
      )
    }
  }

  static earringParentsBovineValidator(api: ApiBovineServiceService, sex: string): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); 
      }
      return api.httpSearchBovineByField$('earring', control.value).pipe(
        map(response => {
          if (response.pop()?.sex === sex) {
            return null;
          }
          return { checkParentsEarring: true };
        }),
        catchError(() => of(null))  
      )
    }
  }

  static isValid(items: Situation[] | Race[]) : ValidatorFn {
    return (control: AbstractControl) => {
      return items.filter((item) => item === control.value).length > 0 ? null : { fildInvalid: true }; 
    }
  }
}
