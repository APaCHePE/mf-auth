// services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private baseUrl = environment.apiUrl;

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 5000
    });

    return throwError(() => new Error(errorMessage));
  }

  get<T>(endpoint: string, headers?: HttpHeaders): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(
      `${this.baseUrl}/${endpoint}`,
      { headers }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  post<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body).pipe(
      catchError(this.handleError.bind(this))
    );
  }

}