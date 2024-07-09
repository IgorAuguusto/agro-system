import { Component, OnInit, inject } from '@angular/core';
// Services
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBovineServiceService } from '../../shared/services/api-bovine-service.service';
// Interface
import { Bovine } from '../../shared/interfaces/bovine.interface';
// Component
import { FormComponent } from '../../shared/components/form/form.component';
//Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export default class EditComponent implements OnInit {
  
  #bovineService = inject(ApiBovineServiceService);
  #router = inject(Router);
  #activeRouter = inject(ActivatedRoute);
  #id: string = this.#activeRouter.snapshot.params['id'];
  #matSnackBar = inject(MatSnackBar);
  public getBovineId = this.#bovineService.getBovineId;

  ngOnInit(): void {
    this.#bovineService.httpBovineId$(this.#id).subscribe();
  }

  onSubmit(bovine: Bovine) {
    this.#bovineService.httpBovineUpdate(this.#id, bovine).subscribe(() => {
      this.#matSnackBar.open("Bovino editado com sucesso!", "OK")
      this.#router.navigateByUrl('/');
    });
  }
}