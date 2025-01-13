import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calculation, CalculationService } from './services/calculation.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  number1: number | null = null;
  number2: number | null = null;
  sum: number | null = null;
  errorMessage: string = '';
  calculations: Calculation[] = [];

  constructor(private calculationService: CalculationService) {}

  ngOnInit(): void {
    this.getCalculations();
  }

  private getCalculations(): void {
    this.calculationService.getCalculations().subscribe({
      next: (data) => (this.calculations = data),
      error: () => this.setError('Error fetching calculation history.'),
    });
  }

  private performCalculation(): void {
    if (this.number1 !== null && this.number2 !== null) {
      this.sum = this.number1 + this.number2;
    } else {
      this.setError('Please enter valid numbers.');
    }
  }

  private saveCalculation(): void {
    if (this.sum !== null) {
      const calculation: Calculation = {
        number1: this.number1!,
        number2: this.number2!,
        result: this.sum,
        timestamp: new Date().toISOString(),
      };

      this.calculationService.addCalculation(calculation).subscribe({
        next: () => {
          this.resetState();
          this.getCalculations();
        },
        error: () => this.setError('Error saving calculation.'),
      });
    }
  }

  private resetState(): void {
    this.number1 = null;
    this.number2 = null;
    this.sum = null;
  }

  private setError(message: string): void {
    this.errorMessage = message;
  }

  calculateSum(): void {
    this.errorMessage = '';
    this.performCalculation();
    if (this.sum !== null) {
      this.saveCalculation();
    }
  }
}
