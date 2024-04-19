import { Injectable, inject } from '@angular/core';
import { ButtonDto } from './button-dto';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductDto } from './product-dto';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly httpClient = inject(HttpClient);

  getButtonData(): Observable<ButtonDto[]> {
    return this.httpClient
      .get<ButtonDto[]>(environment.apiBaseUrl + '/button')
      .pipe(
        catchError(() => throwError(() => 'Could not receive button data.'))
      );
  }

  getProduct(productId: string): Observable<ProductDto> {
    return this.httpClient
      .get<ProductDto>(`${environment.apiBaseUrl}/product/${productId}`)
      .pipe(
        catchError(() => throwError(() => 'Could not receive product data.'))
      );
  }
}
