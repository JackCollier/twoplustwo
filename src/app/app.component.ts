import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  number1: number | null = null;
  number2: number | null = null;
  sum: number | null = null;

  calculateSum(): void {
    if (this.number1 !== null && this.number2 !== null) {
      this.sum = this.number1 + this.number2;
    }
  }
}