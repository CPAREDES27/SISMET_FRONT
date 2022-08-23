import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {map, switchMap} from 'rxjs/operators';
import {Observable, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {
  SERVER_URL = 'https://localhost:7275/api/';


  constructor(private httpClient: HttpClient) {
  }

  searchEmail(text: any) {
    return timer(2000)
      .pipe(
        switchMap(() => this.httpClient.get(`${this.SERVER_URL}users/validate/${text}`)),
      ); // PIPE ENDS HERE
  }


 
}