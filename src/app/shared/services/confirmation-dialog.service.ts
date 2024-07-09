import { Component, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <div>  
    <h2 mat-dialog-title>Deletar</h2>
    <mat-dialog-content>
      Tem certeza que quer deletar esse Bovino?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button class="btn btn-primary" (click)="onNo()">Não</button>
      <button class="btn btn-danger" (click)="onYes()">Sim</button>
    </mat-dialog-actions>
  </div>
    `,
   styles: [`
    div {
      background-color: grey;
    }

    h2 {
      color: Black!important;
    }

    mat-dialog-content {
      color: black!important;
      font-size: 1.2em;
    }
    
    button {
      color: white;
      margin-right: 10px;
    }
  `],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
    ],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}


@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  matDialog = inject(MatDialog);
  
  constructor() { }

  openDialog(): Observable<boolean> {  
    return this.matDialog.open(ConfirmationDialogComponent).afterClosed();;
  }
}
