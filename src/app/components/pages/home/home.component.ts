import { Component, OnInit, inject } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ApiBovineServiceService } from '../../../shared/services/api-bovine-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { combineLatestWith } from 'rxjs';
import { CardComponent } from '../../../features/card/card.component';
import { NoItemsComponent } from '../../../features/no-items/no-items.component';
import { SearchService } from '../../../shared/services/search.service.ts.service';
import { Bovine } from '../../../shared/interfaces/bovine.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    NoItemsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit {
  #apiBovineService = inject(ApiBovineServiceService);
  #router = inject(Router);
  #confirmationDialogService = inject(ConfirmationDialogService);
  #searchService = inject(SearchService);

  public bovineList: Bovine[] = [];
  public filteredBovineList: Bovine[] = [];

  ngOnInit(): void {
    this.#apiBovineService.httpBovineList$()
      .pipe(
        combineLatestWith(this.#searchService.search$),
        map(([bovineList, searchTerm]) => ({
          bovineList: bovineList || [],
          searchTerm
        }))
      )
      .subscribe(({ bovineList, searchTerm }) => {
        this.bovineList = bovineList;
        this.filterBovineList(searchTerm);
      });
  }

  filterBovineList(term: string) {
    if (!term) {
      this.filteredBovineList = this.bovineList;
    } else {
      this.filteredBovineList = this.bovineList.filter(bovine =>
        bovine.earring.toLowerCase().includes(term.toLowerCase()) ||
        bovine.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  }

  onEdit(bovineId: string) {
    this.#router.navigateByUrl(`edit/${bovineId}`);
  }

  onDelete(bovineId: string) {
    this.#confirmationDialogService
    .openDialog()
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
        this.#apiBovineService.httpBovineDelete(bovineId).subscribe(() => {
           this.#apiBovineService.httpBovineList$().subscribe();
        }) 
    });
  }
}
