import { Component, inject } from '@angular/core';
//Components
import { FormComponent } from '../../shared/components/form/form.component';
// Services
import { ApiBovineServiceService } from '../../shared/services/api-bovine-service.service';
import { Router } from '@angular/router';
// Interface
import { Bovine } from '../../shared/interfaces/bovine.interface';
// Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export default class CreateComponent {
  #bovineService = inject(ApiBovineServiceService);
  #router = inject(Router);
  #matSnackBar = inject(MatSnackBar);

  onSubmit(bovine: Bovine) {
    this.#bovineService.httpBovineCreate(bovine).subscribe(() => {
      this.#matSnackBar.open("Bovino cadastrado com sucesso!", "OK")
      this.#router.navigateByUrl('/');
    });
  }
}
