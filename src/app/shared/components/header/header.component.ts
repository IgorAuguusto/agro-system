import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchService } from '../../services/search.service.ts.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public currentRoute: string = '';
  public search = '';

  #router = inject(Router);
  #searchService = inject(SearchService);

  ngOnInit(): void {
    this.currentRoute = this.#router.url;

    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.#router.url;
    });
  }

  onSearch() { 
    this.#searchService.setSearchTerm(this.search);
  }
}
