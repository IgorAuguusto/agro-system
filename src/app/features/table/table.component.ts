import { Component, inject } from '@angular/core';
// Pipe
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BackToHomeComponent } from '../../shared/components/back-to-home/back-to-home.component';
import { ApiBovineServiceService } from '../../shared/services/api-bovine-service.service';

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
