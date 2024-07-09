import { JsonPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Interface
import { Bovine } from '../../interfaces/bovine.interface';
// Enuns
import { Race } from '../../interfaces/enuns/race.enum';
import { Sex } from '../../interfaces/enuns/sex.enum';
import { Situation } from '../../interfaces/enuns/situation.enum';
import { BovinePattern } from '../../interfaces/enuns/validation-bovine-regex.enum';
// Service
import { ApiBovineServiceService } from '../../services/api-bovine-service.service';
// Custom Validators
import { BovinesCustomValidador } from '../../validators/bovine-validator';
import { BackToHomeComponent } from '../back-to-home/back-to-home.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    BackToHomeComponent
    ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  #fb = inject(FormBuilder);
  #apiBovineService = inject(ApiBovineServiceService);

  @Output() done = new EventEmitter<Bovine>();
  public bovine = input<Bovine | null>(null);
  public isEdit = input<boolean | null>(null);
  public bovineForm!: FormGroup; 

  public dueDate: string | null = null;
  
  // Enuns
  public situations = Object.values(Situation);
  public races = Object.values(Race);
  public sex = Sex;

  ngOnInit(): void {
    this.bovineForm = this.#fb.group({
      earring: [this.bovine()?.earring ?? '', 
      ],
      name: [this.bovine()?.name ?? '', 
        [Validators.required, Validators.pattern(BovinePattern.NAME_PATTERN)]
      ],
      urlImage: [this.bovine()?.urlImage ?? ''],
      situation: [this.bovine()?.situation ?? '',
        [Validators.required, BovinesCustomValidador.isValid(this.situations)]
      ],
      sex: [this.bovine()?.sex ?? '',
        [Validators.required]
      ],
      motherEarring: [this.bovine()?.motherEarring ?? '',
        [Validators.maxLength(8)],
        [BovinesCustomValidador.earringParentsBovineValidator(this.#apiBovineService, 'F')]
      ],
      fatherEarring: [this.bovine()?.fatherEarring ?? '',
        [Validators.maxLength(8)],
        [BovinesCustomValidador.earringParentsBovineValidator(this.#apiBovineService, 'M')]
      ],
      race: [this.bovine()?.race ?? '',
        [Validators.required, BovinesCustomValidador.isValid(this.races)]
      ],
      dateOfBirth: [this.bovine()?.dateOfBirth ?? '',
        [Validators.required]
      ],
      pregnancyDate: [this.bovine()?.pregnancyDate ?? ''],
      lastBirthDate: [this.bovine()?.lastBirthDate ?? '']
    });

    if (!this.isEdit()) {
      this.bovineForm.get('earring')?.setValidators([
        Validators.required, 
        Validators.pattern(BovinePattern.EARRING_PATTERN)
      ]);
      this.bovineForm.get('earring')?.setAsyncValidators([
        BovinesCustomValidador.earringBovineValidator(this.#apiBovineService)
      ]);
    } else {
      this.bovineForm.get('earring')?.disable();
    }

    this.bovineForm.get('earring')?.updateValueAndValidity();
  
    if (this.bovineForm.get('pregnancyDate')?.value) {
      this.calculateNextDueDate();
    }
  }

  calculateNextDueDate() {
    const dateValue = this.bovineForm.get('pregnancyDate')?.value;
    if (dateValue) {
      const date = new Date(dateValue);
      const newDate = new Date(date);
      this.dueDate = newDate.setMonth(date.getMonth() + 9).toString();
    }
  }

  onSubmit() {
    const bovine = this.bovineForm.value as Bovine;
    this.done.emit(bovine);
  }
}
