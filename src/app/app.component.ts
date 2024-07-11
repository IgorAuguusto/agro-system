import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  template: `
  <app-header/>
  <div class="center-conteiner">
    <router-outlet/>
  </div>
  <app-footer/>
  `,
  styles: `
    router-outlet {
      min-height: 90vh;
    }
  `
})
export class AppComponent {
  title = 'agro-system';
}
