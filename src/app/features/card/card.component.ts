import { Component, EventEmitter, Output, input } from '@angular/core';
// Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
// Interface
import { Bovine } from '../../shared/interfaces/bovine.interface';
// Enum
import { Sex } from './../../shared/interfaces/enuns/sex.enum';
import { RouterLink } from '@angular/router';

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

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
}
