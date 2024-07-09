import { Component, inject, input } from '@angular/core';
// Interface
import { Bovine } from '../../shared/interfaces/bovine.interface';
// Pipe
import { DatePipe } from '@angular/common';
import { ApiBovineServiceService } from '../../shared/services/api-bovine-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackToHomeComponent } from '../../shared/components/back-to-home/back-to-home.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    DatePipe,
    BackToHomeComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export default class TableComponent {
  #bovineService = inject(ApiBovineServiceService);
  #activeRouter = inject(ActivatedRoute);
  #id: string = this.#activeRouter.snapshot.params['id'];
  public getBovineId = this.#bovineService.getBovineId;

  ngOnInit(): void {
    this.#bovineService.httpBovineId$(this.#id).subscribe();
  }

}
