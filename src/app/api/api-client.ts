import { Injectable, inject } from '@angular/core';
import { ButtonDto } from './button-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly httpClient = inject(HttpClient);

  // getButtonData(): Observable<ButtonDto[]> {
  //   return this.httpClient
  //     .get('')
  // }
}
