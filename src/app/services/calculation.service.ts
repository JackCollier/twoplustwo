import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Calculation {
  id?: number;
  number1: number;
  number2: number;
  result: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private endPointUrl = 'http://localhost:3000/calculations'; 

  constructor(private http: HttpClient) {}

  getCalculations(): Observable<Calculation[]> {
    return this.http.get<Calculation[]>(this.endPointUrl);
  }

  addCalculation(calculation: Calculation): Observable<Calculation> {
    return this.http.post<Calculation>(this.endPointUrl, calculation);
  }

  deleteCalculation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endPointUrl}/${id}`);
  }
}
