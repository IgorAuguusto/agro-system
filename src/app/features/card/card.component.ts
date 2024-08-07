import { Component, input, output } from '@angular/core';
// Material
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// Interface
import { Bovine } from '../../shared/interfaces/bovine.interface';
// Enum
import { RouterLink } from '@angular/router';
import { Sex } from './../../shared/interfaces/enuns/sex.enum';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    DatePipe,
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public bovine = input.required<Bovine>();
  public female = Sex.FEMALE;

  edit = output();
  delete = output();
}
