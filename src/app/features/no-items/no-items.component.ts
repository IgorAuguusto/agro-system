import { Component } from '@angular/core';
// Material
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-no-items',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './no-items.component.html',
  styleUrl: './no-items.component.scss'
})
export class NoItemsComponent {

}
