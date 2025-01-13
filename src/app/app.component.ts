import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calculation, CalculationService } from './services/calculation.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  number1: number | null = null;
  number2: number | null = null;
  sum: number | null = null;
  errorMessage: string = '';

  constructor(private calculationService: CalculationService) {}

  private performCalculation(): void {
    if (this.number1 !== null && this.number2 !== null) {
      this.sum = this.number1 + this.number2;
    } else {
      this.errorMessage = 'Please enter valid numbers.';
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
        error: (err) => {
          this.errorMessage = 'Error saving calculation.';
        },
      });
    }
  }

  calculateSum(): void {
    this.errorMessage = ''; 
    this.performCalculation();
    if (this.sum !== null) {
      this.saveCalculation();
    }
  }
}
