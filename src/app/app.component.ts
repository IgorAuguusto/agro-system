import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

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
  <div id="main" class="center-conteiner">
    <router-outlet/>
  </div>
  <app-footer/>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    
    #main {
      flex-grow: 1;
    }
  }
  `
})
export class AppComponent {
  title = 'agro-system';
}
