
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Team {
  id: number;
  name: string;
  klasse: string;
}

export interface Bewertung {
  id: number;
  projectId: number;
  criterionId: number;
  jurorId: number;
  score: number;
  comment: string;
}

export interface Projekt {
  id: number;
  teamId: number;
  titel: string;
  beschreibung: string;
  praesentiertAm: string;
  Team?: Team | null;
  Evaluations?: Bewertung[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Alle Projekte inklusive Team abrufen
  getProjekte(): Observable<Projekt[]> {
    return this.http.get<Projekt[]>(`${this.url}/project`);
  }

  // Einzelnes Projekt mit Bewertungen abrufen
  getProjekt(id: number): Observable<Projekt> {
    return this.http.get<Projekt>(`${this.url}/project/${id}`);
  }

  // Alle Bewertungen abrufen
  getBewertungen(): Observable<Bewertung[]> {
    return this.http.get<Bewertung[]>(`${this.url}/evaluation`);
  }
}
