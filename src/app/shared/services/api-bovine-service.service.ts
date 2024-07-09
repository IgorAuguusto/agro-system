import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

//Interface
import { Bovine } from '../interfaces/bovine.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiBovineServiceService {
  #http = inject(HttpClient);
  #url = signal("http://localhost:3000/Bovines");

  #setBovineList = signal< Bovine[] | null>(null);
  get getBovineList() {
    return this.#setBovineList.asReadonly();
  }
  public httpBovineList$(): Observable<Bovine[] | null> {
    this.#setBovineList.set(null);
    return this.#http.get<Bovine[]>(this.#url()).pipe(
      tap((res) => this.#setBovineList.set(res)));
  }

  #setBovineId = signal<Bovine | null>(null);
  get getBovineId() {
    return this.#setBovineId.asReadonly();
  }
  public httpBovineId$(id: string): Observable<Bovine> {
    this.#setBovineId.set(null);
    return this.#http.get<Bovine>(`${this.#url()}/${id}`).pipe(
      tap((res) => this.#setBovineId.set(res)));
  }

  #setBovineByFild = signal<Bovine[] | null>(null);
  get getBovineByFild() {
    return this.#setBovineByFild.asReadonly();
  }
  public httpSearchBovineByField$(field: string, value: string): Observable<Bovine[]> {
    this.#setBovineByFild.set(null);
    return this.#http.get<Bovine[]>(`${this.#url()}/?${field}=${value}`).pipe(
      tap((res) => this.#setBovineByFild.set(res)));
  }

  public httpBovineCreate(bovine: Bovine) {
    return this.#http.post(this.#url(), bovine);
  }

  public httpBovineUpdate(id: string, bovine: Bovine) {
    return this.#http.patch(`${this.#url()}/${id}`, bovine);
  }

  public httpBovineDelete(id: string) {
    return this.#http.delete<void>(`${this.#url()}/${id}`);
  }
}
