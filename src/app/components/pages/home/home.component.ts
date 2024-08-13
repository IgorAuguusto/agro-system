import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatestWith } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CardComponent } from '../../../features/card/card.component';
import { NoItemsComponent } from '../../../features/no-items/no-items.component';
import { Bovine } from '../../../shared/interfaces/bovine.interface';
import { ApiBovineServiceService } from '../../../shared/services/api-bovine-service.service';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { SearchService } from '../../../shared/services/search.service.ts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    NoItemsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('deleteBovine', [
      transition(':leave', [
        animate('1s', style({ opacity: 0 })), 
      ]),
    ])
  ]
})
export default class HomeComponent implements OnInit {
  #apiBovineService = inject(ApiBovineServiceService);
  #router = inject(Router);
  #confirmationDialogService = inject(ConfirmationDialogService);
  #searchService = inject(SearchService);

  public isDeleting = signal<boolean>(false);
  public bovineList = signal<Bovine[]>([]);
  public filteredBovineList = signal<Bovine[]>([]);

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
        this.bovineList.set(bovineList);
        this.filterBovineList(searchTerm);
      });
  }

  filterBovineList(term: string) {
    const bovineListValue = this.bovineList();
  
    if (!term) {
      this.filteredBovineList.set(bovineListValue);
    } else if (bovineListValue) {
      const filtered = bovineListValue.filter(bovine =>
        bovine.earring.toLowerCase().includes(term.toLowerCase()) ||
        bovine.name.toLowerCase().includes(term.toLowerCase())
      );
      this.filteredBovineList.set(filtered);
    }
  }

  onEdit(bovineId: string) {
    this.#router.navigateByUrl(`edit/${bovineId}`);
  }

  onDelete(bovineId: string) {
    this.isDeleting.set(true); // Ativa a animação de deletar

    this.#confirmationDialogService
      .openDialog()
      .pipe(
        filter((answer) => answer === true),
        switchMap(() => this.#apiBovineService.httpBovineDelete(bovineId)),
        switchMap(() => this.#apiBovineService.httpBovineList$()),
        combineLatestWith(this.#searchService.search$)
      )
      .subscribe(([bovineList, searchTerm]) => {
        this.bovineList.set(bovineList || []); 
        this.filterBovineList(searchTerm);
        this.isDeleting.set(false); 
      });
  }
 
}
